import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const distDir = "dist";
const indexPath = join(distDir, "index.html");

const walk = (dir) => {
  if (!existsSync(dir)) return [];

  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
};

if (!existsSync(indexPath)) {
  throw new Error("dist/index.html is missing. GitHub Pages needs a root index.html.");
}

const html = readFileSync(indexPath, "utf8");

if (html.includes('/src/main.tsx')) {
  throw new Error("dist/index.html still references /src/main.tsx instead of the built bundle.");
}

if (!existsSync(join(distDir, ".nojekyll"))) {
  throw new Error("dist/.nojekyll is missing. GitHub Pages may process the artifact incorrectly.");
}

if (!existsSync(join(distDir, "404.html"))) {
  throw new Error("dist/404.html is missing. Deep links need the SPA fallback file.");
}

if (readFileSync(join(distDir, "404.html"), "utf8") !== html) {
  throw new Error("dist/404.html must match dist/index.html so refreshed SPA routes boot correctly.");
}

const staticRefs = [
  ...html.matchAll(/(?:src|href)=["'](\/(?:assets|assets-cdn)\/[^"']+)["']/g),
].map((match) => match[1]);

const missing = staticRefs.filter((ref) => !existsSync(join(distDir, ref.slice(1))));

if (missing.length) {
  throw new Error(`Static files referenced by dist/index.html are missing:\n${missing.join("\n")}`);
}

if (!existsSync(join(distDir, "assets"))) {
  throw new Error("dist/assets is missing. The built JS/CSS bundle will not deploy correctly.");
}

if (!existsSync(join(distDir, "assets-cdn"))) {
  throw new Error("dist/assets-cdn is missing. Portfolio images/PDF assets will 404 on GitHub Pages.");
}

const textFiles = walk(distDir).filter((file) => /\.(html|js|css)$/i.test(file));
const sourceReferences = [];
const assetCdnReferences = new Set(staticRefs.filter((ref) => ref.startsWith("/assets-cdn/")));

for (const file of textFiles) {
  const contents = readFileSync(file, "utf8");

  if (contents.includes("/src/main.tsx")) {
    sourceReferences.push(relative(distDir, file));
  }

  for (const match of contents.matchAll(/\/assets-cdn\/[^"'`)\s<>]+/g)) {
    assetCdnReferences.add(match[0]);
  }
}

if (sourceReferences.length) {
  throw new Error(`Built files still reference the Vite source entry:\n${sourceReferences.join("\n")}`);
}

const missingAssetCdn = [...assetCdnReferences].filter((ref) => !existsSync(join(distDir, ref.slice(1))));

if (missingAssetCdn.length) {
  throw new Error(`Built files reference assets-cdn files that are missing from dist:\n${missingAssetCdn.join("\n")}`);
}

const jsRefs = staticRefs.filter((ref) => ref.startsWith("/assets/") && ref.endsWith(".js"));

if (!jsRefs.length) {
  throw new Error("dist/index.html does not reference a built JavaScript module in /assets.");
}

const publicAssetCount = walk("public/assets-cdn").length;
const distAssetCount = walk(join(distDir, "assets-cdn")).length;

if (publicAssetCount !== distAssetCount) {
  throw new Error(`dist/assets-cdn file count (${distAssetCount}) does not match public/assets-cdn (${publicAssetCount}).`);
}

console.log(
  `GitHub Pages build verified: ${staticRefs.length} index asset reference(s), ${assetCdnReferences.size} assets-cdn reference(s), ${distAssetCount} deployed media file(s).`,
);