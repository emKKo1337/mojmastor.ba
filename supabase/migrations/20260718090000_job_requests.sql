-- MojMajstor.ba — job requests (real backend for /novi-zahtjev and the
-- majstor/korisnik dashboard queues, which previously read mock data).
--
-- Run this once in the Supabase SQL Editor (or via `supabase db push`)
-- after 20260717120000_init_schema.sql. Safe to re-run.

do $$
begin
  if not exists (select 1 from pg_type where typname = 'job_request_status') then
    create type public.job_request_status as enum ('pending', 'accepted', 'completed', 'cancelled');
  end if;
end
$$;

create table if not exists public.job_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles (id) on delete cascade,
  craftsman_id uuid references public.profiles (id) on delete set null,
  title text not null,
  description text not null,
  category_slug text not null,
  city text not null,
  neighborhood text not null default '',
  budget_from numeric,
  budget_to numeric,
  preferred_date text not null default '',
  urgent boolean not null default false,
  status public.job_request_status not null default 'pending',
  declined_by uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.job_requests enable row level security;

-- ---------------------------------------------------------------------
-- SELECT: customers see their own requests; majstori see pending requests
-- in a category they offer, plus anything already assigned to them.
-- ---------------------------------------------------------------------

drop policy if exists "Customers can view their own job requests" on public.job_requests;
create policy "Customers can view their own job requests"
  on public.job_requests for select
  to authenticated
  using (auth.uid() = customer_id);

drop policy if exists "Craftsmen can view matching or assigned job requests" on public.job_requests;
create policy "Craftsmen can view matching or assigned job requests"
  on public.job_requests for select
  to authenticated
  using (
    auth.uid() = craftsman_id
    or (
      status = 'pending'
      and exists (
        select 1 from public.craftsman_profiles cp
        where cp.profile_id = auth.uid()
        and job_requests.category_slug = any(cp.category_slugs)
      )
    )
  );

-- ---------------------------------------------------------------------
-- INSERT: a korisnik posts a request as themselves.
-- ---------------------------------------------------------------------

drop policy if exists "Customers can create job requests" on public.job_requests;
create policy "Customers can create job requests"
  on public.job_requests for insert
  to authenticated
  with check (auth.uid() = customer_id);

-- ---------------------------------------------------------------------
-- UPDATE: the customer can cancel their own pending request; a matching
-- majstor can accept/decline a pending request or complete one they hold.
-- Which fields actually change is enforced by the Server Actions layer,
-- not by RLS — every write in this app goes through those actions.
-- ---------------------------------------------------------------------

drop policy if exists "Participants can update their job requests" on public.job_requests;
create policy "Participants can update their job requests"
  on public.job_requests for update
  to authenticated
  using (
    auth.uid() = customer_id
    or auth.uid() = craftsman_id
    or (
      status = 'pending'
      and exists (
        select 1 from public.craftsman_profiles cp
        where cp.profile_id = auth.uid()
        and job_requests.category_slug = any(cp.category_slugs)
      )
    )
  )
  with check (
    auth.uid() = customer_id
    or auth.uid() = craftsman_id
    or (
      exists (
        select 1 from public.craftsman_profiles cp
        where cp.profile_id = auth.uid()
        and job_requests.category_slug = any(cp.category_slugs)
      )
    )
  );

drop trigger if exists set_job_requests_updated_at on public.job_requests;
create trigger set_job_requests_updated_at
  before update on public.job_requests
  for each row execute function public.set_updated_at();

create index if not exists job_requests_customer_id_idx on public.job_requests (customer_id);
create index if not exists job_requests_craftsman_id_idx on public.job_requests (craftsman_id);
create index if not exists job_requests_status_category_idx on public.job_requests (status, category_slug);
