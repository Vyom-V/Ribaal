import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const readText = (relativePath) =>
  readFile(new URL(relativePath, root), "utf8");

function pngSize(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  assert.equal(signature, "89504e470d0a1a0a");
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

test("contains the complete standalone Ribaal application", async () => {
  const [page, home, styles, layout, globals, icon] = await Promise.all([
    readText("app/page.tsx"),
    readText("app/RibaalHome.tsx"),
    readText("app/Ribaal.module.css"),
    readText("app/layout.tsx"),
    readText("app/globals.css"),
    readText("app/icon.svg"),
  ]);

  assert.match(page, /RibaalHome/);
  assert.match(home, /import\("lenis"\)/);
  assert.match(home, /import\("gsap\/ScrollTrigger"\)/);
  assert.match(home, /ScrollTrigger\.update\(\)/);
  assert.match(home, /prefers-reduced-motion/);
  assert.match(home, /id="featured"/);
  assert.match(home, /id="story"/);
  assert.match(home, /id="collections"/);
  assert.match(home, /id="footer"/);
  assert.match(styles, /position:\s*sticky/);
  assert.match(styles, /footer-border-tile\.svg/);
  assert.match(icon, /<svg\b/);
  assert.doesNotMatch(layout + globals, /Shop From Bharat|globe-runtime/);
});

test("pins the portable dependency and static-export contract", async () => {
  const packageJson = JSON.parse(await readText("package.json"));
  const nextConfig = await readText("next.config.ts");

  assert.equal(packageJson.dependencies.lenis, "1.3.14");
  assert.equal(packageJson.dependencies.gsap, "3.13.0");
  assert.equal(packageJson.dependencies.next, "16.2.6");
  assert.equal(packageJson.scripts.build, "next build");
  assert.match(nextConfig, /output:\s*"export"/);
});

test("includes every runtime asset with the expected PNG geometry", async () => {
  const expectedFiles = [
    "brand-mark.svg",
    "curtain-border-tile.svg",
    "jaali-tile.svg",
    "footer-arch-tile.svg",
    "footer-border-tile.svg",
  ];

  for (const file of expectedFiles) {
    const svg = await readText("public/ribaal/" + file);
    assert.match(svg, /<svg\b/);
    assert.doesNotMatch(svg, /<script\b|javascript:/i);
  }

  const pngs = {
    "hero-sherwani.png": { width: 1672, height: 941 },
    "craft-detail.png": { width: 1122, height: 1402 },
    "sherwani-collection-grid.png": { width: 1254, height: 1254 },
  };

  for (const [file, expected] of Object.entries(pngs)) {
    const bytes = await readFile(new URL("public/ribaal/" + file, root));
    assert.deepEqual(pngSize(bytes), expected);
  }
});
