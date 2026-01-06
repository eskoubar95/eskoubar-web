# Deployment Guide

## Railway Deployment

Dette projekt er konfigureret til deployment på Railway.

### Prerequisites

- Railway account oprettet
- GitHub repository linket til Railway projekt
- Railway PostgreSQL database oprettet (allerede konfigureret i T1.2b)

### Environment Variables

Følgende environment variables skal være sat i Railway projektet:

- `PAYLOAD_SECRET` - Secret key til Payload CMS (generer en sikker random string)
- `POSTGRES_URL` - Connection string til Railway PostgreSQL database
- `NODE_ENV` - Sæt til `production` (automatisk sat af Railway)

### Setup Steps

1. **Opret Railway Projekt:**
   - Gå til [Railway Dashboard](https://railway.app)
   - Klik "New Project"
   - Vælg "Deploy from GitHub repo"
   - Vælg repository: `eskoubar95/eskoubar-web`

2. **Link Database:**
   - I Railway projektet, tilføj eksisterende PostgreSQL database service
   - Eller opret ny PostgreSQL database hvis ikke allerede oprettet

3. **Konfigurer Environment Variables:**
   - Gå til projekt settings → Variables
   - Tilføj `PAYLOAD_SECRET` (generer en sikker random string)
   - Tilføj `POSTGRES_URL` (hent fra database service → Connect → Connection String)
   - Railway sætter automatisk `NODE_ENV=production`

4. **Deploy:**
   - Railway deployer automatisk ved push til main branch (CI/CD)
   - Eller manuelt via Railway dashboard → Deploy

### CI/CD

Railway har automatisk CI/CD via GitHub integration:
- **Automatic Deployments:** Deployer automatisk ved push til main branch
- **Preview Deployments:** Opretter preview deployments for pull requests (hvis aktiveret)

### Build & Start Commands

Railway bruger automatisk:
- **Build:** `npm run build`
- **Start:** `npm start`

Disse er defineret i `package.json` og `railway.json`.

### Domain Setup (Fremtidig)

Når domain (eskoubar.com) skal sættes op:
1. Gå til Railway projekt → Settings → Networking
2. Tilføj custom domain: `eskoubar.com`
3. Følg Railway's DNS instruktioner
4. Opdater DNS records hos domain provider

### Known Warnings

Følgende warnings kan ignoreres (ikke-kritiske):

1. **Docker Security Warnings (Build):**
   - `SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data`
   - `UndefinedVar: Usage of undefined variable '$NIXPACKS_PATH'`
   - **Forklaring:** Disse kommer fra Railway's Nixpacks build system og kan ikke påvirkes af vores konfiguration. De er ikke kritiske.

2. **npm Deprecation Warning:**
   - `npm warn config production Use '--omit=dev' instead.`
   - **Forklaring:** npm deprecation warning. Ikke kritisk, kommer fra build system.

3. **Payload CMS Email Adapter Warning (Runtime):**
   - `WARN: No email adapter provided. Email will be written to console.`
   - **Forklaring:** Payload CMS advarer om manglende email adapter. Dette er forventet, da email ikke er konfigureret endnu. Email adapter kan tilføjes senere hvis nødvendigt (f.eks. for contact form notifications).

### Troubleshooting

**Build fejler:**
- Tjek at alle environment variables er sat korrekt
- Verificer at `POSTGRES_URL` peger på korrekt database
- Tjek Railway logs for specifikke fejl

**Applikation starter ikke:**
- Verificer at `PAYLOAD_SECRET` er sat
- Tjek database connection (POSTGRES_URL)
- Tjek Railway logs for runtime errors

**Database connection fejler:**
- Verificer at database service er linket til projektet
- Tjek at `POSTGRES_URL` er korrekt formateret
- Verificer at database er aktiv i Railway
