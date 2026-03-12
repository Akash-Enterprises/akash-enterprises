#!/usr/bin/env python3
"""
Structural HTML + SEO validator for Akash Enterprises website.
Run from repo root. Exits non-zero if any checks fail.
"""
import re, sys
from pathlib import Path

repo = Path(".")
errors = []

for f in sorted(repo.rglob("*.html")):
    if ".git" in str(f):
        continue
    c = f.read_text(encoding="utf-8", errors="ignore")
    name = str(f)

    if not c.strip().startswith("<!DOCTYPE html>"):
        errors.append(f"{name}: Missing DOCTYPE")
    if "<html lang=" not in c:
        errors.append(f"{name}: Missing lang attribute")
    if "charset" not in c:
        errors.append(f"{name}: Missing charset")
    if "viewport" not in c:
        errors.append(f"{name}: Missing viewport meta")
    if "<title>" not in c:
        errors.append(f"{name}: Missing <title>")
    if 'name="description"' not in c:
        errors.append(f"{name}: Missing meta description")
    if "canonical" not in c:
        errors.append(f"{name}: Missing canonical link")
    if "</body>" not in c:
        errors.append(f"{name}: Missing </body>")
    if "</html>" not in c:
        errors.append(f"{name}: Missing </html>")

    opens = c.count("<script")
    closes = c.count("</script>")
    if opens != closes:
        errors.append(f"{name}: Unmatched script tags ({opens} open, {closes} close)")

    if c.count('src="../js/main.js"') > 1 or c.count('src="js/main.js"') > 1:
        errors.append(f"{name}: Duplicate JS include")

    for title in re.findall(r"<title>(.*?)</title>", c):
        if len(title) > 60:
            errors.append(f"{name}: Title too long ({len(title)} chars)")

total = len([f for f in repo.rglob("*.html") if ".git" not in str(f)])

if errors:
    print(f"\n❌ VALIDATION FAILED — {len(errors)} error(s) across {total} files:\n")
    for e in errors:
        print(f"  ❌ {e}")
    sys.exit(1)
else:
    print(f"✅ All {total} HTML files passed validation")
