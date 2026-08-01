-- MojMajstor.ba — majstor verification for admins.
--
-- There's no "admin" account role — instead, a small allowlist table holds
-- admin emails, checked from inside a SECURITY DEFINER function so the
-- mutation is authorized at the database level regardless of what the app
-- server sends. `admin_emails` has no RLS policies at all, so it's only
-- reachable via the SQL Editor / service role, never the client API.
--
-- To grant yourself admin access, run in the SQL Editor:
--   insert into public.admin_emails (email) values ('you@example.com');
-- and set ADMIN_EMAILS=you@example.com in .env.local (controls whether the
-- app shows the /admin/verifikacija page at all — the function below is
-- what actually enforces the permission).
--
-- Run this once in the Supabase SQL Editor (or via `supabase db push`)
-- after 20260718110000_public_majstor_profiles.sql. Safe to re-run.

create table if not exists public.admin_emails (
  email text primary key
);

alter table public.admin_emails enable row level security;

create or replace function public.set_craftsman_verified(target_profile_id uuid, verified_value boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.admin_emails
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  ) then
    raise exception 'Not authorized';
  end if;

  update public.craftsman_profiles set verified = verified_value where profile_id = target_profile_id;
end;
$$;
