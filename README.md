# Akash Enterprises — Official Business Website

[![CI – HTML & SEO Validation](https://github.com/Akash-Enterprises/akash-enterprises/actions/workflows/ci.yml/badge.svg)](https://github.com/Akash-Enterprises/akash-enterprises/actions/workflows/ci.yml)

Official website for **Akash Enterprises**, a trading and distribution company supplying industrial, packaging, agro, safety, and utility products across India.

**Live site:** [akash-enterprises.vercel.app](https://akash-enterprises.vercel.app)

---

## Quick Start

```bash
# Clone
git clone https://github.com/Akash-Enterprises/akash-enterprises.git
cd akash-enterprises

# Open locally (no build step required)
open index.html
```

No build tools. No dependencies. No setup. Pure HTML/CSS/JS — open `index.html` in any browser.

---

## What's in this repo

```
akash-enterprises/
├── index.html                    # Homepage
├── 404.html                      # Custom 404 error page
├── sitemap.xml                   # Google sitemap (41 URLs)
├── robots.txt                    # Crawl directives
│
├── categories/                   # 6 category landing pages
│   ├── industrial-tarpaulins.html
│   ├── agro-textiles.html
│   ├── packaging-logistics.html
│   ├── ropes-cordage.html
│   ├── safety-adhesives.html
│   └── industrial-sheets.html
│
├── products/                     # 34 individual product pages
│   └── *.html
│
├── css/
│   └── style.css                 # All styles (single file)
│
├── js/
│   └── main.js                   # Vanilla JS (no deps)
│
├── images/
│   ├── logo.png
│   ├── home/                     # Hero images
│   ├── categories/               # Category cover images
│   └── products/                 # Product photo galleries
│
├── docs/                         # Extended documentation
│   ├── ADDING_PRODUCTS.md
│   ├── SEO_GUIDE.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md
│
└── .github/
    ├── workflows/ci.yml          # CI: HTML validation on every push
    ├── scripts/                  # Validation scripts
    ├── ISSUE_TEMPLATE/           # Bug & content update templates
    └── pull_request_template.md
```

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| HTML | HTML5 semantic | SEO, accessibility, zero overhead |
| CSS | Vanilla CSS3 with custom properties | No build step, fast load |
| JS | Vanilla ES6 | No framework bloat (~3KB) |
| Hosting | Vercel | Free tier, CDN, auto-HTTPS, GitHub integration |
| Version control | GitHub | CI/CD, issue tracking, history |

---

## Product Catalogue

**6 categories · 34 SKUs**

| Category | Products |
|----------|----------|
| Industrial Tarpaulins & Covers | HDPE, Canvas, Cross-Lamination, Nylon, Geo Membrane Tarpaulin |
| Agro-Textiles & Landscaping | Agro Shade Net, Shade Net Clips, Weed Mat, Car/Bike Cover, Rain Poncho |
| Packaging & Logistics Essentials | BOPP Tape, Stretch Film, Bubble Rolls, Corrugated Roll, Woven Sacks, Oxo Garbage Bags, Manual Strapping Kit |
| Ropes, Cordage & Threads | PP Rope (3-strand), Nylon Rope, Mooring Rope, Sutli/PP Twine, Nylon Thread, Webbing/Lashing Belt |
| Safety, Floor Marking & Adhesives | Caution Tape, Reflective Tape, Anti-Skid Floor Tape, Masking Tape, Tarpaulin Repair Tape |
| Industrial Sheets & Hardware | LDPE Sheets, PVC Clear Sheet, Floor Protection Sheet, Cutting Board, Eyelets, Eyelet Press Machine |

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [docs/ADDING_PRODUCTS.md](docs/ADDING_PRODUCTS.md) | Step-by-step guide to add a new product page |
| [docs/SEO_GUIDE.md](docs/SEO_GUIDE.md) | SEO strategy, keyword targets, and metadata rules |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | How to deploy to Vercel, custom domain setup |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Code structure, design decisions, ADRs |

---

## Contact

| Channel | Details |
|---------|---------|
| Phone | [+91-80898-22421](tel:+918089822421) |
| WhatsApp | [+91-80898-22421](https://wa.me/918089822421) |
| Email | akash.enterprises.contact@gmail.com |
| Location | [Google Maps](https://maps.app.goo.gl/p9iRKo3NTLmXTcs16) |

---

## Contributing

See [.github/pull_request_template.md](.github/pull_request_template.md) for the PR checklist.

All pushes to `main` are validated by CI. The pipeline checks:
- HTML structural correctness (42 files)
- All internal links resolve
- Sitemap integrity
- No files over 5MB

---

## License

All content, code, and assets are the exclusive property of Akash Enterprises. Not licensed for reuse.
