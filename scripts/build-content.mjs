import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { OVERLAY_TRACKS } from "./lib/overlays.mjs";
import { GENERIC_RUBRIC, genericRubricFor } from "./lib/discipline-rubrics.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const contentRoot = path.join(root, "content");
const outRoot = path.join(root, "public", "data");

const manifest = JSON.parse(
  fs.readFileSync(path.join(contentRoot, "manifest.json"), "utf8")
);

const STANDALONE_TRACKS = new Set(["general", "pharmacy"]);
const koFallbacks = [];

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function readText(p) {
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, "utf8");
}

function copyText(raw) {
  const parts = raw.split(/\r?\n---\r?\n/);
  if (parts.length >= 2) {
    return parts.slice(1).join("\n---\n").trim();
  }
  return raw.replace(/^#.*\n+/m, "").trim();
}

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

function resolveOverlay(trackId, locale) {
  const exact = path.join(contentRoot, "tracks", trackId, `overlay.${locale}.json`);
  const ko = path.join(contentRoot, "tracks", trackId, "overlay.ko.json");
  if (fs.existsSync(exact)) return readJson(exact);
  if (locale !== "ko" && fs.existsSync(ko)) {
    koFallbacks.push(`${trackId}/${locale} overlay → ko`);
    return readJson(ko);
  }
  return null;
}

function resolveSource(trackId, locale, subpath) {
  if (STANDALONE_TRACKS.has(trackId)) {
    const exact = path.join(contentRoot, "tracks", trackId, locale, subpath);
    const ko = path.join(contentRoot, "tracks", trackId, "ko", subpath);
    let text = null;
    if (fs.existsSync(exact)) text = readText(exact);
    else if (locale !== "ko" && fs.existsSync(ko)) {
      koFallbacks.push(`${trackId}/${locale}/${subpath} → ko`);
      text = readText(ko);
    }
    if (!text) return null;
    return applyOverlay(text, null, trackId, locale);
  }

  const trackExact = path.join(contentRoot, "tracks", trackId, locale, subpath);
  const trackKo = path.join(contentRoot, "tracks", trackId, "ko", subpath);
  if (subpath === "guide.md" && fs.existsSync(trackExact)) {
    const overlay = resolveOverlay(trackId, locale);
    return applyOverlay(readText(trackExact), overlay, trackId, locale);
  }
  if (subpath === "guide.md" && locale !== "ko" && fs.existsSync(trackKo)) {
    koFallbacks.push(`${trackId}/${locale}/${subpath} → ko`);
    const overlay = resolveOverlay(trackId, locale);
    return applyOverlay(readText(trackKo), overlay, trackId, locale);
  }

  const generalExact = path.join(contentRoot, "tracks", "general", locale, subpath);
  const generalKo = path.join(contentRoot, "tracks", "general", "ko", subpath);
  let base = fs.existsSync(generalExact)
    ? readText(generalExact)
    : readText(generalKo);
  if (!base) return null;
  if (!fs.existsSync(generalExact) && locale !== "ko") {
    koFallbacks.push(`${trackId}/${locale}/${subpath} general → ko`);
  }
  const overlay = resolveOverlay(trackId, locale);
  return applyOverlay(base, overlay, trackId, locale);
}

function loadUi(locale) {
  const p = path.join(contentRoot, "i18n", `ui.${locale}.json`);
  if (fs.existsSync(p)) return readJson(p);
  koFallbacks.push(`ui.${locale} → ko`);
  return readJson(path.join(contentRoot, "i18n", "ui.ko.json"));
}

function titleFromUi(ui, key) {
  const parts = key.split(".");
  let cur = ui;
  for (const p of parts) cur = cur?.[p];
  return cur || key;
}

function buildBundle(trackId, locale) {
  const ui = loadUi(locale);
  const guideMd = resolveSource(trackId, locale, "guide.md");
  if (!guideMd) throw new Error(`Missing guide: ${trackId}/${locale}`);

  const prompts = manifest.prompts.map((p) => {
    const body = resolveSource(trackId, locale, `prompts/${p.id}.md`);
    if (!body) throw new Error(`Missing prompt ${p.id}: ${trackId}/${locale}`);
    return {
      id: p.id,
      title: titleFromUi(ui, p.titleKey),
      description: titleFromUi(ui, p.descKey),
      order: p.order,
      copyText: copyText(body),
      body,
    };
  });

  return {
    trackId,
    locale,
    siteTitle: ui.siteTitle,
    updatedAt: new Date().toISOString(),
    ui,
    guide: { markdown: guideMd },
    prompts,
  };
}

fs.mkdirSync(path.join(outRoot, "bundles"), { recursive: true });

const siteUrl = (manifest.siteUrl || "https://aprilstumb.vercel.app").replace(/\/$/, "");

const publicManifest = {
  siteTitle: manifest.siteTitle,
  siteUrl,
  tracks: manifest.tracks,
  locales: manifest.locales,
  prompts: manifest.prompts,
  bundles: [],
};

let bundleCount = 0;

for (const track of manifest.tracks) {
  for (const locale of manifest.locales) {
    const bundle = buildBundle(track.id, locale);
    const name = `${track.id}-${locale}.json`;
    fs.writeFileSync(
      path.join(outRoot, "bundles", name),
      JSON.stringify(bundle),
      "utf8"
    );
    publicManifest.bundles.push({ trackId: track.id, locale, file: name });
    bundleCount++;
  }
}

fs.writeFileSync(
  path.join(outRoot, "manifest.json"),
  JSON.stringify(publicManifest, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(root, "public", "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  "utf8"
);

fs.writeFileSync(
  path.join(root, "public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
  "utf8"
);

const uniqueFallbacks = [...new Set(koFallbacks)];
console.log(`Wrote ${bundleCount} bundles to public/data/bundles/`);
if (uniqueFallbacks.length) {
  console.warn("KO fallbacks used:");
  for (const f of uniqueFallbacks) console.warn(" -", f);
}
