# Real property/rental data for the database

Tracks where the real (non-placeholder) data comes from, which app table it
maps to, and what's actually been loaded vs. still pending. Companion to
`IMAGE_STORAGE.md` (photos) — this doc is about the row data.

---

## Source

Everything originates from the `chapter-real-estate-docs` folder (the
company's property-management archive), not from this repo:

- `property_directory_Jul242026061412.pdf` — PMS export of the 32 actively
  managed properties: property ID, address, city/province/postal code, unit
  count, total sqft, owner, owner phone, published flag.
- `Pictures/Sqft.xlsx` — the live monthly rent roll: one row per unit, with
  tenant name/contact, lease start/end, deposit, rent, and landlord payout.
  Tenant `VACANT` on a row means that unit is currently available.
- `Pictures/*.{jpg,jpeg,png,webp}` — property photos, filenamed by address
  (inconsistent casing/typos — see match report below).

These were merged into a build artifact, `Properties DB Export/` (in the
docs folder, not this repo):
- `properties.csv` / `properties.json` — one row per managed property:
  `property_id, address, city, province, postal_code, units, sqft, owner,
  owner_phone, published, has_image, source_image_file, db_image_path`.
- `images/` — matched photos, renamed `<property_id>.<ext>`.
- `README.md` — match report: 27 of 33 properties matched a photo; 6 have
  none (1221 Lorette, 190 Red Pine, 628 Garwood, 633 St Mary's, 703 Prince
  Rupert, 88 St Mary's); 7 photos in `Pictures/` matched nothing in the
  current directory.
- `rentals_seed/` — SQL + upload script for the 4 currently-vacant units.
  **Superseded and replaced.** The photos are now uploaded through the real
  pipeline by `apps/admin/scripts/seed-rental-images.mts`, which also
  regenerates `packages/db/rentals.seed.sql` in this repo. Don't run the
  copies in the docs folder — see `IMAGE_STORAGE.md`.

---

## Where it maps in this schema

This data does **not** map cleanly onto either existing table:

- **`properties`** (schema: price, beds, baths, mls, `status` = For Sale /
  Sold / Pending) is for **MLS sale listings**. Nothing in the docs folder
  is a current sale listing — the closest real source would be
  `LISTING/` and `Deals 2026 AFTER 17 APRIL/` in the docs folder, which hold
  historical/active MLS deal paperwork (OTPs, deal sheets, commission
  statements) scattered across per-deal PDFs. Not parsed yet — would need a
  separate extraction pass, address/price/beds/baths/MLS# aren't in one
  clean table like the property directory.

- **`rentals`** (schema: rent, beds, baths, `category` = Residential /
  Commercial, `status` = Available / Leased) is the right table for the
  **subset of the managed portfolio that's currently vacant** — i.e. rows in
  `Sqft.xlsx` marked `VACANT`. As of the last check, that's 4 units:
  525 Sherbrook St Unit A, 61 Imperial Ave, 869 Hector Ave Unit A, 904
  College Ave Unit A.

- The other 29 managed properties (occupied, not for sale) don't fit either
  table cleanly. **Decision taken (2026-08-11): load all 33 into `properties`
  as `status = 'For Sale'` anyway**, so the portfolio is visible on the public
  site. `packages/db/portfolio-properties.seed.sql` does this. Known
  trade-off, accepted deliberately: these are tenanted homes owned by
  landlords, listed publicly with no price or MLS.

- A `managed_properties` table *does* exist in the live DB, but it belongs to
  the half-built owner portal (alongside `maintenance_requests` and
  `owner_documents`, feeding the `apps/owner` stub). `owner_id` is `NOT NULL`
  and FKs to `profiles.id`, and there's no image column — it is not a
  portfolio-showcase table. It holds one test row. Not in `schema.sql`.

---

## `rentals` field mapping (the 4 vacant units)

| Column | Source | Notes |
|---|---|---|
| `id` | generated | e.g. `r-525-sherbrook-a` |
| `address` | property directory + unit letter from `Sqft.xlsx` | |
| `sqft` | property directory | **total for the property**, not per-unit, when the property has >1 unit — only reliable for single-unit properties (e.g. 61 Imperial) |
| `image` / `images` | `Properties DB Export/images/` | **done** — uploaded as WebP to `images/rentals/<id>.webp`, URLs already in `packages/db/rentals.seed.sql`. Originals are low-res (≤1024px); see `IMAGE_STORAGE.md` |
| `category` | inferred | `Residential` for all 4 |
| `status` | inferred | `Available` |
| `rent` | **not in source** | no active lease to read it from — manual |
| `beds` / `baths` | **not in source** | `Sqft.xlsx` leaves these blank for these rows — manual |
| `area` (neighbourhood) | **not in source** | only a street address is known — manual |

---

## Status

- [x] Property directory PDF + photo matching done (`Properties DB Export/`).
- [x] 4 vacant units identified from `Sqft.xlsx`.
- [x] Photos for those 4 units uploaded through the real pipeline
      (`npm run seed:rental-images -w admin`), living at
      `images/rentals/<id>.webp`.
- [x] `rentals.seed.sql` rewritten with the real uploaded URLs
      (`packages/db/rentals.seed.sql`).
- [x] The 4 rows **inserted into `public.rentals`** (`--write-rows`). They are
      live: `/rentals` and all four `/rentals/<id>` pages now prerender from
      the database.
- [ ] **rent / beds / baths / area still blank** on those 4 rows (`rent=''`,
      `beds=0`, `baths=0`, `area='Winnipeg'`) — not in any source file. Fill
      them in on the admin Rentals page. Until then the public site shows four
      listings with no price and 0 beds/baths.
- [ ] **Run `packages/db/rentals-images-column.sql`** — the live `rentals`
      table is missing the `images` column that `schema.sql` declares, so the
      seed could only populate `image`. This also breaks saving any rental from
      the CMS. See the note below.
- [x] All 27 matched managed-property photos uploaded to `images/properties/`,
      with `packages/db/managed-properties.json` mapping property_id → URL.
- [x] `packages/db/portfolio-properties.seed.sql` generated — deletes the
      hand-added `10 Bracken Ave` row and inserts all 33 into `properties`.
      Validated: 33 unique ids/slugs, no collision with the 8 existing sale
      listings, wrapped in a transaction. **Not run yet — needs you.**
- [ ] Run that SQL. Afterwards `/properties` shows 41 rows: the 8 real sale
      listings plus the 33 managed properties (6 of which have no photo and
      render as a blank card).
- [ ] price / mls / beds / baths / garage / lot / year_built filled in for the
      33 — none are in the source data.
- [ ] `LISTING/` / `Deals 2026 AFTER 17 APRIL/` not yet parsed for real
      `properties` (for-sale) data.
- [ ] No decision made on whether the other 29 occupied managed properties
      need a table of their own. Their photos are already in storage and
      indexed in `packages/db/managed-properties.json`, so the table is the
      only thing missing if that decision goes ahead.

---

## Known schema drift: `rentals.images`

The live `public.rentals` table has no `images` column, though `schema.sql`
declares `images text[] not null default '{}'`. `create table if not exists`
means re-running `schema.sql` will never add it. All 12 other tables match.

This breaks more than the seed: `rentalToRow()` in
`packages/db/src/rentals.ts` always sends `images`, so **saving a rental from
the admin CMS fails today** with:

```
PGRST204  Could not find the 'images' column of 'rentals' in the schema cache
```

Fix by running `packages/db/rentals-images-column.sql` once (adds the column,
reloads the PostgREST schema cache, backfills `images` from `image`). Then
re-run `npm run seed:rental-images -w admin -- --properties --write-rows` to
populate the gallery arrays on the 4 seeded rows.
