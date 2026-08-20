/*
 * blog/related-articles.js
 *
 * SUPER SIMPLE VERSION — only needs ONE line added to each article page:
 *
 *     <script src="/blog/related-articles.js"></script>
 *
 * Paste that one line right before </body> in any article page (and in
 * article-template.html so every FUTURE article gets it automatically
 * when you copy the template).
 *
 * That's it. Nothing else to add — no extra <div>, no extra <style>.
 * This script builds everything itself:
 *   - Adds a "More Pet Care Guides" heading + card grid at the end of
 *     the article body
 *   - Fetches /blog/index.html (which you already keep updated with a
 *     card for every article)
 *   - Shows the latest 4 cards, skipping the article currently open
 *
 * You never touch this file again after adding it once. Keep adding
 * new cards to blog/index.html as usual — related cards on every
 * article page update themselves automatically.
 */
(function () {
  var STYLE = `
    .related-section { max-width:1200px; margin:0 auto; padding:20px 20px 60px; }
    .related-heading { font-size:1.6rem; font-weight:800; margin-bottom:24px; color:#2d6a4f; border-top:2px solid #f0f0f0; padding-top:40px; }
    #related-articles-container { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:24px; }
    #related-articles-container .blog-card { background:#fff; border:1px solid #e0e0e0; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08); overflow:hidden; display:flex; flex-direction:column; transition:transform .3s ease, box-shadow .3s ease; }
    #related-articles-container .blog-card:hover { transform:translateY(-5px); box-shadow:0 10px 30px rgba(0,0,0,0.12); }
    #related-articles-container .blog-thumbnail { width:100%; height:180px; overflow:hidden; background:#f5f0eb; margin:0 !important; }
    #related-articles-container .blog-thumbnail img { width:100%; height:100%; object-fit:cover !important; display:block; }
    #related-articles-container .blog-card-content { padding:20px; display:flex; flex-direction:column; flex-grow:1; }
    #related-articles-container .blog-category { font-size:.7rem; font-weight:700; color:#2d6a4f; letter-spacing:.5px; margin-bottom:6px; text-transform:uppercase; }
    #related-articles-container .blog-card h3 { font-size:1.05rem; font-weight:700; line-height:1.4; margin-bottom:10px; }
    #related-articles-container .blog-card h3 a { color:#2d6a4f; text-decoration:none; }
    #related-articles-container .blog-card h3 a:hover { color:#40916c; text-decoration:underline; }
    #related-articles-container .blog-card p { font-size:.88rem; color:#4a4a4a; line-height:1.5; margin-bottom:14px; flex-grow:1; }
    #related-articles-container .blog-meta { font-size:.78rem; color:#6c757d; border-top:1px solid #f0f0f0; padding-top:10px; margin-top:auto; }
  `;

  function getCurrentArticleFilename() {
    var parts = window.location.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  }

  function isCurrentArticle(cardEl, currentFilename) {
    var link = cardEl.querySelector('h3 a');
    if (!link || !currentFilename) return false;
    return (link.getAttribute('href') || '').indexOf(currentFilename) !== -1;
  }

  function injectSectionSkeleton() {
    var styleTag = document.createElement('style');
    styleTag.textContent = STYLE;
    document.head.appendChild(styleTag);

    var section = document.createElement('section');
    section.className = 'related-section';
    section.innerHTML =
      '<h2 class="related-heading">📚 More Pet Care Guides</h2>' +
      '<div id="related-articles-container" class="container"></div>';
    document.body.appendChild(section);

    return document.getElementById('related-articles-container');
  }

  function init() {
    var container = injectSectionSkeleton();
    var currentFilename = getCurrentArticleFilename();

    fetch('/blog/index.html')
      .then(function (res) {
        if (!res.ok) throw new Error('Could not load blog index');
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var allCards = Array.prototype.slice.call(doc.querySelectorAll('.blog-card'));
        var otherCards = allCards.filter(function (c) { return !isCurrentArticle(c, currentFilename); });
        var latestFour = otherCards.slice(0, 4);

        if (latestFour.length === 0) {
          container.closest('.related-section').style.display = 'none';
          return;
        }
        container.innerHTML = latestFour.map(function (c) { return c.outerHTML; }).join('\n');
      })
      .catch(function (err) {
        console.warn('Related articles could not be loaded:', err);
        container.closest('.related-section').style.display = 'none';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
