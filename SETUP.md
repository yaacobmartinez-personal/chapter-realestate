# Chapter Real Estate — Monorepo & CMS Setup

This repo is an **npm-workspaces monorepo**:

```
apps/
  web/        → chapterrealestate.ca        (public site)
  admin/      → admin.chapterrealestate.ca  (CMS, login required)
packages/
  db/         → @chapter/db: shared Supabase client, types, repositories, seed
```

The public site reads content from **Supabase**; the admin app writes to it.
Images are stored in **Cloudflare R2**. Both apps deploy as **separate Vercel
projects** from this one repo.

---

## 1. Install

```bash
npm install        # run once at the repo root — links all workspaces
```

Run either app locally:

```bash
npm run dev:web    # http://localhost:3000
npm run dev:admin  # http://localhost:3001
```

---

## 2. Supabase (database + auth)

1. Create a project at https://supabase.com.
2. In **SQL Editor**, paste and run [`packages/db/schema.sql`](packages/db/schema.sql).
   This creates the `properties` and `blog_posts` tables, an `updated_at`
   trigger, and RLS policies (public read, authenticated write).
3. From **Project Settings → API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY` (admin + seed only)
4. Run [`packages/db/profiles.sql`](packages/db/profiles.sql) in the SQL Editor.
   This adds the `profiles` table (role + approval status) and a trigger that
   creates a **pending** profile for every new sign-up.
5. Create your first admin: **Authentication → Users → Add user** (email +
   password), then bootstrap it in the SQL Editor:
   ```sql
   update public.profiles set role = 'admin', status = 'approved'
   where email = 'you@example.com';
   ```
   Without this nobody can log into the CMS (chicken-and-egg). After that, manage
   everyone else from the CMS **Users** page.

### User roles & approval

- CMS login is gated to **`role = admin` and `status = approved`**. Tenants,
  owners, and pending/suspended accounts are signed out with a message.
- New sign-ups land as `pending` and cannot log in until an admin approves them
  on the Users page.
- The Users page (service-role, admin-only) creates users, changes roles,
  approves/suspends, resets passwords, and deletes accounts. You can't lock
  yourself out (no self-demote/suspend/delete).

### Seed the database from the existing JSON content

```bash
cp packages/db/.env.example packages/db/.env   # fill in URL + service role key
npm run db:seed
```

This upserts the current `apps/web/lib/content/properties.json` and the blog
posts from `resources.json` into Supabase.

---

## 3. Cloudflare R2 (image storage)

1. Cloudflare dashboard → **R2** → create a bucket (e.g. `chapter-media`).
2. **R2 → Manage API Tokens** → create a token with Object Read & Write.
   Copy the Access Key ID and Secret Access Key.
3. Find your **Account ID** (R2 overview page).
4. Give the bucket a public URL with CDN: either enable the bucket's public
   `r2.dev` domain, or (recommended) connect a **custom domain**
   like `media.chapterrealestate.ca` under the bucket's Settings → Public access.
   Use that as `R2_PUBLIC_BASE_URL`.

> Swapping providers later (Bunny, S3, etc.) is a single-file change —
> implement `StorageProvider` in `apps/admin/lib/storage/` and point `storage` at it.

---

## 4. Local env files

```bash
cp apps/web/.env.example   apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

Fill in the values from steps 2 and 3.

---

## 5. Deploy to Vercel (two projects, one repo)

Create **two** Vercel projects pointing at this same Git repo:

| Project | Root Directory | Domain | Env vars |
|---|---|---|---|
| `chapter-web` | `apps/web` | `chapterrealestate.ca`, `www` | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `chapter-admin` | `apps/admin` | `admin.chapterrealestate.ca` | all Supabase keys + all R2 keys |

For each project: **Settings → Build & Development → Root Directory** = the path
above. Vercel auto-detects Next.js and installs workspace deps from the repo root.

### DNS for the subdomain

In your DNS provider, add the records Vercel shows when you add each domain
(typically an `A`/`CNAME` for the apex and a `CNAME` for `admin` →
`cname.vercel-dns.com`). Once `admin.chapterrealestate.ca` is verified on the
`chapter-admin` project, it resolves straight to the admin app.

---

## 6. How it fits together

- **Admin** edits a property/article → writes to Supabase (RLS allows the
  authenticated admin user).
- **Public site** reads from Supabase with `revalidate = 60`, so changes appear
  within a minute (or trigger an on-demand revalidation later if you want it instant).
- If Supabase is unreachable or env vars are missing, the public site falls back
  to the bundled JSON snapshot, so it never hard-fails.

## Notes / follow-ups

- The old inline editor (`apps/web/app/api/content/*`, `lib/editor`,
  `EditorProvider`/`EditorPanel`, `?edit=` flow) is now superseded by the admin
  app and its `fs.writeFile` approach does not work on Vercel. Safe to remove
  once the CMS is in use.
- Guides, FAQs, investment opportunities, and per-page marketing copy are still
  served from static JSON — move them into `@chapter/db` later if they need CMS
  management too.
