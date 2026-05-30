import { chromium } from "playwright";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { LOCALES, SITE_URL } from "../docs/instagram-carousel/slide-content.mjs";
import { renderSlidesHtml } from "./render-instagram-slides.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const carouselDir = path.join(root, "docs", "instagram-carousel");
const qrPath = path.join(carouselDir, "qr.png");
const exportRoot = path.join(carouselDir, "export");

const onlyLocale = process.argv.find((a) => a.startsWith("--locale="))?.split("=")[1];
const locales = onlyLocale ? LOCALES.filter((l) => l.id === onlyLocale) : LOCALES;

if (onlyLocale && locales.length === 0) {
  console.error(`Unknown --locale=${onlyLocale}. Use: ko, en, zh-TW`);
  process.exit(1);
}

fs.mkdirSync(exportRoot, { recursive: true });

await QRCode.toFile(qrPath, SITE_URL, {
  width: 480,
  margin: 1,
  color: { dark: "#1a1814", light: "#ffffff" },
  errorCorrectionLevel: "M",
});
console.log("Wrote", qrPath);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 2,
});

for (const { id } of locales) {
  const htmlPath = path.join(carouselDir, `slides-${id}.html`);
  const outDir = path.join(exportRoot, id);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(htmlPath, renderSlidesHtml(id), "utf8");
  console.log("Wrote", htmlPath);

  await page.goto(`file://${htmlPath.replace(/\\/g, "/")}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);

  const slides = await page.locator(".slide").all();
  for (let i = 0; i < slides.length; i++) {
    const n = String(i + 1).padStart(2, "0");
    const out = path.join(outDir, `aprilstumb-carousel-${n}.png`);
    await slides[i].screenshot({ path: out, type: "png" });
    console.log("Wrote", out);
  }

  if (id === "ko") {
    for (let i = 0; i < slides.length; i++) {
      const n = String(i + 1).padStart(2, "0");
      fs.copyFileSync(
        path.join(outDir, `aprilstumb-carousel-${n}.png`),
        path.join(exportRoot, `aprilstumb-carousel-${n}.png`)
      );
    }
    fs.copyFileSync(htmlPath, path.join(carouselDir, "slides.html"));
  }
}

await browser.close();
console.log(`Done → ${exportRoot}/{ko,en,zh-TW}/`);
