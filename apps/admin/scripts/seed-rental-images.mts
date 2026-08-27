/**
 * Uploads the real vacant-unit photos from the company docs archive into
 * Supabase Storage, through the *same* optimize + upload path `/api/upload`
 * uses, then regenerates `packages/db/rentals.seed.sql` with the resulting
 * URLs.
 *
 * Run from apps/admin:
 *   npm run seed:rental-images -- --src "<path to Properties DB Export>"
 *
 * `--src` defaults to $PROPERTIES_EXPORT_DIR. Add `--dry` to optimize and
 * report sizes without writing anything.
 *
 * Idempotent: keys are derived from the rental id, and the upload upserts, so
 * re-running replaces the objects in place rather than orphaning them.
 *
 * This deliberately does NOT touch the `rentals` table — it writes SQL for you
 * to review and run, because these rows are missing rent/beds/baths/area and
 * would otherwise go live on the public site half-filled.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";

// supabase-js builds a RealtimeClient on construction, which wants a global
// WebSocket (Node < 22 has none). Next.js's server runtime provides one; this
// stub is only for running under bare tsx. Realtime is never used here.
(globalThis as unknown as { WebSocket?: unknown }).WebSocket ??= class {};

const { optimizeImage } = await import("../lib/images/optimize");
const { supabaseProvider, BUCKET } = await import("../lib/storage/supabase");

/**
 * The four units marked VACANT in `Pictures/Sqft.xlsx`, cross-referenced with
 * `property_directory_Jul242026061412.pdf` for sqft/city and with
 * `Properties DB Export/properties.json` for the matched photo.
 *
 * `rent`, `beds`, `baths` and `area` are not in the source data — there is no
 * active lease to read them from. They stay blank here on purpose; fill them
 * in on the Rentals page before publishing.
 */
const UNITS = [
  {
    id: "r-525-sherbrook-a",
    address: "525 Sherbrook St, Unit A",
    propertyId: "p0000023",
    // Property total is 2,000 sqft across 2 units — unit-level is unknown.
    sqft: "",
    sqftNote: "property total is 2,000 sqft / 2 units",
  },
  {
    id: "r-61-imperial",
    address: "61 Imperial Ave",
    propertyId: "p0000025",
    sqft: "1,040",
    sqftNote: "whole property (single unit), from the property directory",
  },
  {
    id: "r-869-hector-a",
    address: "869 Hector Ave, Unit A",
    propertyId: "p0000032",
    sqft: "",
    sqftNote: "property total is 2,232 sqft / 2 units",
  },
  {
    id: "r-904-college-a",
    address: "904 College Ave, Unit A",
    propertyId: "p0000034",
    sqft: "",
    sqftNote: "property total is 1,800 sqft / 2 units",
  },
] as const;

const here = dirname(fileURLToPath(import.meta.url));
const OUT_SQL = join(here, "..", "..", "..", "packages", "db", "rentals.seed.sql");
const OUT_MANIFEST = join(here, "..", "..", "..", "packages", "db", "managed-properties.json");

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
/** Also upsert the four rows into `public.rentals`, not just write the SQL. */
const WRITE_ROWS = args.includes("--write-rows");
/** Additionally upload every matched managed-property photo to images/properties/. */
const WITH_PROPERTIES = args.includes("--properties");
const srcFlag = args.indexOf("--src");
const SRC = srcFlag !== -1 ? args[srcFlag + 1] : process.env.PROPERTIES_EXPORT_DIR;

if (!SRC) {
  console.error(
    "No source folder. Pass --src \"<path to 'Properties DB Export'>\" " +
      "or set PROPERTIES_EXPORT_DIR.",
  );
  process.exit(1);
}

const kb = (b: number) => `${Math.round(b / 1024)}KB`;

interface ExportRow {
  property_id: string;
  address: string;
  city: string;
  province: string;
  postal_code: string | null;
  units: number;
  sqft: number | null;
  owner: string | null;
  owner_phone: string | null;
  published: boolean;
  db_image_path?: string;
  has_image: boolean;
}

const manifest = JSON.parse(readFileSync(join(SRC, "properties.json"), "utf-8")) as ExportRow[];

/** Resolve `images/<property_id>.<ext>` — the export doesn't fix the extension. */
function findPhoto(propertyId: string): string {
  const row = manifest.find((r) => r.property_id === propertyId);
  if (!row?.db_image_path) throw new Error(`${propertyId}: no photo in the export manifest`);
  const path = join(SRC!, row.db_image_path);
  if (!existsSync(path)) throw new Error(`${propertyId}: ${row.db_image_path} missing on disk`);
  return path;
}

/** Optimize one file and put it at `key`, logging the saving. */
async function processPhoto(label: string, src: string, key: string): Promise<string> {
  const original = readFileSync(src);
  const image = await optimizeImage(original);
  const saved = Math.round((1 - image.body.byteLength / original.byteLength) * 100);

  console.log(
    `${label.padEnd(20)} ${extname(src).slice(1).padEnd(4)} ` +
      `${kb(original.byteLength).padStart(7)} → ${kb(image.body.byteLength).padStart(6)} ` +
      `(${String(saved).padStart(2)}% smaller, ${image.width}×${image.height})`,
  );

  if (DRY) return `<${BUCKET}/${key}>`;

  const { url } = await supabaseProvider.upload({
    body: image.body,
    key,
    contentType: image.contentType,
    upsert: true,
  });
  return url;
}

const results: { id: string; url: string }[] = [];

console.log("Vacant units → images/rentals/");
for (const unit of UNITS) {
  // Stable key (not a UUID) so re-runs overwrite instead of piling up.
  const url = await processPhoto(unit.id, findPhoto(unit.propertyId), `rentals/${unit.id}.webp`);
  results.push({ id: unit.id, url });
}

const urlFor = (id: string) => results.find((r) => r.id === id)!.url;

const rows = UNITS.map(
  (u) => `  (
    '${u.id}',
    '${urlFor(u.id)}',
    array['${urlFor(u.id)}'],
    '',                          -- TODO: rent (not in source data)
    '${u.address}',
    'Winnipeg',                  -- TODO: neighbourhood, e.g. 'West Broadway'
    0, 0,                        -- TODO: beds, baths (not in source data)
    ${`'${u.sqft}',`.padEnd(28)} -- ${u.sqftNote}
    'Residential',
    'Available'
  )`,
).join(",\n");

const sql = `-- Real vacant units — GENERATED by apps/admin/scripts/seed-rental-images.mts.
-- Re-run that script rather than hand-editing the image URLs.
--
-- Source: units marked VACANT in 'Pictures/Sqft.xlsx', cross-referenced with
-- property_directory_Jul242026061412.pdf. Photos come from the matched
-- 'Properties DB Export/images/', re-encoded to WebP by the same optimize step
-- the CMS uploader uses, and stored under images/rentals/ in Supabase Storage.
--
-- rent, beds, baths and area are NOT in the source data (no active lease to
-- read them from) and are blank/0 below on purpose. Fill them in on the admin
-- Rentals page before publishing, or edit here and re-run — this is an upsert.

insert into public.rentals (id, image, images, rent, address, area, beds, baths, sqft, category, status)
values
${rows}
on conflict (id) do update set
  image      = excluded.image,
  images     = excluded.images,
  address    = excluded.address,
  sqft       = excluded.sqft,
  category   = excluded.category,
  status     = excluded.status,
  updated_at = now();
-- Note: rent/area/beds/baths are intentionally left out of the DO UPDATE list,
-- so re-running this after someone fills them in on the Rentals page will not
-- wipe their work.
`;

// ─── Managed-property photos (optional) ──────────────────────────────────────
// Every property in the export that matched a photo. These have no table in
// this schema yet, so the manifest is the only thing tying a property_id to
// its uploaded URL — whatever consumes them later reads it.
const propertyImages: Record<string, string> = {};

if (WITH_PROPERTIES) {
  const withPhotos = manifest.filter((r) => r.has_image && r.db_image_path);
  console.log(`\nManaged properties → images/properties/ (${withPhotos.length} matched)`);
  for (const row of withPhotos) {
    propertyImages[row.property_id] = await processPhoto(
      row.property_id,
      findPhoto(row.property_id),
      `properties/${row.property_id}.webp`,
    );
  }
}

// ─── Output ──────────────────────────────────────────────────────────────────
if (DRY) {
  console.log(`\n--dry: nothing uploaded, ${OUT_SQL} not written.`);
} else {
  writeFileSync(OUT_SQL, sql, "utf-8");
  console.log(`\nUploaded ${results.length} photos to ${BUCKET}/rentals/.`);
  console.log(`Wrote ${OUT_SQL}`);

  if (WITH_PROPERTIES) {
    const entries = manifest.map((r) => ({
      property_id: r.property_id,
      address: r.address,
      city: r.city,
      province: r.province,
      postal_code: r.postal_code,
      units: r.units,
      sqft: r.sqft,
      owner: r.owner,
      owner_phone: r.owner_phone,
      published: r.published,
      image: propertyImages[r.property_id] ?? null,
    }));
    writeFileSync(OUT_MANIFEST, JSON.stringify(entries, null, 2) + "\n", "utf-8");
    console.log(
      `Uploaded ${Object.keys(propertyImages).length} photos to ${BUCKET}/properties/.`,
    );
    console.log(`Wrote ${OUT_MANIFEST}`);
  }

  if (WRITE_ROWS) {
    const { createServiceClient } = await import("@chapter/db");
    const db = createServiceClient();
    // Mirrors the DO UPDATE list in the generated SQL: image/address/sqft are
    // authoritative from the export, but rent/area/beds/baths are only seeded
    // on insert so a re-run never clobbers values typed in the CMS.
    const existing = new Set(
      ((await db.from("rentals").select("id")).data ?? []).map((r: { id: string }) => r.id),
    );

    // The live table may predate the `images` column that schema.sql declares
    // (see packages/db/rentals-images-column.sql). Skip the column rather than
    // failing the whole seed; re-run after the migration to backfill it.
    const hasImages = !(await db.from("rentals").select("images").limit(1)).error;
    if (!hasImages) {
      console.warn(
        "  ! public.rentals has no `images` column — seeding `image` only.\n" +
          "    Run packages/db/rentals-images-column.sql, then re-run this script.",
      );
    }

    for (const u of UNITS) {
      const base = {
        id: u.id,
        image: urlFor(u.id),
        ...(hasImages ? { images: [urlFor(u.id)] } : {}),
        address: u.address,
        sqft: u.sqft,
        category: "Residential",
        status: "Available",
        updated_at: new Date().toISOString(),
      };
      const payload = existing.has(u.id)
        ? base
        : { ...base, rent: "", area: "Winnipeg", beds: 0, baths: 0 };

      const { error } = await db.from("rentals").upsert(payload, { onConflict: "id" });
      if (error) throw error;
      console.log(`  ${existing.has(u.id) ? "updated" : "inserted"} rentals/${u.id}`);
    }
    console.log(`Wrote ${UNITS.length} rows to public.rentals.`);
  } else {
    console.log("Review it, fill in rent/beds/baths/area, then run it in the SQL editor.");
  }
}
