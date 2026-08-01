-- MojMajstor.ba — real messaging backend for /poruke, replacing the mock
-- conversations.ts. A conversation is created automatically when a majstor
-- accepts a job request (see acceptJobRequestAction), one thread per
-- customer/majstor pair.
--
-- Run this once in the Supabase SQL Editor (or via `supabase db push`)
-- after 20260718090000_job_requests.sql. Safe to re-run.

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles (id) on delete cascade,
  craftsman_id uuid not null references public.profiles (id) on delete cascade,
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (customer_id, craftsman_id)
);

alter table public.conversations enable row level security;

drop policy if exists "Participants can view their conversations" on public.conversations;
create policy "Participants can view their conversations"
  on public.conversations for select
  to authenticated
  using (auth.uid() = customer_id or auth.uid() = craftsman_id);

drop policy if exists "Participants can start a conversation" on public.conversations;
create policy "Participants can start a conversation"
  on public.conversations for insert
  to authenticated
  with check (auth.uid() = customer_id or auth.uid() = craftsman_id);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

drop policy if exists "Participants can view messages in their conversations" on public.messages;
create policy "Participants can view messages in their conversations"
  on public.messages for select
  to authenticated
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
      and (auth.uid() = c.customer_id or auth.uid() = c.craftsman_id)
    )
  );

drop policy if exists "Participants can send messages in their conversations" on public.messages;
create policy "Participants can send messages in their conversations"
  on public.messages for insert
  to authenticated
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
      and (auth.uid() = c.customer_id or auth.uid() = c.craftsman_id)
    )
  );

-- Keep conversations.last_message_at current so the inbox can sort by recency.
create or replace function public.touch_conversation_last_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.conversations set last_message_at = new.created_at where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists touch_conversation_on_message on public.messages;
create trigger touch_conversation_on_message
  after insert on public.messages
  for each row execute function public.touch_conversation_last_message();

create index if not exists messages_conversation_id_idx on public.messages (conversation_id, created_at);
