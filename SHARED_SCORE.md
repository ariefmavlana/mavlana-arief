# 🎼 SHARED SCORE — ENTERPRISE SEO & MULTI-AGENT ORCHESTRATION

> **Project:** `mavlana-arief` (Arief Maulana Enterprise Portfolio)
> **Production Domain:** `https://mavlana.space`
> **Orchestrator:** Antigravity (Principal Software Architect & Lead Agentic Engineer)
> **Target Standard:** Enterprise-Grade • Zero Gaps • Zero Halusinasi • Zero Security/SEO Gaps • Zero Regression

---

## 1. ORCHESTRATION ROLES & DELEGATION MATRIX

| Persona | Role | Responsibility | Status |
|:---|:---|:---|:---|
| **LEAD** | Principal Architect | SEO strategy design, JSON-LD schema definition, Keyword strategy & final gatekeeping | ✅ COMPLETE |
| **CODER** | Systems Executor | Implementation of `index.html` meta tags, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `SEOHead.jsx` | ✅ COMPLETE |
| **CODER-PRO** | Taste & UI Harmonizer | Dynamic JSON-LD injection (`FAQPage`, `Person`, `ProfessionalService`), FAQ UI section | ✅ COMPLETE |
| **REVIEWER** | Quality Audit | Thermo-Nuclear Review (Fidelity, Correctness, Taste, Build verification) | ✅ VERIFIED |

---

## 2. TARGETED KEYWORD DOMINANCE MATRIX

| Target Query | On-Page Optimization Strategy | Target Schema / Tag |
|:---|:---|:---|
| `Arief Maulana` / `arief maulana` | Primary Title, Meta Description, Person Schema, Og:Title, Alt Attributes | `Person.name` |
| `ariefmavlana` / `freelance ariefmavlana` | Meta Keywords, Person Schema `alternateName`, Canonical URL, Social Links | `Person.alternateName` |
| `fullstack developer` | H1 Tag, Tagline, Title Meta, Experience Keywords | `Person.jobTitle` |
| `fullstack developer bandung` | Geo Meta Tags (`ID-JB`, `Bandung`), ProfessionalService Schema, FAQ Content | `ProfessionalService.address` |
| `jasa web bandung` / `jasa pembuatan website bandung` | Service Title & Description, ProfessionalService Schema, FAQ Accordion | `ProfessionalService.name` |
| `freelance fullstack developer bandung` | Metadata Keywords, Service Catalog, Bio Text, FAQ Page Schema | `FAQPage` & `OfferCatalog` |

---

## 3. SINGLE SOURCE OF TRUTH — ARCHITECTURAL SPECIFICATION

### A. Meta & Social Graph Specification
- **Primary Domain:** `https://mavlana.space` (Canonical Base URL)
- **Title Pattern:** `Arief Maulana (ariefmavlana) — Freelance Fullstack Developer & AI Engineer Bandung | Jasa Pembuatan Website`
- **Description:** `Official portfolio & Jasa Pembuatan Website profesional oleh Arief Maulana (ariefmavlana) — Freelance Fullstack Developer & AI Engineer berbasis di Bandung, Indonesia. Spesialis React, Next.js, Node.js, Python, TensorFlow & Enterprise Cloud Architecture.`
- **Theme Color:** `#030712` (Cosmic Dark Slate)
- **Robots Directives:** `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
- **Geo Tags:** `geo.region: ID-JB`, `geo.placename: Bandung`, `geo.position: -6.917464;107.619123`

### B. Structured Data (JSON-LD Schemas)
1. **`Person` Schema:**
   - Name: Arief Maulana
   - Alternate Names: `["ariefmavlana", "arief maulana", "freelance ariefmavlana", "Arief Maulana Bandung"]`
   - Job Title: Freelance Fullstack Developer & AI Engineer
   - Location: Bandung, West Java, Indonesia (`ID-JB`)
   - Social Graph Links (`sameAs`):
     - `https://github.com/ariefmavlana`
     - `https://linkedin.com/in/ariefmavlana`
     - `https://x.com/ariefmavvlana`
     - `https://instagram.com/ariefmavlana`
2. **`ProfessionalService` Schema:**
   - Name: Arief Maulana — Jasa Pembuatan Website & Fullstack Developer Bandung
   - Telephone: `+6287776734038` | Email: `ariefmavlana8@gmail.com`
   - Price Range: `$$` | Geo: `-6.917464, 107.619123`
   - Area Served: Bandung, Jawa Barat, Indonesia, Worldwide (Remote)
3. **`FAQPage` Schema (Google Rich Snippets):**
   - Injected Questions: Profil Arief Maulana, Jasa Pembuatan Website Bandung, Tech Stack, Timelines, Kontak
4. **`WebSite` & `ProfilePage` Schema:**
   - Main Entity: `#person` | InLanguage: `["en-US", "id-ID"]`

---

## 4. TASK EXECUTION TRACKER

- [x] **Phase 1: Domain Update to mavlana.space** — All canonical, sitemap, robots, and schemas updated to `mavlana.space`.
- [x] **Phase 2: FAQ Component & Rich Snippets** — Created `faqs.js`, `FAQ.jsx`, and injected `FAQPage` JSON-LD schema.
- [x] **Phase 3: Social Identity Linking (SameAs Graph)** — Mapped GitHub, LinkedIn, Instagram, and X to Person Schema.
- [x] **Phase 4: Thermo-Nuclear Audit & Build Validation** — `npm run build` passed in 5.80s, zero errors.
