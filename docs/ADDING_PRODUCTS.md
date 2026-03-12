# Adding a New Product Page

Follow this checklist exactly every time a new product is added.

---

## Step 1 — Create the product folder + images

```
images/products/<product-slug>/
  <product-slug>-1.jpg   ← main image (shown first in gallery)
  <product-slug>-2.jpg
  <product-slug>-3.jpg
  ... (up to 8 images)
```

**Image requirements:**
- Format: JPEG (preferred) or PNG
- Resolution: 800×800px minimum
- Size: Keep each image under 300KB (compress at tinyjpeg.com or squoosh.app)
- Background: White or light grey preferred for product images

---

## Step 2 — Copy a product template

Copy the closest existing product page:

```bash
cp products/hdpe-tarpaulin.html products/<new-slug>.html
```

---

## Step 3 — Update the HTML

Open the new file and change all of the following:

### In `<head>`:
```html
<title>[Product Name] – [Short descriptor] | Akash Enterprises</title>
<!-- Keep title under 60 characters total -->

<meta name="description" content="[155 chars max. Include: what it is, who uses it, key benefit, 'Akash Enterprises' brand]">

<link rel="canonical" href="https://akash-enterprises.vercel.app/products/<new-slug>.html">

<meta property="og:url" content="https://akash-enterprises.vercel.app/products/<new-slug>.html">
<meta property="og:title" content="[same as title]">
<meta property="og:description" content="[same as description]">
```

### In the JSON-LD schema block:
Update `name`, `description`, `url`, `image` fields to match new product.

### In the breadcrumb:
```html
<li><a href="../categories/[category-slug].html">[Category Name]</a></li>
<li><span aria-current="page">[Product Name]</span></li>
```

### In the hero section:
```html
<h1>[Product Name]</h1>
<p>[One or two sentence product overview]</p>
```

### In the product gallery:
```html
<img src="../images/products/<new-slug>/<new-slug>-1.jpg" alt="[Product Name] - [description of what's shown]" loading="lazy">
```
> Every gallery image must have `loading="lazy"`. The alt text should describe what's in the image.

### In the product info section:
Fill in all sections:
- **Product Overview** — 2–3 paragraphs
- **Key Features** — 4–6 bullet points
- **Specifications** — Material, sizes, colours, etc.
- **Applications & Use Cases** — Where is it used?
- **Best Suited For** — Who should buy this?
- **Selection Note** — Any expert buying guidance
- **Commonly Used Along With** — Cross-sell references
- **Product FAQs** — 4–6 real buyer questions + answers

### WhatsApp float:
Update the product name in the pre-filled WhatsApp message URL:
```
%E2%80%A2%20Product%20Name%3A%20[Product+Name+URL+encoded]
```

---

## Step 4 — Add to the category page

Open `categories/[category].html` and add a new card in the product grid:

```html
<a href="../products/<new-slug>.html" class="category-card">
    <img src="../images/products/<new-slug>/<new-slug>-1.jpg" alt="[Product Name]" loading="lazy" width="300" height="140">
    <h3>[Product Name]</h3>
</a>
```

---

## Step 5 — Add to sitemap.xml

Add a new `<url>` block in `sitemap.xml`:

```xml
<url>
  <loc>https://akash-enterprises.vercel.app/products/<new-slug>.html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## Step 6 — Validate before pushing

Run the CI scripts locally:

```bash
python3 .github/scripts/validate.py
python3 .github/scripts/check_links.py
python3 .github/scripts/check_sitemap.py
```

All should output ✅. Fix any ❌ before pushing.

---

## Step 7 — Push and verify

```bash
git add -A
git commit -m "feat: add [Product Name] product page"
git push origin main
```

After pushing:
- Check CI passes in GitHub Actions tab
- Visit the live URL on Vercel and verify the page looks correct
- Submit the new URL to Google Search Console (Inspect URL → Request indexing)
