# Hosting Chapter Real Estate on Cloudflare

The web app (`apps/web`) is a Next.js 16 App Router site set up to run on **Cloudflare Workers** via
the **OpenNext** adapter. This guide takes you from zero to a live site on `chapterrealestate.ca`.

**Deployment method: Git-connected (Cloudflare Workers Builds).** This is our default — Cloudflare
builds and deploys automatically on every push to the default branch. See
**"Deploy (default) — Git-connected"** below. A CLI method is documented afterwards as an alternative
for one-off/manual deploys.

---

## 1. Prerequisites

- A **Cloudflare account** (with the `chapterrealestate.ca` domain added, or ready to add).
- **Node.js 20+** and this repo cloned, with dependencies installed:
  ```bash
  npm install
  ```
  > **Windows note:** our default deploy is **Git-connected** (Cloudflare builds on Linux), so this
  > doesn't affect deploys. It only matters if you build locally (`npm run preview` or the CLI deploy):
  > those create symlinks, which Windows blocks unless **Developer Mode** is on (Settings → Privacy &
  > security → For developers → Developer Mode) or the terminal runs **as Administrator**.
- A **Supabase project** (URL, anon key, service-role key).
- Your **Mapbox token** (used by the map components).

The Cloudflare config already lives in the repo — you don't need to create it:
- `apps/web/wrangler.jsonc` — Worker name (`chapter-web`), Node compatibility, static-assets binding.
- `apps/web/open-next.config.ts` — the OpenNext adapter config.
- `apps/web/package.json` — the `preview` / `deploy` / `cf-typegen` scripts.

---

## 2. Set up the database (one time)

The contact / property-enquiry / recruitment / landlord forms save every submission to Supabase.
Create the table by running the schema in the Supabase **SQL Editor**:

- Open Supabase → **SQL Editor** → paste the contents of `packages/db/schema.sql` → **Run**.

This creates (and is safe to re-run for) the `properties`, `blog_posts`, and **`form_submissions`**
tables with the right security policies.

> If a form errors with **"Could not find the table 'public.form_submissions' in the schema cache"**,
> the table hasn't been created yet (or PostgREST hasn't picked it up). Run the schema above, then
> run `notify pgrst, 'reload schema';` in the SQL Editor to refresh the API cache immediately. Make
> sure you run it against the **same** Supabase project as your `NEXT_PUBLIC_SUPABASE_URL`.

---

## 3. Environment variables

The app uses these variables:

| Variable | Used for | Where it's needed | Required? |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase connection | Build **and** runtime | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public (read-only) Supabase access | Build **and** runtime | Yes |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Contact-page office map | Build **and** runtime | Yes |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Property-page map — upgrades it from the keyless embed to the official Maps Embed API | Build **and** runtime | No |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret.** Saving form submissions | Runtime only | Yes |
| `RESEND_API_KEY` | **Secret.** Emailing form submissions (Resend) | Runtime only | Optional |
| `RESEND_TO` | Inbox that receives lead emails | Runtime only | Optional |
| `RESEND_FROM` | Sender, e.g. `Chapter Real Estate <notifications@chapterrealestate.ca>` | Runtime only | Optional |

> **Important:** anything starting with `NEXT_PUBLIC_` is baked in **when the site is built**, so it
> must be present in the build environment. Secrets (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`)
> are **runtime only** — never prefix them with `NEXT_PUBLIC_` and never commit them. If
> `SUPABASE_SERVICE_ROLE_KEY` is missing, forms will return an error.

### Enabling email notifications (Resend)

Form submissions are **always** saved to the database. Email is an optional, best-effort notification
**on top** of that — if it isn't configured (or a send fails), the submission still saves and the
visitor still sees success.

**What gets sent:** all four forms — Contact, Landlord enquiry, Property inquiry, and Agent
application — send a branded HTML email (with a plain-text version) to `RESEND_TO`, listing every
field. The **Reply-To** is set to the visitor's email when provided, so you can reply straight to the
lead. Subject line: `New {Type} — Chapter Real Estate`.

**To turn it on:**

1. Create a **Resend** account and **add + verify your sending domain** (`chapterrealestate.ca`) —
   this is required for `RESEND_FROM` to deliver from an `@chapterrealestate.ca` address.
2. Create an API key → set it as the `RESEND_API_KEY` secret on the Worker.
3. Set `RESEND_TO` (the inbox that should receive leads) and `RESEND_FROM` (a **verified** sender,
   e.g. `Chapter Real Estate <notifications@chapterrealestate.ca>`).

> **Verified domain required.** If `RESEND_FROM` uses a domain you haven't verified in Resend, the
> send will fail (and be logged) — the lead is still saved. For a quick test before verifying your
> domain, send from `onboarding@resend.dev` (Resend's shared test sender), which is also the built-in
> default when `RESEND_FROM` is unset.

**For local Cloudflare preview**, put the email secrets in `apps/web/.dev.vars` alongside the Supabase
secret (see below); for `npm run dev` they can live in `apps/web/.env.local`.

**Local file (already used for `npm run dev`):** `apps/web/.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_MAPBOX_TOKEN=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...            # optional
RESEND_TO=leads@chapterrealestate.ca
RESEND_FROM=Chapter Real Estate <notifications@chapterrealestate.ca>
```
> A `apps/web/.env.prod` reference file (same keys, production values) is also in the repo and
> git-ignored — copy its values into the Worker when deploying.

**For local Cloudflare preview** (`npm run preview`), also create `apps/web/.dev.vars` (git-ignored)
with the runtime secrets:
```
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
RESEND_TO=...
RESEND_FROM=...
```

---

## 4. Preview locally on the Cloudflare runtime (optional but recommended)

This builds the site and runs it in the real Workers runtime on your machine:

```bash
npm run preview -w web
```

Open the printed URL and click through the site, submit a form, and confirm listings load. This is
the closest thing to production before you deploy.

---

## Deploy (default) — Git-connected (Cloudflare builds on every push)

This is our standard method: connect the repo once, and every push to the default branch builds and
deploys automatically. Cloudflare builds on Linux, so the Windows symlink caveat doesn't apply.

1. In the Cloudflare dashboard: **Workers & Pages → Create → Workers → Connect to Git**, and select
   this repository.
2. **Build settings:**
   - Root directory: `apps/web`
   - Build command: `npx opennextjs-cloudflare build`
   - Deploy command: `npx opennextjs-cloudflare deploy`
   *(Or use the "Next.js (OpenNext)" preset if offered, then set the root directory to `apps/web`.)*
3. **Environment variables** (dashboard → the project → Settings → Variables & Secrets):
   - Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_MAPBOX_TOKEN` as
     **plaintext build variables** (they're baked in at build time).
   - Add `SUPABASE_SERVICE_ROLE_KEY` (and `RESEND_API_KEY` if using email) as **encrypted secrets**.
   - Add `RESEND_TO` and `RESEND_FROM` as plaintext variables if using email.
4. Push to your default branch — Cloudflare builds and deploys automatically. Watch the build log in
   the dashboard; when it's green, your `*.workers.dev` URL is live.

To ship changes after that, just **push to the default branch** — no manual step.

---

## Deploy (alternative) — from your machine (CLI)

For a one-off or manual deploy without pushing. On Windows this needs Developer Mode (see
Prerequisites) because it builds locally.

1. **Log in to Cloudflare** (one time):
   ```bash
   npx wrangler login
   ```

2. **Add the secrets to the Worker** (one time). From `apps/web`:
   ```bash
   cd apps/web
   npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
   npx wrangler secret put RESEND_API_KEY          # optional (email)
   # paste each value when prompted
   ```

3. **Add the remaining variables to the Worker.** In the Cloudflare dashboard
   (**Workers & Pages → chapter-web → Settings → Variables**) add the public vars
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_MAPBOX_TOKEN`) and, if
   using email, `RESEND_TO` and `RESEND_FROM`. Because the `NEXT_PUBLIC_*` ones are also needed at
   **build** time, make sure they're in your shell or `apps/web/.env.local` when you run the deploy
   command below.

4. **Deploy** (from the repo root):
   ```bash
   npm run deploy -w web
   ```
   This builds the site and uploads it to Cloudflare. When it finishes it prints the live
   `*.workers.dev` URL.

---

## 5. Point the domain at the site

In the Cloudflare dashboard → **Workers & Pages → chapter-web → Settings → Domains & Routes** →
**Add custom domain** → enter `chapterrealestate.ca` (and `www` if desired). Cloudflare handles the
DNS and SSL automatically once the domain is on your account.

---

## 6. Go-live checklist

- [ ] `packages/db/schema.sql` run in Supabase (the `form_submissions` table exists).
- [ ] `SUPABASE_SERVICE_ROLE_KEY` added as a **secret** (CLI or dashboard).
- [ ] `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_MAPBOX_TOKEN` set as
      build variables.
- [ ] Repo connected to Cloudflare (Git-connected) and a push builds & deploys; `*.workers.dev` loads.
- [ ] **Submitted a test form** and confirmed the row appears in Supabase → `form_submissions`.
- [ ] *(If using email)* Resend domain verified, `RESEND_API_KEY`/`RESEND_TO`/`RESEND_FROM` set, and a
      test submission arrived in the `RESEND_TO` inbox.
- [ ] Custom domain `chapterrealestate.ca` added and resolving.
- [ ] Submit the sitemap (`https://chapterrealestate.ca/sitemap.xml`) in Google Search Console.

---

## Optional — durable listings cache (ISR)

Pages like listings revalidate every 60 seconds. To make that cache persist across the whole fleet
(not just per-instance), enable an R2-backed cache:

1. Create an R2 bucket (e.g. `chapter-web-cache`).
2. Uncomment the `r2_buckets` binding in `apps/web/wrangler.jsonc`.
3. Switch `apps/web/open-next.config.ts` to the R2 incremental cache (instructions are in that file).

This is optional — the site works without it.

---

## Troubleshooting

- **Forms return an error / "Submission failed."** `SUPABASE_SERVICE_ROLE_KEY` isn't set on the
  Worker (or is wrong). Add it as a secret and redeploy.
- **Listings or map don't load.** A `NEXT_PUBLIC_*` variable was missing at **build** time. Set it as
  a build variable and rebuild/redeploy (these are baked in at build, not read live).
- **Build fails on Cloudflare.** Confirm the root directory is `apps/web` and the build command is
  `npx opennextjs-cloudflare build`.
- **`EPERM: symlink` when running `preview`/`deploy` on Windows.** Windows blocks symlink creation
  without permission. Turn on **Developer Mode** (or run the terminal as Administrator), or deploy via
  **Option B (Git-connected)** which builds on Linux. This does not affect the deployed site.
- **No lead emails arriving.** Email is optional and best-effort — check that `RESEND_API_KEY` and
  `RESEND_TO` are set, that `RESEND_FROM` uses a **verified** domain, and look for
  `[submitForm] resend error` in the Worker logs. Submissions still save to the database regardless.
- **Images not optimizing.** Expected — Cloudflare has no Vercel image optimizer, so images are
  served as-is (`images.unoptimized`). To add on-the-fly resizing later, enable Cloudflare Images and
  add a custom loader (a stub note is in `apps/web/next.config.ts`).
