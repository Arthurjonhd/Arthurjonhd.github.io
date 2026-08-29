# CLAUDE.md — DLAS Holdings Corp website

Guidance for future Claude Code sessions (and humans) working on this repo.
Read this before editing anything.

## What this is

A **100% static** marketing site for DLAS Holdings Corp: plain HTML5, one CSS
file, one small vanilla-JS file. **No frameworks, no build step, no npm
dependencies.** It runs identically from GitHub Pages, from a subfolder, or from
an nginx/Apache document root — copy the folder and you are done.

Live: <https://arthurjonhd.github.io>

### Hard rules

1. No build tooling. If a change needs compiling, it is the wrong change.
2. No external resources except **Google Fonts**. Every icon is inline SVG.
3. All internal links are **relative** (`about.html`, not `/about.html`), so the
   site works from any subpath.
4. The header and footer markup is **duplicated across pages and must stay
   byte-identical**, except for the active-nav marker (see below).
5. Content rule: never name a specific client, employer, or partner company.
   Describe experience generically ("hospitality venues", "licensed Florida
   healthcare agencies", "a beverage brand").
6. Everything must still be readable and navigable with JavaScript disabled.

## File map

```
/
├── index.html                  Home — hero, services grid, why-DLAS, CTA band
├── it-services.html            IT & Technology Services (priority service line)
├── patient-coordination.html   Patient Coordination (B2B, Florida agencies)
├── design-branding.html        Design & Branding
├── about.html                  About
├── contact.html                Contact form (Web3Forms) + direct email
├── 404.html                    Not-found page (noindex)
├── .nojekyll                   Tells GitHub Pages to serve files as-is
├── robots.txt                  Allow all + sitemap reference
├── sitemap.xml                 The six public pages
├── favicon.svg                 Navy rounded square, white "D", cyan node dot
├── CLAUDE.md                   This file
└── assets/
    ├── css/styles.css          The entire design system, one file
    ├── js/main.js              Nav, header shadow, reveals, footer year, form
    └── img/
        ├── logo.svg            Standalone wordmark for external use
        ├── og-cover.svg        Source for the social share image
        └── og-cover.png        1200×630 og:image (generated — see below)
```

## Design system

### Tokens

All colors, type, spacing and shadows are CSS custom properties on `:root` at
the top of `assets/css/styles.css`. **Never hard-code a brand color in a page.**

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#F6F8FB` | page background |
| `--surface` | `#FFFFFF` | cards, header, alternating sections |
| `--ink` | `#0A1F44` | headings, footer + CTA band background |
| `--text` | `#33415C` | body text |
| `--muted` | `#5B6B82` | secondary text |
| `--primary` | `#1D4ED8` | buttons, links, eyebrows |
| `--primary-d` | `#1E40AF` | hover |
| `--accent` | `#06B6D4` | topology nodes, icon-tile tint, brand dot |
| `--border` | `#E3E9F2` | hairlines |

Derived tints (`--primary-soft`, `--accent-wash`, `--ink-text`, …) sit directly
below the brand tokens. `--focus` is the focus-ring color and is overridden to
white inside `.section--ink` and `.site-footer`.

Every text/background pair in use passes WCAG AA (`node audit.js` checks this
live in the browser — see Testing).

### Type

- **Space Grotesk** 600/700 — headings and the wordmark (`--font-display`).
- **Inter** 400/500/600 — body copy (`--font-body`), fluid 16→18px, 1.6 leading.
- **JetBrains Mono** 500 — eyebrow labels, footer column titles, the 404 code
  and small meta lines (`--font-mono`). This is the only decorative type device;
  use it sparingly, always uppercase with wide tracking (`.eyebrow`).

Headings use `clamp()` so there are no per-breakpoint font-size overrides.

### The topology motif

DLAS connects three worlds, so thin connector lines and small node dots appear
in **exactly two places** — nowhere else:

1. `index.html` hero: the inline `<svg class="hero__topology">` background
   schematic (masked so it fades out behind the text).
2. `index.html` services grid: `.services__rail`, a CSS-drawn line with three
   nodes whose horizontal positions are computed from the grid gap so they land
   on the card centres. Shown only at ≥64em, where the grid is three columns.

Keep everything else quiet. Do not add the motif to inner pages.

### Components (in `styles.css`, section 7)

`.btn` (`--primary` / `--secondary` / `--invert`, `--sm` / `--lg`) · `.card`
(add `.card--link` when the whole card is a link) · `.icon-tile` · `.feature` ·
`.steps` + `.step` (CSS counters — use only for real sequences) · `.checklist` ·
`.note` · `.badge` · `.eyebrow` · `.lead` · `.section__head`.

Icons are inline `<svg class="icon" viewBox="0 0 24 24" fill="none"
stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
stroke-linejoin="round" aria-hidden="true" focusable="false">`. Keep that exact
signature so weights match across the site.

Motion: a single `.reveal` fade/slide on section entry plus hover states.
`prefers-reduced-motion: reduce` disables all of it.

## How to add a page

1. Copy the closest existing page (an inner service page is usually right).
2. Update `<title>`, `<meta name="description">`, `rel=canonical`, and the
   `og:`/`twitter:` title, description and URL. Titles stay under 65 characters,
   descriptions 70–175.
3. **Header/footer:** paste them unchanged. Move the active marker — the
   `is-active` class plus `aria-current="page"` — onto the new page's nav link,
   and remove it from the copied one. Nothing else in the shell may differ; the
   audit compares the blocks byte-for-byte after stripping those two markers.
4. Add the page to the nav list **in every page's header and footer** (six edits
   per list) only if it belongs in the main navigation.
5. Add a `<url>` entry to `sitemap.xml`.
6. Run the audit (below).

## How to add a section

Sections follow one shape:

```html
<section class="section">            <!-- or .section--surface / .section--ink -->
  <div class="container">            <!-- add .container--narrow for prose -->
    <div class="section__head reveal">
      <span class="eyebrow">Short label</span>
      <h2>Sentence-case heading</h2>
      <p>One supporting line.</p>
    </div>
    <div class="grid grid--3 reveal"> <!-- grid--2 / grid--3 / grid--4 -->
      …cards or features…
    </div>
  </div>
</section>
```

Alternate `.section` and `.section--surface` down the page so bands read
clearly, and end service pages with the navy `.cta-band`.

## Contact form (Web3Forms)

`contact.html` posts to `https://api.web3forms.com/submit`.

- `main.js` intercepts the submit, validates inline, and POSTs with `fetch()`;
  on success the form is replaced by the thank-you panel, on failure an inline
  error points at the direct email address.
- Without JS the form still posts natively (the script sets `novalidate` itself
  so native validation stays available when it is not running).
- `botcheck` is the honeypot; a checked box is dropped silently.
- The `access_key` hidden input carries the Web3Forms key that delivers to
  `dlasholdingscorp@gmail.com`. It is public by design — it authorises delivery
  to that inbox and nothing else. Reissue it at web3forms.com if the destination
  address changes. The direct `mailto:` link works regardless.

## Social share image

`assets/img/og-cover.png` (1200×630) is generated from `og-cover.svg`. To
regenerate after editing the SVG, render it in a browser that has the Google
Fonts loaded and screenshot at 1200×630 — for example with headless Chrome:

```bash
chrome --headless --hide-scrollbars --window-size=1200,630 \
  --screenshot=assets/img/og-cover.png assets/img/og-cover.svg
```

(The SVG carries its own `@import` for the fonts.)

## Testing

There is no test framework, by design. QA is a headless-Chrome audit script kept
outside the repo (see the session scratchpad: `cdp.js` + `audit.js`). It checks,
on every page at 360 / 768 / 1200px:

- header/footer byte-identity and exactly one active nav item per page;
- every internal link, asset reference and `#fragment` resolves;
- unique titles/descriptions, canonical, OG/Twitter tags, sitemap coverage;
- no horizontal overflow, one `h1`, no heading-level jumps;
- alt text / `aria-hidden` on every image and SVG, labelled form controls,
  no duplicate ids, accessible names on links and buttons;
- computed WCAG AA contrast for every text node;
- touch-target heights on mobile;
- a clean console.

Serve locally with `python -m http.server 8123` and open
<http://127.0.0.1:8123>. Also check the mobile menu, keyboard focus order, and
the form's error and success states by hand after layout changes.

## Deployment

The repo is the site. `main` branch root → GitHub Pages user site.

```bash
git add -A && git commit -m "Describe the change" && git push
```

Pages redeploys within a minute or two. Nothing is compiled, so what is in the
repo is exactly what ships.

**Future, deliberately not built yet:** a `CNAME` file plus DNS records for a
custom domain; self-hosting by copying the folder into an nginx/Apache root or
an `nginx:alpine` container; a `/es/` Spanish version; a portfolio page. Each
service page is self-contained so it can seed a standalone site later.
