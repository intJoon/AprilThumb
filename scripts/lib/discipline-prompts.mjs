import { injectPromptMarkers } from "./overlay-markers.mjs";
import { buildOverlay, OVERLAY_TRACKS } from "./overlays.mjs";
import { genericRubricFor } from "./discipline-rubrics.mjs";
import { basePromptRaw, PROMPT_IDS } from "./prompt-sources.mjs";

export { PROMPT_IDS };

function applyOverlay(text, overlay, trackId, locale) {
  if (!overlay) {
    let out = text;
    if (trackId === "general") {
      out = out.replace("<!-- OVERLAY:academic-rubric -->", genericRubricFor(locale));
    }
    return out.replace(/<!-- OVERLAY:[\w-]+ -->/g, "");
  }
  let out = text;
  for (const [key, value] of Object.entries(overlay)) {
    out = out.replace(`<!-- OVERLAY:${key} -->`, value || "");
  }
  return out.replace(/<!-- OVERLAY:[\w-]+ -->/g, "");
}

export function fullPromptFor(trackId, locale, promptId) {
  const raw = basePromptRaw(trackId, locale, promptId);
  if (!raw) return "";
  const marked = injectPromptMarkers(promptId, raw);
  const overlay = OVERLAY_TRACKS.includes(trackId)
    ? buildOverlay(trackId, locale)
    : null;
  return `${applyOverlay(marked, overlay, trackId, locale).trim()}\n`;
}
