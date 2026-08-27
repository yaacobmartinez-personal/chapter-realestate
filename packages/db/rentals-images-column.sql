-- Schema drift fix: public.rentals is missing the `images` column.
--
-- `schema.sql` has declared `images text[] not null default '{}'` on rentals
-- since it was written, but the live table was created from an earlier version
-- and `create table if not exists` means re-running schema.sql will never add
-- it. Every other table matches.
--
-- This is not cosmetic: `rentalToRow()` in packages/db/src/rentals.ts always
-- sends `images`, so **saving any rental from the admin CMS fails today** with
--   PGRST204  Could not find the 'images' column of 'rentals' in the schema cache
--
-- Run this once in the Supabase SQL editor. Safe and idempotent.

alter table public.rentals
  add column if not exists images text[] not null default '{}';

-- PostgREST caches the schema; nudge it so the new column is visible immediately
-- instead of waiting for the next automatic reload.
notify pgrst, 'reload schema';

-- Backfill: any row that has a cover image but an empty gallery gets the cover
-- as its single gallery entry, matching what the CMS uploader would have stored.
update public.rentals
   set images = array[image]
 where image <> '' and cardinality(images) = 0;
