export const OVERLAY_TRACKS = [
  "cs",
  "medicine",
  "nursing",
  "veterinary",
  "engineering",
  "physics",
  "chemistry",
  "life-sciences",
  "mathematics-statistics",
  "law",
  "economics",
  "business-administration",
  "social-sciences",
  "psychology",
  "education",
  "philosophy",
  "linguistics",
  "cultural-arts",
  "design",
  "architecture",
  "home-economics",
  "sports",
];

export const DISCIPLINE = {
  cs: {
    ko: "컴퓨터공학",
    "en-GB": "computer science",
    "zh-TW": "資訊工程",
    ja: "コンピュータ科学",
    fr: "informatique",
    es: "informática",
  },
  medicine: {
    ko: "의학",
    "en-GB": "medicine",
    "zh-TW": "醫學",
    ja: "医学",
    fr: "médecine",
    es: "medicina",
  },
  nursing: {
    ko: "간호학",
    "en-GB": "nursing",
    "zh-TW": "護理",
    ja: "看護学",
    fr: "sciences infirmières",
    es: "enfermería",
  },
  veterinary: {
    ko: "수의학",
    "en-GB": "veterinary medicine",
    "zh-TW": "獸醫",
    ja: "獣医学",
    fr: "médecine vétérinaire",
    es: "medicina veterinaria",
  },
  engineering: {
    ko: "공학",
    "en-GB": "engineering",
    "zh-TW": "工程",
    ja: "工学",
    fr: "ingénierie",
    es: "ingeniería",
  },
  physics: {
    ko: "물리학",
    "en-GB": "physics",
    "zh-TW": "物理",
    ja: "物理学",
    fr: "physique",
    es: "física",
  },
  chemistry: {
    ko: "화학",
    "en-GB": "chemistry",
    "zh-TW": "化學",
    ja: "化学",
    fr: "chimie",
    es: "química",
  },
  "life-sciences": {
    ko: "생명과학",
    "en-GB": "life sciences",
    "zh-TW": "生命科學",
    ja: "生命科学",
    fr: "sciences de la vie",
    es: "ciencias de la vida",
  },
  "mathematics-statistics": {
    ko: "수학·통계",
    "en-GB": "mathematics & statistics",
    "zh-TW": "數學·統計",
    ja: "数学・統計",
    fr: "mathématiques et statistiques",
    es: "matemáticas y estadística",
  },
  law: {
    ko: "법률",
    "en-GB": "law",
    "zh-TW": "法律",
    ja: "法学",
    fr: "droit",
    es: "derecho",
  },
  economics: {
    ko: "경제학",
    "en-GB": "economics",
    "zh-TW": "經濟學",
    ja: "経済学",
    fr: "économie",
    es: "economía",
  },
  "business-administration": {
    ko: "경영·회계",
    "en-GB": "business & accounting",
    "zh-TW": "經營·會計",
    ja: "経営・会計",
    fr: "gestion et comptabilité",
    es: "administración y contabilidad",
  },
  "social-sciences": {
    ko: "사회과학",
    "en-GB": "social sciences",
    "zh-TW": "社會科學",
    ja: "社会科学",
    fr: "sciences sociales",
    es: "ciencias sociales",
  },
  psychology: {
    ko: "심리학",
    "en-GB": "psychology",
    "zh-TW": "心理學",
    ja: "心理学",
    fr: "psychologie",
    es: "psicología",
  },
  education: {
    ko: "교육학",
    "en-GB": "education",
    "zh-TW": "教育學",
    ja: "教育学",
    fr: "sciences de l'éducation",
    es: "ciencias de la educación",
  },
  philosophy: {
    ko: "철학",
    "en-GB": "philosophy",
    "zh-TW": "哲學",
    ja: "哲学",
    fr: "philosophie",
    es: "filosofía",
  },
  linguistics: {
    ko: "언어학",
    "en-GB": "linguistics",
    "zh-TW": "語言學",
    ja: "言語学",
    fr: "linguistique",
    es: "lingüística",
  },
  "cultural-arts": {
    ko: "문화예술",
    "en-GB": "cultural arts",
    "zh-TW": "文化藝術",
    ja: "文化芸術",
    fr: "arts et culture",
    es: "artes y cultura",
  },
  design: {
    ko: "디자인",
    "en-GB": "design",
    "zh-TW": "設計",
    ja: "デザイン",
    fr: "design",
    es: "diseño",
  },
  architecture: {
    ko: "건축학",
    "en-GB": "architecture",
    "zh-TW": "建築",
    ja: "建築学",
    fr: "architecture",
    es: "arquitectura",
  },
  "home-economics": {
    ko: "생활과학",
    "en-GB": "home economics",
    "zh-TW": "生活科學",
    ja: "生活科学",
    fr: "sciences du foyer",
    es: "economía doméstica",
  },
  sports: {
    ko: "체육학",
    "en-GB": "sports science",
    "zh-TW": "體育",
    ja: "体育学",
    fr: "sciences du sport",
    es: "ciencias del deporte",
  },
};

import { depthFor } from "./discipline-depth.mjs";
import { rubricFor } from "./discipline-rubrics.mjs";
import { guideExtraFor } from "./discipline-guide.mjs";

export function buildOverlay(trackId, locale) {
  const d = DISCIPLINE[trackId][locale] || DISCIPLINE[trackId].ko;
  const isKo = locale === "ko";
  const guideExtra = guideExtraFor(trackId, locale);

  const templates = {
    ko: {
      "guide-extra": guideExtra,
      "source-keywords": `\n## ${DISCIPLINE[trackId].ko} 키워드 예\n\n- 전공 핵심 용어 2~4그룹 (개념 | 방법 | 결과 | 한계)\n- ${DISCIPLINE[trackId].ko} 맥락에 맞게 조정\n`,
      "concise-examples": `\n## ${DISCIPLINE[trackId].ko} 예\n\n- 「${DISCIPLINE[trackId].ko} 핵심 개념, 더 짧게」\n- 고유명사·수치·전공 용어는 축약하지 말 것\n`,
      "writing-examples": `\n## ${DISCIPLINE[trackId].ko} 예\n\n✅ \`§2.1: 중요 — ${DISCIPLINE[trackId].ko} 핵심 주장, 출처 없음. 해당 전공 교재·논문 § 추가.\`\n`,
      "presentation-context": `\n## ${DISCIPLINE[trackId].ko} 발표 맥락\n\n- 예: ${DISCIPLINE[trackId].ko} 과제·세미나·캡스톤 발표\n- 청중: 동기·교수·실무자\n`,
      "study-role": `\n- ${DISCIPLINE[trackId].ko} 개념·시험·프로젝트 맥락에서 공부 도움\n`,
      "study-examples": `\n## ${DISCIPLINE[trackId].ko} 공부 예\n\n- 「${DISCIPLINE[trackId].ko} 시험 D-1」→ 25분 플랜 + 핵심 5개\n- 「${DISCIPLINE[trackId].ko} 과제 막힘」→ 다음 행동 2개\n`,
    },
    "en-GB": {
      "guide-extra": guideExtra,
      "source-keywords": `\n## ${d} keyword examples\n\n- 2–4 keyword groups (concept | method | result | limit)\n- Adjust to the ${d} context\n`,
      "concise-examples": `\n## ${d} example\n\n- 「Explain a ${d} concept, shorter」\n- Do not shorten proper nouns, figures, or discipline terms\n`,
      "writing-examples": `\n## ${d} example\n\n✅ \`§2.1: major — ${d} claim lacks source. Add textbook or paper §.\`\n`,
      "presentation-context": `\n## ${d} presentation context\n\n- e.g. ${d} coursework, seminar, capstone\n- Audience: peers, tutors, practitioners\n`,
      "study-role": `\n- Study help in ${d} concepts, exams, and projects\n`,
      "study-examples": `\n## ${d} study examples\n\n- 「${d} exam tomorrow」→ 25-min plan + 5 key points\n- 「Stuck on ${d} assignment」→ 2 next actions\n`,
    },
    "zh-TW": {
      "guide-extra": guideExtra,
      "source-keywords": `\n## ${d} 關鍵詞示例\n\n- 2–4 組關鍵詞（概念 | 方法 | 結果 | 限制）\n- 依 ${d} 情境調整\n`,
      "concise-examples": `\n## ${d} 示例\n\n- 「${d} 核心概念，更短」\n- 專有名詞、數字、術語不可縮寫\n`,
      "writing-examples": `\n## ${d} 示例\n\n✅ \`§2.1: 重要 — ${d} 主張無出處。補充教材或論文 §。\`\n`,
      "presentation-context": `\n## ${d} 簡報情境\n\n- 例：${d} 作業、研討會、專題\n- 聽眾：同學、教授、實務者\n`,
      "study-role": `\n- 在 ${d} 概念、考試、專題中提供學習協助\n`,
      "study-examples": `\n## ${d} 學習示例\n\n- 「${d} 考試明天」→ 25 分鐘計畫 + 5 重點\n- 「${d} 作業卡住」→ 2 個下一步\n`,
    },
    ja: {
      "guide-extra": guideExtra,
      "source-keywords": `\n## ${d} キーワード例\n\n- 2–4 グループ（概念 | 方法 | 結果 | 限界）\n- ${d} 文脈に合わせて調整\n`,
      "concise-examples": `\n## ${d} 例\n\n- 「${d} の核心概念、もっと短く」\n- 固有名詞・数値・専門用語は短縮しない\n`,
      "writing-examples": `\n## ${d} 例\n\n✅ \`§2.1: 重要 — ${d} の主張に出典なし。教科書や論文 § を追加。\`\n`,
      "presentation-context": `\n## ${d} 発表文脈\n\n- 例：${d} 課題・セミナー・卒論\n- 聴衆：同級生・教員・実務者\n`,
      "study-role": `\n- ${d} の概念・試験・プロジェクトでの学習支援\n`,
      "study-examples": `\n## ${d} 学習例\n\n- 「${d} 試験が明日」→ 25分プラン + 要点5つ\n- 「${d} 課題で詰まった」→ 次の行動2つ\n`,
    },
    fr: {
      "guide-extra": guideExtra,
      "source-keywords": `\n## Mots-clés ${d}\n\n- 2–4 groupes (concept | méthode | résultat | limite)\n- Ajuster au contexte ${d}\n`,
      "concise-examples": `\n## Exemple ${d}\n\n- 「Concept ${d}, plus court」\n- Ne pas raccourcir noms propres, chiffres, termes\n`,
      "writing-examples": `\n## Exemple ${d}\n\n✅ \`§2.1: majeur — affirmation ${d} sans source. Ajouter manuel ou article §.\`\n`,
      "presentation-context": `\n## Contexte ${d}\n\n- ex. devoir, séminaire, mémoire en ${d}\n- Public : pairs, enseignants, praticiens\n`,
      "study-role": `\n- Aide en ${d} : concepts, examens, projets\n`,
      "study-examples": `\n## Exemples ${d}\n\n- 「Examen ${d} demain」→ plan 25 min + 5 points\n- 「Blocage devoir ${d}」→ 2 actions suivantes\n`,
    },
    es: {
      "guide-extra": guideExtra,
      "source-keywords": `\n## Palabras clave ${d}\n\n- 2–4 grupos (concepto | método | resultado | límite)\n- Ajustar al contexto ${d}\n`,
      "concise-examples": `\n## Ejemplo ${d}\n\n- 「Concepto ${d}, más corto」\n- No acortar nombres propios, cifras ni términos\n`,
      "writing-examples": `\n## Ejemplo ${d}\n\n✅ \`§2.1: importante — afirmación ${d} sin fuente. Añadir manual o artículo §.\`\n`,
      "presentation-context": `\n## Contexto ${d}\n\n- p. ej. trabajo, seminario, TFG en ${d}\n- Público: compañeros, profesores, profesionales\n`,
      "study-role": `\n- Ayuda en conceptos, exámenes y proyectos de ${d}\n`,
      "study-examples": `\n## Ejemplos ${d}\n\n- 「Examen ${d} mañana」→ plan 25 min + 5 puntos\n- 「Atascado en ${d}」→ 2 siguientes pasos\n`,
    },
  };

  const lang = templates[locale] ? locale : isKo ? "ko" : "en-GB";
  const base = { ...templates[lang] };

  const rubric = rubricFor(trackId, locale);
  if (rubric) {
    base["academic-rubric"] = rubric["academic-rubric"];
    base["academic-fail"] = rubric["academic-fail"];
    base["study-safety"] = rubric["study-safety"];
  }

  const replaceKeys = new Set(["source-keywords", "writing-examples"]);
  const extra = depthFor(trackId, locale);
  if (extra) {
    for (const [key, chunk] of Object.entries(extra)) {
      if (key === "academic-rubric" || key === "academic-fail") continue;
      if (replaceKeys.has(key)) {
        base[key] = chunk;
      } else {
        base[key] = (base[key] || "") + chunk;
      }
    }
  }
  return base;
}
