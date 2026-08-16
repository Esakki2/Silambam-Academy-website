export type Role = "admin" | "member";

export interface Profile {
  id: string;
  email: string | null;
  role: Role;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface AcademySettings {
  id: string;
  academy_name: string;
  tagline: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  training_hours: string | null;
  map_embed_url: string | null;
  logo_url: string | null;
  social_links: Record<string, string>;
  updated_at: string;
}

export interface HomepageContent {
  id: string;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_description: string | null;
  hero_image_url: string | null;
  primary_cta_text: string;
  primary_cta_url: string;
  secondary_cta_text: string;
  secondary_cta_url: string;
  is_published: boolean;
  updated_at: string;
}

export interface FeaturedContent {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  date: string | null;
  cta_text: string | null;
  cta_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AboutContent {
  id: string;
  section_key: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  is_published: boolean;
  updated_at: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface Grade {
  id: string;
  name: string;
  description: string | null;
  level: number | null;
  color: string | null;
  image_url: string | null;
  requirements: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface Weapon {
  id: string;
  name: string;
  short_description: string | null;
  full_description: string | null;
  historical_context: string | null;
  cultural_significance: string | null;
  training_level: string | null;
  safety_note: string | null;
  image_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  experience: string | null;
  specialization: string | null;
  training_focus: string | null;
  achievements: string | null;
  certifications: string | null;
  profile_image_url: string | null;
  social_links: Record<string, string>;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface ClassItem {
  id: string;
  name: string;
  description: string | null;
  age_group: string | null;
  skill_level: string | null;
  instructor_id: string | null;
  instructor?: Instructor | null;
  days: string[] | null;
  start_time: string | null;
  end_time: string | null;
  duration_minutes: number | null;
  location: string | null;
  capacity: number | null;
  fee: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface ScheduleItem {
  id: string;
  class_id: string | null;
  class?: ClassItem | null;
  instructor_id: string | null;
  instructor?: Instructor | null;
  day_of_week: string | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  status: string;
  is_published: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  event_date: string | null;
  event_time: string | null;
  location: string | null;
  category: string | null;
  registration_status: string | null;
  registration_link: string | null;
  is_published: boolean;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  person_or_team: string | null;
  event_name: string | null;
  achievement_date: string | null;
  description: string | null;
  award_position: string | null;
  type: string | null;
  image_url: string | null;
  certificate_url: string | null;
  is_published: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
  category: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export type TrialStatus =
  | "NEW"
  | "CONTACTED"
  | "TRIAL SCHEDULED"
  | "COMPLETED"
  | "CONVERTED"
  | "CANCELLED";

export interface TrialRegistration {
  id: string;
  student_name: string;
  date_of_birth: string | null;
  age: number | null;
  parent_guardian_name: string | null;
  phone: string;
  email: string | null;
  preferred_class: string | null;
  preferred_day_time: string | null;
  previous_experience: string | null;
  message: string | null;
  consent: boolean;
  status: TrialStatus;
  created_at: string;
  updated_at: string;
}
