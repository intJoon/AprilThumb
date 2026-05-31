import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { OVERLAY_TRACKS, buildOverlay } from "./lib/overlays.mjs";
import { fullGuideFor } from "./lib/discipline-guide.mjs";
import { fullPromptFor, PROMPT_IDS } from "./lib/discipline-prompts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const locales = ["ko", "en-GB", "zh-TW", "ja", "fr", "es"];
const ALL_TRACKS = ["general", "pharmacy", ...OVERLAY_TRACKS];

function writeFile(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
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

function writeTrackGuides() {
  for (const trackId of ALL_TRACKS) {
    for (const locale of locales) {
      writeFile(
        `content/tracks/${trackId}/${locale}/guide.md`,
        fullGuideFor(trackId, locale)
      );
    }
  }
}

function writeTrackPrompts() {
  for (const trackId of ALL_TRACKS) {
    for (const locale of locales) {
      for (const id of PROMPT_IDS) {
        writeFile(
          `content/tracks/${trackId}/${locale}/prompts/${id}.md`,
          fullPromptFor(trackId, locale, id)
        );
      }
    }
  }
}

writeOverlays();
writeTrackGuides();
writeTrackPrompts();
console.log(`Generated ${ALL_TRACKS.length}×${locales.length} guides and prompts.`);
