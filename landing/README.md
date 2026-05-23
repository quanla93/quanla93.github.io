# quanla.org — landing

Minimalist mono landing page for `quanla.org`.

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

```text
landing/
├── app/
│   ├── components/   ← Section, ProjectRow, LinkRow, ThemeToggle
│   ├── globals.css   ← zinc palette + theme tokens
│   ├── layout.tsx
│   ├── page.tsx      ← all sections live here
│   └── theme-script.tsx
├── public/favicon.svg
└── next.config.ts    ← output: export, trailingSlash: true
```

## Build from repo root

```bash
node build-site.mjs
# → landing/out/
```

## Cloudflare Pages

- **Build Command**: `cd landing && npm ci && cd .. && node build-site.mjs`
- **Output Directory**: `landing/out`
