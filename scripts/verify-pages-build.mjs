import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const indexPath = join(distDir, "index.html");

if (!existsSync(indexPath)) {
  throw new Error("dist/index.html is missing. GitHub Pages needs a root index.html.");
}

const html = readFileSync(indexPath, "utf8");

if (html.includes('/src/main.tsx')) {
  throw new Error("dist/index.html still references /src/main.tsx instead of the built bundle.");
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

console.log(`GitHub Pages build verified: ${staticRefs.length} index asset reference(s) exist.`);