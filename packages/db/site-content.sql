-- ─────────────────────────────────────────────────────────────────────────────
-- Chapter Real Estate — Site Content tables
-- Leadership, Testimonials, Company Values, Chapter's Process, Social Links.
--
-- Run this once in the Supabase SQL editor to add the site-content tables to an
-- existing project. (These are also included in the canonical schema.sql.)
-- Idempotent: safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

-- Shared updated_at trigger function (also defined in schema.sql).
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- ─── Tables ───────────────────────────────────────────────────────────────────
create table if not exists public.team_members (
  id          text primary key,
  name        text not null default '',
  role        text not null default '',
  bio         text not null default '',
  image       text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.testimonials (
  id          text primary key,
  quote       text not null default '',
  author      text not null default '',
  context     text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.company_values (
  id          text primary key,
  icon_key    text not null default '',
  title       text not null default '',
  description text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.process_steps (
  id          text primary key,
  step        text not null default '',
  title       text not null default '',
  description text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.social_links (
  id          text primary key,
  name        text not null default '',
  href        text not null default '',
  enabled     boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── Triggers + RLS + policies (public read, authenticated write) ─────────────
do $$
declare t text;
begin
  foreach t in array array['team_members','testimonials','company_values','process_steps','social_links'] loop
    execute format('drop trigger if exists %I_set_updated_at on public.%I;', t, t);
    execute format('create trigger %I_set_updated_at before update on public.%I for each row execute function public.set_updated_at();', t, t);

    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "public read %s" on public.%I;', t, t);
    execute format('create policy "public read %s" on public.%I for select using (true);', t, t);

    execute format('drop policy if exists "auth write %s" on public.%I;', t, t);
    execute format($f$create policy "auth write %s" on public.%I for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');$f$, t, t);
  end loop;
end $$;
