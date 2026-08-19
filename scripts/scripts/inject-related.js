/*
 * scripts/inject-related.js
 *
 * Scans every HTML file inside /blog that has:
 *   <meta name="article-date" content="YYYY-MM-DD">
 * and builds a "latest articles" list from them.
 *
 * For every file that also contains the marker:
 *   <!-- RELATED_ARTICLES -->
 * it replaces that marker with a grid of the 4 latest OTHER articles.
 *
 * Files that don't have the marker are left completely untouched
 * (this safely skips your old pre-existing articles).
 *
 * Run this AFTER build-blog.js in your build command, e.g.:
 *   "build": "node scripts/build-blog.js && node scripts/inject-related.js"
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const MARKER = '<!-- RELATED_ARTICLES -->';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function extractTag(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : '';
}

function buildCardsHtml(current, others) {
  if (others.length === 0) return '';
  const cards = others.map((p) => {
    const thumb = p.thumbnail
      ? `<img src="${escapeHtml(p.thumbnail)}" alt="${escapeHtml(p.title)}" class="related-card-thumb">`
      : '';
    return `
      <a href="/blog/${p.slug}.html" class="related-card">
        ${thumb}
        <div class="related-card-body">
          <span class="related-card-tag">${escapeHtml(p.tag || '')}</span>
          <h3 class="related-card-title">${escapeHtml(p.title)}</h3>
        </div>
      </a>`;
  }).join('\n');

  return `<div class="related-articles-grid">${cards}</div>`;
}

function run() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.log('No blog folder found — skipping related-article injection.');
    return;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.html'));

  // Step 1: Read every file, pull out date/title/thumbnail/tag if it has an article-date meta tag.
  const posts = [];
  const rawContents = {};

  files.forEach((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const html = fs.readFileSync(filePath, 'utf8');
    rawContents[file] = html;

    const date = extractTag(html, /<meta\s+name=["']article-date["']\s+content=["']([^"']+)["']/i);
    if (!date) return; // Not a "new style" article — skip from the sortable list.

    const title = extractTag(html, /<title>([^<]*)<\/title>/i);
    const thumbnail = extractTag(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    const tag = extractTag(html, /<meta\s+name=["']article-tag["']\s+content=["']([^"']+)["']/i);

    posts.push({
      slug: file.replace(/\.html$/, ''),
      file,
      title,
      thumbnail,
      tag,
      date,
    });
  });

  // Step 2: Sort newest first.
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Step 3: For every file that has the marker, inject the latest 4 OTHER posts.
  let injectedCount = 0;
  files.forEach((file) => {
    const html = rawContents[file];
    if (!html.includes(MARKER)) return;

    const currentSlug = file.replace(/\.html$/, '');
    const others = posts.filter((p) => p.slug !== currentSlug).slice(0, 4);
    const cardsHtml = buildCardsHtml(currentSlug, others);

    const updatedHtml = html.replace(MARKER, cardsHtml);
    fs.writeFileSync(path.join(BLOG_DIR, file), updatedHtml, 'utf8');
    injectedCount++;
    console.log(`Injected related articles into blog/${file}`);
  });

  console.log(`Done. ${posts.length} articles found in the "latest" pool, ${injectedCount} file(s) updated.`);
}

run();
