-- MojMajstor.ba — initial authentication + profile schema
--
-- Run this once in the Supabase SQL Editor (or via `supabase db push` if
-- you use the CLI) against a fresh project. It is safe to re-run: every
-- statement either uses IF NOT EXISTS / ON CONFLICT DO NOTHING, or is
-- idempotent by nature.

-- ---------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------

do $$
begin
  if not exists (select 1 from pg_type where typname = 'account_role') then
    create type public.account_role as enum ('korisnik', 'majstor');
  end if;
end
$$;

-- ---------------------------------------------------------------------
-- profiles: one row per auth.users row, holds data shared by both roles
-- ---------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.account_role not null default 'korisnik',
  first_name text not null,
  last_name text not null,
  phone text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by owner or if majstor" on public.profiles;
create policy "Profiles are viewable by owner or if majstor"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id or role = 'majstor');

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No INSERT/DELETE policies: rows are created by the handle_new_user
-- trigger below (SECURITY DEFINER, bypasses RLS) and deleted via the
-- auth.users cascade. Direct client inserts/deletes are denied by default.

-- ---------------------------------------------------------------------
-- craftsman_profiles: 1:1 extension of profiles for role = 'majstor'
-- ---------------------------------------------------------------------

create table if not exists public.craftsman_profiles (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  headline text not null default '',
  bio text not null default '',
  hourly_rate_from numeric,
  years_experience integer not null default 0,
  working_cities text[] not null default '{}',
  category_slugs text[] not null default '{}',
  verified boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.craftsman_profiles enable row level security;

drop policy if exists "Craftsman profiles are publicly viewable" on public.craftsman_profiles;
create policy "Craftsman profiles are publicly viewable"
  on public.craftsman_profiles for select
  using (true);

drop policy if exists "Craftsmen can update their own craftsman profile" on public.craftsman_profiles;
create policy "Craftsmen can update their own craftsman profile"
  on public.craftsman_profiles for update
  to authenticated
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

-- ---------------------------------------------------------------------
-- craftsman_gallery: work-in-progress photos uploaded by a majstor
-- ---------------------------------------------------------------------

create table if not exists public.craftsman_gallery (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.craftsman_profiles (profile_id) on delete cascade,
  storage_path text not null,
  caption text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.craftsman_gallery enable row level security;

drop policy if exists "Gallery images are publicly viewable" on public.craftsman_gallery;
create policy "Gallery images are publicly viewable"
  on public.craftsman_gallery for select
  using (true);

drop policy if exists "Craftsmen can add their own gallery images" on public.craftsman_gallery;
create policy "Craftsmen can add their own gallery images"
  on public.craftsman_gallery for insert
  to authenticated
  with check (auth.uid() = profile_id);

drop policy if exists "Craftsmen can update their own gallery images" on public.craftsman_gallery;
create policy "Craftsmen can update their own gallery images"
  on public.craftsman_gallery for update
  to authenticated
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

drop policy if exists "Craftsmen can delete their own gallery images" on public.craftsman_gallery;
create policy "Craftsmen can delete their own gallery images"
  on public.craftsman_gallery for delete
  to authenticated
  using (auth.uid() = profile_id);

-- ---------------------------------------------------------------------
-- favourites: a korisnik's saved craftsmen. craftsman_ref is a plain
-- string rather than a foreign key so it can reference either today's
-- static demo craftsman IDs (e.g. "haris-mujkic") or a real profile_id
-- once the public directory reads from craftsman_profiles.
-- ---------------------------------------------------------------------

create table if not exists public.favourites (
  user_id uuid not null references public.profiles (id) on delete cascade,
  craftsman_ref text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, craftsman_ref)
);

alter table public.favourites enable row level security;

drop policy if exists "Users can view their own favourites" on public.favourites;
create policy "Users can view their own favourites"
  on public.favourites for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can add their own favourites" on public.favourites;
create policy "Users can add their own favourites"
  on public.favourites for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can remove their own favourites" on public.favourites;
create policy "Users can remove their own favourites"
  on public.favourites for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- Auto-provision profiles (and craftsman_profiles, for majstori) when a
-- new auth.users row is created. Registration passes role/first_name/
-- last_name/phone via supabase.auth.signUp({ options: { data } }), which
-- lands in raw_user_meta_data.
-- ---------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  chosen_role public.account_role;
begin
  chosen_role := coalesce(
    (new.raw_user_meta_data ->> 'role')::public.account_role,
    'korisnik'
  );

  insert into public.profiles (id, role, first_name, last_name, phone)
  values (
    new.id,
    chosen_role,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  );

  if chosen_role = 'majstor' then
    insert into public.craftsman_profiles (profile_id) values (new.id);
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- Guardrails: role is fixed at registration; updated_at auto-refreshes.
-- ---------------------------------------------------------------------

create or replace function public.prevent_role_change()
returns trigger
language plpgsql
as $$
begin
  if new.role <> old.role then
    raise exception 'Role cannot be changed after registration';
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_profiles_role_change on public.profiles;
create trigger prevent_profiles_role_change
  before update on public.profiles
  for each row execute function public.prevent_role_change();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_craftsman_profiles_updated_at on public.craftsman_profiles;
create trigger set_craftsman_profiles_updated_at
  before update on public.craftsman_profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Storage: public bucket for gallery photos, one folder per craftsman
-- (path convention: {profile_id}/{filename}).
-- ---------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('craftsman-gallery', 'craftsman-gallery', true)
on conflict (id) do nothing;

drop policy if exists "Craftsman gallery images are publicly readable" on storage.objects;
create policy "Craftsman gallery images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'craftsman-gallery');

drop policy if exists "Craftsmen can upload to their own gallery folder" on storage.objects;
create policy "Craftsmen can upload to their own gallery folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'craftsman-gallery'
    and (storage.foldername(name)) [1] = auth.uid()::text
  );

drop policy if exists "Craftsmen can delete their own gallery images" on storage.objects;
create policy "Craftsmen can delete their own gallery images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'craftsman-gallery'
    and (storage.foldername(name)) [1] = auth.uid()::text
  );
