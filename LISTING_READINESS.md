# Listing readiness — what's blocking the public site

Consolidated from `packages/db/managed-properties.json` (33 managed
properties) and `packages/db/rentals.seed.sql` (4 vacant units). See
`PROPERTY_DATA.md` for how this data was sourced.

**Note:** `portfolio-properties.seed.sql` (the 33 → `properties` table
insert) has not been run yet — none of the "properties" issues below are
live on the site yet. The 4 rentals *are* live already.

---

## 1. Marked "Published: No" in the PMS — verify before publishing at all

These 4 were explicitly flagged as not-published in the source property
directory. Loading them into the public `properties` table regardless is a
judgment call `portfolio-properties.seed.sql` currently makes — worth
confirming with whoever manages these before they go live, since "not
published" in the PMS may mean the landlord doesn't want the address public:

| Address | Has image | Units / sqft |
|---|---|---|
| 1806 Portage Ave | yes | 1 / 700 |
| 190 Red Pine Dr | **no** | 1 / 1,490 |
| 633 St Mary's Rd | **no** | 2 / 1,800 |
| 703 Prince Rupert Avenue | **no** | 2 / 2,250 |

## 2. No image at all (6 of 33)

Render as a blank card today. In priority order (3 of these are also in the
"not published" list above):

| Address | Units / sqft | Published in PMS |
|---|---|---|
| 190 Red Pine Dr | 1 / 1,490 | No |
| 633 St Mary's Rd | 2 / 1,800 | No |
| 703 Prince Rupert Avenue | 2 / 2,250 | No |
| 1221 Lorette Ave | 2 / 1,800 | Yes |
| 628 Garwood Ave | 1 / 700 | Yes |
| 88 St Mary's Rd | 1 / 1,002 | Yes |

## 3. Zero units / zero sqft on record (has an image, but the record itself is thin)

The property directory has no unit count or size for these three — likely
vacant land or the PMS record was never filled in. Worth a call to the
landlord/agent for real facts before publishing as a "residential" listing:

| Address | Owner |
|---|---|
| 30 Lake Crest Rd | Armin Barsomian |
| 355 Woodlawn St | Rahul Kamal |
| 382 Queen St | Charanjit Ghatrorhe |

## 4. Every one of the 33 — missing standard for-sale fields

Not property-specific — none of the 33 have `price`, `mls`, `beds`, `baths`,
`garage`, `lot`, `year_built`, or `description` in the source data (it's a
rental-management export, not an MLS feed). All 33 need these filled in on
the admin Properties page regardless of image/unit-count status above.

## 5. The 4 live rentals — missing rent, beds, baths, neighbourhood

Already live at `/rentals`, images done, but showing $0/mo and 0 bed/bath
until filled in:

| Unit | Sqft known? |
|---|---|
| 525 Sherbrook St, Unit A | no (property total is 2,000 / 2 units) |
| 61 Imperial Ave | yes — 1,040 (single unit) |
| 869 Hector Ave, Unit A | no (property total is 2,232 / 2 units) |
| 904 College Ave, Unit A | no (property total is 1,800 / 2 units) |

---

## Suggested order of attack

1. Confirm the 4 "not published in PMS" properties should actually go public
   — pull them from `portfolio-properties.seed.sql` if not.
2. Get photos for the remaining 6 (after step 1, effectively 3: 1221
   Lorette, 628 Garwood, 88 St Mary's).
3. Get real unit/sqft facts for the 3 zero-unit records.
4. Run `portfolio-properties.seed.sql`.
5. Fill in price/mls/beds/baths/garage/lot/year_built/description for all
   33 — this is the biggest remaining chunk of work, unavoidable since it's
   simply not in any source file.
6. Fill in rent/beds/baths/area for the 4 live rentals.
