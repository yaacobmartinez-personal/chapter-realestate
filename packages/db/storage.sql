-- Image storage bucket (Supabase Storage).
-- Run once in the Supabase SQL editor, or via the dashboard (Storage → New bucket).
--
-- One public bucket for every uploaded image, namespaced by key prefix:
--   images/properties/<uuid>.webp
--   images/rentals/<uuid>.webp
--   images/agents/… resources/… leadership/… buyer-guide/…
--
-- The admin upload route (apps/admin/app/api/upload/route.ts) re-encodes every
-- upload to WebP before it lands here, so `image/webp` is what actually gets
-- written; the other MIME types are allowed only as a safety net.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'images',
  'images',
  true,
  10485760, -- 10 MB, matches MAX_BYTES in the upload route
  array['image/webp', 'image/jpeg', 'image/png', 'image/avif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- No policies on storage.objects are needed:
--   * Reads  — a public bucket is served from /storage/v1/object/public/... ,
--              which does not go through RLS.
--   * Writes — only the admin upload route writes, using the service-role key
--              (which bypasses RLS). RLS stays on with no INSERT/UPDATE/DELETE
--              policy, so anon and authenticated clients cannot write at all.
--
-- If browser-side uploads are ever added, add a scoped INSERT policy here
-- rather than loosening the bucket.
