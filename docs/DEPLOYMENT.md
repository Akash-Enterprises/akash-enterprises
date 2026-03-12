# Deployment Guide

The website is hosted on **Vercel** (free tier) with automatic deployments from GitHub.

---

## How auto-deployment works

1. You push to `main` branch on GitHub
2. Vercel detects the push (webhook)
3. Vercel deploys the static files to its CDN (~30 seconds)
4. Live URL is updated automatically

No manual deployment steps needed after initial setup.

---

## Initial Vercel Setup (one-time)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import the `Akash-Enterprises/akash-enterprises` repository
4. Settings:
   - **Framework Preset:** Other
   - **Root Directory:** `./` (default)
   - **Build Command:** (leave empty — no build needed)
   - **Output Directory:** `./` (serve files from root)
5. Click **Deploy**

---

## Custom Domain Setup

Once you have a domain (e.g., `akashenterprises.in`):

1. In Vercel dashboard → Project → Settings → Domains
2. Add your domain
3. Add the DNS records Vercel shows you at your domain registrar:
   - `A` record: `76.76.21.21`
   - Or `CNAME`: `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48 hours)
5. Update the canonical URLs in all HTML files to use the new domain

### Updating canonical URLs after domain change

```bash
# Replace the old domain with new one across all files
find . -name "*.html" -o -name "*.xml" -o -name "*.txt" | \
  xargs sed -i 's|https://akash-enterprises.vercel.app|https://yourdomain.com|g'
```

Then commit and push.

---

## Environment

| Setting | Value |
|---------|-------|
| Platform | Vercel (static hosting) |
| SSL | Automatic (Let's Encrypt via Vercel) |
| CDN | Vercel Edge Network (global) |
| Build | None (pure static files) |
| Deploy trigger | Push to `main` |
| Branch for production | `main` |

---

## Rollback

To roll back to a previous version:

1. Go to Vercel dashboard → Deployments
2. Find the deployment to roll back to
3. Click the three-dot menu → **Promote to Production**

Or via git:
```bash
git revert HEAD    # Undo last commit
git push           # Trigger new deployment with revert
```

---

## Vercel CLI (optional)

For manual deployments or preview URLs:

```bash
npm install -g vercel
vercel login
vercel --prod    # Deploy to production
vercel           # Deploy preview URL
```
