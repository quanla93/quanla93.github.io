#!/usr/bin/env node
// Build the combined site: landing at /, existing portfolio at /me/.
// Run from repo root: `node build-site.mjs`
//
// Steps:
//   1. cd landing && npm run build  → landing/out/
//   2. copy repo-root portfolio files → landing/out/me/
//   3. inject <base href> into out/me/**/*.html so relative paths
//      resolve correctly even when accessed without trailing slash.

import { execSync } from "node:child_process";
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const LANDING = path.join(ROOT, "landing");
const OUT = path.join(LANDING, "out");
const ME_OUT = path.join(OUT, "me");

// Files & folders at repo root that make up the existing portfolio.
const PORTFOLIO_ASSETS = [
  "index.html",
  "script.js",
  "style.css",
  "favicon.svg",
  "QuânLA.png",
  "tools",
  "README.md",
];

function run(cmd, cwd) {
  console.log(`\n$ ${cmd}  (in ${path.relative(ROOT, cwd) || "."})`);
  execSync(cmd, { cwd, stdio: "inherit", shell: true });
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function* walkHtml(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkHtml(full);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      yield full;
    }
  }
}

async function injectBaseTags() {
  let count = 0;
  for await (const file of walkHtml(ME_OUT)) {
    const relDir = path.relative(ME_OUT, path.dirname(file)).replace(/\\/g, "/");
    const basePath = relDir === "" ? "/me/" : `/me/${relDir}/`;
    let html = await readFile(file, "utf-8");
    if (/<base\s/i.test(html)) continue;
    html = html.replace(/<head([^>]*)>/i, `<head$1>\n    <base href="${basePath}">`);
    await writeFile(file, html);
    count++;
    console.log(`  base="${basePath}"  ${path.relative(OUT, file).replace(/\\/g, "/")}`);
  }
  return count;
}

async function main() {
  console.log("→ Building Next.js landing");
  run("npm run build", LANDING);

  console.log("\n→ Copying portfolio into out/me/");
  await rm(ME_OUT, { recursive: true, force: true });
  await mkdir(ME_OUT, { recursive: true });

  for (const asset of PORTFOLIO_ASSETS) {
    const src = path.join(ROOT, asset);
    if (!(await exists(src))) {
      console.warn(`  skip (missing): ${asset}`);
      continue;
    }
    const dest = path.join(ME_OUT, asset);
    await cp(src, dest, { recursive: true });
    console.log(`  + ${asset}`);
  }

  console.log("\n→ Injecting <base href> into out/me/**/*.html");
  const injected = await injectBaseTags();
  console.log(`  ${injected} file(s) patched`);

  console.log(`\n✓ Done. Output at ${path.relative(ROOT, OUT)}/`);
  console.log("  /        → landing");
  console.log("  /me/     → portfolio (works with or without trailing slash)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
