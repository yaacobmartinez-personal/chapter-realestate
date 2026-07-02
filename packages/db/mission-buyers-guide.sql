-- ─────────────────────────────────────────────────────────────────────────────
-- Chapter Real Estate — Mission/Vision + Buyer's Guide tables
--
-- Run once in the Supabase SQL editor. (Also included in the canonical schema.sql.)
-- Idempotent: safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- ─── Tables ───────────────────────────────────────────────────────────────────
create table if not exists public.mission_vision (
  id          text primary key,
  label       text not null default '',
  heading     text not null default '',
  body        text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.buyer_guide_steps (
  id          text primary key,
  step        text not null default '',
  title       text not null default '',
  short_desc  text not null default '',
  paragraphs  text[] not null default '{}',
  image       text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- If the table already exists from an earlier run, add the new column.
alter table public.buyer_guide_steps add column if not exists short_desc text not null default '';

-- ─── Triggers + RLS + policies (public read, authenticated write) ─────────────
do $$
declare t text;
begin
  foreach t in array array['mission_vision','buyer_guide_steps'] loop
    execute format('drop trigger if exists %I_set_updated_at on public.%I;', t, t);
    execute format('create trigger %I_set_updated_at before update on public.%I for each row execute function public.set_updated_at();', t, t);

    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "public read %s" on public.%I;', t, t);
    execute format('create policy "public read %s" on public.%I for select using (true);', t, t);

    execute format('drop policy if exists "auth write %s" on public.%I;', t, t);
    execute format($f$create policy "auth write %s" on public.%I for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');$f$, t, t);
  end loop;
end $$;
