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
const requiredRootFiles = [
  "index.html",
  "404.html",
  ".nojekyll",
  "favicon.ico",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "apple-touch-icon.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
];

if (html.includes('/src/main.tsx') || html.includes('/src/')) {
  throw new Error("dist/index.html still references source files instead of the built bundle.");
}

const missingRootFiles = requiredRootFiles.filter((file) => !existsSync(join(distDir, file)));

if (missingRootFiles.length) {
  throw new Error(`GitHub Pages artifact is missing required root file(s):\n${missingRootFiles.join("\n")}`);
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
  ...html.matchAll(/(?:src|href)=["'](\/(?:assets|favicon|apple-touch-icon|android-chrome)[^"']+)["']/g),
].map((match) => match[1]);

const missing = staticRefs.filter((ref) => !existsSync(join(distDir, ref.slice(1))));

if (missing.length) {
  throw new Error(`Static files referenced by dist/index.html are missing:\n${missing.join("\n")}`);
}

if (!existsSync(join(distDir, "assets"))) {
  throw new Error("dist/assets is missing. The built JS/CSS bundle will not deploy correctly.");
}

const textFiles = walk(distDir).filter((file) => /\.(html|js|css)$/i.test(file));
const sourceReferences = [];
const externalAssetReferences = [];

for (const file of textFiles) {
  const contents = readFileSync(file, "utf8");

  if (contents.includes("/src/main.tsx")) {
    sourceReferences.push(relative(distDir, file));
  }

  if (contents.includes("/__l5e/assets-v1/") || contents.includes("/assets-cdn/")) {
    externalAssetReferences.push(relative(distDir, file));
  }
}

if (sourceReferences.length) {
  throw new Error(`Built files still reference the Vite source entry:\n${sourceReferences.join("\n")}`);
}

if (externalAssetReferences.length) {
  throw new Error(`Built files still reference internal/external asset paths instead of Vite assets:\n${externalAssetReferences.join("\n")}`);
}

const jsRefs = staticRefs.filter((ref) => ref.startsWith("/assets/") && ref.endsWith(".js"));
const cssRefs = staticRefs.filter((ref) => ref.startsWith("/assets/") && ref.endsWith(".css"));
const entryJsRefs = jsRefs.filter((ref) => /^\/assets\/index-[^/]+\.js$/.test(ref));

if (!jsRefs.length) {
  throw new Error("dist/index.html does not reference a built JavaScript module in /assets.");
}

if (!entryJsRefs.length) {
  throw new Error("dist/index.html must reference the compiled Vite entry bundle at /assets/index-*.js.");
}

if (!cssRefs.length) {
  throw new Error("dist/index.html does not reference a built stylesheet in /assets.");
}

const builtAssetFiles = walk(join(distDir, "assets")).filter((file) => /\.(png|jpe?g|webp|gif|svg|ico|pdf|js|css)$/i.test(file));

console.log(
  `GitHub Pages build verified: ${staticRefs.length} index asset reference(s), ${builtAssetFiles.length} built file(s) in dist/assets, no internal asset URLs.`,
);