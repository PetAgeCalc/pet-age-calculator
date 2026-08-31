#!/usr/bin/env python3
"""
Auto-injects the contents of head-snippets.html into the <head> of every
.html page in the repo (Google Search Console verification, Google
Analytics, Bing Webmaster, Meta Pixel, AdSense code -- any <meta> or
<script> tag someone gives you to "paste in your site's <head>").

How to use it:
  1. Open head-snippets.html (repo root).
  2. Paste whatever verification/tracking code you were given, below the
     "Paste your code below this line" comment.
  3. Commit + push to `main`.
  4. GitHub Actions runs this script automatically and commits the result
     into every .html file's <head> for you. Nothing to touch by hand.

Safe to run again and again:
  - It only ever touches the block between
    "<!-- AUTO-HEAD-SNIPPETS:START -->" and "<!-- AUTO-HEAD-SNIPPETS:END -->"
    inside each file's <head>, so re-running just updates that block
    instead of duplicating it.
  - If head-snippets.html is emptied out, the block is removed from every
    page on the next run.

Run locally with: python3 scripts/inject_head_snippets.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SNIPPETS_FILE = ROOT / "head-snippets.html"

START_MARK = "<!-- AUTO-HEAD-SNIPPETS:START -->"
END_MARK = "<!-- AUTO-HEAD-SNIPPETS:END -->"

# Files/folders the injector must never treat as a target page.
SKIP_DIRS = {".git", "node_modules"}
SKIP_FILES = {SNIPPETS_FILE.resolve()}

HEAD_OPEN_RE = re.compile(r"(<head[^>]*>)", re.IGNORECASE)
# Matches exactly what inject_into_file() inserts (including the leading
# newline added right after <head>), so re-running the script is a clean
# remove-then-reinsert instead of accumulating blank lines over time.
BLOCK_RE = re.compile(
    r"\n?" + re.escape(START_MARK) + r".*?" + re.escape(END_MARK) + r"\n?",
    re.DOTALL,
)
# Strips our own instructional comments out of head-snippets.html's content
# so they never get copied into the actual pages.
INSTRUCTIONS_RE = re.compile(r"<!--\s*INSTRUCTIONS.*?-->", re.DOTALL | re.IGNORECASE)
PASTE_MARKER_RE = re.compile(r"<!--\s*Paste your.*?-->", re.IGNORECASE)


def read_snippets() -> str:
    if not SNIPPETS_FILE.exists():
        return ""
    raw = SNIPPETS_FILE.read_text(encoding="utf-8")
    raw = INSTRUCTIONS_RE.sub("", raw)
    raw = PASTE_MARKER_RE.sub("", raw)
    return raw.strip()


def find_html_files():
    for path in ROOT.rglob("*.html"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.resolve() in SKIP_FILES:
            continue
        yield path


def build_block(snippets: str) -> str:
    if not snippets:
        return ""
    indented = "\n".join(
        ("  " + ln if ln.strip() else ln) for ln in snippets.splitlines()
    )
    return f"{START_MARK}\n{indented}\n{END_MARK}\n"


def inject_into_file(path: Path, block: str) -> bool:
    original = path.read_text(encoding="utf-8")
    text = BLOCK_RE.sub("", original)  # remove any previous block first

    if block:
        match = HEAD_OPEN_RE.search(text)
        if not match:
            print(f"  skip (no <head> tag found): {path.relative_to(ROOT)}")
            return False
        insert_at = match.end()
        text = text[:insert_at] + "\n" + block + text[insert_at:]

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main():
    snippets = read_snippets()
    block = build_block(snippets)

    if snippets:
        print("Injecting head-snippets.html into every page's <head>...")
    else:
        print("head-snippets.html is empty -- removing any old injected block from every page...")

    changed = []
    for path in sorted(find_html_files()):
        if inject_into_file(path, block):
            changed.append(path.relative_to(ROOT))

    if changed:
        print(f"Updated {len(changed)} file(s):")
        for p in changed:
            print(f"  - {p}")
    else:
        print("Nothing changed.")


if __name__ == "__main__":
    main()
