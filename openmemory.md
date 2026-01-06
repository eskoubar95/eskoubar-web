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
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles with Tailwind
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

## Notes

