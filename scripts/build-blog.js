/**
 * scripts/build-blog.js
 *
 * Reads structured article data from content/posts/*.json
 * and generates full HTML pages into blog/*.html
 *
 * No npm packages needed — pure Node.js.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'posts');
const TEMPLATE_PATH = path.join(ROOT, 'templates', 'blog-post-template.html');
const OUTPUT_DIR = path.join(ROOT, 'blog');

// Change this if your domain is different
const SITE_URL = 'https://petagecalc.in';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// The "content" field is ready-to-use HTML.
function renderContent(content) {
  return content || '';
}

function renderThumbnail(thumbnail) {
  if (!thumbnail) return '';

  return `<img src="${escapeHtml(thumbnail)}" alt="thumbnail" class="article-thumbnail" style="width:100%;border-radius:12px;margin-bottom:24px;">`;
}

// Converts the thumbnail path into a full URL for Facebook/X sharing.
function getThumbnailUrl(thumbnail) {
  if (!thumbnail) return '';

  // If thumbnail is already a full URL, use it as-is.
  if (/^https?:\/\//i.test(thumbnail)) {
    return thumbnail;
  }

  // If it starts with "/", attach the website domain.
  if (thumbnail.startsWith('/')) {
    return `${SITE_URL}${thumbnail}`;
  }

  // Otherwise treat it as a relative path.
  return `${SITE_URL}/${thumbnail}`;
}

function build() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('No content/posts folder found — nothing to build.');
    return;
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'));

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  files.forEach((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');

    let data;

    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error(`Skipping ${file} — invalid JSON: ${e.message}`);
      return;
    }

    const slug = file.replace(/\.json$/, '');
    const canonical = `${SITE_URL}/blog/${slug}.html`;

    const html = template
      .replace(/{{TITLE}}/g, escapeHtml(data.title))
      .replace(/{{META_DESCRIPTION}}/g, escapeHtml(data.description))
      .replace(/{{META_KEYWORDS}}/g, escapeHtml(data.keywords))
      .replace(/{{CANONICAL_URL}}/g, canonical)
      .replace(/{{THUMBNAIL_URL}}/g, escapeHtml(getThumbnailUrl(data.thumbnail)))
      .replace(/{{TAG}}/g, escapeHtml(data.tag))
      .replace(/{{DATE}}/g, escapeHtml(data.date))
      .replace(/{{READ_TIME}}/g, escapeHtml(data.read_time))
      .replace(/{{THUMBNAIL}}/g, renderThumbnail(data.thumbnail))
      .replace(/{{BODY}}/g, renderContent(data.content));

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${slug}.html`),
      html,
      'utf8'
    );

    console.log(`Built blog/${slug}.html`);
  });
}

build();
