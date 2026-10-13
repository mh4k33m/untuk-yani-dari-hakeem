import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const output = resolve(".output/public");
const base = "/untuk-yani-dari-hakeem/";
assert.ok(existsSync(resolve(output, "index.html")), "GitHub Pages needs a static index.html");
const html = readFileSync(resolve(output, "index.html"), "utf8");
assert.ok(html.includes("Buka surat aku"), "Static page must contain the opening letter");
const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((url) => url.startsWith("/"));
assert.ok(
  assets.some((url) => url.endsWith(".js")),
  "Static page needs its hydration script",
);
assert.ok(
  assets.some((url) => url.endsWith("/favicon.svg")),
  "Static page needs the personal favicon",
);
for (const url of assets) {
  assert.ok(url.startsWith(base), `Asset must use the GitHub Pages project path: ${url}`);
  const file = resolve(output, decodeURIComponent(url.slice(base.length).split("?")[0]));
  assert.ok(existsSync(file), `Referenced static asset is missing: ${url}`);
}
console.log("GitHub Pages index and all local assets verified.");
