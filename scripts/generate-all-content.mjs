import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { OVERLAY_TRACKS, buildOverlay } from "./lib/overlays.mjs";
import { writeLocaleBundles } from "./lib/write-locale-bundles.mjs";
import { fullGuideFor } from "./lib/discipline-guide.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const tracksRoot = path.join(root, "content", "tracks");
const locales = ["ko", "en-GB", "zh-TW", "ja", "fr", "es"];
const STANDALONE = new Set(["general", "pharmacy"]);

function writeFile(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
}

function copyStandaloneLocales(trackId) {
  for (const locale of locales) {
    const dir = path.join(tracksRoot, trackId, locale);
    if (!fs.existsSync(dir)) {
      console.warn(`Missing ${trackId}/${locale} — run write-locale-bundles first`);
      continue;
    }
  }
}

function writeOverlays() {
  for (const trackId of OVERLAY_TRACKS) {
    for (const locale of locales) {
      const overlay = buildOverlay(trackId, locale);
      writeFile(
        `content/tracks/${trackId}/overlay.${locale}.json`,
        JSON.stringify(overlay, null, 2) + "\n"
      );
    }
  }
}

function writeOverlayGuides() {
  for (const trackId of OVERLAY_TRACKS) {
    for (const locale of locales) {
      writeFile(
        `content/tracks/${trackId}/${locale}/guide.md`,
        fullGuideFor(trackId, locale)
      );
    }
  }
}

writeLocaleBundles();
writeOverlays();
writeOverlayGuides();
copyStandaloneLocales("general");
copyStandaloneLocales("pharmacy");
console.log("Locale bundles written (no roughTranslate).");
