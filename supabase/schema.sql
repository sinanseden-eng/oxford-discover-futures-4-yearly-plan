-- Oxford Discover Futures 4 collaborative backend
-- Run this complete file once in Supabase Dashboard > SQL Editor.

create table if not exists public.approved_editors (
  email text primary key check (email = lower(trim(email))),
  added_at timestamptz not null default now()
);

create table if not exists public.plan_weeks (
  plan_id text not null,
  id text not null,
  week text not null,
  sort_order integer not null check (sort_order > 0),
  unit text not null default '',
  reading text not null default '',
  listening text not null default '',
  speaking text not null default '',
  writing text not null default '',
  grammar text not null default '',
  vocabulary text not null default '',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  primary key (plan_id, id)
);

create index if not exists plan_weeks_order_idx
  on public.plan_weeks (plan_id, sort_order);

alter table public.approved_editors enable row level security;
alter table public.plan_weeks enable row level security;

-- The email list remains private. This SECURITY DEFINER function performs the
-- check without exposing the list to visitors or signed-in teachers.
create or replace function public.is_current_user_approved()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.approved_editors
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_current_user_approved() from public;
grant execute on function public.is_current_user_approved() to authenticated;

revoke all on table public.approved_editors from anon, authenticated;
grant select on table public.plan_weeks to anon, authenticated;
grant insert, update, delete on table public.plan_weeks to authenticated;

drop policy if exists "Public can read the plan" on public.plan_weeks;
create policy "Public can read the plan"
  on public.plan_weeks
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Approved teachers can add weeks" on public.plan_weeks;
create policy "Approved teachers can add weeks"
  on public.plan_weeks
  for insert
  to authenticated
  with check (public.is_current_user_approved());

drop policy if exists "Approved teachers can update weeks" on public.plan_weeks;
create policy "Approved teachers can update weeks"
  on public.plan_weeks
  for update
  to authenticated
  using (public.is_current_user_approved())
  with check (public.is_current_user_approved());

drop policy if exists "Approved teachers can delete weeks" on public.plan_weeks;
create policy "Approved teachers can delete weeks"
  on public.plan_weeks
  for delete
  to authenticated
  using (public.is_current_user_approved());

create or replace function public.touch_plan_week_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  return new;
end;
$$;

drop trigger if exists touch_plan_week_updated_at on public.plan_weeks;
create trigger touch_plan_week_updated_at
before insert or update on public.plan_weeks
for each row execute function public.touch_plan_week_updated_at();

-- Add the table to Realtime once. This block is safe to run more than once.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'plan_weeks'
  ) then
    alter publication supabase_realtime add table public.plan_weeks;
  end if;
end
$$;

-- After running this file, add each recognized teacher in SQL Editor:
-- insert into public.approved_editors (email)
-- values ('teacher@example.com')
-- on conflict (email) do nothing;
