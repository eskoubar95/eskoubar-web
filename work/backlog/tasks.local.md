# Local Tasks

## M1: Foundation & Setup

### T1.1: Research & Choose Tech Stack
**Description:** Research og vælg teknisk stack baseret på requirements (blog, forms, newsletter integration, hosting).
**Acceptance:** Stack valgt, dokumenteret med begrundelse i spec eller notes.
**Dependencies:** None
**Estimate:** M
**Risk Mitigation:** For Risk #3 (Teknisk Kompleksitet) - vælg simpelt stack, undgå over-engineering.

### T1.2: Setup Development Environment
**Description:** Opsæt Next.js project med TypeScript og Tailwind CSS. Installer dependencies.
**Acceptance:** `npm install` fungerer, Next.js development server kan køre, Tailwind CSS er konfigureret.
**Dependencies:** T1.1
**Estimate:** S

### T1.2a: Setup Payload CMS
**Description:** Integrer Payload CMS i Next.js projektet. Konfigurer Payload CMS med basic setup.
**Acceptance:** Payload CMS admin interface er tilgængelig, kan logge ind, basic konfiguration fungerer.
**Dependencies:** T1.2
**Estimate:** M

### T1.2b: Setup Database
**Description:** Opsæt PostgreSQL database (Vercel Postgres, Supabase, eller lignende). Konfigurer database connection i Payload CMS.
**Acceptance:** Database er oprettet, Payload CMS kan connecte til database, connection testet.
**Dependencies:** T1.2a
**Estimate:** M

### T1.3: Setup Hosting & Domain
**Description:** Konfigurer hosting og domain. Opsæt CI/CD pipeline hvis relevant.
**Acceptance:** Domain peger på hosting, kan deploye "Hello World" til production.
**Dependencies:** T1.1
**Estimate:** M

### T1.4: Initialize Project Structure
**Description:** Opret basic project structure (folders, config files, README).
**Acceptance:** Project structure følger best practices for valgt stack, README opdateret.
**Dependencies:** T1.2
**Estimate:** S

---

## M2: Core Infrastructure

### T2.1: Setup Routing & Navigation
**Description:** Implementer routing system og navigation menu.
**Acceptance:** Navigation fungerer, kan navigere mellem sider, routing virker.
**Dependencies:** T1.4
**Estimate:** S

### T2.2: Implement Responsive Layout
**Description:** Byg responsive layout system (mobile, tablet, desktop breakpoints).
**Acceptance:** Layout fungerer på alle screen sizes, testet på minimum 3 devices.
**Dependencies:** T2.1
**Estimate:** M

### T2.3: Design System & Branding
**Description:** Implementer design system (colors, typography, spacing) og branding.
**Acceptance:** Konsistent styling gennem hele sitet, branding synlig.
**Dependencies:** T2.2
**Estimate:** M

### T2.4: Footer Implementation
**Description:** Implementer footer med links (privacy, terms, social links hvis relevant).
**Acceptance:** Footer vises på alle sider, links fungerer.
**Dependencies:** T2.1
**Estimate:** S

---

## M3: Content System (Blog)

### T3.1: Payload CMS Blog Collection
**Description:** Opret Payload CMS collection for blog posts med fields (title, content, slug, date, author, tags, etc.).
**Acceptance:** Blog collection er oprettet i Payload CMS, kan oprette/edit blog posts via admin interface, data gemmes i database.
**Dependencies:** T1.2b, T2.1
**Estimate:** M

### T3.2: Blog Listing Page
**Description:** Implementer blog listing page med alle posts, pagination hvis nødvendigt.
**Acceptance:** Alle blog posts vises på listing page, kan klikke til individuelle posts.
**Dependencies:** T3.1
**Estimate:** M

### T3.3: Individual Blog Post Page
**Description:** Implementer individual blog post page med full content, date, author.
**Acceptance:** Blog post vises korrekt, navigation tilbage til listing virker.
**Dependencies:** T3.1, T3.2
**Estimate:** M

### T3.4: SEO Meta Tags
**Description:** Implementer SEO meta tags (title, description, OG tags) for blog posts.
**Acceptance:** Meta tags vises korrekt i browser, SEO tools kan læse dem.
**Dependencies:** T3.3
**Estimate:** S

### T3.5: Content Management Workflow
**Description:** Etabler workflow for at tilføje nye blog posts via Payload CMS admin interface. Opret test posts.
**Acceptance:** Dokumentation for hvordan man tilføjer nye posts via admin interface, minimum 1 test post oprettet og synlig på website.
**Dependencies:** T3.4
**Estimate:** S

### T3.6: Payload CMS Case Studies Collection (Conditional)
**Description:** Opret Payload CMS collection for case studies/portfolio (hvis besluttet at inkludere på launch).
**Acceptance:** Case studies collection er oprettet i Payload CMS, kan oprette/edit case studies via admin interface.
**Dependencies:** T3.1
**Estimate:** M
**Note:** Conditional - kun hvis case studies skal være på launch (besluttes før M6)

---

## M4: Newsletter Integration

### T4.1: Choose Newsletter Platform
**Description:** Research og vælg newsletter platform (Mailchimp, ConvertKit, etc.) baseret på features og omkostninger.
**Acceptance:** Platform valgt, account oprettet, API keys/credentials klar.
**Dependencies:** None (kan starte tidligt)
**Estimate:** S
**Risk Mitigation:** For Risk #2 (Content vs. Sales Balance) - vælg platform der understøtter primært formål (newsletter signups).

### T4.2: Newsletter Sign-up Form Component
**Description:** Implementer newsletter sign-up form component med email input og submit button.
**Acceptance:** Form component vises korrekt, styling matcher design system.
**Dependencies:** T2.3, T4.1
**Estimate:** S

### T4.3: Email Validation
**Description:** Implementer client-side email validation.
**Acceptance:** Invalid emails vises fejl, valid emails accepteres.
**Dependencies:** T4.2
**Estimate:** S

### T4.4: Newsletter Platform Integration
**Description:** Integrer sign-up form med newsletter platform API.
**Acceptance:** Form submission tilføjer email til newsletter platform, success/error feedback vises.
**Dependencies:** T4.2, T4.3
**Estimate:** M

### T4.5: End-to-End Testing
**Description:** Test newsletter sign-up flow end-to-end (submit → platform → confirmation).
**Acceptance:** Test signup virker, email modtages i platform, success message vises.
**Dependencies:** T4.4
**Estimate:** S

---

## M5: Contact & Brand Pages

### T5.1: Contact Form Component
**Description:** Implementer contact form component (name, email, message fields).
**Acceptance:** Form component vises korrekt, styling matcher design system.
**Dependencies:** T2.3
**Estimate:** S

### T5.2: Form Validation & Spam Protection
**Description:** Implementer form validation og spam protection (CAPTCHA eller lignende).
**Acceptance:** Invalid inputs vises fejl, spam protection aktiv, form kan ikke submit uden validation.
**Dependencies:** T5.1
**Estimate:** M
**Risk Mitigation:** For Risk #1 (Scope Creep) - hold spam protection simpelt, undgå komplekse løsninger.

### T5.3: Contact Form Submission Handling
**Description:** Implementer form submission handling: gem data i Payload CMS database collection og send email notification til Nicklas.
**Acceptance:** Form submission gemmes i database, email sendes til Nicklas med formular data, data kan ses i Payload CMS admin interface.
**Dependencies:** T5.1, T5.2, T1.2b
**Estimate:** M

### T5.4: "Om mig" Page
**Description:** Implementer "Om mig" page med information om Nicklas.
**Acceptance:** Page vises korrekt, content er læsbart, navigation virker.
**Dependencies:** T2.1
**Estimate:** S

### T5.5: "Services" Page
**Description:** Implementer "Services" page med liste over services.
**Acceptance:** Page vises korrekt, services er tydeligt præsenteret, navigation virker.
**Dependencies:** T2.1
**Estimate:** S

---

## M6: Polish & Launch

### T6.1: SEO Optimization
**Description:** Implementer SEO optimering (sitemap, structured data, meta tags for alle sider).
**Acceptance:** Sitemap genereres, structured data valideret, alle sider har meta tags.
**Dependencies:** M3, M4, M5
**Estimate:** M

### T6.2: Performance Optimization
**Description:** Optimer performance (image optimization, code splitting, caching).
**Acceptance:** Page load time < 3 sekunder, Lighthouse score > 80.
**Dependencies:** M3, M4, M5
**Estimate:** M

### T6.3: Content Creation (Blog Posts)
**Description:** Skriv og publicer minimum 3-5 blog posts med værdifuldt indhold.
**Acceptance:** Minimum 3-5 blog posts publiceret, content er kvalitet og relevant.
**Dependencies:** T3.5
**Estimate:** L

### T6.4: Cross-Device Testing
**Description:** Test website på forskellige devices og browsers.
**Acceptance:** Website fungerer korrekt på minimum 3 devices (mobile, tablet, desktop) og 2 browsers.
**Dependencies:** M3, M4, M5
**Estimate:** S

### T6.5: Final Testing & Launch
**Description:** Gennemgå alle features, fix bugs, og launch til production.
**Acceptance:** Alle features testet, ingen kritiske bugs, website er live og tilgængelig.
**Dependencies:** T6.1, T6.2, T6.3, T6.4
**Estimate:** M

---

## Risk Mitigation Tasks

### RM1: Scope Control Checkpoint
**Description:** Review scope før hver milestone, bekræft at ingen scope creep er sket.
**Acceptance:** Scope review gennemført, ingen unødvendige features tilføjet.
**Dependencies:** None (recurring task)
**Estimate:** S
**Related Risk:** #1 (Scope Creep)

### RM2: Content Strategy Validation
**Description:** Valider at content strategy følger spec (ikke direkte salgsdrivende, praktisk guidance).
**Acceptance:** Content review gennemført, content matcher spec requirements.
**Dependencies:** T6.3
**Estimate:** S
**Related Risk:** #2 (Content vs. Sales Balance)

### RM3: Technical Simplicity Review
**Description:** Review teknisk implementation, bekræft at løsningen ikke er over-engineered.
**Acceptance:** Technical review gennemført, løsning er simpel og vedligeholdbar.
**Dependencies:** M2 (kan gentages)
**Estimate:** S
**Related Risk:** #3 (Teknisk Kompleksitet)

---

## Notes
- Estimates: S = Small (1-4 timer), M = Medium (4-8 timer), L = Large (8+ timer)
- M3, M4, og M5 kan delvist arbejdes på parallelt efter M2
- Portfolio/case studies tasks tilføjes hvis besluttet at inkludere på launch

