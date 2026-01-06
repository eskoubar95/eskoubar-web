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

- `PAYLOAD_SECRET` - Secret key til Payload CMS
- `POSTGRES_URL` - Connection string til PostgreSQL database
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

- `spec/` - Source of truth (specifications)
- `work/` - Execution artifacts (milestones, tasks)
- `app/` - Next.js App Router pages og routes
- `collections/` - Payload CMS collections
- `.cursor/` - POS rules and commands

For more information, see the POS documentation in `.cursor/rules/`.

