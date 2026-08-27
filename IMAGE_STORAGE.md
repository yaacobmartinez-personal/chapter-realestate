# Image storage: Supabase Storage

**Decision:** all images uploaded through the CMS are stored in **Supabase
Storage**, not Cloudflare R2. This is done — the doc below describes how it
works and what's left over.

---

## How it works

**One public bucket, `images`**, with key prefixes instead of separate buckets:

```
images/properties/<uuid>.webp
images/rentals/<uuid>.webp
images/agents/  resources/  leadership/  buyer-guide/
```

Objects are served from
`https://<project>.supabase.co/storage/v1/object/public/images/…`, behind
Supabase's CDN with a 1-year `cache-control` (keys are UUIDs, so immutable).

The bucket definition lives in [`packages/db/storage.sql`](packages/db/storage.sql)
— public, 10 MB object cap, image MIME types only.

### Path an upload takes

1. `ImageUploader` (`apps/admin/components/ImageUploader.tsx`) posts the file
   plus a `folder` field to `/api/upload`.
2. [`apps/admin/app/api/upload/route.ts`](apps/admin/app/api/upload/route.ts)
   checks the admin session, validates type/size, and allowlists `folder`
   (so a caller can't write outside the known prefixes).
3. [`apps/admin/lib/images/optimize.ts`](apps/admin/lib/images/optimize.ts)
   runs the bytes through sharp — EXIF-rotate, resize to fit within
   2400×2400 (never upscaling), strip metadata, re-encode as **WebP q72**.
4. [`apps/admin/lib/storage/supabase.ts`](apps/admin/lib/storage/supabase.ts)
   uploads under `<folder>/<uuid>.webp` using the service-role client and
   returns the public URL, which the form stores in the row's `image` /
   `images` columns.

Optimization is not optional polish: the public site sets `unoptimized: true`
(Cloudflare Workers has no `/_next/image`), so whatever is in the bucket is
exactly what visitors download. Typical phone photos land 80–95% smaller.

### Access control

- **Reads** — the bucket is public; `/object/public/…` does not go through RLS.
- **Writes** — only the upload route, via the service-role key, which bypasses
  RLS. There are no INSERT/UPDATE/DELETE policies on `storage.objects`, so
  `anon` and `authenticated` clients cannot write at all. Uploads are gated by
  the route's admin session check.

If browser-direct uploads are ever added, add a scoped INSERT policy rather
than loosening the bucket.

---

## Leftovers

**Two rows still point at dead R2 URLs.** R2 turned out never to have been
enabled on the Cloudflare account (`ListObjectsV2` → `NotEntitled`, and the
`pub-*.r2.dev` URLs 403), so those images could not be migrated — they are
already broken on the live site and the bytes are gone:

| Table | Row | Field |
|---|---|---|
| `properties` | `2` — 890 Waverly St | `images[0]` |
| `agents` | `a6666f49…` — Clay Elliot | `images[0]` |

Neither is recoverable from the docs archive either: 890 Waverly St isn't in
the managed-property directory (it's a sale listing, a different dataset), and
`Pictures/` holds no agent headshots.

Fix by re-uploading both through the CMS. Once done, drop the `**.r2.dev`
entry from `apps/web/next.config.ts` — it's only there so those two render as
a broken image instead of tripping next/image's remote-host check.

Everything else in the database points at Unsplash, which is unaffected.

## Real portfolio photos

**Source:** `Properties DB Export/images/` in the docs folder
(`chapter-real-estate-docs`), built by cross-referencing
`property_directory_Jul242026061412.pdf` with `Pictures/`. Files are named
`<property_id>.<ext>` — originals. 27 of 33 managed properties have a matched
photo (see `Properties DB Export/README.md` for the 6 missing / 7
unmatched-extra list).

### Done — the 4 vacant units

Uploaded via [`apps/admin/scripts/seed-rental-images.mts`](apps/admin/scripts/seed-rental-images.mts),
which imports the *same* `optimize.ts` + `supabase.ts` modules `/api/upload`
uses, so the output is byte-identical to what the CMS uploader would produce:

```
npm run seed:rental-images -w admin -- --src "<path to Properties DB Export>"
```

| Rental | Source | Result |
|---|---|---|
| `r-525-sherbrook-a` | `p0000023.jpeg` | 148KB → 99KB (1024×768) |
| `r-61-imperial` | `p0000025.jpeg` | 137KB → 88KB (1024×682) |
| `r-869-hector-a` | `p0000032.jpg` | 44KB → 26KB (443×960) |
| `r-904-college-a` | `p0000034.png` | 1847KB → 98KB (1018×1082) |

Keys are `images/rentals/<rental-id>.webp` — stable, not UUIDs, and the upload
upserts, so re-running the script replaces the objects in place instead of
orphaning them.

The script also regenerates [`packages/db/rentals.seed.sql`](packages/db/rentals.seed.sql)
with the real URLs, and with `--write-rows` upserts the four rows directly.
**Both have been run** — the rows are live and `/rentals/<id>` prerenders for
all four. They still have no rent/beds/baths; see `PROPERTY_DATA.md`.

> **Note on quality:** these originals are low-resolution (largest is
> 1024×768), well under the 2400px cap, so the optimizer only re-encodes
> them — it can't add detail. They'll look soft in a full-bleed hero. Worth
> re-shooting before these units go live.

### Done — all 27 managed-property photos

`--properties` uploads every photo the export matched to
`images/properties/<property_id>.webp` (27 objects, 1.8 MB total after
optimization — down from 13.6 MB of originals).

[`packages/db/managed-properties.json`](packages/db/managed-properties.json)
is the index: one entry per property from the directory, with `image` set to
the uploaded URL or `null` for the 6 with no photo on file.

That manifest feeds [`packages/db/portfolio-properties.seed.sql`](packages/db/portfolio-properties.seed.sql)
(regenerate with `npm run gen:portfolio-sql -w @chapter/db`), which loads all
33 into `public.properties` — see `PROPERTY_DATA.md` for that decision. The
manifest also holds landlord name and phone, which the SQL deliberately does
**not** copy into `properties`: that table is served to anonymous visitors and
the manifest is not published.

### Superseded

`upload_supabase.mjs` and `rentals_seed/rentals_seed.sql` in the docs folder
predate this pipeline — they upload un-optimized non-WebP files to a separate
`rentals` bucket. Don't run them. That bucket was never actually created in
this Supabase project (only `images` exists), so there is nothing to delete;
the two files in the docs archive can be discarded.

## Removed

- `apps/admin/lib/storage/r2.ts`, and the `@aws-sdk/*` dependencies it needed.
- `R2_*` env vars from `apps/admin/.env.local` and `.env.example`.
- The R2 hostnames in `apps/web/next.config.ts` (except the legacy entry above).

Unrelated: `apps/web/wrangler.jsonc` / `open-next.config.ts` still mention an
optional R2 bucket for the **Next.js incremental cache**. That's a different
concern from image storage and was left alone.
