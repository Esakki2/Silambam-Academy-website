-- TEAM J ACADEMY – Database Schema
-- Run in Supabase SQL Editor

create extension if not exists "uuid-ossp";

-- Profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text default 'member' check (role in ('admin', 'member')),
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists academy_settings (
  id uuid primary key default uuid_generate_v4(),
  academy_name text default 'TEAM J ACADEMY',
  tagline text default 'Discipline. Tradition. Strength.',
  address text,
  phone text,
  email text,
  whatsapp text,
  training_hours text,
  map_embed_url text,
  logo_url text,
  social_links jsonb default '{}',
  updated_at timestamptz default now()
);

create table if not exists homepage_content (
  id uuid primary key default uuid_generate_v4(),
  hero_title text,
  hero_subtitle text,
  hero_description text,
  hero_image_url text,
  primary_cta_text text default 'Book a Trial Class',
  primary_cta_url text default '/join',
  secondary_cta_text text default 'Explore Silambam',
  secondary_cta_url text default '/about',
  is_published boolean default true,
  updated_at timestamptz default now()
);

create table if not exists featured_content (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image_url text,
  category text,
  date date,
  cta_text text,
  cta_url text,
  is_published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists about_content (
  id uuid primary key default uuid_generate_v4(),
  section_key text unique,
  title text,
  content text,
  image_url text,
  is_published boolean default true,
  updated_at timestamptz default now()
);

create table if not exists benefits (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  icon text,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists grades (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  level int,
  color text,
  image_url text,
  requirements text,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists weapons (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  short_description text,
  full_description text,
  historical_context text,
  cultural_significance text,
  training_level text,
  safety_note text,
  image_url text,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists instructors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text,
  bio text,
  experience text,
  specialization text,
  training_focus text,
  achievements text,
  certifications text,
  profile_image_url text,
  social_links jsonb default '{}',
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists classes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  age_group text,
  skill_level text,
  instructor_id uuid references instructors(id) on delete set null,
  days text[],
  start_time time,
  end_time time,
  duration_minutes int,
  location text,
  capacity int,
  fee text,
  image_url text,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists schedules (
  id uuid primary key default uuid_generate_v4(),
  class_id uuid references classes(id) on delete cascade,
  instructor_id uuid references instructors(id) on delete set null,
  day_of_week text,
  start_time time,
  end_time time,
  location text,
  status text default 'available',
  is_published boolean default true
);

create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  cover_image_url text,
  event_date date,
  event_time time,
  location text,
  category text,
  registration_status text,
  registration_link text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists achievements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  person_or_team text,
  event_name text,
  achievement_date date,
  description text,
  award_position text,
  type text,
  image_url text,
  certificate_url text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists gallery_items (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text,
  category text,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists trial_registrations (
  id uuid primary key default uuid_generate_v4(),
  student_name text not null,
  date_of_birth date,
  age int,
  parent_guardian_name text,
  phone text not null,
  email text,
  preferred_class text,
  preferred_day_time text,
  previous_experience text,
  message text,
  consent boolean not null default true,
  status text default 'NEW' check (status in (
    'NEW','CONTACTED','TRIAL SCHEDULED','COMPLETED','CONVERTED','CANCELLED'
  )),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes
create index if not exists idx_weapons_pub on weapons(is_published, sort_order);
create index if not exists idx_instructors_pub on instructors(is_published, sort_order);
create index if not exists idx_trial_status on trial_registrations(status);
create index if not exists idx_events_date on events(event_date);
create index if not exists idx_gallery_pub on gallery_items(is_published, sort_order);

-- Auto profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'member');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
