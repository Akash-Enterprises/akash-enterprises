# Akash Enterprises — Official Business Website

[![CI – HTML & SEO Validation](https://github.com/Akash-Enterprises/akash-enterprises/actions/workflows/ci.yml/badge.svg)](https://github.com/Akash-Enterprises/akash-enterprises/actions/workflows/ci.yml)
[![Live Site](https://img.shields.io/badge/live-akash--enterprises.vercel.app-brightgreen)](https://akash-enterprises.vercel.app)

Official website for **Akash Enterprises** — a B2B and retail supplier of industrial tarpaulins, packaging materials, agro-textiles, ropes, safety tapes, and industrial sheets. Founded 1991, based in Kerala, pan-India supply.

**Live site:** [akash-enterprises.vercel.app](https://akash-enterprises.vercel.app)  
**Phone:** +91-80898-22421 | **WhatsApp:** [wa.me/918089822421](https://wa.me/918089822421)

---

## Quick Start

```bash
git clone https://github.com/Akash-Enterprises/akash-enterprises.git
cd akash-enterprises
open index.html   # no build step — pure HTML/CSS/JS
```

No npm. No build tools. No dependencies. Open any `.html` file directly in a browser.

---

## Stack & Architecture

| Layer | Choice | Reason |
|---|---|---|
| HTML | Semantic HTML5 | SEO, accessibility, zero build step |
| CSS | Single `css/style.css` | No framework, design token system via CSS vars |
| JS | Single `js/main.js` | Vanilla ES6 IIFEs, no dependencies |
| Hosting | Vercel (auto-deploy from `main`) | Free tier, global CDN, instant deploy |
| Schema | JSON-LD (inline) | Product, LocalBusiness, Article, FAQPage |
| CI | GitHub Actions | validate.py + check_links.py + check_sitemap.py |

---

## Design Tokens (CSS Variables)

```css
--primary: #b11226        /* brand RED — CTAs, buttons, links ONLY */
--primary-dark: #7d0c1a
--dark: #0b0f14
--charcoal: #111827
--charcoal-soft: #1f2937
--text-light: #e5e7eb
--text-muted-light: #9ca3af
--text-dark: #111827      /* headings always this — never --primary */
--text-muted: #6b7280
--bg-main: #ffffff
--bg-soft: #f6f7f9
--radius: 10px
--shadow-soft / --shadow-strong
--transition: 0.3s cubic-bezier(.4,0,.2,1)
```

> ⚠️ `--accent`, `--muted`, `--bg-light`, `--space-xl` do **not** exist. Never use them.

---

## Repo Structure

```
akash-enterprises/
├── index.html                   # Homepage
├── about.html                   # About page (35 years copy, supply grid, process)
├── 404.html
├── sitemap.xml                  # 45 URLs — update when adding pages
├── robots.txt                   # 14 AI crawlers explicitly allowed
├── llms.txt                     # AEO/AI site guide
├── vercel.json                  # Headers, cache, HSTS
├── googlead28f9144d787768.html  # Search Console verification
├── categories/                  # 6 category pages (product carousel)
│   ├── industrial-tarpaulins.html
│   ├── agro-textiles.html
│   ├── packaging-logistics.html
│   ├── ropes-cordage.html
│   ├── safety-adhesives.html
│   └── industrial-sheets.html
├── products/                    # 34 product pages
├── blog/
│   ├── index.html               # Blog listing (CollectionPage schema)
│   ├── tarpaulin-gsm-guide.html # FAQPage + Article schema
│   └── packing-materials-guide.html
├── css/style.css                # ~910 lines — single stylesheet
├── js/main.js                   # ~234 lines — lazy-load, nav, lightbox, carousel + auto-slide
├── images/
│   ├── home/homepage-hero-agro-protection.jpg
│   ├── categories/              # 6 cover images
│   └── products/                # 34 folders, 2–10 images each
├── docs/
│   ├── ADDING_PRODUCTS.md
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── SEO_GUIDE.md
└── .github/
    ├── workflows/ci.yml
    ├── scripts/validate.py
    ├── scripts/check_links.py
    └── scripts/check_sitemap.py
```

---

## Product Catalogue (34 SKU's, 6 Categories)

| Category | Products |
|---|---|
| Industrial Tarpaulins | hdpe, canvas, cross-lamination, nylon, geo-membrane |
| Agro-Textiles | shade-net, shade-net-clips, weed-mat, car-bike-cover, rain-poncho |
| Packaging & Logistics | bopp-tapes, stretch-film, bubble-rolls, corrugated-roll, woven-sacks, garbage-bags, strapping-kit |
| Ropes & Cordage | pp-ropes-3-strand, nylon-rope, mooring-rope, sutli-pp-twine, nylon-thread, webbing-belt |
| Safety & Adhesives | caution-tape, reflective-tape, anti-skid-tape, masking-tape, tarpaulin-repair-tape |
| Industrial Sheets | ldpe-sheets, pvc-clear-sheet, floor-protection-sheet, cutting-board, eyelets, eyelet-press-machine |

---

## Architecture Decisions (ADRs)

| # | Decision |
|---|---|
| ADR-001 | No frameworks — pure HTML/CSS/JS, zero build step |
| ADR-002 | Single `css/style.css` — all styles appended with section comments |
| ADR-003 | Single `js/main.js` — all JS as IIFEs |
| ADR-004 | Red (`--primary`) for interactive elements only — headings always `--text-dark` |
| ADR-005 | Carousel architecture: `.carousel-wrap > .carousel-viewport > .carousel-track > .carousel-card` |
| ADR-006 | No fabricated facts — founding year confirmed 1991 (February) |
| ADR-007 | Sitemap manually maintained — update when adding pages |

---

## CI / Validation

```bash
python3 .github/scripts/validate.py        # HTML structure + title length ≤60
python3 .github/scripts/check_links.py     # All internal hrefs resolve
python3 .github/scripts/check_sitemap.py   # sitemap.xml covers all pages
```

**Current status:** ✅ 47 HTML files pass | ✅ All links valid | ✅ Sitemap 45 URLs healthy

Runs automatically on every push to `main` via GitHub Actions.

---

## Adding a New Product

See [`docs/ADDING_PRODUCTS.md`](docs/ADDING_PRODUCTS.md) for the step-by-step template.  
Key steps: copy a similar product HTML, update all 12 data fields, add images to `images/products/<slug>/`, add to `sitemap.xml`, add to parent category carousel.

---

## Deployment

Vercel auto-deploys on every push to `main`. No manual step required.  
See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for domain setup and environment variables.

---

## Pending Work

| Priority | Task |
|---|---|
| 🔴 | Image compression — hero 2.9MB, many >500KB. Use squoosh.app → WebP <150KB |
| 🔴 | Custom domain — add in Vercel settings; update all canonical/OG/sitemap URLs |
| 🟠 | Contact/enquiry form — Formspree free tier, 5-field |
| 🟠 | Google Analytics 4 — currently zero traffic visibility |
| 🟡 | Testimonials + Review schema — 3 real buyer quotes |
| 🟡 | 2 more blog guides — PP ropes for cargo; shade net selection |
| 🟡 | `availability: InStock` in all Product schemas — enables Google Shopping |
| 🟢 | WhatsApp Business API catalogue integration |

---

## Business Info

| Field | Value |
|---|---|
| Company | Akash Enterprises |
| Founded | February 1991 |
| Location | Kerala, India |
| Phone | +91-80898-22421 |
| WhatsApp | wa.me/918089822421 |
| Email | akash.enterprises.contact@gmail.com |
| Maps | [Google Maps](https://maps.app.goo.gl/p9iRKo3NTLmXTcs16) |
| GSC | Verified via googlead28f9144d787768.html |
