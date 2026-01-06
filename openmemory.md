# OpenMemory Guide - eskoubar

## Overview
Personligt brand website for "eskoubar" (Nicklas Eskou) der kombinerer content marketing (blog og newsletter) med direkte konvertering til freelance salg.

## Architecture

### Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Payload CMS 3.x (installed - T1.2a)
- **Database:** Railway PostgreSQL (installed - T1.2b)
- **Hosting:** Railway (configured - T1.3)

### Project Structure
```
/
├── app/                    # Next.js App Router
│   ├── (app)/             # Main app routes
│   │   ├── layout.tsx     # Root layout with Navigation
│   │   ├── page.tsx       # Home page
│   │   ├── globals.css    # Global styles with Tailwind
│   │   ├── components/    # React components
│   │   │   └── Navigation.tsx
│   │   ├── blog/          # Blog routes
│   │   │   └── page.tsx
│   │   ├── about/         # About page
│   │   │   └── page.tsx
│   │   ├── services/      # Services page
│   │   │   └── page.tsx
│   │   └── contact/       # Contact page
│   │       └── page.tsx
│   └── (payload)/         # Payload CMS routes
│       ├── layout.tsx      # Payload root layout
│       ├── admin/          # Admin interface
│       │   └── [[...segments]]/
│       │       └── page.tsx
│       └── api/           # REST API routes
│           └── [...slug]/
│               └── route.ts
├── spec/                   # Specifications (SDD)
├── work/                   # Task management
├── payload.config.ts      # Payload CMS configuration
├── railway.json           # Railway deployment configuration
├── DEPLOYMENT.md          # Deployment documentation
├── .env.local              # Environment variables (local)
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.mjs
```

## User Defined Namespaces
- [Leave blank - user populates]

## Components

### Navigation
- **Location:** `app/(app)/components/Navigation.tsx`
- **Purpose:** Main site navigation menu with links to Home, Blog, About, Services, Contact
- **Features:** Responsive design with mobile hamburger menu, client-side component using Next.js Link
- **Language:** English (default frontend language)
- **Integration:** Imported in `app/(app)/layout.tsx` and rendered on all pages

### Payload CMS
- **Location:** `payload.config.ts`, `app/(payload)/`
- **Purpose:** Headless CMS for content management (blog posts, case studies, etc.)
- **Admin Interface:** `/admin` route
- **API:** REST API at `/api/[...slug]`
- **Database:** Railway PostgreSQL (connection configured, schema pulled successfully)
- **Collections:** Users (auth enabled)

## Patterns

### Payload CMS Setup
- Payload CMS 3.x installed with React 19 compatibility
- Configuration in `payload.config.ts` using `buildConfig`
- Admin interface at `app/(payload)/admin/[[...segments]]/page.tsx`
- API routes at `app/(payload)/api/[...slug]/route.ts`
- Layout wrapper using `RootLayout` from `@payloadcms/next/layouts`
- Environment variables in `.env.local` (PAYLOAD_SECRET, POSTGRES_URL)
- Database adapter: `@payloadcms/db-postgres` (standard PostgreSQL adapter for Railway)

### Deployment
- **Hosting:** Railway
- **CI/CD:** Railway GitHub integration (automatic deployments on push to main)
- **Configuration:** `railway.json` defines build and start commands
- **Environment Variables:** PAYLOAD_SECRET, POSTGRES_URL (set in Railway dashboard)
- **Domain:** eskoubar.com (available, setup pending)
- **Documentation:** See `DEPLOYMENT.md` for detailed instructions

### Routing & Navigation
- **Framework:** Next.js App Router (file-based routing)
- **Navigation Component:** Client-side component with mobile responsive menu
- **Routes:** Home (/), Blog (/blog), About (/about), Services (/services), Contact (/contact)
- **Language:** English (default frontend language, `lang="en"` in HTML)
- **Layout:** Navigation integrated in root layout, visible on all pages
- **Mobile Menu:** Hamburger menu with toggle state, closes on link click

### Responsive Layout System
- **Container Pattern:** All pages use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for consistent container width and responsive padding
- **Responsive Typography:** Global typography scales defined in `globals.css` using Tailwind's `@layer base`:
  - h1: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
  - h2: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
  - h3-h6: Progressive scaling from mobile to desktop
  - body: `text-base sm:text-base md:text-lg`
- **Responsive Spacing:** Vertical padding uses `py-8 sm:py-12 lg:py-16` pattern for progressive spacing
- **Layout Structure:** Root layout uses `min-h-screen flex flex-col` with `flex-1` on main content area for proper footer positioning
- **Breakpoints:** Uses Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)

### Design System & Branding
- **Style Direction:** Dark Glossy / Modern Professional (inspired by "Jonathan.ux" & "Daniel Sun")
- **Font Family:** `Plus Jakarta Sans` (Geometric Sans-Serif)
- **Color System (Dark Mode Native):**
  - Background: `brand-neutral-950` (#050505 - Deep Black)
  - Text: `white` (Headings) / `brand-neutral-400` (Body)
  - Accents: Electric Blue/Purple via `brand-primary`
  - Glass Effect: `white/10` borders and backgrounds
- **UI Patterns:**
  - **Glassmorphism:** Extensive use of `backdrop-blur`, semi-transparent backgrounds, and thin borders
  - **Floating Navigation:** Fixed "pill" navigation centered at top (Daniel Sun style)
  - **Rounding:** `rounded-full` for buttons/nav, `rounded-2xl` for cards
  - **Utility Classes:** `.glass-panel` and `.glass-button` defined in globals.css
- **Typography System:**
  - Headings: Tight tracking (`tracking-tight`), bold weights, pure white
  - Links: Underlined with offset, accent color on hover

### Repository
- **GitHub:** https://github.com/eskoubar95/eskoubar-web
- **Branch:** main
- **Remote:** origin

## Notes

