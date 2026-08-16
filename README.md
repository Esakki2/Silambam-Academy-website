# TEAM J ACADEMY – Full-Stack Website

Premium dynamic Silambam martial arts academy platform.

**Discipline. Tradition. Strength.**

## Features

- Public website with cinematic design (deep charcoal, gold, traditional aesthetic)
- Dynamic content from Supabase (or rich mock data when offline)
- Interactive Weapon cards (Silambam / Staff, Maankombu, Soorul) → detail modals
- Interactive Instructor cards → profile modals
- Grades / levels timeline (fully configurable)
- Classes, Schedule, Events, Achievements, Gallery
- Book a Trial Class form with Zod validation + parent/guardian rules for minors
- Floating WhatsApp CTA (number from settings)
- Secure Admin CMS (`/admin`) with Supabase Auth + RLS
- GSAP animations with `prefers-reduced-motion` support
- Mobile-first, accessible, SEO-ready
- Next.js App Router + TypeScript + Tailwind CSS

## Tech Stack

- Frontend: Next.js 15, TypeScript, Tailwind
- Animations: GSAP + @gsap/react
- Backend: Supabase (Postgres, Auth, Storage, RLS)
- Validation: Zod + React Hook Form
- Deploy: Vercel + Supabase

## Quick Start

```bash
cd team-j-academy
npm install
cp .env.example .env.local
# Fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (optional for demo)
npm run dev
```

Open http://localhost:3000

Without Supabase credentials the site still runs using high-quality mock content.

## Supabase Setup

1. Create a project at https://supabase.com
2. Copy Project URL + anon key into `.env.local`
3. In SQL Editor run:
   - `supabase/migrations/001_schema.sql`
   - `supabase/migrations/002_rls.sql`
4. Storage → create public buckets: academy-images, instructor-images, weapon-images, gallery, event-images, achievement-images
5. Create first admin user:
   - Auth → Users → Add user
   - SQL: `update profiles set role = 'admin' where email = 'your@email.com';`
6. Insert academy_settings row (see seed in migrations or README).

## Project Structure

```
app/               Public + admin routes + API
components/public/ Navbar, Hero, WeaponCard, InstructorCard, TrialForm...
components/ui/     Button, Modal
lib/               data.ts, supabase clients, validations, mock-data
supabase/migrations/
types/
```

## Admin

- `/admin/login` – Supabase Auth
- `/admin` – Dashboard with links to all content sections
- Full CRUD against the tables defined in migrations

## Deployment

Push to GitHub → Import to Vercel → Add env vars → Deploy.

## License

Private – Team J Academy.
