# eskoubar - Personal Brand Website

Personligt brand website for "eskoubar" (Nicklas Eskou) der kombinerer content marketing (blog og newsletter) med direkte konvertering til freelance salg.

This project uses Spec-Driven Development (SDD) with the Project Operating System (POS).

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Payload CMS 3.x
- **Database:** Railway PostgreSQL
- **Hosting:** Railway

## Getting Started

### Development

1. Clone repository
2. Install dependencies: `npm install`
3. Setup environment variables (se `.env.local.example` hvis tilgængelig)
4. Run development server: `npm run dev`
5. Access Payload CMS admin: `http://localhost:3000/admin`

### Environment Variables

**Required:**
- `PAYLOAD_SECRET` - Secret key til Payload CMS (generer en sikker random string)
- `POSTGRES_URL` - Connection string til PostgreSQL database

**Optional (for live preview):**
- `PAYLOAD_PREVIEW_SECRET` - Secret token for preview authentication (defaults to 'preview-secret' in dev)
- `NEXT_PUBLIC_SERVER_URL` - Public URL for preview generation (defaults to 'http://localhost:3000' in dev)

**Other:**
- `NODE_ENV` - Environment (development/production)

## Deployment

Se [DEPLOYMENT.md](./DEPLOYMENT.md) for detaljerede deployment instruktioner.

**Quick Deploy:**
1. Link GitHub repository til Railway projekt
2. Konfigurer environment variables i Railway
3. Railway deployer automatisk ved push til main branch

## Workflow

```txt
/spec/init
/spec/refine   (optional, repeatable)
/spec/plan
/task/start
[work]
/task/validate
```

## Project Structure
 
- `app/(app)/` — Root layout, home page og globale styles (`layout.tsx`, `page.tsx`, `globals.css`)
- `app/(payload)/admin/[[...segments]]/` — Payload CMS admin route
- `app/(payload)/api/[...slug]/route.ts` — Payload REST API forwarder
- `app/(payload)/graphql/route.ts` — GraphQL endpoint
- `app/(payload)/graphql-playground/route.ts` — GraphQL Playground
- `collections/` — Payload CMS collections (`Users.ts`, `Media.ts`)
- `payload.config.ts` — Payload CMS konfiguration
- `spec/` — Specifikationer (SDD)
- `work/` — Backlog og arbejdsartefakter
- `railway.json` — Railway deploy konfiguration
- `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `next.config.ts` — Build og tooling
- `DEPLOYMENT.md`, `README.md` — Dokumentation

