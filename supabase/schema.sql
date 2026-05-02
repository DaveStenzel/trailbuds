-- ================================================================
--  Trailbuds — Supabase Database Schema
--  Run this in your Supabase SQL Editor to set up the database.
-- ================================================================

-- Profiles (extends Supabase auth.users)
create table if not exists public.profiles (
  id              uuid references auth.users on delete cascade primary key,
  full_name       text,
  profile_photo   text,
  bio             text,
  location        text,           -- Australian state (NSW, VIC, ...)
  activity_types  text[],         -- e.g. ['hiking', 'mtb']
  fitness_level   text,           -- beginner | intermediate | advanced
  created_at      timestamptz default now()
);

-- Activities
create table if not exists public.activities (
  id               uuid default gen_random_uuid() primary key,
  created_by       uuid references public.profiles on delete cascade not null,
  title            text not null,
  description      text,
  date_time        timestamptz not null,
  location_name    text not null,
  state            text not null,
  gps_lat          numeric,
  gps_lng          numeric,
  activity_type    text not null check (activity_type in ('hiking', 'mtb', 'trail_running')),
  difficulty       text not null check (difficulty in ('easy', 'medium', 'hard')),
  max_participants int  not null default 10,
  created_at       timestamptz default now()
);

-- Comments
create table if not exists public.comments (
  id            uuid default gen_random_uuid() primary key,
  activity_id   uuid references public.activities on delete cascade not null,
  user_id       uuid references public.profiles on delete cascade not null,
  comment_text  text not null,
  created_at    timestamptz default now()
);

-- RSVPs
create table if not exists public.rsvps (
  id           uuid default gen_random_uuid() primary key,
  activity_id  uuid references public.activities on delete cascade not null,
  user_id      uuid references public.profiles on delete cascade not null,
  status       text not null default 'going' check (status in ('going', 'maybe')),
  joined_at    timestamptz default now(),
  unique (activity_id, user_id)
);

-- ----------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------

alter table public.profiles  enable row level security;
alter table public.activities enable row level security;
alter table public.comments   enable row level security;
alter table public.rsvps      enable row level security;

-- Profiles: anyone can read; only the owner can write
create policy "profiles_read_all"  on public.profiles for select using (true);
create policy "profiles_write_own" on public.profiles for all using (auth.uid() = id);

-- Activities: anyone can read; only the creator can modify
create policy "activities_read_all"  on public.activities for select using (true);
create policy "activities_insert"    on public.activities for insert with check (auth.uid() = created_by);
create policy "activities_update_own" on public.activities for update using (auth.uid() = created_by);
create policy "activities_delete_own" on public.activities for delete using (auth.uid() = created_by);

-- Comments: anyone can read; authenticated users can insert; only the author can delete
create policy "comments_read_all"   on public.comments for select using (true);
create policy "comments_insert"     on public.comments for insert with check (auth.uid() = user_id);
create policy "comments_delete_own" on public.comments for delete using (auth.uid() = user_id);

-- RSVPs: anyone can read; authenticated users manage their own
create policy "rsvps_read_all"   on public.rsvps for select using (true);
create policy "rsvps_insert"     on public.rsvps for insert with check (auth.uid() = user_id);
create policy "rsvps_delete_own" on public.rsvps for delete using (auth.uid() = user_id);

-- ----------------------------------------------------------------
-- Auto-create profile on sign-up
-- ----------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ----------------------------------------------------------------
-- Storage bucket for profile photos
-- ----------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict do nothing;
