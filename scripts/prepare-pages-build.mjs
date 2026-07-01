import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const indexPath = join(distDir, "index.html");

if (!existsSync(indexPath)) {
  throw new Error("dist/index.html is missing. Run vite build before preparing GitHub Pages output.");
}

copyFileSync(indexPath, join(distDir, "404.html"));
writeFileSync(join(distDir, ".nojekyll"), "");

console.log("Prepared GitHub Pages artifact: copied index.html to 404.html and added .nojekyll.");