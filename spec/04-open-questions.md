# Open Questions

## Resolved Questions (Besvaret)

### 1. Primært Formål ✓
**Beslutning:** Primært formål er awareness og opbygge newsletter signups. Sekundært er at konvertere potentielle salg (freelance opgaver).
**Konsekvens:** Newsletter sign-up system får højeste prioritet i MVP. Salgskonvertering er sekundær.

### 2. Konverteringsmekanisme ✓
**Beslutning:** Kontaktformular til at begynde med.
**Konsekvens:** MVP skal inkludere kontaktformular. Booking system eller andre mekanismer kan tilføjes senere.

### 3. Content Strategi ✓
**Beslutning:** Blog/newsletter skal give indblik indenfor kerneområde og hjælpe samt guide (f.eks. hvordan man bruger Cursor mere effektivt, hvordan man bruger AI til at lave gode produktbilleder osv.). Content er ikke direkte salgsdrivende.
**Konsekvens:** Content fokus på praktisk, værdifuld guidance der bygger autoritet. Ingen direkte salgs-pitch i content.

### 4. Projekt Prioritering ✓
**Beslutning:** Brand gennem content (primært). Stadig lidt usikkerhed, men tænker brand først.
**Konsekvens:** MVP prioriterer content infrastructure og newsletter signup over avancerede salgsfeatures.

## Medium-Impact Questions (Besvar før launch)

### 5. Portfolio/Case Studies
**Spørgsmål:** Skal der være eksisterende case studies/portfolio på launch, eller kan det bygges løbende?
**Påvirkning:** Launch timeline og initial content. Hvis på launch → længere udviklingstid. Hvis løbende → hurtigere launch, men mindre social proof.
**Kontekst:** Portfolio/case studies er nævnt i scope som "conditional in-scope" - beslutning påkrævet før launch.

### 6. Newsletter Platform
**Spørgsmål:** Hvilken platform til newsletter? (e.g., Mailchimp, ConvertKit, custom solution)
**Påvirkning:** Teknisk integration, omkostninger, og funktionalitet. Beslutning påkrævet før implementering af newsletter sign-up system.

### 7. Content Frekvens
**Spørgsmål:** Hvor ofte skal nyt content udgives? (blog posts, newsletter sends)
**Påvirkning:** Content management workflow, forventninger, og bæredygtighed. Påvirker ikke MVP scope, men vigtigt for langtidsstrategi.

## Low-Impact Questions (Besluttes i planfasen)

### 8. Teknisk Stack ✓
**Beslutning:** Next.js (App Router) + TypeScript + Tailwind CSS + Markdown files + Vercel hosting
**Konsekvens:** Se `spec/05-decisions.md` for detaljeret begrundelse.

### 9. Hosting & Domain
**Spørgsmål:** Hvor skal Next.js applikationen hostes? Hvilket domæne?
**Påvirkning:** Infrastruktur setup og omkostninger. Database er besluttet (Railway), men Next.js hosting er endnu åben.
**Delvist besvaret:** Database provider er besluttet (Railway PostgreSQL). Next.js hosting kan være Vercel, Railway, eller andet.
