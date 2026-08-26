-- Run this once in Supabase Dashboard > SQL Editor before deploying App.jsx.
-- Existing weeks are preserved and receive an empty Study Order value.

alter table public.plan_weeks
  add column if not exists study_order text not null default '';

comment on column public.plan_weeks.study_order is
  'Semicolon-separated, teacher-defined sequence of study items for the week.';
