/**
 * Data access layer.
 * Uses Supabase when configured, otherwise falls back to mock data
 * so the site is fully viewable without a backend during development.
 */
import { createClient } from "@/lib/supabase/server";
import {
  mockSettings,
  mockHomepage,
  mockFeatured,
  mockAbout,
  mockBenefits,
  mockGrades,
  mockWeapons,
  mockInstructors,
  mockClasses,
  mockEvents,
  mockAchievements,
  mockGallery,
} from "@/lib/mock-data";
import type {
  AcademySettings,
  HomepageContent,
  FeaturedContent,
  AboutContent,
  Benefit,
  Grade,
  Weapon,
  Instructor,
  ClassItem,
  EventItem,
  Achievement,
  GalleryItem,
} from "@/types";

function hasSupabase() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getSettings(): Promise<AcademySettings> {
  if (!hasSupabase()) return mockSettings;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("academy_settings")
      .select("*")
      .limit(1)
      .single();
    return data ?? mockSettings;
  } catch {
    return mockSettings;
  }
}

export async function getHomepage(): Promise<HomepageContent> {
  if (!hasSupabase()) return mockHomepage;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("homepage_content")
      .select("*")
      .eq("is_published", true)
      .limit(1)
      .single();
    return data ?? mockHomepage;
  } catch {
    return mockHomepage;
  }
}

export async function getFeatured(): Promise<FeaturedContent | null> {
  if (!hasSupabase()) return mockFeatured;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("featured_content")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
      .limit(1)
      .maybeSingle();
    return data;
  } catch {
    return mockFeatured;
  }
}

export async function getAboutSections(): Promise<AboutContent[]> {
  if (!hasSupabase()) return mockAbout;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("about_content")
      .select("*")
      .eq("is_published", true);
    return data?.length ? data : mockAbout;
  } catch {
    return mockAbout;
  }
}

export async function getBenefits(): Promise<Benefit[]> {
  if (!hasSupabase()) return mockBenefits;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("benefits")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");
    return data?.length ? data : mockBenefits;
  } catch {
    return mockBenefits;
  }
}

export async function getGrades(): Promise<Grade[]> {
  if (!hasSupabase()) return mockGrades;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("grades")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");
    return data?.length ? data : mockGrades;
  } catch {
    return mockGrades;
  }
}

export async function getWeapons(): Promise<Weapon[]> {
  if (!hasSupabase()) return mockWeapons;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("weapons")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");
    return data?.length ? data : mockWeapons;
  } catch {
    return mockWeapons;
  }
}

export async function getInstructors(): Promise<Instructor[]> {
  if (!hasSupabase()) return mockInstructors;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("instructors")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");
    return data?.length ? data : mockInstructors;
  } catch {
    return mockInstructors;
  }
}

export async function getClasses(): Promise<ClassItem[]> {
  if (!hasSupabase()) return mockClasses;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("classes")
      .select("*, instructor:instructors(*)")
      .eq("is_active", true)
      .order("name");
    return data?.length ? data : mockClasses;
  } catch {
    return mockClasses;
  }
}

export async function getEvents(upcoming = true): Promise<EventItem[]> {
  if (!hasSupabase()) return mockEvents;
  try {
    const supabase = await createClient();
    let query = supabase
      .from("events")
      .select("*")
      .eq("is_published", true)
      .order("event_date", { ascending: upcoming });
    if (upcoming) {
      query = query.gte("event_date", new Date().toISOString().slice(0, 10));
    } else {
      query = query.lt("event_date", new Date().toISOString().slice(0, 10));
    }
    const { data } = await query;
    return data ?? [];
  } catch {
    return mockEvents;
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  if (!hasSupabase()) return mockAchievements;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("achievements")
      .select("*")
      .eq("is_published", true)
      .order("achievement_date", { ascending: false });
    return data?.length ? data : mockAchievements;
  } catch {
    return mockAchievements;
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (!hasSupabase()) return mockGallery;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");
    return data?.length ? data : mockGallery;
  } catch {
    return mockGallery;
  }
}
