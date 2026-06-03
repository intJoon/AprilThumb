import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const tmpHtml = path.join(publicDir, "_brand-asset.html");

const iconSvg = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="7" fill="#faf7f2"/>
  <rect x="6" y="7" width="13" height="17" rx="2" fill="#e8e2d9" stroke="#2a7a72" stroke-width="0.8"/>
  <rect x="9" y="9" width="13" height="17" rx="2" fill="#f0ebe3" stroke="#2a7a72" stroke-width="0.8"/>
  <rect x="12" y="11" width="13" height="17" rx="2" fill="#fffdf9" stroke="#1a1814" stroke-width="1"/>
  <line x1="15" y1="16" x2="22" y2="16" stroke="#2a7a72" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="15" y1="19.5" x2="21" y2="19.5" stroke="#a8a29e" stroke-width="1.1" stroke-linecap="round"/>
  <line x1="15" y1="23" x2="20" y2="23" stroke="#a8a29e" stroke-width="1.1" stroke-linecap="round"/>
</svg>`;

const brandHtml = (width, height, variant) => {
  if (variant === "touch") {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" />
<style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: ${width}px;
    height: ${height}px;
    background: #faf7f2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon {
    width: 128px;
    height: 128px;
  }
</style>
</head>
<body>${iconSvg.replace("<svg", '<svg class="icon"')}</body>
</html>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@600;700&family=Source+Serif+4:wght@700&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: ${width}px;
    height: ${height}px;
    background: #faf7f2;
    font-family: "Source Sans 3", system-ui, sans-serif;
    color: #1a1814;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .card {
    display: flex;
    align-items: center;
    gap: 48px;
    padding: 0 72px;
  }
  .icon {
    flex-shrink: 0;
    width: 120px;
    height: 120px;
  }
  .title {
    font-family: "Source Serif 4", Georgia, serif;
    font-size: 72px;
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }
  .tag {
    margin-top: 16px;
    font-size: 28px;
    font-weight: 600;
    color: #0f766e;
  }
  .bg {
    position: fixed;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 118, 110, 0.08) 0%, transparent 42%), #faf7f2;
    z-index: -1;
  }
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="card">
    ${iconSvg.replace("<svg", '<svg class="icon"')}
    <div>
      <p class="title">AprilThumb</p>
      <p class="tag">ChatGPT · Gemini — 24 disciplines, 6 languages</p>
    </div>
  </div>
</body>
</html>`;
};

async function renderAsset(browser, width, height, variant, outName) {
  fs.writeFileSync(tmpHtml, brandHtml(width, height, variant), "utf8");
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.goto(`file://${tmpHtml.replace(/\\/g, "/")}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  const out = path.join(publicDir, outName);
  await page.screenshot({ path: out, type: "png" });
  await page.close();
  console.log("Wrote", out);
}

const browser = await chromium.launch();
try {
  await renderAsset(browser, 1200, 630, "og", "og-image.png");
  await renderAsset(browser, 180, 180, "touch", "apple-touch-icon.png");
} finally {
  await browser.close();
  fs.unlinkSync(tmpHtml);
}
