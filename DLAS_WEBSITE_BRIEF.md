# DLAS Holdings Corp — Website Build Brief

> **How to use this file (Arturo):** put this file inside an empty project folder, open a terminal in that folder, run `claude`, and tell it:
> *"Read DLAS_WEBSITE_BRIEF.md and build, test, and deploy everything it describes."*

---

## 1. Mission & context

**Client:** DLAS Holdings Corp — a Miami-based company with three service lines, in this order of priority:

1. **IT & Technology Services** — computer/laptop repair, networking, Wi-Fi, small-business IT, AV, automation. Primary public-facing service.
2. **Patient Coordination** — administrative coordination services for licensed home health agencies and nurse registries in Florida (B2B).
3. **Design & Branding** — menu design, logos, and marketing materials for restaurants, beverage brands, and small businesses.

**Goal:** a professional public marketing site so prospective clients can find the company, understand its services, and get in touch. No e-commerce, no logins, no CMS — informational + lead capture only.

**Language:** English only.

**Audience:** homeowners and small businesses in Miami & South Florida (IT); home health agency administrators in Florida (coordination); small business owners (design). Remote support offered everywhere.

**Important content rule:** do **not** name any specific clients, employers, or partner companies anywhere on the site. Experience is described generically ("hospitality venues," "licensed Florida healthcare agencies," "a beverage brand").

---

## 2. Hard constraints (FIXED — do not deviate)

- **100% static**: plain HTML5 + CSS + minimal vanilla JS. **No frameworks, no build step, no npm dependencies.** Reason: the site must run identically on GitHub Pages today and on a self-hosted nginx/Apache box in Arturo's home lab later — copy the folder, done.
- **Multi-page** structure (see site map). Header/footer markup is duplicated across pages and must be kept byte-identical (except the active-nav class).
- **No external resources except Google Fonts.** All icons are inline SVG. No icon-font or JS library CDNs.
- **Responsive** mobile-first (test 360px / 768px / 1200px), **accessible** (semantic HTML, WCAG AA contrast, alt text, visible keyboard focus, `prefers-reduced-motion` respected), **fast** (Lighthouse ≥ 90 in all categories).
- All internal links **relative**, so the site works from a subfolder or any host.
- Also generate a concise **CLAUDE.md** documenting the file structure, design tokens, and how to add a page/section — so future Claude Code sessions stay consistent.

---

## 3. Repository & deployment (FIXED)

- GitHub username: **Arthurjonhd**
- Create a **public repo named exactly `Arthurjonhd.github.io`** (a GitHub Pages *user site* — publishes automatically from the `main` branch root; verify under Settings → Pages).
- Final URL: **https://arthurjonhd.github.io**
- Include a `.nojekyll` file at the root.
- Deployment: `git init` → commit → if the `gh` CLI is authenticated, `gh repo create Arthurjonhd.github.io --public --source=. --push`; otherwise print the exact manual commands for Arturo. After pushing, confirm the site is live (allow 1–2 minutes) and print the URL.
- **Future (do not build now):** custom domain = add a `CNAME` file + DNS records; home-lab hosting = copy the folder to the nginx/Apache web root (or `nginx:alpine` Docker container with a volume). Nothing in the code changes.

---

## 4. Site map & files

```
/
├── index.html                  Home
├── it-services.html            IT & Technology Services
├── patient-coordination.html   Patient Coordination
├── design-branding.html        Design & Branding
├── about.html                  About
├── contact.html                Contact (form + direct email)
├── 404.html
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── favicon.svg
├── CLAUDE.md
└── assets/
    ├── css/styles.css          (single stylesheet, CSS custom properties)
    ├── js/main.js              (mobile nav, form submit, small enhancements)
    └── img/                    (logo.svg, og-cover image, any graphics)
```

**Nav order:** Home · IT Services · Patient Coordination · Design & Branding · About · **Contact** (contact styled as a button). Mark the current page's nav item with an active state. Footer repeats quick links + contact info + service area.

---

## 5. Design system

**Direction:** light, clean, corporate-tech. Confident and trustworthy — a company you'd let into your office network — not a flashy startup and not a generic template. Whitespace is generous; typography does the talking. **No stock photos.** Visual interest comes from type, color, and the signature motif below.

### Signature motif — "the topology"
DLAS's story is *one partner connecting three worlds* (tech, healthcare admin, design). Express this with a subtle **network-topology motif**: thin connector lines and small node dots (cyan/blue on the light background), used in exactly two places:
1. In the **hero** as a restrained background schematic (light, low-contrast, must not hurt text legibility).
2. Connecting the **three service cards** on the home page (a thin line linking the cards through small nodes).

Nowhere else. Keep everything around it quiet and disciplined.

### Color tokens (CSS custom properties)
```css
--bg:        #F6F8FB;   /* page background */
--surface:   #FFFFFF;   /* cards, header */
--ink:       #0A1F44;   /* headings, footer background */
--text:      #33415C;   /* body text */
--muted:     #5B6B82;   /* secondary text */
--primary:   #1D4ED8;   /* buttons, links */
--primary-d: #1E40AF;   /* hover */
--accent:    #06B6D4;   /* nodes, small details, sparingly */
--border:    #E3E9F2;
```
Footer and one CTA band use `--ink` (dark navy) with light text as the page's anchor of contrast. Verify AA contrast for every text/background pair.

### Typography (Google Fonts)
- **Display / headings:** Space Grotesk (600, 700) — geometric, technical, slightly distinctive. Tight tracking on large sizes.
- **Body:** Inter (400, 500, 600) — 16–18px base, 1.6 line height.
- **Labels / eyebrows:** JetBrains Mono (500), small caps-style eyebrow labels above section headings (e.g. `IT SUPPORT`, `FOR AGENCIES`) — a quiet nod to the terminal. Use sparingly; this is the only decorative type device.

### Components
- Sticky white header, subtle shadow after scroll; hamburger menu below 768px.
- Buttons: primary (blue fill, white text, 8px radius), secondary (outline). Labels say what happens: "Send message", "Get in touch", "See IT services".
- Cards: white surface, 1px `--border`, soft shadow on hover, icon in a cyan-tinted rounded square.
- Wordmark: typographic SVG — **DLAS** in Space Grotesk 700, `--ink`, with a small cyan node-dot accent after the S; "HOLDINGS CORP" beneath in small letter-spaced JetBrains Mono. Favicon: navy rounded square with white "D" + cyan dot.
- Motion: at most a gentle fade/slide-up on section reveal and hover states. Respect `prefers-reduced-motion`. When in doubt, less.

---

## 6. Page-by-page content

Use this copy as written (light editing for flow is fine). Write any missing meta descriptions in the same style. Tone: plain verbs, specific, no hype.

### 6.1 Home — `index.html`
- `<title>`: `DLAS Holdings Corp | IT Support & Technology Services in Miami, FL`
- Meta description: `IT support, computer repair, networking, patient coordination for home health agencies, and professional design services in Miami & South Florida. Remote support available.`
- **Hero**
  - Eyebrow (mono): `MIAMI & SOUTH FLORIDA · REMOTE AVAILABLE`
  - H1: `Technology that works. A partner who answers.`
  - Sub: `From computer repair and Wi-Fi networks to patient coordination and brand design — DLAS Holdings Corp is the hands-on partner that keeps your home, business, or agency running.`
  - CTAs: `Get in touch` → contact.html · `Explore services` → #services
- **Services grid** (3 linked cards, connected by the topology motif):
  1. **IT & Technology** — `Computer and laptop repair, Wi-Fi and network setup, smart home and AV installs, and ongoing tech support for homes and small businesses. On-site or remote.` → it-services.html
  2. **Patient Coordination** — `Administrative coordination for licensed home health agencies and nurse registries: intake, scheduling follow-up, documentation, and bilingual communication with patients and families.` → patient-coordination.html
  3. **Design & Branding** — `Menu design, logos, and marketing materials for restaurants, beverage brands, and small businesses. Clean, print-ready work that makes you look professional.` → design-branding.html
- **Why DLAS** (4 short features):
  - `One partner, many skills` — tech, healthcare admin, and design under one roof, so you make one call.
  - `Bilingual service` — full support in English and Spanish.
  - `Enterprise experience, small-business care` — our founder maintains networks, AV, telephony, and security systems for hospitality venues and licensed Florida healthcare agencies.
  - `Remote or on-site` — quick remote sessions anywhere, on-site across Miami & South Florida.
- **CTA band** (navy): `Have a tech problem or a project in mind?` + `Get in touch`

### 6.2 IT & Technology Services — `it-services.html`
- H1: `IT & Technology Services`
- Intro: `Straightforward tech help for homes and small businesses — diagnosed honestly, fixed properly, explained in plain language.`
- Service blocks (each: icon, heading, 2–3 lines):
  1. **Computer & Laptop Repair** — diagnostics, hardware repair and upgrades (SSD, RAM), OS reinstalls, virus and malware removal, data backup and transfer.
  2. **Networks & Wi-Fi** — home and office Wi-Fi design, router and access-point setup, cabling, dead-zone fixes, guest networks.
  3. **Small Business IT** — workstation and printer setup, email and Microsoft 365 / Google Workspace, backups, security cameras (CCTV), digital signage.
  4. **Smart Home & AV** — TV and audio setup, streaming devices, smart home devices, conference-room and presentation tech.
  5. **Automation & Integrations** — custom automations that remove repetitive work: reports, spreadsheets, and messaging workflows built around how you already operate.
  6. **Remote Support** — fast remote sessions for anything that doesn't need a site visit.
- **How it works** (3 steps — a real sequence, so numbering is appropriate): `Tell us the problem → We diagnose and quote → We fix it, on-site or remote.`
- CTA: `Describe your problem` → contact.html

### 6.3 Patient Coordination — `patient-coordination.html`
- H1: `Patient Coordination for Home Health Agencies`
- Intro: `DLAS Holdings Corp provides professional patient-coordination support to licensed home health agencies and nurse registries in Florida — so your office stays organized, your schedules stay covered, and your patients stay cared for.`
- **What we handle:** patient intake and onboarding · scheduling and caregiver–patient matching follow-up · documentation and record upkeep · referral intake and follow-up calls · bilingual (English/Spanish) communication with patients and families · recurring reporting to agency management.
- **Why agencies choose DLAS:**
  - `Healthcare-agency experience` — we currently support licensed Florida agencies day to day.
  - `The tech edge` — because we're also an IT company, your coordination comes with better tools: organized records, automated reports, and fewer spreadsheets done by hand.
- Compliance line (small, near footer of the page): `DLAS Holdings Corp provides administrative coordination support only; we do not provide medical or nursing services.`
- CTA: `Ask about a coordination plan for your agency` → contact.html

### 6.4 Design & Branding — `design-branding.html`
- H1: `Design & Branding`
- Intro: `Clean, professional design for small businesses that need to look as good as they are — with print-ready files delivered.`
- Services: menu design (print and digital, including tasting and pairing menus for events) · logo and brand identity · business cards and flyers · social media graphics · presentation and document design.
- Line: `Recent work includes brand and menu design for a beverage brand's tasting events. Portfolio available on request.` (No client names.)
- CTA: `Start a design project` → contact.html

### 6.5 About — `about.html`
- H1: `About DLAS Holdings Corp`
- Copy: `DLAS Holdings Corp was founded in Miami by a computer engineer with more than a decade of hands-on experience supporting users, networks, and systems — first in enterprise IT support, and today across hospitality, healthcare, and small business. We believe in honest pricing, clear communication in English or Spanish, and actually answering when you call.`
- `<!-- TODO(Arturo): optionally add founder name and photo here later. -->`
- Service area: `Based in Miami, serving Miami-Dade, Broward, and South Florida. Remote support available everywhere.`

### 6.6 Contact — `contact.html`
- H1: `Let's talk`
- Sub: `Tell us what you need and we'll reply within one business day.`
- **Form fields:** Name*, Email*, Phone (optional), Service (select: IT & Technology / Patient Coordination / Design & Branding / Other), Message*. Submit button: `Send message`. Client-side required-field validation; inline success and error states (no redirect).
- **Direct contact:** `Prefer email? Write to dlasholdingscorp@gmail.com` (mailto link).
- Small badge: `Hablamos Español` `<!-- optional; Arturo can remove -->`
- Repeat service area line.
- `<!-- TODO(Arturo): add phone/WhatsApp link here when ready — one line. -->`

### 6.7 404 — `404.html`
Friendly, on-brand, one line + button back to Home.

---

## 7. Contact form wiring (Web3Forms)

- Form `POST`s to `https://api.web3forms.com/submit` via `fetch()` in `main.js`.
- Hidden inputs: `access_key` with placeholder value `WEB3FORMS_ACCESS_KEY_HERE`; `subject` = `New inquiry — dlasholdings website`; honeypot field `botcheck` for spam.
- On success: replace form with a thank-you message. On failure: inline error suggesting the direct email.
- **This is a manual step for Arturo** (see §9): until the real key is pasted in, the form renders but won't deliver — the direct email link works regardless. Leave a clear `TODO` comment at the placeholder.

---

## 8. SEO & metadata (every page)

- Unique `<title>` and meta description per page (Home's provided above; match the style).
- Canonical URL tags (`https://arthurjonhd.github.io/...`).
- Open Graph + Twitter card tags. Create a simple branded og-cover image (1200×630: navy background, wordmark, one-line tagline). Generate a real PNG if tooling allows; otherwise leave an SVG + a TODO note.
- JSON-LD on Home: `ProfessionalService` — name `DLAS Holdings Corp`, url, email `dlasholdingscorp@gmail.com`, `areaServed`: Miami-Dade County, Broward County, South Florida; `knowsLanguage`: English, Spanish; description.
- `sitemap.xml` with all six pages; `robots.txt` allowing all + sitemap reference.

---

## 9. Manual TODOs for Arturo (print this list at the end of the build)

1. **Web3Forms key:** create a free access key at web3forms.com using `dlasholdingscorp@gmail.com`, paste it over `WEB3FORMS_ACCESS_KEY_HERE` in `contact.html`, commit, push.
2. **Google Search Console:** add `https://arthurjonhd.github.io` as a property, verify (HTML file or meta tag), submit `sitemap.xml`. This is what gets the site indexed so people can find it by searching.
3. **Review all copy**, especially the About page and service descriptions.
4. Optional: add phone/WhatsApp to the Contact page; add founder name/photo to About.

---

## 10. Quality checklist (verify before calling it done)

- [ ] All pages share identical header/footer; correct active nav state on each page
- [ ] Responsive at 360 / 768 / 1200px; hamburger menu works; no horizontal scroll
- [ ] Every internal link resolves; form validates; success/error states work
- [ ] Lighthouse ≥ 90 in Performance, Accessibility, Best Practices, SEO
- [ ] All images/SVGs have alt text or `aria-hidden`; AA contrast throughout; visible focus states
- [ ] Site is fully readable and navigable with JavaScript disabled (form enhancement excepted)
- [ ] favicon, 404, robots.txt, sitemap.xml, .nojekyll, CLAUDE.md all present
- [ ] Repo pushed to `Arthurjonhd.github.io`, GitHub Pages live, final URL printed
- [ ] No client, employer, or partner names anywhere in the copy

---

## 11. Future roadmap (do NOT build now — just keep the architecture friendly to it)

- Custom domain (CNAME + DNS) once purchased.
- Self-hosting on home-lab nginx (or Docker) — zero code changes.
- Portfolio page with real client work, once clients approve.
- Possible Spanish version under `/es/`.
- Service lines may later split into separate companies/sites — keep each service page self-contained so it can seed a standalone site.
