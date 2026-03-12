# Architecture Documentation

## Overview

Akash Enterprises website is a **zero-dependency static website**. No framework, no build step, no backend. The simplicity is intentional — this keeps maintenance costs near zero and ensures the site works for any contributor regardless of technical skill.

---

## File Architecture

```
Root
├── index.html          → Homepage (entry point)
├── 404.html            → Custom error page
├── sitemap.xml         → Machine-readable page index
├── robots.txt          → Crawler directives
│
├── categories/         → Category landing pages (6)
│   Each page: Hero with buying guide + Product grid linking to products/
│
├── products/           → Individual product pages (34)
│   Each page: SEO head + Breadcrumb + Hero + Gallery + Info + FAQ + WhatsApp CTA
│
├── css/style.css       → Single stylesheet (all styles in one file)
│   Structure:
│   - Design tokens (:root CSS variables)
│   - Reset + base
│   - Header + mobile hamburger nav
│   - Breadcrumb
│   - Hero section
│   - Info grid (What We Do / How We Work)
│   - Category sections + card grid
│   - Product layout + gallery
│   - Lightbox (CSS-managed)
│   - Contact + Footer
│   - WhatsApp float
│   - 404 page
│   - Responsive breakpoints (1024, 768, 640)
│
├── js/main.js          → Single JS file (~3KB, no deps)
│   Features:
│   - Image fade-in (opacity: 0 → 1 on load)
│   - Hamburger toggle (open/close + aria-expanded)
│   - Product image lightbox (click gallery image → overlay)
│
└── images/             → All static images (43MB total)
    ├── home/           → Hero background
    ├── categories/     → Cover images for 6 categories
    └── products/       → Photo galleries (per product folder)
```

---

## Design Tokens (CSS Variables)

All colours, shadows, and transitions are defined once in `:root`:

```css
--primary: #b11226        /* Akash red — CTAs, links, accents */
--primary-dark: #7d0c1a   /* Hover state for primary */
--dark: #0b0f14           /* Footer background */
--charcoal: #111827       /* Dark section backgrounds */
--text-light: #e5e7eb     /* Text on dark backgrounds */
--text-muted: #6b7280     /* Secondary text on light */
--bg-main: #ffffff        /* Page background */
--bg-soft: #f6f7f9        /* Light section background */
--radius: 10px            /* Card border radius */
--shadow-soft: ...        /* Card resting shadow */
--shadow-strong: ...      /* Card hover shadow */
--transition: 0.3s cubic-bezier(.4,0,.2,1)
```

To change the brand colour site-wide, change only `--primary`.

---

## Page Structure (every product page)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- SEO: title, description, canonical, OG, schema JSON-LD -->
  <!-- Performance: preload for hero images -->
  <!-- CSS link -->
</head>
<body>
  <header>        <!-- Sticky header + hamburger nav -->
  <nav breadcrumb>  <!-- Home > Category > Product -->
  <section hero>  <!-- Product name + short intro -->
  <section detail>
    <div product-layout>
      <div gallery>  <!-- 2-column image grid with lightbox -->
      <div info>     <!-- Overview, Features, Specs, FAQs -->
    </div>
  </section>
  <footer>
  <a whatsapp-float>  <!-- Fixed WhatsApp CTA with pre-filled message -->
  <script main.js>
</body>
```

---

## ADR-001: Pure HTML/CSS/JS (No Framework)

- **Status:** Accepted
- **Date:** 2025
- **Decision:** Build with zero framework, zero build tools
- **Rationale:** Owner can edit files in any text editor or GitHub web UI without Node/npm/webpack knowledge. Zero dependency updates. Zero build failures. Deployable anywhere.
- **Trade-off:** Header/footer must be copy-pasted across 42 files. Mitigated by CI validation that catches inconsistencies.

## ADR-002: Vercel for Hosting

- **Status:** Accepted
- **Date:** 2025
- **Decision:** Use Vercel free tier for static hosting
- **Rationale:** Free SSL, global CDN, automatic GitHub integration, instant deploys. Zero config for static sites.
- **Trade-off:** Free tier limits (100GB bandwidth/month — sufficient for this traffic level)

## ADR-003: WhatsApp as Primary Contact/Conversion CTA

- **Status:** Accepted
- **Date:** 2025
- **Decision:** WhatsApp floating button + pre-filled message template on every page
- **Rationale:** WhatsApp is the primary B2B communication channel for Indian SMB buyers. Pre-filled message template reduces buyer friction and increases enquiry quality.
- **Trade-off:** No email form means no backend requirement, no spam, but also no automated lead capture.

## ADR-004: Single CSS File

- **Status:** Accepted
- **Date:** 2026
- **Decision:** All styles in one `style.css` (9KB)
- **Rationale:** One HTTP request for styles. Browser caches it across all 42 pages. Simple to maintain.
- **Trade-off:** File grows over time. At >50KB consider splitting into base + components.

## ADR-005: Lazy Loading for All Non-Hero Images

- **Status:** Accepted
- **Date:** 2026
- **Decision:** All images except logo get `loading="lazy"`. Hero images get `link rel=preload`.
- **Rationale:** Critical for Core Web Vitals (LCP). Product gallery pages had 7–8 images all loading on paint. Lazy loading defers off-screen images.
