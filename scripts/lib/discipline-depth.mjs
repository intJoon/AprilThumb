import { LOCALE_DEPTH } from "./discipline-depth-i18n.mjs";
import { EXAMPLE_DEPTH } from "./discipline-examples.mjs";

export const TRACK_DEPTH = {
  cs: {
    ko: {
      "academic-rubric":
        "\n9. **알고리즘·복잡도** — 시간·공간 복잡도, 엣지 케이스\n10. **보안·윤리** — 위협 모델·개인정보·취약점(해당 시)\n",
      "academic-fail":
        "\n- Big-O·자료구조 없이 「효율적」만 반복\n- CVE·취약점 주장에 PoC·출처 없음\n",
      "source-keywords":
        "\n- 예: Big-O | 자료구조 | 동시성 | 테스트·커버리지\n- CVE·OWASP·RFC는 원문·공식 문서 확인\n",
      "study-examples":
        "\n- 「자료구조 시험 D-2」→ 20분 복습 플랜 + 핵심 5개\n- 「디버깅 막힘」→ 가설 2개 + 다음 실험 1개\n",
      "presentation-context":
        "\n- 예: 알고리즘·시스템 설계 발표, 보안 캡스톤 데모\n- 슬라이드: 문제 → 설계·복잡도 → 데모 → 한계\n",
    },
    "en-GB": {
      "academic-rubric":
        "\n9. **Algorithm & complexity** — asymptotic bounds and edge cases\n10. **Security & ethics** — threat model or data handling where relevant\n",
      "academic-fail":
        "\n- 「Efficient」 with no Big-O or data-structure argument\n- Security claims without source, CVE, or threat model\n",
      "source-keywords":
        "\n- e.g. Big-O | data structures | concurrency | test coverage\n- Verify CVE, OWASP, and RFC numbers in primary sources\n",
      "study-examples":
        "\n- 「Data structures exam D-2」→ 20-min review plan + 5 key points\n- 「Debugging blocked」→ 2 hypotheses + 1 next experiment\n",
      "presentation-context":
        "\n- e.g. algorithms/system design defence, security capstone demo\n- Slides: problem → design/complexity → demo → limits\n",
    },
  },
  law: {
    ko: {
      "academic-rubric":
        "\n9. **법원·조문** — 판례·법조문이 주장과 대응\n10. **논증 구조** — 사실·법률·결론 분리(IRAC 등)\n",
      "academic-fail":
        "\n- 법조문 번호 없이 「법적으로 문제」만 반복\n- 판례 요지만 있고 본인 적용 논증 없음\n",
      "source-keywords": "\n- statute | ratio decidendi | burden of proof | remedy | precedent\n",
      "writing-examples":
        "\n✅ `§2: major — 「위법」 주장에 조문·판례 없음. 해당 법조문 § 추가.`\n",
      "study-examples":
        "\n- 「법학 시험 D-3」→ 사례 3개 IRAC 골격 + 조문 5개\n- 「논문 막힘」→ 쟁점 1개 + 근거 판례 2개\n",
      "presentation-context":
        "\n- 예: 모의법정, 판례 브리핑, 정책 제안 발표\n- 슬라이드: 사실 → 쟁점 → 법리 → 결론\n",
    },
    "en-GB": {
      "academic-rubric":
        "\n9. **Authority** — cases and statutes tied to each claim\n10. **IRAC-style structure** — facts, law, and conclusion separated\n",
      "academic-fail":
        "\n- Legal conclusion with no statute or case citation\n- Case summary only with no application to the facts\n",
      "source-keywords": "\n- statute | ratio decidendi | burden of proof | remedy\n",
      "study-examples":
        "\n- 「Law exam D-3」→ 3 case IRAC shells + 5 statutory hooks\n- 「Essay blocked」→ 1 issue + 2 supporting authorities\n",
      "presentation-context":
        "\n- e.g. moot court, case briefing, policy pitch\n- Slides: facts → issue → rule → conclusion\n",
    },
  },
  medicine: {
    ko: {
      "academic-rubric":
        "\n9. **병태생리·근거 수준** — RCT·가이드라인·전문가 견해 구분\n10. **안전** — 금기·부작용·감별(해당 시)\n",
      "academic-fail": "\n- 진단·처방 확정 어조\n- n수·연구 설계·일반화 한계 미언급\n",
      "source-keywords":
        "\n- pathophysiology | RCT | NNT | contraindication | adverse event\n",
      "study-examples":
        "\n- 「OSCE D-3」→ 체크리스트 10개 + 모의 1회\n- 「병태 암기」→ 기전 3단계 + 한계 1줄\n",
      "presentation-context":
        "\n- 예: case presentation, OSCE 브리핑, journal club\n- 슬라이드: 증례 → 감별 → 근거 수준 → 치료·한계\n",
    },
    "en-GB": {
      "academic-rubric":
        "\n9. **Pathophysiology & evidence level** — RCT vs guideline vs expert opinion\n10. **Safety** — contraindications, adverse effects, differentials where relevant\n",
      "academic-fail":
        "\n- Definitive diagnosis or prescription tone\n- No n, study design, or generalisation limits\n",
      "source-keywords":
        "\n- pathophysiology | RCT | NNT | contraindication | adverse event\n",
      "study-examples":
        "\n- 「OSCE D-3」→ 10-item checklist + 1 mock run\n- 「Pathophysiology cram」→ 3-step mechanism + 1 limit line\n",
      "presentation-context":
        "\n- e.g. case presentation, OSCE briefing, journal club\n- Slides: case → differential → evidence level → plan and limits\n",
    },
  },
  engineering: {
    ko: {
      "source-keywords":
        "\n- mass balance | heat duty | bandwidth | SNR | Reynolds | yield | EMC\n",
      "presentation-context":
        "\n- 예: 공정·회로·구조 설계 발표, PFD·실험·시뮬 결과\n- 슬라이드: 사양 → 설계 → 수치·파형 → 한계\n",
      "study-examples":
        "\n- 「반응공학·회로 시험 D-4」→ 수지·단위 체크 + 전달함수 1개\n- 「실험·PFD 과제」→ HAZOP·측정 조건·오차 각 1항\n",
    },
    "en-GB": {
      "source-keywords":
        "\n- mass balance | heat duty | bandwidth | SNR | Reynolds | yield | EMC\n",
      "presentation-context":
        "\n- e.g. process, circuit, or structural design defence\n- Slides: spec → design → numbers/waveform → limits\n",
      "study-examples":
        "\n- 「Reaction/circuits exam D-4」→ balance + units + 1 transfer function\n- 「Lab/PFD task」→ 1 HAZOP + measurement + error item\n",
    },
  },
  nursing: {
    ko: {
      "source-keywords":
        "\n- nursing process | NANDA | care plan | evidence | patient safety\n",
      "study-examples":
        "\n- 「간호과정 시험 D-3」→ 사정·진단·중재 각 3항\n- 「케어플랜 과제」→ 근거 2개 + 평가 지표 1개\n",
      "presentation-context":
        "\n- 예: 케이스 프레젠테이션, 케어플랜·시뮬 브리핑\n- 슬라이드: 사정 → 진단 → 중재 → 평가\n",
    },
    "en-GB": {
      "source-keywords":
        "\n- nursing process | NANDA | care plan | evidence | patient safety\n",
      "study-examples":
        "\n- 「Nursing process exam D-3」→ 3 items each assess/diagnose/intervene\n- 「Care plan task」→ 2 evidence sources + 1 evaluation metric\n",
      "presentation-context":
        "\n- e.g. case presentation, care plan or simulation briefing\n- Slides: assess → diagnose → intervene → evaluate\n",
    },
  },
  veterinary: {
    ko: {
      "academic-rubric":
        "\n9. **종·체중·투여경로** — 수의학 맥락 명시\n10. **잔류·식용동물** — MRL·철회기간·오프라벨 한계\n",
      "academic-fail":
        "\n- 인용약·용량을 사람 기준으로만 서술\n- 종 간 약동학 차이 무시\n",
      "source-keywords":
        "\n- species | dose mg/kg | withdrawal | pharmacokinetics | zoonosis\n",
      "study-examples":
        "\n- 「수의 약리 시험」→ 종별 용량표 5개 + 금기 2개\n- 「임상 실습」→ 종별 체크 + MRL·철회 3항\n",
      "presentation-context":
        "\n- 예: 임상 케이스 발표, 식용동물 약물·MRL 브리핑\n- 슬라이드: 종·체중 → 진단 → 용량·경로 → 잔류·한계\n",
    },
    "en-GB": {
      "academic-rubric":
        "\n9. **Species & route** — veterinary context explicit\n10. **Residues & food animals** — MRL, withdrawal, off-label limits\n",
      "academic-fail":
        "\n- Human drug doses only with no species context\n- Ignores pharmacokinetic differences between species\n",
      "source-keywords":
        "\n- species | dose mg/kg | withdrawal | pharmacokinetics | zoonosis\n",
      "study-examples":
        "\n- 「Veterinary pharmacology exam」→ 5 species dose rows + 2 contraindications\n- 「Clinical rotation」→ species checklist + 3 MRL/withdrawal items\n",
      "presentation-context":
        "\n- e.g. clinical case presentation, food-animal drug and MRL briefing\n- Slides: species/weight → diagnosis → dose/route → residues and limits\n",
    },
  },
  linguistics: {
    ko: {
      "academic-rubric":
        "\n9. **데이터·예시** — 자연어 예문·코퍼스·통계 근거\n10. **이론 적합** — 프레임워크와 분석 단위 일치\n",
      "academic-fail":
        "\n- gloss·출처 없는 예문으로 통사·음운 주장\n- 선택 이론과 분석 단위(어절·발화 등) 불일치\n",
      "source-keywords":
        "\n- phoneme | morpheme | syntax | pragmatics | corpus | gloss\n",
      "writing-examples":
        "\n✅ `§4: major — 예문 (1)에 gloss·출처 없음. 인용 논문 또는 코퍼스 ID 추가.`\n",
      "concise-examples":
        "\n- 「통사 트리, 간결 ultra」— 기호·라벨은 축약하지 말 것\n",
      "study-examples":
        "\n- 「음운·통사 시험 D-5」→ gloss 예문 8개 + 이론 1프레임\n- 「코퍼스 과제」→ 검색식 1개 + 빈도표 1장\n",
      "presentation-context":
        "\n- 예: 분석 발표, 코퍼스·필드워크 결과 공유\n- 슬라이드: 연구 질문 → 데이터 → 분석 → 한계\n",
    },
    "en-GB": {
      "academic-rubric":
        "\n9. **Data & examples** — natural examples, corpus, or statistics\n10. **Theory fit** — framework matches the unit of analysis\n",
      "academic-fail":
        "\n- Syntax or phonology claims without glossed, sourced examples\n- Framework mismatched to the unit of analysis\n",
      "source-keywords":
        "\n- phoneme | morpheme | syntax | pragmatics | corpus | gloss\n",
      "study-examples":
        "\n- 「Phonology/syntax exam D-5」→ 8 glossed examples + 1 framework\n- 「Corpus assignment」→ 1 query + 1 frequency table\n",
      "presentation-context":
        "\n- e.g. analysis talk, corpus or fieldwork findings\n- Slides: question → data → analysis → limits\n",
    },
  },
  design: {
    ko: {
      "presentation-context":
        "\n- 예: 포트폴리오 크리틱, 사용자 여정, 비판 세션\n- 슬라이드: 문제 → 리서치 → 시안 → 피드백 반영\n",
      "writing-examples":
        "\n✅ `§3: major — 페르소나 주장에 인터뷰·테스트 근거 없음. § 또는 캡션 추가.`\n",
      "academic-rubric":
        "\n9. **사용자·맥락** — 페르소나·여정·제약이 디자인 결정과 연결\n10. **비평 대응** — 대안·트레이드오프·한계\n",
      "academic-fail":
        "\n- 인터뷰·테스트 근거 없는 UX·페르소나 주장\n- 대안·트레이드오프 없이 단일 시안만 옹호\n",
      "study-examples":
        "\n- 「UX·리서치 시험」→ 페르소나·여정 각 1장 + 검증 2항\n- 「프로토타입 막힘」→ 가설 1개 + 테스트 1회 설계\n",
    },
    "en-GB": {
      "presentation-context":
        "\n- e.g. portfolio review, user-journey pitch, critique session\n- Slides: problem → research → concepts → iteration\n",
      "academic-rubric":
        "\n9. **User & context** — persona, journey, constraints tied to decisions\n10. **Critique response** — alternatives, trade-offs, limits\n",
      "academic-fail":
        "\n- UX or persona claims without research evidence\n- Single concept pushed with no alternatives or trade-offs\n",
      "study-examples":
        "\n- 「UX/research exam」→ 1 persona + 1 journey sheet + 2 validation checks\n- 「Prototype blocked」→ 1 hypothesis + 1 test plan\n",
    },
  },
  "cultural-arts": {
    ko: {
      "academic-rubric":
        "\n9. **맥락·시대** — 작품·공연·정책의 역사·사회 맥락\n10. **비평·해석** — 1차 자료·리뷰·이론 프레임 구분\n",
      "academic-fail":
        "\n- 1차 자료·아카이브 없이 해석만 반복\n- 시대·사회 맥락 없이 작품·정책 설명\n",
      "source-keywords":
        "\n- curatorial | reception | canon | policy | archive | performance\n",
      "presentation-context":
        "\n- 예: 작품 분석 발표, 전시 기획안, 공연 리뷰\n- 슬라이드: 맥락 → 작품·1차자료 → 해석 → 비평\n",
      "study-examples":
        "\n- 「예술사·비평 시험」→ 작품 3개 + 1차자료 각 1개\n- 「전시 기획 과제」→ 컨셉 1줄 + 아카이브·정책 근거 2개\n",
    },
    "en-GB": {
      "academic-rubric":
        "\n9. **Context & period** — historical and social framing\n10. **Critique & interpretation** — primary sources vs reviews vs theory\n",
      "academic-fail":
        "\n- Interpretation without primary sources or archive evidence\n- Work or policy discussed with no historical context\n",
      "source-keywords":
        "\n- curatorial | reception | canon | policy | archive | performance\n",
      "presentation-context":
        "\n- e.g. work analysis, exhibition proposal, performance review\n- Slides: context → work/primary source → interpretation → critique\n",
      "study-examples":
        "\n- 「Art history/critique exam」→ 3 works + 1 primary source each\n- 「Exhibition brief」→ 1-line concept + 2 archive/policy sources\n",
    },
  },
  philosophy: {
    ko: {
      "academic-rubric":
        "\n9. **논증 구조** — 전제·결론·반례·반박\n10. **텍스트 근거** — 인용이 해석을 실제로 지지\n",
      "academic-fail":
        "\n- 인용만 나열하고 본인 논지 없음\n- straw man·확증 편향만 비판하고 핵심 반례 회피\n",
      "writing-examples":
        "\n✅ `§2: major — 반례 제시 후 재반박 없음. 한 단락으로 반박 추가.`\n",
      "study-examples":
        "\n- 「철학 시험 D-4」→ 논증 지도 1개 + 반례·재반박 각 1개\n- 「텍스트 독해」→ 인용 3개 + 본인 논지 1문장\n",
      "presentation-context":
        "\n- 예: 논문 발표, 사상·텍스트 세미나\n- 슬라이드: 논지 → 전제 → 반례 → 재반박 → 결론\n",
    },
    "en-GB": {
      "academic-rubric":
        "\n9. **Argument structure** — premises, conclusion, objection, reply\n10. **Textual support** — citations actually support the interpretation\n",
      "academic-fail":
        "\n- Citation stacking with no author thesis\n- Straw man only; core objection not addressed\n",
      "study-examples":
        "\n- 「Philosophy exam D-4」→ 1 argument map + objection and reply\n- 「Text reading」→ 3 citations + 1 author thesis sentence\n",
      "presentation-context":
        "\n- e.g. paper presentation, text or idea seminar\n- Slides: thesis → premises → objection → reply → conclusion\n",
    },
  },
  sports: {
    ko: {
      "academic-rubric":
        "\n9. **생리·부하** — 훈련·경기 부하와 적응 근거\n10. **측정·통계** — 표본·효과크기·한계\n",
      "academic-fail":
        "\n- n·효과크기 없이 「유의미한 개선」만 주장\n- 훈련 부하·회복 근거 없는 프로그램 권고\n",
      "source-keywords":
        "\n- VO2max | periodization | injury | biomechanics | load | recovery\n",
      "study-examples":
        "\n- 「체력 시험 D-5」→ 주별 부하 + 회복 3원칙\n- 「생체역학 과제」→ 측정 2종 + 해석·한계 1줄\n",
      "presentation-context":
        "\n- 예: 훈련·경기 분석, 연구 결과·프로그램 제안 발표\n- 슬라이드: 목표 → 부하·측정 → 결과 → 적용·한계\n",
    },
    "en-GB": {
      "academic-rubric":
        "\n9. **Physiology & load** — training load and adaptation evidence\n10. **Measurement & stats** — sample, effect size, limits\n",
      "academic-fail":
        "\n- \"Significant improvement\" with no n or effect size\n- Training programme advice with no load or recovery rationale\n",
      "source-keywords":
        "\n- VO2max | periodization | injury | biomechanics | load | recovery\n",
      "study-examples":
        "\n- 「Fitness exam D-5」→ weekly load + 3 recovery rules\n- 「Biomechanics task」→ 2 measures + 1 interpretation/limit line\n",
      "presentation-context":
        "\n- e.g. training/match analysis, research or programme pitch\n- Slides: aim → load/measurement → results → application and limits\n",
    },
  },
  economics: {
    ko: {
      "academic-rubric":
        "\n9. **모델·가정** — 가정 명시와 한계\n10. **데이터·식별** — 내생성·표본·단위\n",
      "academic-fail":
        "\n- 가정·한계 없이 모형 결론만 제시\n- IV·DiD 등 식별 전략·내생성 미언급\n",
      "source-keywords": "\n- elasticity | identification | welfare | externality | IV | DiD\n",
      "study-examples":
        "\n- 「계량·미시 시험」→ 모형 가정 5개 + 식별 전략 1개\n- 「데이터 과제」→ 변수 정의표 + 내생성·한계 2줄\n",
      "presentation-context":
        "\n- 예: 정책·실증 결과 발표, 모형·DiD 브리핑\n- 슬라이드: 질문 → 데이터·식별 → 결과 → 함의·한계\n",
    },
    "en-GB": {
      "academic-rubric":
        "\n9. **Model & assumptions** — assumptions stated and limits discussed\n10. **Data & identification** — endogeneity, sample, and units addressed\n",
      "academic-fail":
        "\n- Model conclusions with unstated assumptions or limits\n- No identification strategy or endogeneity discussion\n",
      "source-keywords": "\n- elasticity | identification | welfare | externality | IV | DiD\n",
      "study-examples":
        "\n- 「Metrics/micro exam」→ 5 model assumptions + 1 identification strategy\n- 「Data assignment」→ variable table + 2 lines on endogeneity/limits\n",
      "presentation-context":
        "\n- e.g. policy or empirical results, model/DiD briefing\n- Slides: question → data/identification → results → implications and limits\n",
    },
  },
  architecture: {
    ko: {
      "presentation-context":
        "\n- 예: 스튜디오 핀업, 구조·환경 통합 발표\n- 슬라이드마다 도면 스케일·재료·근거 1줄\n",
      "academic-rubric":
        "\n9. **공간·구조** — 스케일·동선·구조 논리\n10. **환경·규범** — 일조·에너지·법규·맥락\n",
      "academic-fail":
        "\n- 스케일·재료·구조 근거 없는 설계 주장\n- 일조·에너지·법규 분석 없음\n",
      "study-examples":
        "\n- 「스튜디오 중간」→ 도면 3장 + 스케일·재료 근거 각 1줄\n- 「환경 분석」→ 일조·에너지 지표 3개 + 법규 1항\n",
    },
    "en-GB": {
      "presentation-context":
        "\n- e.g. studio pin-up, structural/environment integration\n- One line per slide on drawing scale and material rationale\n",
      "academic-rubric":
        "\n9. **Space & structure** — scale, circulation, structural logic\n10. **Environment & code** — daylight, energy, regulations, context\n",
      "academic-fail":
        "\n- Design claims with no scale, material, or structural rationale\n- No daylight, energy, or code analysis\n",
      "study-examples":
        "\n- 「Studio mid-review」→ 3 drawings + 1 scale/material rationale each\n- 「Environmental study」→ 3 daylight/energy metrics + 1 code item\n",
    },
  },
  physics: {
    ko: {
      "source-keywords":
        "\n- 모형: assumption | approximation | validity\n- 실험: error | calibration | reproducibility\n",
      "writing-examples":
        "\n## 물리학 예\n\n❌ 「2장에서 물리 주제를 설명하셨는데, 구체적인 근거가 부족한 것 같습니다.」\n\n✅ `§2.2: 중요 — 단위·차원 불일치. SI 일관성 § 추가.`\n✅ `§4.1: 주의 — 실험 데이터, 오차·계통 오차 없음. error analysis 1문장.`\n",
      "study-examples":
        "\n- 「역학·전자기 시험 D-5」→ 유도 2개 + 단위 체크\n- 「실험 보고」→ 측정 설정·오차 각 1줄\n",
      "presentation-context":
        "\n- 예: 실험·이론 발표, 포스터\n- 슬라이드: 가설 → 설정 → 결과 → 한계\n",
    },
    "en-GB": {
      "source-keywords":
        "\n- Model: assumption | approximation | validity\n- Lab: error | calibration | reproducibility\n",
      "writing-examples":
        "\n## Physics example\n\n❌ \"Section 2 discusses physics but seems to lack concrete evidence.\"\n\n✅ `§2.2: major — unit or dimensional inconsistency. Add SI consistency §.`\n✅ `§4.1: minor — data with no error or systematic uncertainty. Add error sentence.`\n",
      "study-examples":
        "\n- 「Mechanics/EM exam D-5」→ 2 derivations + unit check\n- 「Lab report」→ setup and error each 1 line\n",
      "presentation-context":
        "\n- e.g. experiment or theory talk, poster\n- Slides: hypothesis → setup → results → limits\n",
    },
  },
  chemistry: {
    ko: {
      "source-keywords":
        "\n- 반응: yield | selectivity | mechanism | conditions\n- 분석: NMR | IR | MS | safety data sheet\n",
      "writing-examples":
        "\n## 화학 예\n\n❌ 「2장에서 화학 주제를 설명하셨는데, 구체적인 근거가 부족한 것 같습니다.」\n\n✅ `§2.3: 중요 — 반응 조건·수율 없이 「반응한다」만 서술. conditions § 추가.`\n✅ `§3.1: 주의 — 구조 주장, 스펙트럼 근거 없음. spectrum § 추가.`\n",
      "study-examples":
        "\n- 「유기·무기 시험 D-4」→ 메커니즘 3개 + 조건표\n- 「실험」→ 안전·폐기 2항\n",
      "presentation-context":
        "\n- 예: 합성·분석 실험 발표\n- 슬라이드: 목표 → 방법 → 결과 → 한계\n",
    },
    "en-GB": {
      "source-keywords":
        "\n- Reaction: yield | selectivity | mechanism | conditions\n- Analysis: NMR | IR | MS | SDS\n",
      "writing-examples":
        "\n## Chemistry example\n\n❌ \"Section 2 discusses chemistry but seems to lack concrete evidence.\"\n\n✅ `§2.3: major — 「reacts」 with no conditions or yield. Add conditions §.`\n✅ `§3.1: minor — structure claim with no spectral evidence. Add spectrum §.`\n",
      "study-examples":
        "\n- 「Organic/inorganic exam D-4」→ 3 mechanisms + conditions table\n- 「Lab」→ safety and disposal 2 items\n",
      "presentation-context":
        "\n- e.g. synthesis or analysis lab defence\n- Slides: aim → method → results → limits\n",
    },
  },
  "life-sciences": {
    ko: {
      "source-keywords":
        "\n- 메커니즘: pathway | gene | cell | ecology\n- 실험: control | n | stats | reproducibility\n",
      "writing-examples":
        "\n## 생명과학 예\n\n❌ 「2장에서 생명과학 주제를 설명하셨는데, 구체적인 근거가 부족한 것 같습니다.」\n\n✅ `§3.1: 중요 — 「유의미」 주장, n·통계 없음. stats § 추가.`\n✅ `§4.2: 주의 — in vitro 결과 in vivo 일반화. limits 1문장.`\n",
      "study-examples":
        "\n- 「세포·유전 시험 D-4」→ 경로 2개 + 실험 설계 1개\n- 「리뷰」→ 논문 3편 + 한계 각 1줄\n",
      "presentation-context":
        "\n- 예: 실험·리뷰·포스터 발표\n- 슬라이드: 가설 → 방법 → 데이터 → 한계\n",
    },
    "en-GB": {
      "source-keywords":
        "\n- Mechanism: pathway | gene | cell | ecology\n- Experiment: control | n | stats | reproducibility\n",
      "writing-examples":
        "\n## Life sciences example\n\n❌ \"Section 2 discusses life sciences but seems to lack concrete evidence.\"\n\n✅ `§3.1: major — 「significant」 with no n or stats. Add stats §.`\n✅ `§4.2: minor — in vitro generalised to in vivo. Add limits sentence.`\n",
      "study-examples":
        "\n- 「Cell/genetics exam D-4」→ 2 pathways + 1 experimental design\n- 「Review」→ 3 papers + 1 limit line each\n",
      "presentation-context":
        "\n- e.g. experiment, review, or poster\n- Slides: hypothesis → methods → data → limits\n",
    },
  },
  "mathematics-statistics": {
    ko: {
      "source-keywords":
        "\n- 수학: definition | proof | counterexample\n- 통계: sample | CI | test | identification\n",
      "writing-examples":
        "\n## 수학·통계 예\n\n❌ 「2장에서 수학·통계 주제를 설명하셨는데, 구체적인 근거가 부족한 것 같습니다.」\n\n✅ `§2.1: 중요 — 증명 단계·가정 누락. assumption § 추가.`\n✅ `§4.3: 주의 — p-value만, 효과크기·가정 검토 없음. effect size 1문장.`\n",
      "study-examples":
        "\n- 「증명·계량 시험 D-5」→ 정리 2개 + 가정 목록\n- 「데이터 과제」→ 변수 정의표 + 검정 가정 2줄\n",
      "presentation-context":
        "\n- 예: 증명 발표, 실증·통계 결과 브리핑\n- 슬라이드: 정의 → 유도/모형 → 결과 → 한계\n",
    },
    "en-GB": {
      "source-keywords":
        "\n- Math: definition | proof | counterexample\n- Stats: sample | CI | test | identification\n",
      "writing-examples":
        "\n## Mathematics & statistics example\n\n❌ \"Section 2 discusses mathematics but seems to lack concrete evidence.\"\n\n✅ `§2.1: major — missing proof step or assumption. Add assumption §.`\n✅ `§4.3: minor — p-value only, no effect size or assumption check. Add effect size sentence.`\n",
      "study-examples":
        "\n- 「Proof/metrics exam D-5」→ 2 theorems + assumption list\n- 「Data assignment」→ variable table + 2 test-assumption lines\n",
      "presentation-context":
        "\n- e.g. proof talk or empirical/statistics briefing\n- Slides: definition → derivation/model → results → limits\n",
    },
  },
  "business-administration": {
    ko: {
      "source-keywords":
        "\n- 재무: ratio | cash flow | IFRS | audit\n- 전략: SWOT | stakeholder | risk | KPI\n",
      "writing-examples":
        "\n## 경영·회계 예\n\n❌ 「2장에서 경영 주제를 설명하셨는데, 구체적인 근거가 부족한 것 같습니다.」\n\n✅ `§2.4: 중요 — 재무 수치 출처 없음. annual report § 추가.`\n✅ `§3.2: 주의 — 단일 권고, 대안·리스크 없음. alternative 1개 §.`\n",
      "study-examples":
        "\n- 「재무·전략 시험 D-3」→ 비율 5개 + SWOT 1장\n- 「케이스」→ 이해관계자·제약 각 2개\n",
      "presentation-context":
        "\n- 예: 케이스·재무·전략 발표\n- 슬라이드: 문제 → 분석 → 권고 → 리스크\n",
    },
    "en-GB": {
      "source-keywords":
        "\n- Finance: ratio | cash flow | IFRS | audit\n- Strategy: SWOT | stakeholder | risk | KPI\n",
      "writing-examples":
        "\n## Business & accounting example\n\n❌ \"Section 2 discusses business but seems to lack concrete evidence.\"\n\n✅ `§2.4: major — financial numbers without source. Add annual report §.`\n✅ `§3.2: minor — single recommendation, no alternatives or risks. Add one alternative §.`\n",
      "study-examples":
        "\n- 「Finance/strategy exam D-3」→ 5 ratios + 1 SWOT\n- 「Case」→ 2 stakeholders and 2 constraints each\n",
      "presentation-context":
        "\n- e.g. case, finance, or strategy pitch\n- Slides: problem → analysis → recommendation → risks\n",
    },
  },
  "social-sciences": {
    ko: {
      "source-keywords":
        "\n- 이론: operationalisation | framework | hypothesis\n- 방법: sample | survey | interview | bias\n",
      "writing-examples":
        "\n## 사회과학 예\n\n❌ 「2장에서 사회과학 주제를 설명하셨는데, 구체적인 근거가 부족한 것 같습니다.」\n\n✅ `§2.2: 중요 — 표본·방법 없이 정책 일반화. method § 추가.`\n✅ `§4.1: 주의 — 상관을 인과로 서술. causation caveat 1문장.`\n",
      "study-examples":
        "\n- 「조사·정책 시험 D-4」→ 개념 조작화 3개 + 표본 1단락\n- 「논문」→ 변수 정의표 + 편향 2줄\n",
      "presentation-context":
        "\n- 예: 조사·정책·이론 발표\n- 슬라이드: 질문 → 방법 → 결과 → 한계\n",
    },
    "en-GB": {
      "source-keywords":
        "\n- Theory: operationalisation | framework | hypothesis\n- Methods: sample | survey | interview | bias\n",
      "writing-examples":
        "\n## Social sciences example\n\n❌ \"Section 2 discusses social sciences but seems to lack concrete evidence.\"\n\n✅ `§2.2: major — policy claim with no sample or method. Add method §.`\n✅ `§4.1: minor — correlation stated as causation. Add caveat sentence.`\n",
      "study-examples":
        "\n- 「Survey/policy exam D-4」→ 3 operationalisations + 1 sample paragraph\n- 「Paper」→ variable table + 2 bias lines\n",
      "presentation-context":
        "\n- e.g. survey, policy, or theory talk\n- Slides: question → methods → results → limits\n",
    },
  },
  psychology: {
    ko: {
      "source-keywords":
        "\n- 설계: RCT | between/within | manipulation | control\n- 측정: validity | reliability | effect size | IRB\n",
      "writing-examples":
        "\n## 심리학 예\n\n❌ 「2장에서 심리학 주제를 설명하셨는데, 구체적인 근거가 부족한 것 같습니다.」\n\n✅ `§3.1: 중요 — 「유의미」 주장, n·효과크기 없음. stats § 추가.`\n✅ `§4.2: 주의 — 측정 타당도·통제 변수 미언급. validity 1문장.`\n",
      "study-examples":
        "\n- 「실험·통계 시험 D-4」→ 설계 1개 + 통제 3개\n- 「APA 과제」→ 가설·방법·한계 각 1단락\n",
      "presentation-context":
        "\n- 예: 실험·메타·임상 논의 발표\n- 슬라이드: 가설 → 방법 → 결과 → 한계\n",
    },
    "en-GB": {
      "source-keywords":
        "\n- Design: RCT | between/within | manipulation | control\n- Measurement: validity | reliability | effect size | IRB\n",
      "writing-examples":
        "\n## Psychology example\n\n❌ \"Section 2 discusses psychology but seems to lack concrete evidence.\"\n\n✅ `§3.1: major — 「significant」 with no n or effect size. Add stats §.`\n✅ `§4.2: minor — no validity or control variables. Add validity sentence.`\n",
      "study-examples":
        "\n- 「Experiment/stats exam D-4」→ 1 design + 3 controls\n- 「APA assignment」→ hypothesis, methods, limits each 1 paragraph\n",
      "presentation-context":
        "\n- e.g. experiment, meta, or clinical discussion\n- Slides: hypothesis → methods → results → limits\n",
    },
  },
  education: {
    ko: {
      "source-keywords":
        "\n- 설계: objective | assessment | curriculum alignment\n- 근거: theory | observation | policy | reflection\n",
      "writing-examples":
        "\n## 교육학 예\n\n❌ 「2장에서 교육학 주제를 설명하셨는데, 구체적인 근거가 부족한 것 같습니다.」\n\n✅ `§2.1: 중요 — 학습목표·평가 기준 없음. objective § 추가.`\n✅ `§3.3: 주의 — 「효과적」 주장, 관찰·증거 없음. evidence 1단락.`\n",
      "study-examples":
        "\n- 「수업설계 시험 D-3」→ 목표 3개 + 평가 2개\n- 「포트폴리오」→ 관찰 근거 2개 + 반성 1단락\n",
      "presentation-context":
        "\n- 예: 수업안·연구·정책 발표\n- 슬라이드: 목표 → 활동 → 평가 → 반성\n",
    },
    "en-GB": {
      "source-keywords":
        "\n- Design: objective | assessment | curriculum alignment\n- Evidence: theory | observation | policy | reflection\n",
      "writing-examples":
        "\n## Education example\n\n❌ \"Section 2 discusses education but seems to lack concrete evidence.\"\n\n✅ `§2.1: major — no learning objectives or assessment criteria. Add objectives §.`\n✅ `§3.3: minor — 「effective」 with no observation or evidence. Add evidence paragraph.`\n",
      "study-examples":
        "\n- 「Lesson design exam D-3」→ 3 objectives + 2 assessments\n- 「Portfolio」→ 2 observation hooks + 1 reflection paragraph\n",
      "presentation-context":
        "\n- e.g. lesson plan, research, or policy talk\n- Slides: objectives → activity → assessment → reflection\n",
    },
  },
  "home-economics": {
    ko: {
      "academic-rubric":
        "\n9. **가정·소비자 과학** — 영양·식품·가정·복지 맥락 명시\n10. **실증·정책** — 표본·지표·한계\n",
      "academic-fail":
        "\n- 표본·지표 없는 영양·정책 주장\n- RCT·설문 한계·일반화 범위 미언급\n",
      "source-keywords":
        "\n- nutrition | food safety | household | consumer | policy | RCT\n",
      "study-examples":
        "\n- 「영양·식품 시험」→ 핵심 지표 5개 + 오개념 2개\n- 「가정·소비 조사」→ 표본·지표 정의 + RCT·설문 한계 2줄\n",
      "presentation-context":
        "\n- 예: 영양·식품안전, 가정·복지 정책 발표\n- 슬라이드: 문제 → 데이터·지표 → 결과 → 정책·한계\n",
    },
    "en-GB": {
      "academic-rubric":
        "\n9. **Home & consumer science** — nutrition, food, household, or welfare context\n10. **Evidence & policy** — sample, indicators, limits\n",
      "academic-fail":
        "\n- Nutrition or policy claims without sample or indicators\n- RCT or survey read with no limits or generalisation scope\n",
      "source-keywords":
        "\n- nutrition | food safety | household | consumer | policy | RCT\n",
      "study-examples":
        "\n- 「Nutrition/food exam」→ 5 key indicators + 2 misconceptions\n- 「Household survey」→ sample/indicator defs + 2 lines on RCT/survey limits\n",
      "presentation-context":
        "\n- e.g. nutrition/food safety or household/welfare policy pitch\n- Slides: problem → data/indicators → results → policy and limits\n",
    },
  },
};

for (const [trackId, locales] of Object.entries(EXAMPLE_DEPTH)) {
  if (!TRACK_DEPTH[trackId]) TRACK_DEPTH[trackId] = {};
  for (const [locale, patch] of Object.entries(locales)) {
    if (!TRACK_DEPTH[trackId][locale]) TRACK_DEPTH[trackId][locale] = {};
    Object.assign(TRACK_DEPTH[trackId][locale], patch);
  }
}

for (const [trackId, locales] of Object.entries(LOCALE_DEPTH)) {
  if (!TRACK_DEPTH[trackId]) continue;
  for (const [locale, patch] of Object.entries(locales)) {
    if (!TRACK_DEPTH[trackId][locale]) TRACK_DEPTH[trackId][locale] = {};
    Object.assign(TRACK_DEPTH[trackId][locale], patch);
  }
}

export function depthFor(trackId, locale) {
  const row = TRACK_DEPTH[trackId];
  if (!row) return null;
  if (row[locale]) return row[locale];
  if (locale !== "en-GB" && row["en-GB"]) return row["en-GB"];
  if (locale !== "ko" && row.ko) return row.ko;
  return null;
}
