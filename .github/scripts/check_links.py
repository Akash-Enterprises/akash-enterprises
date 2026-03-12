#!/usr/bin/env python3
"""Check all internal links resolve to real files."""
import re, sys
from pathlib import Path

repo = Path(".")
errors = []

for f in sorted(repo.rglob("*.html")):
    if ".git" in str(f):
        continue
    c = f.read_text(encoding="utf-8", errors="ignore")
    refs = re.findall(r'(?:href|src)="([^"]+)"', c)
    for ref in refs:
        if ref.startswith(("http", "#", "mailto:", "tel:", "data:")):
            continue
        ref_path = ref.split("#")[0]
        if not ref_path:
            continue
        target = (f.parent / ref_path).resolve()
        if not target.exists():
            errors.append(f"{f}: BROKEN → {ref}")

total = len([f for f in repo.rglob("*.html") if ".git" not in str(f)])

if errors:
    print(f"❌ {len(errors)} broken link(s) found:\n")
    for e in errors:
        print(f"  ❌ {e}")
    sys.exit(1)
else:
    print(f"✅ All internal links valid ({total} files checked)")
