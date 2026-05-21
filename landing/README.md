# quanla.org — landing

Minimalist mono landing page for `quanla.org`. Long-form portfolio is served at `/me/` from this same domain.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript, Tailwind CSS v4
- Static export (`output: "export"`) — deploys anywhere

## Local dev

```bash
cd landing
npm install
npm run dev     # http://localhost:3000
npm run build   # → out/
npx serve out   # preview production build
```

## Project layout

```
portfolio/                ← repo root
├── index.html            ← existing portfolio (pure HTML/JS)
├── script.js
├── style.css
├── tools/
├── build-site.mjs        ← unified build: landing/ + portfolio → out/
└── landing/              ← THIS folder (Next.js)
    ├── app/
    │   ├── components/   ← Section, ProjectRow, LinkRow, ThemeToggle
    │   ├── globals.css   ← zinc palette + theme tokens
    │   ├── layout.tsx
    │   ├── page.tsx      ← all sections live here
    │   └── theme-script.tsx
    ├── public/favicon.svg
    └── next.config.ts    ← output: export, trailingSlash: true
```

## How `/` and `/me/` end up on the same domain

`build-site.mjs` at the repo root does it in one step:

1. `npm run build` in `landing/` → `landing/out/` (the landing page)
2. Copy portfolio files (`index.html`, `tools/`, etc.) into `landing/out/me/`

```bash
# from repo root
node build-site.mjs
# → landing/out/ now serves landing at / and portfolio at /me/
```

## Deployment options

### Option A — Vercel (recommended, easiest)

1. Push repo to GitHub (already on `quanla93/quanla93.github.io`)
2. Import the repo in Vercel
3. **Root Directory** = `.` (repo root, so it can access portfolio files)
4. **Build Command** = `cd landing && npm ci && cd .. && node build-site.mjs`
5. **Output Directory** = `landing/out`
6. **Install Command** = leave empty (build command handles it)
7. Add custom domain `quanla.org` in Vercel project settings

### Option B — GitHub Pages (keep current host)

This repo is `quanla93.github.io` (user site), serves `main` directly. Use GitHub Actions to build and push to a `gh-pages` branch:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: landing/package-lock.json
      - run: npm ci
        working-directory: landing
      - run: node build-site.mjs
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: landing/out
          cname: quanla.org
```

Then: repo Settings → Pages → Source: `gh-pages` branch / `/ (root)`.

### Domain setup (quanla.org)

- **Vercel:** add domain in dashboard, follow A/CNAME instructions
- **GitHub Pages:** the workflow above writes a `CNAME` file. At your DNS provider:
  - `A` records for apex → GitHub Pages IPs (185.199.108–111.153)
  - `CNAME` for `www` → `quanla93.github.io`

## Editing content

Almost everything to change lives in [app/page.tsx](app/page.tsx):
- Hero text
- About paragraphs + meta grid
- Projects list
- Links list

Colors and theme: [app/globals.css](app/globals.css). Fonts and metadata: [app/layout.tsx](app/layout.tsx).
