import { PACKS } from "./locale-packs/index.mjs";
import { KO_PROMPTS } from "./ko-prompts.mjs";

export const PROMPT_IDS = [
  "academic-review",
  "source-check",
  "concise-mode",
  "writing-review",
  "presentation",
  "study-companion",
];

const STANDALONE = new Set(["general", "pharmacy"]);

export function basePromptRaw(trackId, locale, promptId) {
  const sourceTrack = STANDALONE.has(trackId) ? trackId : "general";
  if (locale === "ko") {
    return KO_PROMPTS[sourceTrack]?.prompts[promptId] || null;
  }
  return PACKS[locale]?.[sourceTrack]?.prompts[promptId] || null;
}
