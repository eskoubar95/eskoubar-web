# Risks & Concerns

## Early-Stage Risks

### 1. Scope Creep
**Risk:** Projektet kan let udvide sig til at inkludere for mange features (e.g., komplekse booking systemer, CRM integration, etc.)
**Mitigation:** Holde fokus på core value: content + konvertering. Fase features ud.

### 2. Content vs. Sales Balance
**Risk:** For meget fokus på content kan skubbe salg i baggrunden, eller omvendt - for meget salg kan underminere tillid
**Mitigation:** Klar prioritering: Content først (awareness + newsletter), salg sekundært. Content er ikke direkte salgsdrivende, men bygger autoritet der kan drive salg organisk.

### 3. Teknisk Kompleksitet
**Risk:** Som developer kan man let over-engineere løsningen
**Mitigation:** Start simpelt, iterer baseret på faktisk brug

### 4. Brand Afhængighed
**Risk:** Personligt brand = afhængighed af enkeltperson. Hvis Nicklas ikke kan levere content/konsultation, stopper trafikken
**Mitigation:** Acceptabelt risiko for freelance model, men værd at være opmærksom på

### 5. Målgruppe Usikkerhed
**Risk:** Uklarhed om primær målgruppe (iværksættere vs. SMV'er) kan føre til generisk messaging der ikke rammer nogen
**Mitigation:** Klargøre målgruppe før design/messaging fase. MVP kan bygges med generisk messaging, men skal forfines før launch for effektiv konvertering.
**Status:** Ikke blokerende for MVP, men vigtigt før launch

## Planning-Discovered Risks

### 6. Newsletter Platform Lock-in
**Risk:** Valg af newsletter platform kan skabe lock-in eller kræve migration senere hvis platform ikke passer
**Mitigation:** Research platform grundigt før valg (T4.1), overvej abstraktion layer hvis muligt
**Status:** Moderes gennem grundig research i T4.1

### 7. Content Sustainability
**Risk:** At skabe 3-5 kvalitets blog posts kan tage længere tid end forventet, eller content frekvens kan være uholdbar
**Mitigation:** Start med realistisk content plan, fokus på kvalitet over kvantitet, overvej at lave nogle posts før launch
**Status:** Moderes gennem T6.3 (Content Creation) med realistisk estimate (L)

### 8. Database & CMS Complexity
**Risk:** Payload CMS + PostgreSQL tilføjer kompleksitet sammenlignet med Markdown files. Setup og vedligeholdelse kræver mere arbejde.
**Mitigation:** Payload CMS er bygget på Next.js (god integration), god dokumentation, start med simple collections. Database hosting via Railway (managed service) reducerer opsætningskompleksitet.
**Status:** Acceptabelt trade-off for admin interface og data kontrol (user requirements)

