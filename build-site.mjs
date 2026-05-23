#!/usr/bin/env node
// Build the static landing site. Run from repo root: `node build-site.mjs`

import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const LANDING = path.join(ROOT, "landing");
const OUT = path.join(LANDING, "out");

function run(cmd, cwd) {
  console.log(`
$ ${cmd}  (in ${path.relative(ROOT, cwd) || "."})`);
  execSync(cmd, { cwd, stdio: "inherit", shell: true });
}

function main() {
  console.log("→ Building Next.js landing");
  run("npm run build", LANDING);

  console.log(`
✓ Done. Output at ${path.relative(ROOT, OUT)}/`);
  console.log("  /        → landing");
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
}
