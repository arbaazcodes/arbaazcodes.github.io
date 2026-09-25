import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const assetsDir = path.join(rootDir, "src", "assets");
const portfolioDir = path.join(assetsDir, "portfolio");
const brochuresDir = path.join(assetsDir, "brochures");

async function optimizeHero() {
  console.log("Optimizing hero image...");
  const heroInput = path.join(assetsDir, "arbaaz-hero.jpg");
  const heroOutput = path.join(assetsDir, "arbaaz-hero.webp");

  await sharp(heroInput)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(heroOutput);

  const inStat = await fs.stat(heroInput);
  const outStat = await fs.stat(heroOutput);
  console.log(
    `Hero: ${(inStat.size / 1024).toFixed(1)} KB -> ${(outStat.size / 1024).toFixed(1)} KB`,
  );
}

async function optimizeResumePreview() {
  const resumeInput = path.join(assetsDir, "resume-preview.jpg");
  const resumeOutput = path.join(assetsDir, "resume-preview.webp");

  await sharp(resumeInput)
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(resumeOutput);

  const inStat = await fs.stat(resumeInput);
  const outStat = await fs.stat(resumeOutput);
  console.log(
    `Resume preview: ${(inStat.size / 1024).toFixed(1)} KB -> ${(outStat.size / 1024).toFixed(1)} KB`,
  );
}

async function optimizePortfolio() {
  console.log("Optimizing portfolio images...");
  const files = await fs.readdir(portfolioDir);
  const pngFiles = files.filter((f) => f.endsWith(".png") || f.endsWith(".jpg"));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of pngFiles) {
    const inputPath = path.join(portfolioDir, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(portfolioDir, `${baseName}.webp`);

    const inStat = await fs.stat(inputPath);
    totalBefore += inStat.size;

    await sharp(inputPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);

    const outStat = await fs.stat(outputPath);
    totalAfter += outStat.size;

    console.log(
      `  ${file}: ${(inStat.size / 1024).toFixed(1)} KB -> ${(outStat.size / 1024).toFixed(1)} KB`,
    );
  }

  console.log(
    `Portfolio total: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB -> ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`,
  );
}

async function optimizeBrochures() {
  console.log("Optimizing active brochures...");
  const activeFiles = [
    "drive_metropolia_1.png",
    "drive_metropolia_2.png",
    "drive_turku_1.png",
    "drive_turku_2.png",
    "drive_edufinn_1.png",
    "drive_edufinn_2.png",
    "drive_edufinn_3.png",
    "drive_edufinn_4.png",
    "drive_swiftams_1.jpg",
    "drive_swiftams_2.jpg",
    "drive_swiftams_3.jpg",
    "drive_swiftams_4.jpg",
    "drive_swiftams_5.jpg",
    "drive_swiftams_6.jpg",
    "drive_swiftams_7.jpg",
    "drive_swiftams_8.jpg",
  ];

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of activeFiles) {
    const inputPath = path.join(brochuresDir, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(brochuresDir, `${baseName}.webp`);

    const inStat = await fs.stat(inputPath);
    totalBefore += inStat.size;

    await sharp(inputPath)
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);

    const outStat = await fs.stat(outputPath);
    totalAfter += outStat.size;

    console.log(
      `  ${file}: ${(inStat.size / 1024).toFixed(1)} KB -> ${(outStat.size / 1024).toFixed(1)} KB`,
    );
  }

  console.log(
    `Active brochures total: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB -> ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`,
  );
}

async function main() {
  await optimizeHero();
  await optimizeResumePreview();
  await optimizePortfolio();
  await optimizeBrochures();
  console.log("Image optimization complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
