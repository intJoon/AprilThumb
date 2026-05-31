import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { OVERLAY_TRACKS, buildOverlay } from "./lib/overlays.mjs";
import { depthFor } from "./lib/discipline-depth.mjs";
import { ZH, JA, FR, ES } from "./lib/discipline-rubrics-i18n.mjs";
import { GUIDE_HEADINGS } from "./lib/discipline-guide.mjs";
import { AI_OVERRIDE } from "./lib/discipline-guide-ai.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const bundlesDir = path.join(root, "public", "data", "bundles");
const manifestPath = path.join(root, "content", "manifest.json");

const LOCALES = ["ko", "en-GB", "zh-TW", "ja", "fr", "es"];
const STANDALONE = ["general", "pharmacy"];
const ALL_TRACKS = [...STANDALONE, ...OVERLAY_TRACKS];

const WRITING_TRACKS = new Set(OVERLAY_TRACKS);

const I18N_RUBRIC = { "zh-TW": ZH, ja: JA, fr: FR, es: ES };

const CONCISE_TRACKS = new Set(["linguistics"]);

const LOCALE_MARKERS = {
  ko: {
    round0: "라운드 0",
    final: "최종 보고",
    autoClarity: ["Auto-Clarity"],
    chatgpt: "ChatGPT에서",
    gemini: "Gemini에서",
    lite: "**lite**",
    ultra: "**ultra**",
  },
  "en-GB": {
    round0: "Round 0",
    final: "Final report",
    autoClarity: ["Auto-Clarity", "Auto-clarity"],
    chatgpt: "In ChatGPT",
    gemini: "In Gemini",
    lite: ["**lite**", "**Lite**"],
    ultra: ["**ultra**", "**Ultra**"],
  },
  "zh-TW": {
    round0: "第 0 輪",
    final: "最終報告",
    autoClarity: ["自動詳述", "自動寫完整", "Auto-Clarity"],
    chatgpt: "在 ChatGPT",
    gemini: "在 Gemini",
    lite: ["**lite**", "**輕量**"],
    ultra: ["**ultra**", "**極簡**"],
  },
  ja: {
    round0: "ラウンド 0",
    final: "最終報告",
    autoClarity: ["Auto-Clarity", "自動で全文"],
    chatgpt: "ChatGPT",
    gemini: "Gemini",
    lite: ["**lite**", "**ライト**"],
    ultra: ["**ultra**", "**ウルトラ**"],
  },
  fr: {
    round0: "Tour 0",
    final: "Rapport final",
    autoClarity: ["Clarté automatique", "Auto-Clarity"],
    chatgpt: "Dans ChatGPT",
    gemini: "Dans Gemini",
    lite: ["**lite**", "**Lite**", "**Léger**"],
    ultra: ["**ultra**", "**Ultra**"],
  },
  es: {
    round0: "Ronda 0",
    final: "Informe final",
    autoClarity: ["Auto-Claridad", "Auto-Clarity", "Claridad automática"],
    chatgpt: "En ChatGPT",
    gemini: "En Gemini",
    lite: ["**lite**", "**Lite**", "**Ligero**"],
    ultra: ["**ultra**", "**Ultra**", "**Extremo**"],
  },
};

const EN_LEAK =
  /\b(claim with no|Add textbook|Add paper|Add provision|Add stats|Add assumptions|Add measurement|Add data source|Add catalogue|Add reply|Add thesis|Add load|Add error|Add limits|Add drawing|Add IRAC|Add one alternative|Add context paragraph|Add withdrawal|Add mass\/energy|Significant improvement|efficient process|definitive diagnosis|illegality claim|persona claim|interpretation with|objection raised|model conclusion|design claim|signal-processing|nutrition or policy|human dose|example \(1\) lacks)\b/;

const EN_LABEL_LEAK =
  /\b(Algorithms:|Research:|Statutes:|Pathophysiology:|Balances:|Species:|Phonology:|Primary:|Argument:|Physiology:|Model:|Space:|Circuits:|Nutrition:)\b/;

function hasAny(text, markers) {
  const list = Array.isArray(markers) ? markers : [markers];
  return list.some((m) => text.includes(m));
}

function countBullets(text) {
  const dash = (text.match(/\n-\s/g) || []).length;
  const numbered = (text.match(/\n\d+\.\s/g) || []).length;
  return dash + numbered;
}

function hasWritingExamples(text) {
  const pass =
    (text.match(/✅/g) || []).length +
    (text.match(/\bGood:/gi) || []).length +
    (text.match(/好：/g) || []).length +
    (text.match(/Bon :/gi) || []).length +
    (text.match(/良い例/g) || []).length +
    (text.match(/Bueno:/gi) || []).length;
  const fail =
    text.includes("❌") ||
    /\bBad:/i.test(text) ||
    text.includes("差：") ||
    /Mauvais :/i.test(text) ||
    text.includes("悪い例") ||
    /Malo:/i.test(text);
  return fail && pass >= 2;
}

function bulletCount(text) {
  if (!text) return 0;
  return (text.match(/^\s*-\s+/gm) || []).length;
}

function rubricAxisCount(text) {
  return (text.match(/\n[1-6]\.\s+\*\*/g) || []).length;
}

function checkDepth(trackId, locale) {
  const issues = [];
  const depth = depthFor(trackId, locale);
  const overlay = buildOverlay(trackId, locale);

  if (!depth && !overlay) {
    issues.push("no depth/overlay");
    return issues;
  }

  const rubric = (depth?.["academic-rubric"] || "") + (overlay?.["academic-rubric"] || "");
  const fail = (depth?.["academic-fail"] || "") + (overlay?.["academic-fail"] || "");
  const keywords = overlay?.["source-keywords"] || depth?.["source-keywords"] || "";
  const study = (depth?.["study-examples"] || "") + (overlay?.["study-examples"] || "");
  const pres = (depth?.["presentation-context"] || "") + (overlay?.["presentation-context"] || "");

  if (!rubric.trim()) issues.push("missing academic-rubric");
  if (rubricAxisCount(rubric) < 6) issues.push(`academic-rubric axes=${rubricAxisCount(rubric)}`);
  if (bulletCount(fail) < 2) issues.push(`academic-fail bullets=${bulletCount(fail)}`);
  if (!keywords.trim()) issues.push("missing source-keywords");
  if (!study.trim()) issues.push("missing study-examples");
  if (!pres.trim()) issues.push("missing presentation-context");

  if (WRITING_TRACKS.has(trackId)) {
    const writing = overlay?.["writing-examples"] || depth?.["writing-examples"] || "";
    if (!writing.includes("❌")) issues.push("writing-examples missing ❌");
    const passCount = (writing.match(/✅/g) || []).length;
    if (passCount < 2) issues.push(`writing-examples ✅ count=${passCount}`);
    if (locale !== "ko" && locale !== "en-GB" && EN_LEAK.test(writing)) {
      issues.push("writing-examples English leak");
    }
    if (locale !== "ko" && locale !== "en-GB" && EN_LABEL_LEAK.test(keywords)) {
      issues.push("source-keywords English label leak");
    }
  }

  if (CONCISE_TRACKS.has(trackId)) {
    const concise = overlay?.["concise-examples"] || depth?.["concise-examples"] || "";
    if (!concise.trim()) issues.push("missing concise-examples");
  }

  return issues;
}

function checkOrphanBundles() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const valid = new Set();
  for (const track of manifest.tracks) {
    for (const locale of manifest.locales) {
      valid.add(`${track.id}-${locale}.json`);
    }
  }
  const orphans = fs
    .readdirSync(bundlesDir)
    .filter((f) => f.endsWith(".json") && !valid.has(f));
  return orphans;
}

function promptText(bundle, id) {
  const p = bundle.prompts?.find((x) => x.id === id);
  return p?.copyText || p?.body || "";
}

function generalRubricAxisCount(academic) {
  const m = academic.match(
    /\n## [^\n]*(루브릭|rubric|Rúbrica|Rubrique|ルーブリック|評量)[^\n]*\n([\s\S]*?)\n## /i
  );
  if (!m) return 0;
  return (m[2].match(/\n[1-6]\.\s+\*\*/g) || []).length;
}

function checkGeneralRubric(academic, locale) {
  const issues = [];
  if (/<!-- OVERLAY:/.test(academic)) issues.push("academic-review overlay marker leak");
  const axes = generalRubricAxisCount(academic);
  if (axes !== 6) issues.push(`general rubric axes=${axes}`);
  const headings =
    (academic.match(/\n## [^\n]*(루브릭|rubric|Rúbrica|Rubrique|ルーブリック|評量)[^\n]*\n/gi) || [])
      .length;
  if (headings > 1) issues.push(`general rubric headings=${headings}`);
  if (locale !== "ko" && academic.includes("「일반적으로」")) {
    issues.push("general ko rubric leak");
  }
  if (locale === "ko" && /\n## Default rubric/.test(academic)) {
    issues.push("general en rubric leak");
  }
  return issues;
}

function headingCount(text, heading) {
  if (!heading) return 0;
  let n = 0;
  let i = 0;
  while ((i = text.indexOf(heading, i)) !== -1) {
    n++;
    i += heading.length;
  }
  return n;
}

function sitTableRowCount(guide, sitHeading) {
  const start = guide.indexOf(sitHeading);
  if (start < 0) return 0;
  let n = 0;
  let pastSep = false;
  for (const line of guide.slice(start).split("\n")) {
    if (line.startsWith("## ") && pastSep) break;
    if (line.includes("------")) {
      pastSep = true;
      continue;
    }
    if (pastSep && /^\|[^|]+\|[^|]+\|$/.test(line)) n++;
  }
  return n;
}

function checkGuideStructure(trackId, locale, guide) {
  const issues = [];
  const h = GUIDE_HEADINGS[locale] || GUIDE_HEADINGS["en-GB"];
  if (bulletCount(guide) < 3) issues.push(`guide bullets=${bulletCount(guide)}`);
  if (!guide.includes("|")) issues.push("guide missing situation table");
  const sitRows = sitTableRowCount(guide, h.sit);
  if (sitRows !== 6) issues.push(`guide sit rows=${sitRows}`);
  if (headingCount(guide, h.chatgpt) !== 1) {
    issues.push(`guide chatgpt headings=${headingCount(guide, h.chatgpt)}`);
  }
  if (headingCount(guide, h.gemini) !== 1) {
    issues.push(`guide gemini headings=${headingCount(guide, h.gemini)}`);
  }
  if (headingCount(guide, h.sit) !== 1) {
    issues.push(`guide sit headings=${headingCount(guide, h.sit)}`);
  }
  if (!AI_OVERRIDE[trackId]?.[locale]) {
    issues.push("guide missing AI override");
  }
  return issues;
}

function checkOverlayRubric(trackId, locale, academic) {
  const issues = [];
  const table = I18N_RUBRIC[locale];
  if (!table) return issues;
  const row = table[trackId];
  if (!row) return issues;
  const axisTitle = row.axes[0][0];
  if (!academic.includes(axisTitle)) {
    issues.push(`overlay rubric locale leak (missing ${axisTitle})`);
  }
  if (/\n## [^\n]*default rubric \(when none supplied\)/.test(academic)) {
    issues.push("overlay en rubric leak");
  }
  if (locale !== "ko" && /\n## [^\n]*기본 루브릭/.test(academic)) {
    issues.push("overlay ko rubric leak");
  }
  return issues;
}

function checkBundle(trackId, locale) {
  const issues = [];
  const file = path.join(bundlesDir, `${trackId}-${locale}.json`);
  if (!fs.existsSync(file)) {
    issues.push("bundle missing");
    return issues;
  }

  const bundle = JSON.parse(fs.readFileSync(file, "utf8"));
  const m = LOCALE_MARKERS[locale] || LOCALE_MARKERS["en-GB"];

  const academic = promptText(bundle, "academic-review");
  const concise = promptText(bundle, "concise-mode");
  const writing = promptText(bundle, "writing-review");
  const study = promptText(bundle, "study-companion");
  const pres = promptText(bundle, "presentation");
  const guideText = bundle.guide?.markdown || "";

  if (trackId === "general") {
    issues.push(...checkGeneralRubric(academic, locale));
  }

  issues.push(...checkGuideStructure(trackId, locale, guideText));

  for (const [label, text] of [
    ["academic round0", academic],
    ["academic final", academic],
    ["academic chatgpt", academic],
    ["academic gemini", academic],
  ]) {
    const key = label.split(" ")[1];
    const marker = m[key === "round0" ? "round0" : key === "final" ? "final" : key];
    if (!text.includes(marker)) issues.push(`bundle ${label} missing '${marker}'`);
  }

  if (!hasAny(concise, m.autoClarity)) {
    issues.push("bundle concise Auto-Clarity missing");
  }
  if (!hasAny(concise, m.lite) || !hasAny(concise, m.ultra)) {
    issues.push("bundle concise lite/ultra missing");
  }

  if (!hasWritingExamples(writing)) {
    issues.push("bundle writing-review examples incomplete");
  }

  if (OVERLAY_TRACKS.includes(trackId)) {
    issues.push(...checkOverlayRubric(trackId, locale, academic));
  }

  const studyBullets = countBullets(study);
  const presBullets = countBullets(pres);
  if (studyBullets < 3) issues.push(`bundle study bullets=${studyBullets}`);
  if (presBullets < 3) issues.push(`bundle presentation bullets=${presBullets}`);
  if (!/안전|安全|seguridad|sécurité|safety/i.test(study)) {
    issues.push("bundle study-companion missing discipline safety");
  }

  for (const p of bundle.prompts || []) {
    if (p.copyText && /<!-- OVERLAY:[\w-]+ -->/.test(p.copyText)) {
      issues.push(`bundle ${p.id} copyText has OVERLAY marker`);
    }
  }
  if (/<!-- OVERLAY:[\w-]+ -->/.test(guideText)) {
    issues.push("bundle guide has OVERLAY marker");
  }

  return issues;
}

let failCount = 0;
const report = [];

const orphanBundles = checkOrphanBundles();
if (orphanBundles.length) {
  failCount++;
  report.push(`orphan-bundles: ${orphanBundles.join(", ")}`);
}

for (const trackId of ALL_TRACKS) {
  for (const locale of LOCALES) {
    const depthIssues = OVERLAY_TRACKS.includes(trackId)
      ? checkDepth(trackId, locale)
      : [];
    const bundleIssues = checkBundle(trackId, locale);
    const all = [...depthIssues, ...bundleIssues];
    if (all.length) {
      failCount++;
      report.push(`${trackId}/${locale}: ${all.join("; ")}`);
    }
  }
}

const total = ALL_TRACKS.length * LOCALES.length;

if (failCount === 0) {
  console.log(`ALL_OK ${total}/${total} (24 tracks × 6 locales)`);
  process.exit(0);
}

console.log(`FAIL ${failCount}/${total}`);
for (const line of report) console.log(`  ${line}`);
process.exit(1);
