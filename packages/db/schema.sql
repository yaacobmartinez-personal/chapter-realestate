-- Chapter Real Estate — shared content schema
-- Run this in the Supabase SQL editor (or via the CLI) once per project.

-- ─── Properties ──────────────────────────────────────────────────────────────
create table if not exists public.properties (
  id          text primary key,
  slug        text not null unique,
  image       text not null default '',
  images      text[] not null default '{}',
  price       text not null default '',
  address     text not null default '',
  area        text not null default '',
  city        text not null default '',
  province    text not null default '',
  beds        integer not null default 0,
  baths       integer not null default 0,
  sqft        text not null default '',
  garage      integer not null default 0,
  lot         text not null default '',
  year_built  integer not null default 0,
  mls         text not null default '',
  tag         text not null default '',
  type        text not null default 'Residential',
  status      text not null default 'For Sale',
  description text not null default '',
  features    text[] not null default '{}',
  coordinates jsonb not null default '{"lng":0,"lat":0}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── Blog posts (Resources) ──────────────────────────────────────────────────
create table if not exists public.blog_posts (
  slug       text primary key,
  tag        text not null default '',
  date       text not null default '',
  title      text not null default '',
  excerpt    text not null default '',
  read_time  text not null default '',
  image      text not null default '',
  body       jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Agents ──────────────────────────────────────────────────────────────────
create table if not exists public.agents (
  id          text primary key,
  name        text not null default '',
  specialties text not null default '',
  phone       text not null default '',
  email       text not null default '',
  image       text not null default '',
  listings    integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── Rentals (available units) ───────────────────────────────────────────────
create table if not exists public.rentals (
  id          text primary key,
  image       text not null default '',
  images      text[] not null default '{}',
  rent        text not null default '',
  address     text not null default '',
  area        text not null default '',
  beds        integer not null default 0,
  baths       integer not null default 0,
  sqft        text not null default '',
  category    text not null default 'Residential',
  status      text not null default 'Available',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── Form submissions ────────────────────────────────────────────────────────
create table if not exists public.form_submissions (
  id         uuid primary key default gen_random_uuid(),
  form_type  text not null,
  fields     jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- ─── updated_at trigger ──────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists properties_set_updated_at on public.properties;
create trigger properties_set_updated_at before update on public.properties
  for each row execute function public.set_updated_at();

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at before update on public.blog_posts
  for each row execute function public.set_updated_at();

drop trigger if exists agents_set_updated_at on public.agents;
create trigger agents_set_updated_at before update on public.agents
  for each row execute function public.set_updated_at();

drop trigger if exists rentals_set_updated_at on public.rentals;
create trigger rentals_set_updated_at before update on public.rentals
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────────────
alter table public.properties enable row level security;
alter table public.blog_posts enable row level security;
alter table public.agents enable row level security;
alter table public.rentals enable row level security;
-- Form submissions: RLS on with NO public policies — only the service-role key
-- (used server-side by the web app) can read or write. Never expose publicly.
alter table public.form_submissions enable row level security;

-- Public site: anyone may read.
drop policy if exists "public read properties" on public.properties;
create policy "public read properties" on public.properties
  for select using (true);

drop policy if exists "public read blog_posts" on public.blog_posts;
create policy "public read blog_posts" on public.blog_posts
  for select using (true);

drop policy if exists "public read agents" on public.agents;
create policy "public read agents" on public.agents
  for select using (true);

drop policy if exists "public read rentals" on public.rentals;
create policy "public read rentals" on public.rentals
  for select using (true);

-- Authenticated admins: full write access.
drop policy if exists "auth write properties" on public.properties;
create policy "auth write properties" on public.properties
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "auth write blog_posts" on public.blog_posts;
create policy "auth write blog_posts" on public.blog_posts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "auth write agents" on public.agents;
create policy "auth write agents" on public.agents
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "auth write rentals" on public.rentals;
create policy "auth write rentals" on public.rentals
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
