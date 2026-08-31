# Naya blog article kaise add karein

## 1. Template copy karo
`scripts/article-template.html` file ko `blog/` folder ke andar copy karo aur
naam do (jaise `blog/dog-age-myths.html`). Filename hamesha lowercase aur
hyphen-separated rakho (URL bhi wahi banega).

## 2. Yeh cheezein zaroor update karo (file ke top pe hi hain)
- `<title>` — page title
- `<meta name="description">` — 1-2 line summary (yeh related-article
  card ka excerpt bhi banega)
- `<link rel="canonical">` aur `og:url` — file ke naye naam se match karo
- `og:image` — article ka thumbnail image (optional, na dalo to default
  image use ho jayegi)
- `article:published_time` — aaj ki date (`YYYY-MM-DD`), isi se related
  articles "newest first" sort hote hain
- `<h1>` aur article body — apna asli content

## 3. "Related Articles" block ko mat chhedo
Template ke neeche ek `<section class="related-articles-section">...</section>`
block hai — ise as-it-is rehne do. Yehi block automatically article ke end
me 4 doosre articles ke clickable cards dikhata hai (image + title +
excerpt), taaki reader ek article se agle article par jump kar sake.

## 4. blog/index.html par bhi kuch paste NAHI karna
Pehle aap `blog/index.html` me har naye article ka card manually paste
karte the — ab uski zaroorat nahi hai. Woh page khud `blog/articles.json`
se saare articles padh kar apne aap dikha deta hai (newest article sabse
upar). Naya article push karte hi wo blog listing page par bhi automatically
aa jayega.

## 5. Push kar do — baaki sab automatic hai
Jaise hi aap is `.html` file ko `main` branch par push karoge, GitHub
Actions workflow (`.github/workflows/sitemap.yml`) khud:
1. `sitemap.xml` update karega (naya article add ho jayega)
2. `blog/articles.json` update karega (related-article cards isi file se
   data lete hain)

Aapko manually kuch bhi edit karne ki zaroorat nahi — na sitemap, na
related-articles list.

## Local me test karna ho to
```
python3 scripts/generate_sitemap.py
python3 scripts/generate_blog_index.py
```
