#!/usr/bin/env python3
"""
Validates a blog article HTML file against the Pet Age Calculator
article-prompt rules. Run this on ANY article the AI gives you, before
you publish it, to catch anything the AI might have missed.

USAGE:
    python3 validate_article.py blog/your-article.html

It will print a PASS/FAIL for every rule and a final summary. Fix
whatever it flags, then run it again until everything passes.
"""
import re
import sys
from pathlib import Path

VALID_IMAGES = {
    "dog-header.png", "cat-header.png", "cow-header.png",
    "horse-header.png", "rabbit-header.png", "parrot-header.png",
}

BANNED_PHRASES = [
    "in today's fast-paced world", "delve into", "it's important to note that",
    "navigating the world of", "unlock the secrets", "a testament to",
    "in conclusion",
]

REQUIRED_HEAD_TAGS = [
    ("charset", r'<meta\s+charset='),
    ("viewport", r'<meta\s+name="viewport"'),
    ("robots", r'<meta\s+name="robots"\s+content="index,\s*follow"'),
    ("author", r'<meta\s+name="author"\s+content="Pet Age Calculator"'),
    ("favicon", r'<link\s+rel="icon"'),
    ("og:type", r'<meta\s+property="og:type"\s+content="article"'),
    ("og:site consistency (title)", r'<meta\s+property="og:title"'),
    ("og:description", r'<meta\s+property="og:description"'),
    ("og:url", r'<meta\s+property="og:url"'),
    ("og:image", r'<meta\s+property="og:image"'),
    ("article:image_alt", r'<meta\s+name="article:image_alt"'),
    ("article:published_time", r'<meta\s+name="article:published_time"'),
    ("article:category", r'<meta\s+name="article:category"'),
    ("article:read_time", r'<meta\s+name="article:read_time"'),
    ("twitter:card", r'<meta\s+name="twitter:card"'),
    ("twitter:title", r'<meta\s+name="twitter:title"'),
    ("twitter:description", r'<meta\s+name="twitter:description"'),
    ("twitter:image", r'<meta\s+name="twitter:image"'),
    ("stylesheet link", r'<link\s+rel="stylesheet"\s+href="/style\.css"'),
]

REQUIRED_BODY_MARKERS = [
    ("navbar", r'<nav class="navbar">'),
    ("mobile nav overlay", r'<div class="mobile-nav-overlay" id="mobileNav">'),
    ("related-articles-section block", r'<section class="related-articles-section content-section">'),
    ("related-articles-grid (must stay empty)", r'<div class="blog-card-grid" id="related-articles-grid">\s*</div>'),
    ("footer", r'<footer class="site-footer">'),
    ("common.js script", r'<script src="/common\.js"></script>'),
    ("renderRelatedArticles call", r"renderRelatedArticles\('related-articles-grid'\)"),
    ("Article JSON-LD schema", r'"@type":\s*"Article"'),
    ("FAQPage JSON-LD schema", r'"@type":\s*"FAQPage"'),
]

CTA_BOX_SNIPPET = "Want to understand your pet even better?"


def check(results, label, passed, detail=""):
    results.append((label, passed, detail))


def main():
    if len(sys.argv) != 2:
        print("Usage: python3 validate_article.py blog/your-article.html")
        sys.exit(1)

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"File not found: {path}")
        sys.exit(1)

    html = path.read_text(encoding="utf-8")
    results = []

    # --- Title ---
    titles = re.findall(r'<title>(.*?)</title>', html, re.DOTALL)
    check(results, "Exactly one <title> tag", len(titles) == 1, f"found {len(titles)}")
    if titles:
        tlen = len(titles[0].strip())
        check(results, "Title length 50-60 characters", 50 <= tlen <= 60, f"actual length: {tlen}")

    # --- Meta description ---
    descs = re.findall(r'<meta\s+name="description"\s+content="(.*?)"', html)
    check(results, "Exactly one meta description", len(descs) == 1, f"found {len(descs)}")
    if descs:
        dlen = len(descs[0])
        check(results, "Meta description length 140-155 characters", 140 <= dlen <= 155, f"actual length: {dlen}")

    # --- Canonical ---
    canonicals = re.findall(r'<link\s+rel="canonical"\s+href="(.*?)"', html)
    check(results, "Exactly one canonical link", len(canonicals) == 1, f"found {len(canonicals)}")
    canonical_url = canonicals[0] if canonicals else None
    if canonical_url:
        check(results, "Canonical URL matches expected pattern",
              canonical_url.startswith("https://www.petagecalc.in/blog/"),
              canonical_url)

    # --- og:image is a real header image ---
    og_images = re.findall(r'<meta\s+property="og:image"\s+content="(.*?)"', html)
    if og_images:
        img_name = og_images[0].rsplit("/", 1)[-1]
        check(results, "og:image is one of the 6 real header images", img_name in VALID_IMAGES, img_name)
    else:
        check(results, "og:image present", False)

    # --- Required head tags ---
    for label, pattern in REQUIRED_HEAD_TAGS:
        check(results, f"<head> has: {label}", re.search(pattern, html) is not None)

    # --- Required body structure ---
    for label, pattern in REQUIRED_BODY_MARKERS:
        check(results, f"Body has: {label}", re.search(pattern, html) is not None)

    # --- Exactly one H1 ---
    h1s = re.findall(r'<h1[\s>]', html)
    check(results, "Exactly one <h1> tag", len(h1s) == 1, f"found {len(h1s)}")

    # --- CTA box present ---
    check(results, "Mandatory mid-article CTA box present", CTA_BOX_SNIPPET in html)

    # --- No self-referencing link ---
    if canonical_url:
        slug = canonical_url.rsplit("/", 1)[-1]
        self_links = re.findall(rf'href="[^"]*{re.escape(slug)}"', html)
        # canonical tag itself will match; anchor tags in body should not
        anchor_self_links = [
            l for l in self_links if '<a ' in html[max(0, html.find(l) - 20):html.find(l)]
        ]
        check(results, "No <a> link points back to this article's own filename",
              len(anchor_self_links) == 0, f"suspicious matches: {len(anchor_self_links)}")

    # --- Generic internal linking check (no specific URL required) ---
    internal_links = re.findall(r'href="(https://(?:www\.)?petagecalc\.in/[^"]*)"', html)
    # Ignore canonical/og/twitter meta tag URLs - only count real <a> links in the body
    body_only = html.split("<body", 1)[-1] if "<body" in html else html
    body_internal_links = re.findall(r'<a\s+[^>]*href="(https://(?:www\.)?petagecalc\.in/[^"]*)"', body_only)
    check(results, "Has at least 2 internal links to petagecalc.in inside the article body",
          len(body_internal_links) >= 2, f"found: {len(body_internal_links)}")

    # --- Word count (rough: strip tags) ---
    text_only = re.sub(r'<script[\s\S]*?</script>', ' ', html)
    text_only = re.sub(r'<style[\s\S]*?</style>', ' ', text_only)
    text_only = re.sub(r'<[^>]+>', ' ', text_only)
    words = re.findall(r'\b[a-zA-Z\']+\b', text_only)
    word_count = len(words)
    check(results, "Word count between 2000-2500", 2000 <= word_count <= 2500, f"actual: {word_count}")

    # --- Banned AI-cliche phrases ---
    lower_html = html.lower()
    found_phrases = [p for p in BANNED_PHRASES if p in lower_html]
    check(results, "No banned AI-cliche phrases", len(found_phrases) == 0, f"found: {found_phrases}" if found_phrases else "")

    # --- Print results ---
    print(f"\nValidating: {path}\n" + "-" * 60)
    passed_count = 0
    for label, passed, detail in results:
        status = "PASS" if passed else "FAIL"
        if passed:
            passed_count += 1
        line = f"[{status}] {label}"
        if detail and not passed:
            line += f"  -> {detail}"
        print(line)

    print("-" * 60)
    print(f"{passed_count}/{len(results)} checks passed")
    if passed_count != len(results):
        print("\nFix the FAILED items above before publishing this article.")
        sys.exit(1)
    else:
        print("\nAll checks passed. Safe to publish.")


if __name__ == "__main__":
    main()
