# Decisions

## Decision: Tech Stack Selection (T1.1)

**Date:** 2025-01-27
**Context:** Valg af teknisk stack for eskoubar website baseret på requirements fra PRD.

### Requirements Analysis

**Core Features:**
- Blog system (primært formål)
- Newsletter sign-up system (primært formål)
- Contact form (sekundært formål)
- Brand presentation pages
- Responsive design

**Non-Functional Requirements:**
- Performance: < 3s load time
- SEO-optimering (meta tags, sitemap, structured data)
- Accessibility (WCAG 2.1 Level A)
- Security (form validation, spam protection)

**Constraints:**
- Simplicitet (Risk #3: Teknisk Kompleksitet - undgå over-engineering)
- Content-first approach (blog er primært formål)
- API integration nødvendig (newsletter platform)
- **User Requirement:** Admin interface (CMS) til content management
- **User Requirement:** Database for fuld kontrol over data
- **User Requirement:** Support for case studies og fremtidige content types

### Evaluated Options

#### Option 1: Next.js (App Router)
**Pros:**
- Excellent SEO support (built-in metadata API, sitemap generation)
- Server-side rendering + static generation (hybrid approach)
- API routes for form handling og newsletter integration
- Large ecosystem og community
- Built-in image optimization
- Excellent performance med App Router
- TypeScript support out-of-the-box

**Cons:**
- Kan være mere kompleks end nødvendigt for simpelt blog site
- Større bundle size end pure SSG

**Best for:** Balance mellem features og simplicitet, god developer experience

#### Option 2: Astro
**Pros:**
- Excellent performance (zero JS by default)
- Content-focused, perfekt til blog sites
- Kan bruge React/Vue/Svelte components hvis nødvendigt
- Simpel og letvægt
- Excellent SEO support
- Built-in image optimization

**Cons:**
- Mindre ecosystem end Next.js
- API routes kræver adapter (mere setup)
- Nyere framework (mindre community)

**Best for:** Content-first sites med maksimal performance

#### Option 3: Remix
**Pros:**
- Excellent form handling (native Web APIs)
- Full-stack framework
- Good performance
- TypeScript support

**Cons:**
- Mere kompleks end nødvendigt for blog site
- Mindre fokuseret på content/SEO end Next.js/Astro

**Best for:** Complex web applications med mange forms/interactions

#### Option 4: 11ty (Eleventy)
**Pros:**
- Meget simpel og letvægt
- Excellent performance
- Zero JavaScript by default
- Perfect til static sites

**Cons:**
- Ingen built-in API routes (kræver serverless functions eller external service)
- Mindre ecosystem
- Mere manual setup for forms

**Best for:** Pure static sites uden server-side logic

### Decision: Next.js (App Router) + Payload CMS

**Valgt stack:**
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (simpel, moderne, god performance)
- **CMS:** Payload CMS 2.0+ (self-hosted, headless CMS)
- **Database:** PostgreSQL (via Payload CMS, fuld kontrol over data)
- **Content:** Payload CMS collections (blog posts, case studies, pages, etc.)
- **Forms:** Payload CMS forms + Next.js Server Actions
- **Newsletter:** API routes til integration med newsletter platform
- **Hosting:** Vercel (Next.js) + Database hosting (Vercel Postgres, Supabase, eller lignende)

### Rationale

1. **Balance mellem simplicitet og features:**
   - Next.js er ikke den simpleste, men tilbyder alle nødvendige features uden kompleks setup
   - App Router giver god developer experience og performance
   - TypeScript giver type safety uden for meget overhead
   - Payload CMS er bygget på Next.js (perfekt integration)

2. **Content-first med admin interface:**
   - Payload CMS giver admin interface til at administrere content (blog posts, case studies, pages)
   - Database (PostgreSQL) giver fuld kontrol over data
   - Self-hosted CMS = ingen vendor lock-in, fuld data kontrol
   - TypeScript-first CMS med type-safe content models
   - Next.js kan generere static pages for blog (performance)

3. **Data kontrol og fleksibilitet:**
   - PostgreSQL database giver fuld kontrol over alle data
   - Contact form submissions kan gemmes i database (ikke kun email)
   - Case studies og fremtidige content types kan nemt tilføjes
   - Payload CMS collections er fleksible og udvidbare

4. **SEO og Performance:**
   - Built-in metadata API for SEO
   - Automatic sitemap generation
   - Image optimization out-of-the-box
   - Static generation for blog posts (excellent performance)
   - Payload CMS kan cache content for bedre performance

5. **Newsletter Integration:**
   - API routes gør det nemt at integrere med newsletter platforms
   - Server Actions kan også håndtere form submissions
   - Newsletter signups kan også gemmes i database hvis nødvendigt

6. **Developer Experience:**
   - Large ecosystem (mange packages, tutorials)
   - Good documentation
   - Hot reload, good error messages
   - Vercel integration (easy deployment)
   - Payload CMS admin interface er intuitiv og kraftfuld

7. **Risk Mitigation (Risk #3):**
   - Payload CMS er bygget på Next.js (ingen kompleks integration)
   - TypeScript-first giver type safety
   - Self-hosted = ingen eksterne dependencies for CMS
   - Database er standard PostgreSQL (velkendt, stabil)

### Trade-offs

**Acceptable trade-offs:**
- Slightly larger bundle size end pure SSG (Astro/11ty), men acceptable for features vi får
- Next.js har learning curve, men er standard i industrien
- Payload CMS tilføjer kompleksitet, men giver admin interface og data kontrol (user requirement)
- Database hosting kræver ekstra setup og omkostninger, men giver fuld kontrol (user requirement)
- Vercel lock-in for Next.js, men acceptable for MVP (kan migreres senere hvis nødvendigt)

**Alternatives considered:**
- **Markdown files:** Simpler, men ingen admin interface (ikke user requirement)
- **Headless CMS (Contentful, Sanity):** Cloud-based, men ingen fuld data kontrol (ikke user requirement)
- **Strapi:** Self-hosted CMS, men Payload CMS er bedre integreret med Next.js
- **Astro:** Ville give bedre performance, men kræver mere setup for API integration og CMS
- **11ty:** Ville være simplere, men kræver external services for forms/newsletter og ingen CMS

### Consequences

**Positive:**
- Fast development med Next.js ecosystem
- Easy deployment med Vercel
- Good performance med static generation
- Type safety med TypeScript
- Admin interface til content management (user requirement)
- Fuld kontrol over data med PostgreSQL (user requirement)
- Fleksibel til at tilføje nye content types (case studies, etc.)
- Self-hosted CMS = ingen vendor lock-in
- Payload CMS er bygget på Next.js (perfekt integration)

**Negative:**
- Slightly more complex end pure SSG (Payload CMS + database)
- Database hosting kræver setup og omkostninger
- Payload CMS learning curve (men god dokumentation)
- Vercel dependency for Next.js (men kan hostes andetsteds)
- TypeScript learning curve hvis ikke allerede bekendt

### Next Steps

1. T1.2: Setup Next.js project med TypeScript og Tailwind CSS
2. T1.2a: Setup Payload CMS i Next.js projektet
3. T1.2b: Setup PostgreSQL database (Railway)
4. T1.3: Setup hosting og domain (Next.js hosting besluttes)
5. T3.1: Implementer Payload CMS collections (blog posts, case studies, pages)
6. T4.1: Research newsletter platform (Mailchimp, ConvertKit, etc.)

---

## Decision: Database Provider Selection (T1.2b)

**Date:** 2025-01-27
**Context:** Valg af database provider for PostgreSQL database til Payload CMS.

### Evaluated Options

#### Option 1: Vercel Postgres
**Pros:**
- Tæt integration med Vercel hosting
- Inkluderet i Vercel Pro plan
- Nem setup hvis allerede på Vercel

**Cons:**
- Kræver Vercel Pro plan ($20/måned)
- Begrænsede gratis ressourcer (512 MB storage, 100 timer compute)
- Vercel-specifik adapter nødvendig

#### Option 2: Supabase
**Pros:**
- Generøs gratis tier (500 MB storage, 2 GB bandwidth)
- Nem setup og god dokumentation
- Standard PostgreSQL (ingen vendor lock-in)

**Cons:**
- Ekstern service (ikke integreret med hosting)
- Kan blive dyrere ved skalering

#### Option 3: Railway
**Pros:**
- Pay-as-you-go pricing (kun betal for hvad du bruger)
- 30 dages gratis prøveperiode med $5 kreditter
- Standard PostgreSQL (ingen vendor lock-in)
- Payload CMS template tilgængelig
- Brugeren er allerede fortrolig med platformen
- Fleksibel skalering

**Cons:**
- Minimum $1/måned efter prøveperiode
- Ekstern service (ikke integreret med hosting)

### Decision: Railway PostgreSQL

**Valgt provider:** Railway PostgreSQL

**Rationale:**
1. **Brugerens komfort:** Brugeren er allerede fortrolig med Railway platformen
2. **Kosteffektivitet:** Pay-as-you-go model betyder kun betaling for faktisk forbrug
3. **Fleksibilitet:** Standard PostgreSQL giver ingen vendor lock-in
4. **Integration:** Payload CMS template tilgængelig på Railway
5. **Skalering:** Nemt at skalere op/ned baseret på behov

**Pricing:**
- 30 dages gratis prøveperiode med $5 kreditter
- Efter prøveperiode: $1/måned minimum
- Pay-as-you-go for faktisk forbrug (RAM, CPU, storage, egress)

**Consequences:**
- **Positive:** Standard PostgreSQL adapter kan bruges (ikke Vercel-specifik)
- **Positive:** Ingen vendor lock-in, kan migreres senere hvis nødvendigt
- **Positive:** Fleksibel pricing model
- **Negative:** Ekstra service at administrere (separat fra Next.js hosting)

---

## Decision: Next.js Hosting Provider Selection (T1.3)

**Date:** 2025-01-27
**Context:** Valg af hosting provider for Next.js applikation med Payload CMS.

### Evaluated Options

#### Option 1: Vercel
**Pros:**
- Native Next.js integration (oprettet af Next.js team)
- Zero-config deployment
- Excellent performance med edge network
- Generøs gratis tier
- Automatic HTTPS og CDN

**Cons:**
- Vercel-specifik features kan skabe lock-in
- Database hosting er separat (allerede på Railway)

#### Option 2: Railway
**Pros:**
- Samme platform som database (Railway PostgreSQL)
- Pay-as-you-go pricing (konsistent med database)
- Full control over deployment
- GitHub integration for CI/CD
- Support for custom domains
- Brugeren er allerede fortrolig med platformen

**Cons:**
- Ikke specifikt optimeret til Next.js (men understøtter det godt)
- Mindre edge network end Vercel

#### Option 3: Andet (Netlify, Render, etc.)
**Pros:**
- Forskellige pricing modeller
- Forskellige features

**Cons:**
- Yderligere platform at lære
- Database er allerede på Railway (separat platform)

### Decision: Railway

**Valgt provider:** Railway

**Rationale:**
1. **Konsistens:** Database er allerede på Railway (Railway PostgreSQL), så samlet hosting giver bedre oversigt og administration
2. **Brugerens komfort:** Brugeren er allerede fortrolig med Railway platformen
3. **Kosteffektivitet:** Pay-as-you-go pricing er konsistent med database hosting
4. **CI/CD:** Railway har native GitHub integration for automatisk deployment
5. **Fleksibilitet:** Full control over deployment og environment variables

**Pricing:**
- Pay-as-you-go model (konsistent med database)
- Betal kun for faktisk forbrug (RAM, CPU, bandwidth)
- Ingen minimum commitment

**Consequences:**
- **Positive:** Samlet platform for både app og database
- **Positive:** Konsistent pricing model
- **Positive:** Native GitHub integration for CI/CD
- **Positive:** Full control over deployment
- **Negative:** Ikke specifikt optimeret til Next.js (men understøtter det godt)
- **Negative:** Mindre edge network end Vercel (men acceptable for MVP)

**CI/CD Setup:**
- Railway GitHub integration aktiveret
- Automatic deployments ved push til main branch
- Preview deployments kan aktiveres for pull requests

**Domain Setup:**
- Domain (eskoubar.com) er tilgængelig men venter med setup
- Railway understøtter custom domains via Settings → Networking
- DNS konfiguration kan gøres når domain skal aktiveres

---

## Notes

- Stack valget er baseret på MVP requirements og user preferences (admin interface, data kontrol).
- Payload CMS er valgt fordi det er bygget på Next.js og giver self-hosted CMS med fuld data kontrol.
- PostgreSQL database giver fuld kontrol over data (user requirement).
- Railway PostgreSQL er valgt som database provider baseret på brugerens komfort og fleksible pricing.
- Railway er valgt som Next.js hosting provider for konsistens med database hosting og brugerens komfort.
- Payload CMS admin interface giver god UX til content management uden at skulle redigere filer.

