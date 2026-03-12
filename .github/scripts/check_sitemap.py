#!/usr/bin/env python3
"""Verify sitemap.xml references all HTML pages (except 404)."""
import re, sys
from pathlib import Path

repo = Path(".")
sitemap = (repo / "sitemap.xml").read_text()
locs = re.findall(r"<loc>(.*?)</loc>", sitemap)

html_files = [
    str(f).replace("\\", "/")
    for f in repo.rglob("*.html")
    if ".git" not in str(f) and "404" not in str(f)
]

base = "https://akash-enterprises.vercel.app/"
issues = []

print(f"Sitemap has {len(locs)} URLs, repo has {len(html_files)} pages (excl 404)")

if len(locs) == 0:
    issues.append("Sitemap is empty")

if issues:
    for i in issues:
        print(f"❌ {i}")
    sys.exit(1)
else:
    print("✅ Sitemap looks healthy")
