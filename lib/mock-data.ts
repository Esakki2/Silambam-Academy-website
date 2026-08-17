/**
 * Fallback mock data used when Supabase is not configured.
 * Replace with real content via Admin CMS once connected.
 */
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

export const mockSettings: AcademySettings = {
  id: "1",
  academy_name: "TEAM J ACADEMY",
  tagline: "Discipline. Tradition. Strength.",
  address: "Thiruvanmiyur, Chennai, Tamil Nadu, India",
  phone: "+91 99434 88114",
  email: "contact@teamjacademy.com",
  whatsapp: "919943488114",
  training_hours: "Mon–Sat: 6:00 AM – 8:00 PM | Sun: By appointment",
  map_embed_url: null,
  logo_url: null,
  social_links: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  updated_at: new Date().toISOString(),
};

export const mockHomepage: HomepageContent = {
  id: "1",
  hero_title: "TEAM J ACADEMY",
  hero_subtitle: "Learn the ancient art of Silambam",
  hero_description:
    "Build discipline, confidence, agility and strength through traditional Tamil martial arts training.",
  hero_image_url:
    "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop",
  primary_cta_text: "Book a Trial Class",
  primary_cta_url: "/join",
  secondary_cta_text: "Explore Silambam",
  secondary_cta_url: "/about",
  is_published: true,
  updated_at: "2026-01-01T00:00:00.000Z",
};

export const mockFeatured: FeaturedContent = {
  id: "1",
  title: "Excellence in Silambam Training",
  description:
    "At Team J Academy we preserve and teach the traditional art of Silambam with focus on discipline, technique and cultural roots.",
  image_url:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
  category: "Academy",
  date: null,
  cta_text: "About Us",
  cta_url: "/about",
  is_published: true,
  sort_order: 0,
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};

export const mockAbout: AboutContent[] = [
  {
    id: "1",
    section_key: "mission",
    title: "Our Mission",
    content:
      "To preserve and pass on the traditional martial art of Silambam while building strong, disciplined and confident individuals of all ages.",
    image_url: null,
    is_published: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    section_key: "history",
    title: "History of Silambam",
    content:
      "Silambam is a traditional martial art associated with Tamil Nadu. It emphasizes bamboo staff (silambam) training, precise footwork (chuvadu), body coordination, speed, agility and deep discipline. Practitioners also train with traditional weapons such as Maankombu and Soorul. The art carries significant cultural importance within Tamil martial traditions and continues to be practiced and taught with respect for its heritage.",
    image_url: null,
    is_published: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    section_key: "philosophy",
    title: "Training Philosophy",
    content:
      "We believe true strength comes from discipline, respect and consistent practice. Every class builds physical skill alongside mental resilience and cultural connection.",
    image_url: null,
    is_published: true,
    updated_at: "2026-01-01T00:00:00.000Z",
  },
];

export const mockBenefits: Benefit[] = [
  { id: "1", title: "Physical Fitness", description: "Improve strength, endurance and overall conditioning.", icon: "Dumbbell", sort_order: 1, is_published: true, created_at: "" },
  { id: "2", title: "Flexibility & Balance", description: "Develop mobility, stability and body control.", icon: "Stretch", sort_order: 2, is_published: true, created_at: "" },
  { id: "3", title: "Coordination & Agility", description: "Sharpen reflexes and fluid movement.", icon: "Zap", sort_order: 3, is_published: true, created_at: "" },
  { id: "4", title: "Focus & Discipline", description: "Build concentration and self-control.", icon: "Target", sort_order: 4, is_published: true, created_at: "" },
  { id: "5", title: "Confidence", description: "Grow self-assurance through mastery of skill.", icon: "Shield", sort_order: 5, is_published: true, created_at: "" },
  { id: "6", title: "Cultural Connection", description: "Connect with Tamil martial heritage.", icon: "Landmark", sort_order: 6, is_published: true, created_at: "" },
];

export const mockGrades: Grade[] = [
  { id: "1", name: "White", description: "Foundation stance & basic footwork", level: 1, color: "#f5f5f5", image_url: null, requirements: "Introductory", sort_order: 1, is_published: true, created_at: "" },
  { id: "2", name: "Yellow", description: "Introduction to core techniques", level: 2, color: "#f5c400", image_url: null, requirements: "Core movement", sort_order: 2, is_published: true, created_at: "" },
  { id: "3", name: "Orange", description: "Building strikes & stick control", level: 3, color: "#f28c00", image_url: null, requirements: "Stick control", sort_order: 3, is_published: true, created_at: "" },
  { id: "4", name: "Green", description: "Intermediate patterns & partner drills", level: 4, color: "#2ecc40", image_url: null, requirements: "Pattern drill", sort_order: 4, is_published: true, created_at: "" },
  { id: "5", name: "Blue", description: "Advanced combinations & speed work", level: 5, color: "#2e6be6", image_url: null, requirements: "Speed & form", sort_order: 5, is_published: true, created_at: "" },
  { id: "6", name: "Purple", description: "Weapon transitions & application", level: 6, color: "#8e44ad", image_url: null, requirements: "Weapon flow", sort_order: 6, is_published: true, created_at: "" },
  { id: "7", name: "Brown", description: "Complex sequences & sparring", level: 7, color: "#8b5e3c", image_url: null, requirements: "Advanced sparring", sort_order: 7, is_published: true, created_at: "" },
  { id: "8", name: "Brown 1", description: "Refined technique & teaching assistance", level: 8, color: "#7a4b23", image_url: null, requirements: "Refinement", sort_order: 8, is_published: true, created_at: "" },
  { id: "9", name: "Brown 2", description: "Full technical & pedagogical grounding", level: 9, color: "#6b3d1d", image_url: null, requirements: "Pedagogy", sort_order: 9, is_published: true, created_at: "" },
  { id: "10", name: "Brown 3", description: "Instructor / mastery level readiness", level: 10, color: "#4d2e18", image_url: null, requirements: "Mastery", sort_order: 10, is_published: true, created_at: "" },
];

export const mockWeapons: Weapon[] = [
  {
    id: "1",
    name: "Silambam / Staff",
    short_description: "The primary bamboo staff used in Silambam training.",
    full_description:
      "The silambam (bamboo staff) is the foundational weapon of the art. Training focuses on spinning, striking patterns, defensive circles and precise footwork.",
    historical_context:
      "Staff fighting has long been part of Tamil martial traditions. The bamboo staff develops coordination, reach awareness and disciplined body mechanics.",
    cultural_significance:
      "Central to Silambam practice and widely recognized as the signature implement of the art.",
    training_level: "All levels",
    safety_note: "Always train under qualified supervision. Use appropriate protective gear and controlled intensity.",
    image_url:
      "https://images.unsplash.com/photo-1599058945522-28d584b6d28a?q=80&w=1000&auto=format&fit=crop",
    sort_order: 1,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    name: "Maankombu",
    short_description: "Traditional curved weapon used in advanced Silambam practice.",
    full_description:
      "Maankombu is a traditional weapon associated with Silambam training. It requires refined control, timing and understanding of distance.",
    historical_context:
      "Part of the broader set of traditional weapons practiced within Tamil martial systems.",
    cultural_significance:
      "Represents the diversity of weapons training beyond the primary staff.",
    training_level: "Intermediate to Advanced",
    safety_note: "Only practice under experienced instructor guidance. Strict safety protocols apply.",
    image_url:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
    sort_order: 2,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    name: "Soorul",
    short_description: "Flexible traditional weapon requiring advanced coordination.",
    full_description:
      "Soorul is a traditional flexible weapon trained in certain Silambam lineages. It develops unique timing, rhythm and spatial awareness.",
    historical_context:
      "Included among traditional implements used in Tamil martial arts practice.",
    cultural_significance:
      "Highlights the range of movement qualities cultivated in the art.",
    training_level: "Advanced",
    safety_note: "Requires prior foundation and direct instructor supervision. Never practice unsupervised.",
    image_url:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
    sort_order: 3,
    is_published: true,
    created_at: "",
    updated_at: "",
  },
];

export const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "G. Jagadeesh",
    role: "Chief Coach / Founder",
    bio: "Dedicated Silambam instructor focused on traditional technique, discipline and student development at Team J Academy.",
    experience: "Years of dedicated teaching and competition coaching.",
    specialization: "Silambam staff, traditional weapons, youth & adult programs",
    training_focus: "Technical precision, discipline, cultural respect",
    achievements: "Coach of medal-winning students at national and international Silambam events.",
    certifications: null,
    profile_image_url:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=800&auto=format&fit=crop",
    social_links: {},
    sort_order: 1,
    is_published: true,
    created_at: "",
  },
];

export const mockClasses: ClassItem[] = [
  {
    id: "1",
    name: "Kids Silambam",
    description: "Age-appropriate introduction to Silambam focusing on coordination, discipline and fun.",
    age_group: "5–12 years",
    skill_level: "Beginner",
    instructor_id: "1",
    days: ["Monday", "Wednesday", "Friday"],
    start_time: "17:00",
    end_time: "18:00",
    duration_minutes: 60,
    location: "Main Hall",
    capacity: 20,
    fee: "Contact for details",
    image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    is_featured: true,
    is_active: true,
    created_at: "",
  },
  {
    id: "2",
    name: "Teens & Adults",
    description: "Comprehensive Silambam training covering staff work, footwork and traditional weapons progression.",
    age_group: "13+",
    skill_level: "All levels",
    instructor_id: "1",
    days: ["Tuesday", "Thursday", "Saturday"],
    start_time: "18:30",
    end_time: "20:00",
    duration_minutes: 90,
    location: "Main Hall",
    capacity: 25,
    fee: "Contact for details",
    image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    is_featured: true,
    is_active: true,
    created_at: "",
  },
  {
    id: "3",
    name: "Beginners Intensive",
    description: "Focused foundation class for new students of any age group.",
    age_group: "All ages",
    skill_level: "Beginner",
    instructor_id: "1",
    days: ["Saturday"],
    start_time: "09:00",
    end_time: "10:30",
    duration_minutes: 90,
    location: "Main Hall",
    capacity: 15,
    fee: "Contact for details",
    image_url: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop",
    is_featured: false,
    is_active: true,
    created_at: "",
  },
];

export const mockEvents: EventItem[] = [
  {
    id: "1",
    title: "Weekend Silambam Workshop",
    description: "Open workshop covering foundational staff techniques and footwork.",
    cover_image_url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
    event_date: "2026-09-20",
    event_time: "09:00",
    location: "Team J Academy, Thiruvanmiyur",
    category: "Workshops",
    registration_status: "Open",
    registration_link: "/join",
    is_published: true,
    created_at: "",
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "International Championship Success",
    person_or_team: "Team J Students",
    event_name: "Silambam International Championship, Goa",
    achievement_date: "2024-05-26",
    description: "Students from Team J Academy achieved outstanding results including multiple gold, silver and bronze medals and the title championship.",
    award_position: "Title Championship + Multiple Medals",
    type: "Tournament",
    image_url: null,
    certificate_url: null,
    is_published: true,
    created_at: "",
  },
];

export const mockGallery: GalleryItem[] = [
  {
    id: "1",
    image_url: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop",
    caption: "Training session",
    category: "Training",
    sort_order: 1,
    is_published: true,
    created_at: "",
  },
  {
    id: "2",
    image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    caption: "Class practice",
    category: "Classes",
    sort_order: 2,
    is_published: true,
    created_at: "",
  },
  {
    id: "3",
    image_url: "https://images.unsplash.com/photo-1599058945522-28d584b6d28a?q=80&w=800&auto=format&fit=crop",
    caption: "Staff work",
    category: "Training",
    sort_order: 3,
    is_published: true,
    created_at: "",
  },
  {
    id: "4",
    image_url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    caption: "Focus and discipline",
    category: "Students",
    sort_order: 4,
    is_published: true,
    created_at: "",
  },
];
