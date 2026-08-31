#!/usr/bin/env python3
"""
Auto-generates sitemap.xml by scanning the repo for HTML pages.

- Root-level pages (index.html, about.html, contact.html, privacy.html, terms.html)
  get fixed priorities/changefreq matched to their importance.
- Everything inside /blog/ (except blog/index.html) is treated as a blog article
  and added automatically - no manual editing needed after this script runs.

Run this locally with: python3 scripts/generate_sitemap.py
It also runs automatically via .github/workflows/sitemap.yml on every push.
"""
import datetime
from pathlib import Path

SITE_URL = "https://www.petagecalc.in"
ROOT = Path(__file__).resolve().parent.parent

# Fixed settings for known top-level pages
ROOT_PAGES = {
    "index.html":   {"loc": "",               "changefreq": "weekly",  "priority": "1.0"},
    "about.html":   {"loc": "about.html",     "changefreq": "monthly", "priority": "0.6"},
    "contact.html": {"loc": "contact.html",   "changefreq": "monthly", "priority": "0.5"},
    "privacy.html": {"loc": "privacy.html",   "changefreq": "yearly",  "priority": "0.3"},
    "terms.html":   {"loc": "terms.html",     "changefreq": "yearly",  "priority": "0.3"},
}


def build_url_entry(loc, changefreq, priority, lastmod):
    path = f"/{loc}" if loc else "/"
    return (
        "  <url>\n"
        f"    <loc>{SITE_URL}{path}</loc>\n"
        f"    <lastmod>{lastmod}</lastmod>\n"
        f"    <changefreq>{changefreq}</changefreq>\n"
        f"    <priority>{priority}</priority>\n"
        "  </url>"
    )


def main():
    today = datetime.date.today().isoformat()
    entries = []

    # 1. Known root pages, in a sensible order
    for filename, cfg in ROOT_PAGES.items():
        if (ROOT / filename).exists():
            entries.append(build_url_entry(cfg["loc"], cfg["changefreq"], cfg["priority"], today))

    # 2. Blog index page (if present)
    blog_dir = ROOT / "blog"
    if (blog_dir / "index.html").exists():
        entries.append(build_url_entry("blog/", "weekly", "0.7", today))

    # 3. Every other .html file inside /blog/ = an article, added automatically
    if blog_dir.exists():
        articles = sorted(
            p for p in blog_dir.glob("*.html")
            if p.name != "index.html"
        )
        for article in articles:
            loc = f"blog/{article.name}"
            entries.append(build_url_entry(loc, "monthly", "0.6", today))

    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(entries) + "\n"
        "</urlset>\n"
    )

    out_path = ROOT / "sitemap.xml"
    out_path.write_text(sitemap, encoding="utf-8")
    print(f"sitemap.xml written with {len(entries)} URLs")


if __name__ == "__main__":
    main()
