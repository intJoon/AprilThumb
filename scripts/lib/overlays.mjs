export const OVERLAY_TRACKS = [
  "cs",
  "medicine",
  "chemical-engineering",
  "law",
  "veterinary",
  "linguistics",
  "design",
  "cultural-arts",
  "philosophy",
  "sports",
  "economics",
  "architecture",
  "electrical-engineering",
  "home-economics",
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
  "chemical-engineering": {
    ko: "화학공학",
    "en-GB": "chemical engineering",
    "zh-TW": "化學工程",
    ja: "化学工学",
    fr: "génie chimique",
    es: "ingeniería química",
  },
  law: {
    ko: "법률",
    "en-GB": "law",
    "zh-TW": "法律",
    ja: "法学",
    fr: "droit",
    es: "derecho",
  },
  veterinary: {
    ko: "수의학",
    "en-GB": "veterinary medicine",
    "zh-TW": "獸醫",
    ja: "獣医学",
    fr: "médecine vétérinaire",
    es: "medicina veterinaria",
  },
  linguistics: {
    ko: "언어학",
    "en-GB": "linguistics",
    "zh-TW": "語言學",
    ja: "言語学",
    fr: "linguistique",
    es: "lingüística",
  },
  design: {
    ko: "디자인",
    "en-GB": "design",
    "zh-TW": "設計",
    ja: "デザイン",
    fr: "design",
    es: "diseño",
  },
  "cultural-arts": {
    ko: "문화예술",
    "en-GB": "cultural arts",
    "zh-TW": "文化藝術",
    ja: "文化芸術",
    fr: "arts et culture",
    es: "artes y cultura",
  },
  philosophy: {
    ko: "철학",
    "en-GB": "philosophy",
    "zh-TW": "哲學",
    ja: "哲学",
    fr: "philosophie",
    es: "filosofía",
  },
  sports: {
    ko: "체육학",
    "en-GB": "sports science",
    "zh-TW": "體育",
    ja: "体育学",
    fr: "sciences du sport",
    es: "ciencias del deporte",
  },
  economics: {
    ko: "경제학",
    "en-GB": "economics",
    "zh-TW": "經濟學",
    ja: "経済学",
    fr: "économie",
    es: "economía",
  },
  architecture: {
    ko: "건축학",
    "en-GB": "architecture",
    "zh-TW": "建築",
    ja: "建築学",
    fr: "architecture",
    es: "arquitectura",
  },
  "electrical-engineering": {
    ko: "전기전자공학",
    "en-GB": "electrical engineering",
    "zh-TW": "電機電子",
    ja: "電気電子工学",
    fr: "génie électrique",
    es: "ingeniería eléctrica",
  },
  "home-economics": {
    ko: "생활과학",
    "en-GB": "home economics",
    "zh-TW": "生活科學",
    ja: "生活科学",
    fr: "sciences du foyer",
    es: "economía doméstica",
  },
};

import { depthFor } from "./discipline-depth.mjs";

export function buildOverlay(trackId, locale) {
  const d = DISCIPLINE[trackId][locale] || DISCIPLINE[trackId].ko;
  const isKo = locale === "ko";

  const templates = {
    ko: {
      "guide-extra": `\n## ${DISCIPLINE[trackId].ko} 과제 팁\n\n- ${DISCIPLINE[trackId].ko} 과제는 **전공 용어·근거·한계**를 함께 쓰면 좋습니다.\n`,
      "academic-rubric": `\n## ${DISCIPLINE[trackId].ko} 추가 기준\n\n7. **전공 적합** — ${DISCIPLINE[trackId].ko} 맥락에 맞는 개념·사례·방법론\n8. **실무/응용** — 이론만이 아니라 과제 주제에 맞는 적용·함의\n`,
      "academic-fail": `\n### ${DISCIPLINE[trackId].ko} Fail 신호\n\n- ${DISCIPLINE[trackId].ko} 핵심 개념 없이 일반론만 반복\n- 전공 용어 오용·출처 없는 전공 주장\n- 과제 주제와 무관한 범용 AI 답변\n`,
      "source-keywords": `\n## ${DISCIPLINE[trackId].ko} 키워드 예\n\n- 전공 핵심 용어 2~4그룹 (개념 | 방법 | 결과 | 한계)\n- ${DISCIPLINE[trackId].ko} 맥락에 맞게 조정\n`,
      "concise-examples": `\n## ${DISCIPLINE[trackId].ko} 예\n\n- 「${DISCIPLINE[trackId].ko} 핵심 개념, 더 짧게」\n- 고유명사·수치·전공 용어는 축약하지 말 것\n`,
      "writing-examples": `\n## ${DISCIPLINE[trackId].ko} 예\n\n✅ \`§2.1: 중요 — ${DISCIPLINE[trackId].ko} 핵심 주장, 출처 없음. 해당 전공 교재·논문 § 추가.\`\n`,
      "presentation-context": `\n## ${DISCIPLINE[trackId].ko} 발표 맥락\n\n- 예: ${DISCIPLINE[trackId].ko} 과제·세미나·캡스톤 발표\n- 청중: 동기·교수·실무자\n`,
      "study-role": `\n- ${DISCIPLINE[trackId].ko} 개념·시험·프로젝트 맥락에서 공부 도움\n`,
      "study-examples": `\n## ${DISCIPLINE[trackId].ko} 공부 예\n\n- 「${DISCIPLINE[trackId].ko} 시험 D-1」→ 25분 플랜 + 핵심 5개\n- 「${DISCIPLINE[trackId].ko} 과제 막힘」→ 다음 행동 2개\n`,
    },
    "en-GB": {
      "guide-extra": `\n## ${d} assignment tips\n\n- Strong ${d} work ties **discipline terms, evidence, and limits** together.\n`,
      "academic-rubric": `\n## ${d} extra criteria\n\n7. **Discipline fit** — concepts, cases, methods suited to ${d}\n8. **Application** — implications beyond theory alone\n`,
      "academic-fail": `\n### ${d} fail signals\n\n- Generic AI text without ${d} core concepts\n- Misused terms or unsupported discipline claims\n- Answer ignores the assignment brief\n`,
      "source-keywords": `\n## ${d} keyword examples\n\n- 2–4 keyword groups (concept | method | result | limit)\n- Adjust to the ${d} context\n`,
      "concise-examples": `\n## ${d} example\n\n- 「Explain a ${d} concept, shorter」\n- Do not shorten proper nouns, figures, or discipline terms\n`,
      "writing-examples": `\n## ${d} example\n\n✅ \`§2.1: major — ${d} claim lacks source. Add textbook or paper §.\`\n`,
      "presentation-context": `\n## ${d} presentation context\n\n- e.g. ${d} coursework, seminar, capstone\n- Audience: peers, tutors, practitioners\n`,
      "study-role": `\n- Study help in ${d} concepts, exams, and projects\n`,
      "study-examples": `\n## ${d} study examples\n\n- 「${d} exam tomorrow」→ 25-min plan + 5 key points\n- 「Stuck on ${d} assignment」→ 2 next actions\n`,
    },
    "zh-TW": {
      "guide-extra": `\n## ${d} 作業提示\n\n- 好的 ${d} 作業應結合**專業術語、證據與限制**。\n`,
      "academic-rubric": `\n## ${d} 附加標準\n\n7. **專業契合** — 符合 ${d} 的概念、案例、方法\n8. **應用** — 不止理論，還有與主題相關的應用\n`,
      "academic-fail": `\n### ${d} 未通過信號\n\n- 缺乏 ${d} 核心概念，只有空泛 AI 文\n- 誤用術語或無出處的專業主張\n- 偏離作業主題\n`,
      "source-keywords": `\n## ${d} 關鍵詞示例\n\n- 2–4 組關鍵詞（概念 | 方法 | 結果 | 限制）\n- 依 ${d} 情境調整\n`,
      "concise-examples": `\n## ${d} 示例\n\n- 「${d} 核心概念，更短」\n- 專有名詞、數字、術語不可縮寫\n`,
      "writing-examples": `\n## ${d} 示例\n\n✅ \`§2.1: 重要 — ${d} 主張無出處。補充教材或論文 §。\`\n`,
      "presentation-context": `\n## ${d} 簡報情境\n\n- 例：${d} 作業、研討會、專題\n- 聽眾：同學、教授、實務者\n`,
      "study-role": `\n- 在 ${d} 概念、考試、專題中提供學習協助\n`,
      "study-examples": `\n## ${d} 學習示例\n\n- 「${d} 考試明天」→ 25 分鐘計畫 + 5 重點\n- 「${d} 作業卡住」→ 2 個下一步\n`,
    },
    ja: {
      "guide-extra": `\n## ${d} 課題のヒント\n\n- 良い ${d} 課題は**専門用語・根拠・限界**を結びつけます。\n`,
      "academic-rubric": `\n## ${d} 追加基準\n\n7. **専門適合** — ${d} に合った概念・事例・方法\n8. **応用** — 理論だけでなく課題に沿った適用\n`,
      "academic-fail": `\n### ${d} Fail 信号\n\n- ${d} の核心概念なしの一般論\n- 用語誤用・根拠のない専門主張\n- 課題から外れた AI 回答\n`,
      "source-keywords": `\n## ${d} キーワード例\n\n- 2–4 グループ（概念 | 方法 | 結果 | 限界）\n- ${d} 文脈に合わせて調整\n`,
      "concise-examples": `\n## ${d} 例\n\n- 「${d} の核心概念、もっと短く」\n- 固有名詞・数値・専門用語は短縮しない\n`,
      "writing-examples": `\n## ${d} 例\n\n✅ \`§2.1: 重要 — ${d} の主張に出典なし。教科書や論文 § を追加。\`\n`,
      "presentation-context": `\n## ${d} 発表文脈\n\n- 例：${d} 課題・セミナー・卒論\n- 聴衆：同級生・教員・実務者\n`,
      "study-role": `\n- ${d} の概念・試験・プロジェクトでの学習支援\n`,
      "study-examples": `\n## ${d} 学習例\n\n- 「${d} 試験が明日」→ 25分プラン + 要点5つ\n- 「${d} 課題で詰まった」→ 次の行動2つ\n`,
    },
    fr: {
      "guide-extra": `\n## Conseils ${d}\n\n- Un bon travail en ${d} lie **termes, preuves et limites**.\n`,
      "academic-rubric": `\n## Critères ${d}\n\n7. **Adéquation disciplinaire** — concepts, cas, méthodes de ${d}\n8. **Application** — au-delà de la théorie seule\n`,
      "academic-fail": `\n### Signaux d'échec ${d}\n\n- Texte IA générique sans concepts ${d}\n- Termes mal employés ou affirmations sans source\n- Réponse hors sujet\n`,
      "source-keywords": `\n## Mots-clés ${d}\n\n- 2–4 groupes (concept | méthode | résultat | limite)\n- Ajuster au contexte ${d}\n`,
      "concise-examples": `\n## Exemple ${d}\n\n- 「Concept ${d}, plus court」\n- Ne pas raccourcir noms propres, chiffres, termes\n`,
      "writing-examples": `\n## Exemple ${d}\n\n✅ \`§2.1: majeur — affirmation ${d} sans source. Ajouter manuel ou article §.\`\n`,
      "presentation-context": `\n## Contexte ${d}\n\n- ex. devoir, séminaire, mémoire en ${d}\n- Public : pairs, enseignants, praticiens\n`,
      "study-role": `\n- Aide en ${d} : concepts, examens, projets\n`,
      "study-examples": `\n## Exemples ${d}\n\n- 「Examen ${d} demain」→ plan 25 min + 5 points\n- 「Blocage devoir ${d}」→ 2 actions suivantes\n`,
    },
    es: {
      "guide-extra": `\n## Consejos de ${d}\n\n- Un buen trabajo en ${d} une **términos, evidencia y límites**.\n`,
      "academic-rubric": `\n## Criterios ${d}\n\n7. **Ajuste disciplinar** — conceptos, casos, métodos de ${d}\n8. **Aplicación** — más allá de la teoría\n`,
      "academic-fail": `\n### Señales de fallo ${d}\n\n- Texto IA genérico sin conceptos ${d}\n- Términos mal usados o afirmaciones sin fuente\n- Respuesta fuera del encargo\n`,
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
  const extra = depthFor(trackId, locale);
  if (extra) {
    for (const [key, chunk] of Object.entries(extra)) {
      base[key] = (base[key] || "") + chunk;
    }
  }
  return base;
}
