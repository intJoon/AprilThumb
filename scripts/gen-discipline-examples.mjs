import fs from "fs";

const tracks = {
  cs: {
    ko: { n: "컴퓨터공학", sk: ["알고리즘: Big-O, amortized, edge case", "자료구조: hash, heap, graph", "보안: CVE, OWASP, threat model", "시스템: concurrency, deadlock, CAP", "검증: unit test, coverage, fuzzing"], w: ["§2.3: 중요 — O(n²) 주장에 Big-O·자료구조 분석 없음. 교재 § 또는 논문 추가.", "§4.1: 주의 — CVE 취약점 언급, NVD·PoC 링크 없음."] },
    en: { n: "Computer science", sk: ["Algorithms: Big-O, amortized, edge cases", "Data structures: hash, heap, graph traversal", "Security: CVE, OWASP, threat model", "Systems: concurrency, deadlock, CAP", "Verification: unit tests, coverage, fuzzing"], w: ["§2.3: major — O(n²) claim with no Big-O or structure analysis. Add textbook § or paper.", "§4.1: minor — CVE cited with no NVD or PoC link."] },
  },
  law: {
    ko: { n: "법학", sk: ["법조문: statute, article, amendment", "판례: ratio decidendi, obiter, dissent", "절차: burden of proof, standing, remedy", "해석: literal, purposive, precedent"], w: ["§2: 중요 — 「위법」 주장에 조문·판례 없음. 해당 법조문 § 추가.", "§4.1: 주의 — 판례 요지만 인용, 본 사건 적용 논증 없음. IRAC 한 단락 추가."] },
    en: { n: "Law", sk: ["Statutes: article, amendment, commencement", "Cases: ratio decidendi, obiter, dissent", "Procedure: burden of proof, standing, remedy", "Interpretation: literal, purposive, precedent"], w: ["§2: major — illegality claim with no statute or case. Add provision §.", "§4.1: minor — case summary only, no application to facts. Add IRAC paragraph."] },
  },
  medicine: {
    ko: { n: "의학", sk: ["병태: pathophysiology, mechanism, biomarker", "근거: RCT, NNT, guideline, meta-analysis", "안전: contraindication, adverse event, interaction", "통계: n, CI, primary endpoint, inclusion"], w: ["§3.2: 중요 — 진단 확정 어조, 감별·한계 없음. differential 2개 + 근거 § 추가.", "§6.1: 주의 — n=18만 기재. 검정력·일반화 한계 1문장 추가."] },
    en: { n: "Medicine", sk: ["Pathophysiology: mechanism, biomarker, staging", "Evidence: RCT, NNT, guideline, meta-analysis", "Safety: contraindication, adverse event, interaction", "Stats: n, CI, primary endpoint, inclusion"], w: ["§3.2: major — definitive diagnosis tone with no differential. Add two differentials + source §.", "§6.1: minor — n=18 only. Add power or generalisation limit sentence."] },
  },
  "chemical-engineering": {
    ko: { n: "화학공학", sk: ["수지: mass balance, energy balance, units", "전달: heat duty, Reynolds, mass transfer", "반응: yield, selectivity, kinetics", "안전: HAZOP, scale-up, relief"], w: ["§2.4: 중요 — 수지·단위 없이 「효율적 공정」 주장. 물질·에너지 수지 § 추가.", "§5.1: 주의 — 스케일업 한계 없이 파일럿 결과 일반화. HAZOP·한계 1문장."] },
    en: { n: "Chemical engineering", sk: ["Balances: mass, energy, units, closure", "Transport: heat duty, Reynolds, mass transfer", "Reaction: yield, selectivity, kinetics", "Safety: HAZOP, scale-up, relief"], w: ["§2.4: major — efficient process claim with no balance or units. Add mass/energy balance §.", "§5.1: minor — pilot results generalised with no scale-up limits. Add HAZOP sentence."] },
  },
  veterinary: {
    ko: { n: "수의학", sk: ["종: species, breed, body weight", "투여: dose mg/kg, route, interval", "약동: PK, withdrawal, MRL", "공중보건: zoonosis, antimicrobial stewardship"], w: ["§2.1: 중요 — 사람 용량 그대로 서술, 종·체중 맥락 없음. mg/kg·종별 표 추가.", "§4.3: 주의 — 식용동물 투약, 철회기간·MRL 미언급. withdrawal § 추가."] },
    en: { n: "Veterinary medicine", sk: ["Species: breed, body weight, physiology", "Dosing: mg/kg, route, interval", "PK: withdrawal, MRL, off-label", "Public health: zoonosis, AMR stewardship"], w: ["§2.1: major — human dose with no species or weight context. Add mg/kg table.", "§4.3: minor — food-animal drug with no withdrawal or MRL. Add withdrawal §."] },
  },
  linguistics: {
    ko: { n: "언어학", sk: ["음운: phoneme, allophone, minimal pair", "형태·통사: morpheme, constituency, gloss", "의미·화용: implicature, presupposition", "데이터: corpus, elicitation, statistics"], w: ["§4: 중요 — 예문 (1) gloss·출처 없음. 인용 논문 또는 코퍼스 ID 추가.", "§6.2: 주의 — 이론 프레임과 분석 단위(어절 vs 발화) 불일치. 단위 명시 1문장."] },
    en: { n: "Linguistics", sk: ["Phonology: phoneme, allophone, minimal pair", "Morpho-syntax: morpheme, constituency, gloss", "Semantics-pragmatics: implicature, presupposition", "Data: corpus, elicitation, statistics"], w: ["§4: major — example (1) lacks gloss and source. Add paper or corpus ID.", "§6.2: minor — framework mismatched to unit (word vs utterance). State unit explicitly."] },
  },
  design: {
    ko: { n: "디자인", sk: ["리서치: interview, usability, persona", "결정: journey, wireframe, iteration", "비평: trade-off, constraint, accessibility", "검증: test protocol, metric, sample"], w: ["§3: 중요 — 페르소나 주장에 인터뷰·테스트 근거 없음. § 또는 캡션 추가.", "§5.2: 주의 — 단일 시안만 옹호, 대안·트레이드오프 없음. 대안 1개 § 추가."] },
    en: { n: "Design", sk: ["Research: interview, usability, persona", "Decisions: journey, wireframe, iteration", "Critique: trade-off, constraint, accessibility", "Validation: test protocol, metric, sample"], w: ["§3: major — persona claim with no interview or test evidence. Add § or caption.", "§5.2: minor — single concept with no alternatives or trade-offs. Add one alternative §."] },
  },
  "cultural-arts": {
    ko: { n: "문화예술", sk: ["1차: archive, programme, score, exhibition", "맥락: period, patronage, policy", "비평: reception, canon, interpretation", "이론: curatorial, performativity"], w: ["§2.2: 중요 — 작품 해석, 1차 자료·아카이브 없음. 전시 도록·프로그램 § 추가.", "§4.1: 주의 — 시대·사회 맥락 없이 작품 설명. period context 1단락 추가."] },
    en: { n: "Cultural arts", sk: ["Primary: archive, programme, score, exhibition", "Context: period, patronage, policy", "Critique: reception, canon, interpretation", "Theory: curatorial, performativity"], w: ["§2.2: major — interpretation with no primary source or archive. Add catalogue §.", "§4.1: minor — work described with no period context. Add context paragraph."] },
  },
  philosophy: {
    ko: { n: "철학", sk: ["논증: premise, conclusion, validity", "반례: objection, counterexample, reply", "텍스트: citation, page, interpretation", "개념: definition, distinction, thought experiment"], w: ["§2: 중요 — 반례 제시 후 재반박 없음. 한 단락으로 반박 추가.", "§3.4: 주의 — 인용만 나열, 본인 논지·결론 불명확. thesis 1문장 + 인용 연결."] },
    en: { n: "Philosophy", sk: ["Argument: premise, conclusion, validity", "Objection: counterexample, reply", "Text: citation, page, interpretation", "Concept: definition, distinction, thought experiment"], w: ["§2: major — objection raised with no reply. Add reply paragraph.", "§3.4: minor — citation stacking with no author thesis. Add thesis sentence."] },
  },
  sports: {
    ko: { n: "체육", sk: ["생리: VO2max, lactate, HR zone", "부하: periodization, load, recovery", "측정: biomechanics, force plate, reliability", "통계: effect size, n, intervention"], w: ["§3.1: 중요 — 「유의미한 개선」 주장, n·효과크기 없음. 통계 § 추가.", "§5.2: 주의 — 훈련 프로그램 권고, 부하·회복 근거 없음. load principle 1문장."] },
    en: { n: "Sports science", sk: ["Physiology: VO2max, lactate, HR zones", "Load: periodization, load, recovery", "Measurement: biomechanics, force plate, reliability", "Stats: effect size, n, intervention"], w: ["§3.1: major — significant improvement claim with no n or effect size. Add stats §.", "§5.2: minor — training programme with no load or recovery rationale. Add load sentence."] },
  },
  economics: {
    ko: { n: "경제학", sk: ["모형: assumption, equilibrium, comparative statics", "식별: IV, DiD, RDD, endogeneity", "복지: elasticity, welfare, externality", "데이터: sample, unit, robustness"], w: ["§2.5: 중요 — 모형 결론만 제시, 가정·한계 없음. assumptions § 추가.", "§4.2: 주의 — 인과 주장, 식별 전략·내생성 미언급. IV/DiD 1문장."] },
    en: { n: "Economics", sk: ["Model: assumption, equilibrium, comparative statics", "Identification: IV, DiD, RDD, endogeneity", "Welfare: elasticity, externality, deadweight", "Data: sample, unit, robustness"], w: ["§2.5: major — model conclusion with unstated assumptions. Add assumptions §.", "§4.2: minor — causal claim with no identification or endogeneity. Add IV/DiD sentence."] },
  },
  architecture: {
    ko: { n: "건축", sk: ["공간: scale, circulation, programme", "구조: span, load path, material", "환경: daylight, energy, ventilation", "규범: code, setback, accessibility"], w: ["§2.3: 중요 — 설계 주장, 스케일·재료·구조 근거 없음. 도면 캡션 § 추가.", "§4.1: 주의 — 일조·에너지 분석 없음. daylight/energy 1문장."] },
    en: { n: "Architecture", sk: ["Space: scale, circulation, programme", "Structure: span, load path, material", "Environment: daylight, energy, ventilation", "Code: setback, accessibility, fire"], w: ["§2.3: major — design claim with no scale, material, or structure rationale. Add drawing caption §.", "§4.1: minor — no daylight or energy analysis. Add one sentence."] },
  },
  "electrical-engineering": {
    ko: { n: "전기공학", sk: ["회로: bandwidth, impedance, transfer function", "신호: SNR, sampling, aliasing", "전력: EMC, grounding, safety margin", "실험: measurement setup, error, calibration"], w: ["§3.2: 중요 — 「신호 처리」 주장, 단위·대역·SNR 없음. 측정 조건 § 추가.", "§5.1: 주의 — 시뮬·실험 수치, 오차·캘리브레이션 미기재. error bar 1문장."] },
    en: { n: "Electrical engineering", sk: ["Circuits: bandwidth, impedance, transfer function", "Signals: SNR, sampling, aliasing", "Power/EMC: grounding, safety margin", "Lab: measurement setup, error, calibration"], w: ["§3.2: major — signal-processing claim with no units, bandwidth, or SNR. Add measurement §.", "§5.1: minor — lab numbers with no error or calibration. Add error sentence."] },
  },
  "home-economics": {
    ko: { n: "가정학", sk: ["영양: RDA, macro, bioavailability", "식품: HACCP, shelf-life, allergen", "가정: household budget, lifecycle", "정책: RCT, survey, indicator"], w: ["§2.4: 중요 — 영양·정책 주장, 표본·지표 없음. data source § 추가.", "§4.3: 주의 — RCT 결과 일반화, 설문 한계 미언급. limits 1문장."] },
    en: { n: "Home economics", sk: ["Nutrition: RDA, macro, bioavailability", "Food: HACCP, shelf-life, allergen", "Household: budget, lifecycle, welfare", "Policy: RCT, survey, indicator"], w: ["§2.4: major — nutrition or policy claim with no sample or indicators. Add data source §.", "§4.3: minor — RCT generalised with no survey limits. Add limits sentence."] },
  },
};

const i18nLocales = {
  "zh-TW": { skH: "關鍵詞示例", wH: "示例", bad: "❌", good: "✅", adj: "依課題語境調整。", wBad: "「第2章討論了但似乎缺少具體依據。」" },
  ja: { skH: "キーワード例", wH: "例", bad: "❌", good: "✅", adj: "課題文脈に合わせて調整。", wBad: "「第2章で議論されていますが、具体的根拠が不足しているようです。」" },
  fr: { skH: "Mots-clés", wH: "Exemple", bad: "❌", good: "✅", adj: "Ajuster au contexte du devoir.", wBad: "« La section 2 discute le sujet mais manque de fondement concret. »" },
  es: { skH: "Palabras clave", wH: "Ejemplo", bad: "❌", good: "✅", adj: "Ajustar al contexto de la tarea.", wBad: "« La sección 2 discute el tema pero parece faltar fundamento concreto. »" },
};

function skBlock(locale, name, lines, adj) {
  if (locale === "ko") return `\n## ${name} 키워드 예\n\n${lines.map((l) => `- ${l}`).join("\n")}\n\n${adj}\n`;
  return `\n## ${name} keyword examples\n\n${lines.map((l) => `- ${l}`).join("\n")}\n\n${adj}\n`;
}

function wBlock(locale, name, badLine, goods) {
  if (locale === "ko") return `\n## ${name} 예\n\n❌ ${badLine}\n\n${goods.map((g) => `✅ \`${g}\``).join("\n")}\n`;
  return `\n## ${name} example\n\n❌ ${badLine}\n\n${goods.map((g) => `✅ \`${g}\``).join("\n")}\n`;
}

const EXAMPLE_DEPTH = {};
for (const [id, row] of Object.entries(tracks)) {
  EXAMPLE_DEPTH[id] = {
    ko: {
      "source-keywords": skBlock("ko", row.ko.n, row.ko.sk, "과제 맥락에 맞게 조정하세요."),
      "writing-examples": wBlock("ko", row.ko.n, `「2장에서 ${row.ko.n} 주제를 설명하셨는데, 구체적인 근거가 부족한 것 같습니다.」`, row.ko.w),
    },
    "en-GB": {
      "source-keywords": skBlock("en", row.en.n, row.en.sk, "Adjust to the assignment context."),
      "writing-examples": wBlock("en", row.en.n, `"Section 2 discusses ${row.en.n.toLowerCase()} but seems to lack concrete evidence."`, row.en.w),
    },
  };
}

const LOCALE_EXAMPLES = {};
for (const [loc, meta] of Object.entries(i18nLocales)) {
  for (const [id, row] of Object.entries(tracks)) {
    if (!LOCALE_EXAMPLES[id]) LOCALE_EXAMPLES[id] = {};
    const name = row.en.n;
    LOCALE_EXAMPLES[id][loc] = {
      "source-keywords": `\n## ${meta.skH} ${name}\n\n${row.en.sk.map((l) => `- ${l}`).join("\n")}\n\n${meta.adj}\n`,
      "writing-examples": `\n## ${meta.wH} ${name}\n\n${meta.bad} ${meta.wBad}\n\n${row.en.w.map((g) => `${meta.good} \`${g}\``).join("\n")}\n`,
    };
  }
}

fs.writeFileSync(
  "scripts/lib/discipline-examples.mjs",
  `export const EXAMPLE_DEPTH = ${JSON.stringify(EXAMPLE_DEPTH, null, 2)};\n`
);
fs.writeFileSync(
  "scripts/lib/discipline-examples-i18n.mjs",
  `export const LOCALE_EXAMPLES = ${JSON.stringify(LOCALE_EXAMPLES, null, 2)};\n`
);
console.log("done");
