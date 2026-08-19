/*
 * scripts/inject-related.js
 *
 * PART 1: Scans every HTML file inside /blog that has:
 *   <meta name="article-date" content="YYYY-MM-DD">
 * and builds a "latest articles" list from them.
 *
 * For every article file that contains the marker:
 *   <!-- RELATED_ARTICLES -->
 * it replaces that marker with a grid of the 4 latest OTHER articles.
 *
 * PART 2: For blog/index.html, if it contains the marker:
 *   <!-- AUTO_BLOG_CARDS -->
 * it replaces that marker with a full-size blog-card (matching your
 * existing manual card style) for every NEW article (one that has the
 * article-date meta tag), sorted newest first. Your old, manually-added
 * cards below the marker are left completely untouched.
 *
 * Files without the article-date meta tag are treated as "old style"
 * articles and are safely skipped everywhere in this script.
 *
 * Run this AFTER build-blog.js in your build command, e.g.:
 *   "build": "node scripts/build-blog.js && node scripts/inject-related.js"
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const BLOG_INDEX_PATH = path.join(BLOG_DIR, 'index.html');

const RELATED_MARKER = '<!-- RELATED_ARTICLES -->';
const INDEX_MARKER = '<!-- AUTO_BLOG_CARDS -->';

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

// Formats "2026-08-19" into "August 19, 2026" to match your existing card style.
function formatDisplayDate(isoDate) {
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function buildRelatedCardsHtml(others) {
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

// Builds a full blog-card matching your existing manual card markup exactly.
function buildIndexCardHtml(post) {
  return `
<!-- Blog Card - ${escapeHtml(post.title)} (auto-generated) -->
<div class="blog-card">
    <div class="blog-thumbnail">
        <img src="${escapeHtml(post.thumbnail)}" alt="${escapeHtml(post.title)}">
    </div>
    <div class="blog-card-content">
        <div class="blog-category">${escapeHtml((post.tag || '').toUpperCase())}</div>
        <h3>
            <a href="https://petagecalc.in/blog/${post.slug}.html">
                ${escapeHtml(post.title)}
            </a>
        </h3>
        <p>
            ${escapeHtml(post.description)}
        </p>
        <div class="blog-meta">📅 ${escapeHtml(formatDisplayDate(post.date))} &nbsp;|&nbsp; ⏱️ ${escapeHtml(post.readTime)}</div>
    </div>
</div>`;
}

function run() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.log('No blog folder found — skipping related-article injection.');
    return;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.html') && f !== 'index.html');

  // Step 1: Read every article file, pull out metadata if it has article-date.
  const posts = [];
  const rawContents = {};

  files.forEach((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const html = fs.readFileSync(filePath, 'utf8');
    rawContents[file] = html;

    const date = extractTag(html, /<meta\s+name=["']article-date["']\s+content=["']([^"']+)["']/i);
    if (!date) return; // Old-style article — skip entirely.

    const title = extractTag(html, /<title>([^<]*)<\/title>/i);
    const description = extractTag(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    const thumbnail = extractTag(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    const tag = extractTag(html, /<meta\s+name=["']article-tag["']\s+content=["']([^"']+)["']/i);
    const readTimeMatch = html.match(/⏱\s*([^<]+?)(?:<|$)/);
    const readTime = readTimeMatch ? readTimeMatch[1].trim() : '';

    posts.push({
      slug: file.replace(/\.html$/, ''),
      file,
      title,
      description,
      thumbnail,
      tag,
      date,
      readTime,
    });
  });

  // Step 2: Sort newest first.
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Step 3: Inject related-article cards into each article file that has the marker.
  let injectedCount = 0;
  files.forEach((file) => {
    const html = rawContents[file];
    if (!html.includes(RELATED_MARKER)) return;

    const currentSlug = file.replace(/\.html$/, '');
    const others = posts.filter((p) => p.slug !== currentSlug).slice(0, 4);
    const cardsHtml = buildRelatedCardsHtml(others);

    const updatedHtml = html.replace(RELATED_MARKER, cardsHtml);
    fs.writeFileSync(path.join(BLOG_DIR, file), updatedHtml, 'utf8');
    injectedCount++;
    console.log(`Injected related articles into blog/${file}`);
  });

  console.log(`Part 1 done. ${posts.length} new-style article(s) found, ${injectedCount} file(s) updated with related cards.`);

  // Step 4: Inject full cards into blog/index.html for every new-style article.
  if (fs.existsSync(BLOG_INDEX_PATH)) {
    const indexHtml = fs.readFileSync(BLOG_INDEX_PATH, 'utf8');
    if (indexHtml.includes(INDEX_MARKER)) {
      const cardsHtml = posts.map(buildIndexCardHtml).join('\n');
      const updatedIndexHtml = indexHtml.replace(INDEX_MARKER, cardsHtml);
      fs.writeFileSync(BLOG_INDEX_PATH, updatedIndexHtml, 'utf8');
      console.log(`Part 2 done. ${posts.length} card(s) inserted into blog/index.html.`);
    } else {
      console.log('Part 2 skipped — no AUTO_BLOG_CARDS marker found in blog/index.html.');
    }
  } else {
    console.log('Part 2 skipped — blog/index.html not found.');
  }
}

run();
