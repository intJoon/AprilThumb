import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PACKS } from "./locale-packs/index.mjs";
import { injectPromptMarkers } from "./overlay-markers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");
const tracksRoot = path.join(root, "content", "tracks");

const PROMPT_IDS = [
  "academic-review",
  "source-check",
  "concise-mode",
  "writing-review",
  "presentation",
  "study-companion",
];

const TRACKS = ["general", "pharmacy"];

function writeFile(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
}

export function writeLocaleBundles() {
  // KO SSOT lives on disk (content/tracks/*/ko); never generated from PACKS.
  for (const [locale, pack] of Object.entries(PACKS)) {
    for (const trackId of TRACKS) {
      const data = pack[trackId];
      if (!data) continue;
      const base = `content/tracks/${trackId}/${locale}`;
      for (const id of PROMPT_IDS) {
        const raw = data.prompts[id];
        if (!raw) continue;
        const body = injectPromptMarkers(id, raw);
        writeFile(`${base}/prompts/${id}.md`, `${body.trim()}\n`);
      }
    }
    console.log(`Wrote locale pack: ${locale} (general + pharmacy)`);
  }
}
