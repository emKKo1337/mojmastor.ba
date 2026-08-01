-- MojMajstor.ba — allow anonymous visitors to see majstor profiles.
--
-- The original "Profiles are viewable by owner or if majstor" policy was
-- scoped `to authenticated`, so it silently returned zero rows for signed-
-- out visitors — fine while the public marketplace pages only read mock
-- data, but now that /pretraga, /kategorije/[slug], and /majstor/[id] read
-- real craftsman_profiles + profiles, most marketplace traffic (anonymous)
-- needs to be able to read a majstor's name/phone/avatar. Korisnik profiles
-- stay fully private either way, since the `role = 'majstor'` branch only
-- ever exposes majstor rows.
--
-- Run this once in the Supabase SQL Editor (or via `supabase db push`)
-- after 20260718100000_messaging.sql. Safe to re-run.

drop policy if exists "Profiles are viewable by owner or if majstor" on public.profiles;
create policy "Profiles are viewable by owner, or publicly if majstor"
  on public.profiles for select
  using (auth.uid() = id or role = 'majstor');
