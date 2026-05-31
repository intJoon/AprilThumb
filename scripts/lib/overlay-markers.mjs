const PROMPT_MARKERS = {
  "academic-review": [
    { marker: "academic-rubric", before: /^## (Process|진행|流程|手順|Déroulement|Proceso)/m },
    { marker: "academic-fail", before: /^## (Output format|답 형식|輸出格式|出力形式|Format de réponse|Formato de salida)/m },
  ],
  "source-check": [
    {
      marker: "source-keywords",
      before: /^## (Keyword groups|키워드|關鍵詞|キーワード|Mots-clés|Palabras clave)/m,
    },
  ],
  "concise-mode": [{ marker: "concise-examples", before: /^## (Rules|규칙|規則|ルール|Règles|Reglas)/m }],
  "writing-review": [
    {
      marker: "writing-examples",
      before: /^## (Pharmacy examples|Examples|예시|範例|例|Exemples|Ejemplos)/m,
    },
  ],
  presentation: [
    {
      marker: "presentation-context",
      before:
        /^## (Output format|답 형식|輸出格式|出力形式|Format de sortie|Formato de salida)/m,
    },
  ],
  "study-companion": [
    {
      marker: "study-role",
      before: /^## (What you do not|하지 않는|不做|你不會做|しないこと|Ce que vous ne faites pas|Lo que no haces|Qué no haces)/m,
    },
    {
      marker: "study-safety",
      before: /^## (What you do not|하지 않는|不做|你不會做|しないこと|Ce que vous ne faites pas|Lo que no haces|Qué no haces)/m,
    },
    {
      marker: "study-examples",
      before:
        /^## (Output format|답 형식|輸出格式|出力形式|Format de réponse|Format de sortie|Formato de salida)/m,
    },
  ],
};

export function injectPromptMarkers(promptId, text) {
  const rules = PROMPT_MARKERS[promptId];
  if (!rules) return text;
  let out = text;
  for (const { marker, before } of rules) {
    const tag = `<!-- OVERLAY:${marker} -->`;
    if (out.includes(tag)) continue;
    const m = out.match(before);
    if (m?.index != null) {
      out = `${out.slice(0, m.index)}\n${tag}\n\n${out.slice(m.index)}`;
    }
  }
  return out;
}
