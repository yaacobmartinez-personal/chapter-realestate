-- Chapter — user profiles, roles, and approval gating.
-- Run AFTER schema.sql, in the Supabase SQL editor.

create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  full_name  text not null default '',
  role       text not null default 'tenant'  check (role in ('admin', 'tenant', 'owner')),
  status     text not null default 'pending' check (status in ('pending', 'approved', 'suspended')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Each signed-in user may read their own profile (needed for the login gate).
-- All privileged management happens via the service-role key, which bypasses RLS.
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);

-- Auto-create a pending profile whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── Bootstrap your first admin ──────────────────────────────────────────────
-- Create a user in Authentication → Users, then run (with your email):
--
--   update public.profiles set role = 'admin', status = 'approved'
--   where email = 'you@example.com';
--
-- Without this, nobody can log into the CMS (chicken-and-egg).
