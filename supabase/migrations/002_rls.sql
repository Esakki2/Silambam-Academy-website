-- Row Level Security policies

alter table profiles enable row level security;
alter table academy_settings enable row level security;
alter table homepage_content enable row level security;
alter table featured_content enable row level security;
alter table about_content enable row level security;
alter table benefits enable row level security;
alter table grades enable row level security;
alter table weapons enable row level security;
alter table instructors enable row level security;
alter table classes enable row level security;
alter table schedules enable row level security;
alter table events enable row level security;
alter table achievements enable row level security;
alter table gallery_items enable row level security;
alter table trial_registrations enable row level security;

-- Helper: is admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Public read published content
create policy "Public read academy_settings" on academy_settings for select using (true);
create policy "Admin all academy_settings" on academy_settings for all using (public.is_admin());

create policy "Public read homepage" on homepage_content for select using (is_published = true);
create policy "Admin all homepage" on homepage_content for all using (public.is_admin());

create policy "Public read featured" on featured_content for select using (is_published = true);
create policy "Admin all featured" on featured_content for all using (public.is_admin());

create policy "Public read about" on about_content for select using (is_published = true);
create policy "Admin all about" on about_content for all using (public.is_admin());

create policy "Public read benefits" on benefits for select using (is_published = true);
create policy "Admin all benefits" on benefits for all using (public.is_admin());

create policy "Public read grades" on grades for select using (is_published = true);
create policy "Admin all grades" on grades for all using (public.is_admin());

create policy "Public read weapons" on weapons for select using (is_published = true);
create policy "Admin all weapons" on weapons for all using (public.is_admin());

create policy "Public read instructors" on instructors for select using (is_published = true);
create policy "Admin all instructors" on instructors for all using (public.is_admin());

create policy "Public read classes" on classes for select using (is_active = true);
create policy "Admin all classes" on classes for all using (public.is_admin());

create policy "Public read schedules" on schedules for select using (is_published = true);
create policy "Admin all schedules" on schedules for all using (public.is_admin());

create policy "Public read events" on events for select using (is_published = true);
create policy "Admin all events" on events for all using (public.is_admin());

create policy "Public read achievements" on achievements for select using (is_published = true);
create policy "Admin all achievements" on achievements for all using (public.is_admin());

create policy "Public read gallery" on gallery_items for select using (is_published = true);
create policy "Admin all gallery" on gallery_items for all using (public.is_admin());

-- Trial: public insert, admin read/update
create policy "Anyone can submit trial" on trial_registrations for insert with check (true);
create policy "Admin read trials" on trial_registrations for select using (public.is_admin());
create policy "Admin update trials" on trial_registrations for update using (public.is_admin());

-- Profiles
create policy "Users read own profile" on profiles for select using (auth.uid() = id);
create policy "Admin read profiles" on profiles for select using (public.is_admin());
create policy "Admin update profiles" on profiles for update using (public.is_admin());
