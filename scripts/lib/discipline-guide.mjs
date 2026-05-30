import { KO, EN, rubricFor } from "./discipline-rubrics.mjs";
import { ZH, JA, FR, ES } from "./discipline-rubrics-i18n.mjs";
import { SIT_DEFAULT, SIT_OVERRIDE } from "./discipline-guide-sit.mjs";

const TABLES = { ko: KO, "en-GB": EN, "zh-TW": ZH, ja: JA, fr: FR, es: ES };

const PROMPTS = {
  ko: {
    academic: "학술 채점",
    source: "출처 검증",
    concise: "간결 모드",
    writing: "글 리뷰",
    presentation: "발표 구조",
    study: "학습 동반자",
  },
  "en-GB": {
    academic: "Academic review",
    source: "Source check",
    concise: "Concise mode",
    writing: "Writing review",
    presentation: "Presentation",
    study: "Study companion",
  },
  "zh-TW": {
    academic: "學術評分",
    source: "出處驗證",
    concise: "簡潔模式",
    writing: "文稿審閱",
    presentation: "簡報結構",
    study: "學習夥伴",
  },
  ja: {
    academic: "学術採点",
    source: "出典検証",
    concise: "簡潔モード",
    writing: "文章レビュー",
    presentation: "発表構成",
    study: "学習コンパニオン",
  },
  fr: {
    academic: "Évaluation académique",
    source: "Vérification des sources",
    concise: "Mode concis",
    writing: "Relecture",
    presentation: "Structure de présentation",
    study: "Compagnon d'étude",
  },
  es: {
    academic: "Revisión académica",
    source: "Verificación de fuentes",
    concise: "Modo conciso",
    writing: "Revisión de texto",
    presentation: "Estructura de presentación",
    study: "Compañero de estudio",
  },
};

const CHROME = {
  ko: {
    tips: (name) => `## ${name} 과제 팁`,
    sit: "## 어떤 프롬프트?",
    sitHead: ["상황", "프롬프트"],
    chatgpt: "## ChatGPT에서 결과 보기",
    gemini: "## Gemini에서 결과 보기",
    caution: "## 주의",
  },
  "en-GB": {
    tips: (name) => `## ${name} assignment tips`,
    sit: "## Which prompt?",
    sitHead: ["Situation", "Prompt"],
    chatgpt: "## In ChatGPT",
    gemini: "## In Gemini",
    caution: "## Caution",
  },
  "zh-TW": {
    tips: (name) => `## ${name} 作業提示`,
    sit: "## 用哪個提示詞？",
    sitHead: ["情境", "提示詞"],
    chatgpt: "## 在 ChatGPT 查看結果",
    gemini: "## 在 Gemini 查看結果",
    caution: "## 注意",
  },
  ja: {
    tips: (name) => `## ${name} 課題のヒント`,
    sit: "## どのプロンプト？",
    sitHead: ["状況", "プロンプト"],
    chatgpt: "## ChatGPTでの見方",
    gemini: "## Geminiでの見方",
    caution: "## 注意",
  },
  fr: {
    tips: (name) => `## Conseils — ${name}`,
    sit: "## Quel prompt ?",
    sitHead: ["Situation", "Prompt"],
    chatgpt: "## Dans ChatGPT",
    gemini: "## Dans Gemini",
    caution: "## Précaution",
  },
  es: {
    tips: (name) => `## Consejos — ${name}`,
    sit: "## ¿Qué prompt?",
    sitHead: ["Situación", "Prompt"],
    chatgpt: "## En ChatGPT",
    gemini: "## En Gemini",
    caution: "## Precaución",
  },
};

const AI_DEFAULT = {
  ko: {
    chatgpt: [
      "**웹 검색**이 켜져 있으면 출처·최신 정보 확인에 유리합니다.",
      "수정 초안이 길면 **Canvas(캔버스)**로 열어 옆에서 다듬으세요.",
      "루브릭·점수는 Canvas나 메모 앱에 **번호 목록**으로 받으세요.",
    ],
    gemini: [
      "**Google 검색(지구본)**이 켜져 있으면 사실 확인에 유리합니다.",
      "긴 수정문은 **Google Docs**에 정리해 달라고 하세요.",
    ],
  },
  "en-GB": {
    chatgpt: [
      "Turn on **web search** for source checks and recent references.",
      "Open long rewrites in **Canvas** to edit beside the chat.",
      "Ask for rubric scores as a **numbered list** in Canvas or notes.",
    ],
    gemini: [
      "Enable **Google Search** (globe icon) for fact and source checks.",
      "Paste long edits into **Google Docs** for easier revision.",
    ],
  },
  "zh-TW": {
    chatgpt: [
      "開啟**網路搜尋**有助查證出處與最新資料。",
      "長篇修改可用 **Canvas** 在側邊編輯。",
      "評量分數請用**編號清單**接收。",
    ],
    gemini: [
      "開啟 **Google 搜尋**（地球圖示）方便查證。",
      "長文修改可請整理到 **Google 文件**。",
    ],
  },
  ja: {
    chatgpt: [
      "**ウェブ検索**をオンにすると出典・最新情報の確認に有利です。",
      "長い修正文は **Canvas** で横に並べて編集してください。",
      "ルーブリック・点数は**番号リスト**で受け取ってください。",
    ],
    gemini: [
      "**Google 検索**（地球儀）をオンにすると事実確認に有利です。",
      "長い修正文は **Google ドキュメント**に整理してもらってください。",
    ],
  },
  fr: {
    chatgpt: [
      "Activez la **recherche web** pour vérifier sources et références récentes.",
      "Ouvrez les longues révisions dans **Canvas** pour éditer à côté.",
      "Demandez scores et rubrique en **liste numérotée**.",
    ],
    gemini: [
      "Activez **Google Search** (globe) pour vérifier les faits.",
      "Collez les longues révisions dans **Google Docs**.",
    ],
  },
  es: {
    chatgpt: [
      "Activa la **búsqueda web** para comprobar fuentes e información reciente.",
      "Abre borradores largos en **Canvas** para editar al lado.",
      "Pide puntuación y rúbrica como **lista numerada**.",
    ],
    gemini: [
      "Activa **Google Search** (icono globo) para verificar hechos.",
      "Pega ediciones largas en **Google Docs**.",
    ],
  },
};

const AI_OVERRIDE = {
  cs: {
    ko: {
      chatgpt: [
        "**웹 검색**으로 CVE·OWASP·공식 문서를 확인하세요.",
        "코드·복잡도 설명은 **Canvas**에서 함께 다듬기 좋습니다.",
      ],
      gemini: [
        "**Google 검색**으로 CVE·스택오버플로·문서를 빠르게 찾을 수 있습니다.",
        "긴 코드 리뷰는 **Google Docs**에 붙여 정리하세요.",
      ],
    },
    "en-GB": {
      chatgpt: [
        "Use **web search** for CVE, OWASP, and official docs.",
        "Refine code and complexity notes in **Canvas**.",
      ],
      gemini: [
        "**Google Search** helps find CVEs, Stack Overflow, and docs.",
        "Paste long code reviews into **Google Docs**.",
      ],
    },
  },
  medicine: {
    ko: {
      chatgpt: [
        "**웹 검색**이 켜져 있으면 PubMed·가이드라인 확인에 유리합니다.",
        "SOAP·케이스 수정은 **Canvas**로 열어 옆에서 다듬으세요.",
      ],
      gemini: [
        "**Google 검색(지구본)**이 켜져 있으면 약물·임상 정보 확인에 유리합니다.",
        "긴 케이스 보고는 **Google Docs**에 정리해 달라고 하세요.",
      ],
    },
    "en-GB": {
      chatgpt: [
        "**Web search** helps check PubMed and clinical guidelines.",
        "Open SOAP / case edits in **Canvas**.",
      ],
      gemini: [
        "**Google Search** (globe) for drug and clinical fact checks.",
        "Ask for long case reports in **Google Docs**.",
      ],
    },
  },
  law: {
    ko: {
      chatgpt: [
        "**웹 검색**으로 조문·판례 요지를 빠르게 확인하세요.",
        "IRAC·논증 초안은 **Canvas**에서 단락별로 수정하기 좋습니다.",
      ],
      gemini: [
        "**Google 검색**으로 법령·판례 DB 링크를 찾을 수 있습니다.",
        "긴 메모는 **Google Docs**에 붙여 검토하세요.",
      ],
    },
    "en-GB": {
      chatgpt: [
        "Use **web search** for statute and case summaries.",
        "Edit IRAC drafts paragraph-by-paragraph in **Canvas**.",
      ],
      gemini: [
        "**Google Search** for statute and case database links.",
        "Paste long memos into **Google Docs** for review.",
      ],
    },
  },
};

function rubricRow(trackId, locale) {
  let table = TABLES[locale];
  if (!table) table = EN;
  return table[trackId] || null;
}

function situationRows(trackId, locale, name) {
  const override = SIT_OVERRIDE[trackId];
  const rows =
    override?.[locale] ||
    SIT_DEFAULT[locale] ||
    SIT_DEFAULT["en-GB"];
  const prompts = PROMPTS[locale] || PROMPTS["en-GB"];
  return rows.map(([sit, key]) => {
    const text = sit.replace(/\{name\}/g, name);
    return [text, prompts[key] || key];
  });
}

function aiTips(trackId, locale) {
  const base = AI_DEFAULT[locale] || AI_DEFAULT["en-GB"];
  const override = AI_OVERRIDE[trackId]?.[locale] || AI_OVERRIDE[trackId]?.["en-GB"];
  return {
    chatgpt: override?.chatgpt || base.chatgpt,
    gemini: override?.gemini || base.gemini,
  };
}

function cautionBullets(trackId, locale) {
  const block = rubricFor(trackId, locale)?.["study-safety"] || "";
  return (block.match(/^- .+$/gm) || []).slice(0, 2);
}

function bulletBlock(items) {
  return items.map((t) => `- ${t}`).join("\n");
}

export function guideExtraFor(trackId, locale) {
  const row = rubricRow(trackId, locale);
  if (!row) return "";
  const ui = CHROME[locale] || CHROME["en-GB"];
  const tips = row.axes.slice(0, 4).map((a) => `- **${a[0]}** — ${a[1]}`);
  const sitRows = situationRows(trackId, locale, row.name);
  const table = [
    `| ${ui.sitHead[0]} | ${ui.sitHead[1]} |`,
    "|------|----------|",
    ...sitRows.map(([s, p]) => `| ${s} | ${p} |`),
  ].join("\n");
  const ai = aiTips(trackId, locale);
  const caution = cautionBullets(trackId, locale).join("\n");
  let out = `\n${ui.tips(row.name)}\n\n${tips.join("\n")}\n\n${ui.sit}\n\n${table}\n\n${ui.chatgpt}\n\n${bulletBlock(ai.chatgpt)}\n\n${ui.gemini}\n\n${bulletBlock(ai.gemini)}\n`;
  if (caution) out += `\n${ui.caution}\n\n${caution}\n`;
  return out;
}

export const GENERIC_GUIDE_MARKERS = {
  ko: "전공 용어·근거·한계**를 함께",
  "en-GB": "discipline terms, evidence, and limits",
  "zh-TW": "專業術語、證據與限制",
  ja: "専門用語・根拠・限界",
  fr: "termes, preuves et limites",
  es: "términos, evidencia y límites",
};
