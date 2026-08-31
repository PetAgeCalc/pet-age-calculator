#!/usr/bin/env python3
"""
Auto-generates blog/articles.json by scanning every article inside /blog/
(everything except blog/index.html and any file starting with "_").

This JSON file powers the "Related Articles" cards that automatically
appear at the bottom of every blog article (see common.js -> renderRelatedArticles).

For each article it reads, straight out of the HTML <head>, no manual work needed:
  - title       <- <title> tag
  - excerpt     <- <meta name="description">
  - image       <- <meta property="og:image">  (falls back to a default image)
  - date        <- <meta name="article:published_time" content="YYYY-MM-DD">
                   (falls back to today's date if the tag is missing)
  - url         <- /blog/<filename>.html

Run this locally with: python3 scripts/generate_blog_index.py
It also runs automatically via .github/workflows/sitemap.yml on every push.
"""
import datetime
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "blog"
DEFAULT_IMAGE = "/images/dog-header.png"


def extract(pattern, html, flags=re.IGNORECASE | re.DOTALL):
    m = re.search(pattern, html, flags)
    return m.group(1).strip() if m else None


def parse_article(path):
    html = path.read_text(encoding="utf-8", errors="ignore")

    title = extract(r"<title>(.*?)</title>", html) or path.stem.replace("-", " ").title()
    # Strip a trailing " | Site Name" suffix so the card shows just the article title
    title = re.sub(r"\s*\|\s*Pet Age Calculator\s*$", "", title, flags=re.IGNORECASE)
    excerpt = extract(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html)
    image = extract(r'<meta\s+property=["\']og:image["\']\s+content=["\'](.*?)["\']', html)
    image_alt = extract(r'<meta\s+name=["\']article:image_alt["\']\s+content=["\'](.*?)["\']', html)
    date = extract(r'<meta\s+name=["\']article:published_time["\']\s+content=["\'](.*?)["\']', html)
    category = extract(r'<meta\s+name=["\']article:category["\']\s+content=["\'](.*?)["\']', html)
    read_time = extract(r'<meta\s+name=["\']article:read_time["\']\s+content=["\'](.*?)["\']', html)

    if not image:
        # fall back to the first <img src="..."> found in the article
        image = extract(r'<img[^>]+src=["\'](.*?)["\']', html) or DEFAULT_IMAGE
    if not excerpt:
        excerpt = "Read this article on Pet Age Calculator."
    if not date:
        date = datetime.date.fromtimestamp(path.stat().st_mtime).isoformat()
    if not category:
        category = "PET CARE"
    if not read_time:
        read_time = "5 min read"

    return {
        "url": f"/blog/{path.name}",
        "title": title,
        "excerpt": excerpt,
        "image": image,
        "imageAlt": image_alt or title,
        "date": date,
        "category": category,
        "readTime": read_time,
    }


def main():
    articles = []
    if BLOG_DIR.exists():
        for path in sorted(BLOG_DIR.glob("*.html")):
            if path.name == "index.html" or path.name.startswith("_"):
                continue
            articles.append(parse_article(path))

    # newest first
    articles.sort(key=lambda a: a["date"], reverse=True)

    out_path = BLOG_DIR / "articles.json"
    out_path.write_text(json.dumps(articles, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"blog/articles.json written with {len(articles)} articles")


if __name__ == "__main__":
    main()
