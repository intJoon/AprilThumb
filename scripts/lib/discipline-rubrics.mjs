const KO = {
  general: {
    name: "일반",
    axes: [
      ["근거", "주장마다 출처·사실 근거. 「일반적으로」만으로 끝나지 않음"],
      ["설명 깊이", "왜·어떻게·그래서가 연결됨; 정의 나열만이 아님"],
      ["한계", "반례·한계·불확실성·적용 범위 명시"],
      ["인용", "참고문헌이 해당 문장을 실제로 지지. 형식 일관"],
      ["분량·형식", "과제 지시(분량, 섹션, 표·그림) 충족"],
      ["깊이", "정의 나열이 아니라 **논증**이 이어짐"],
    ],
    fail: [
      "선택·주장 이유 없음; trade-off 없음",
      "「AI가 X를 개선한다」 같은 빈 generalization",
      "인용 없는 주장; 인용이 문장 내용과 불일치",
    ],
    safety: [
      "AI는 **진단·처방·법률·투자** 등 전문 판단을 대체하지 않습니다",
      "출처 검증은 요약·검색 수준입니다. 중요한 사실은 원문을 직접 확인하세요",
    ],
  },
  pharmacy: {
    name: "약학",
    axes: [
      ["근거", "주장마다 출처·임상/실험 근거. 「일반적으로」만으로 끝나지 않음"],
      ["메커니즘", "약물 작용·병태생리·약동학을 구체 단계로 설명"],
      ["한계", "부작용·금기·연구 한계·일반화 불가 구간 명시"],
      ["인용", "참고문헌이 해당 문장을 실제로 지지. 형식 일관"],
      ["분량·형식", "과제 지시(분량, 섹션, 표·그림) 충족"],
      ["깊이", "정의 나열이 아니라 **왜·어떻게·그래서**가 연결됨"],
    ],
    fail: [
      "상호작용·용량·환자 특성 없이 투약 권고",
      "임상 주장에 근거 수준(RCT·가이드 등) 없음",
      "n수·연구 설계·일반화 한계 미언급",
    ],
    safety: [
      "AI는 **진단·처방·투약 지시**를 대체하지 않습니다",
      "출처 검증은 요약·검색 수준입니다. 임상·약리 주장은 원문을 직접 확인하세요",
    ],
  },
  cs: {
    name: "컴퓨터공학",
    axes: [
      ["알고리즘·복잡도", "Big-O·엣지 케이스·정확성. 「효율적」만으로 끝나지 않음"],
      ["자료구조·설계", "문제에 맞는 구조·트레이드오프·대안 비교"],
      ["정확성·검증", "테스트·증명·재현 가능한 근거"],
      ["보안·윤리", "위협 모델·개인정보·취약점(해당 시)"],
      ["분량·형식", "과제 지시(분량, 섹션, 코드·다이어그램) 충족"],
      ["깊이", "정의 나열이 아니라 **왜·어떻게·그래서**가 연결됨"],
    ],
    fail: [
      "Big-O·자료구조 없이 「효율적」만 반복",
      "CVE·취약점 주장에 PoC·출처 없음",
      "엣지 케이스·한계 분석 없이 알고리즘만 서술",
    ],
    safety: [
      "**시험·과제 답안 전체 작성** 대행 — 힌트·개념·다음 단계만",
      "악성코드·우회·해킹 실습 지시",
    ],
  },
  medicine: {
    name: "의학",
    axes: [
      ["근거 수준", "RCT·가이드·전문가 견해 구분. 「일반적으로」만으로 끝나지 않음"],
      ["병태생리·메커니즘", "질환·치료 기전을 구체 단계로 설명"],
      ["감별·한계", "감별진단·부작용·금기·일반화 한계 명시"],
      ["인용", "참고문헌이 해당 문장을 실제로 지지. 형식 일관"],
      ["분량·형식", "과제 지시(케이스·SOAP·분량) 충족"],
      ["깊이", "증상 나열이 아니라 **왜·어떻게·그래서**가 연결됨"],
    ],
    fail: [
      "진단·처방 확정 어조",
      "n수·연구 설계·일반화 한계 미언급",
      "치의·공중보건 주장에 역학·근거 수준 없음",
    ],
    safety: [
      "**의학적 진단·처방·투약 지시** — 「이 증상이면 ○○」 금지",
      "응급 증상 시 전문·응급 이용 권고 (AI 대체 불가)",
    ],
  },
  nursing: {
    name: "간호학",
    axes: [
      ["근거·가이드", "간호 근거·임상 가이드·표준 간호과정 연결"],
      ["간호과정", "사정→진단→계획→수행→평가 논리 일관"],
      ["안전·윤리", "환자 안전·감염·프라이버시·윤리 dilemmas"],
      ["인용", "교재·논문·가이드가 주장을 지지. 형식 일관"],
      ["분량·형식", "케어플랜·SOAP·케이스 형식 충족"],
      ["깊이", "증상 나열이 아니라 **근거→간입→평가**가 연결됨"],
    ],
    fail: [
      "간호진단·중재 근거 없이 처방 서술",
      "환자 맥락(연령·동반질환) 없이 일반론만 반복",
      "실습·시뮬 평가 기준·안전 체크리스트 미반영",
    ],
    safety: [
      "**실제 환자 처치·투약 지시** 금지 — 학습·케어플랜 연습만",
      "응급·자해 신호 시 전문 도움 권고",
    ],
  },
  veterinary: {
    name: "수의학",
    axes: [
      ["종·체중·경로", "수의학 맥락(종·mg/kg·경로) 명시"],
      ["병태·치료 근거", "종별 병태생리·치료 근거·근거 수준"],
      ["잔류·식용동물", "MRL·철회기간·오프라벨 한계(해당 시)"],
      ["인용", "수의학·약리 출처가 주장을 지지"],
      ["분량·형식", "케이스·임상 보고 형식 충족"],
      ["깊이", "사람 의학 그대로 복붙이 아니라 **종 특이** 연결"],
    ],
    fail: [
      "인용약·용량을 사람 기준으로만 서술",
      "식용동물 투약에 철회·MRL 없음",
      "종 간 약동학 차이 무시",
    ],
    safety: [
      "**실제 동물 진단·처방·투약 지시** 금지",
      "식용·반려 동물 응급 시 수의사·응급 이용 권고",
    ],
  },
  engineering: {
    name: "공학",
    axes: [
      ["수치·단위", "단위 일관·차원·오차·불확실성"],
      ["모델·설계", "가정·경계조건·설계 근거·대안 비교"],
      ["수지·성능", "물질·에너지 수지·회로·구조·성능 지표(해당 시)"],
      ["안전·규범", "HAZOP·안전 마진·법규·표준(해당 시)"],
      ["분량·형식", "도면·PFD·회로·계산서 형식 충족"],
      ["깊이", "공식만 나열이 아니라 **가정→계산→함의** 연결"],
    ],
    fail: [
      "단위·수지·오차 없이 「효율적·최적」만 반복",
      "실험·시뮬 수치에 측정 조건·캘리브레이션 없음",
      "스케일업·안전 한계 없이 파일럿 결과 일반화",
    ],
    safety: [
      "**위험 실험·불법 개조·안전 규범 우회** 지시 금지",
      "현장·실험실 안전은 지침·교수 확인 우선",
    ],
  },
  physics: {
    name: "물리학",
    axes: [
      ["물리 모형", "가정·근사·적용 범위 명시"],
      ["수식·단위", "차원 일관·유도·오차·유효숫자"],
      ["실험·검증", "측정 설정·오차·재현·데이터 해석"],
      ["인용", "교재·논문이 주장·수치를 지지"],
      ["분량·형식", "과제 지시(보고·증명·분량) 충족"],
      ["깊이", "공식 나열이 아니라 **물리적 의미→예측** 연결"],
    ],
    fail: [
      "단위·차원 불일치",
      "근사·가정 없이 모형 결론만 제시",
      "실험 데이터에 오차·계통 오차 없음",
    ],
    safety: [
      "**위험 실험·방사선·고압** 등 안전 무시 지시 금지",
    ],
  },
  chemistry: {
    name: "화학",
    axes: [
      ["반응·메커니즘", "화학식·메커니즘·조건·수율·선택성"],
      ["분석·구조", "스펙트럼·구조 근거·정량(해당 시)"],
      ["안전·윤리", "시약·폐기·독성·실험 안전(해당 시)"],
      ["인용", "문헌·데이터베이스가 주장을 지지"],
      ["분량·형식", "실험 보고·계산 형식 충족"],
      ["깊이", "반응식만이 아니라 **메커니즘·한계** 연결"],
    ],
    fail: [
      "조건·수율 없이 「반응한다」만 서술",
      "스펙·구조 근거 없는 구조 주장",
      "안전·폐기 절차 없이 시약·합성 서술",
    ],
    safety: [
      "**위험 합성·불법 물질·실험 안전 무시** 지시 금지",
    ],
  },
  "life-sciences": {
    name: "생명과학",
    axes: [
      ["생물학적 메커니즘", "경로·유전·세포·생태 메커니즘 구체화"],
      ["실험·데이터", "설계·대조·n·통계·재현(해당 시)"],
      ["한계", "모델 생물·in vitro 한계·일반화 범위"],
      ["인용", "논문·데이터베이스가 주장을 지지"],
      ["분량·형식", "실험·리뷰·포스터 형식 충족"],
      ["깊이", "용어 나열이 아니라 **가설→근거→함의** 연결"],
    ],
    fail: [
      "통계·n 없이 「유의미」만 반복",
      "in vitro 결과를 in vivo로 무비판 일반화",
      "유전·계통 근거 없는 형질 주장",
    ],
    safety: [
      "**유전자 편집·바이오 안전 규정 우회** 지시 금지",
    ],
  },
  "mathematics-statistics": {
    name: "수학·통계",
    axes: [
      ["정의·가정", "정의·가정·명제 조건 명확"],
      ["증명·유도", "논리 단계·귀류·反例(해당 시)"],
      ["통계·모형", "표본·가정·검정·CI·식별(해당 시)"],
      ["인용", "정리·논문·교재 인용 정확"],
      ["분량·형식", "증명·보고·기호 형식 충족"],
      ["깊이", "공식만이 아니라 **논리·직관·한계** 연결"],
    ],
    fail: [
      "증명 단계·가정 누락",
      "p-value만 제시·효과크기·가정 검토 없음",
      "기호·정의 불일치",
    ],
    safety: [
      "**시험·과제 답 전체 대행** — 힌트·개념·다음 단계만",
    ],
  },
  law: {
    name: "법률",
    axes: [
      ["법원·조문", "판례·법조문이 주장과 대응"],
      ["논증 구조", "사실·법률·결론 분리(IRAC 등)"],
      ["해석·적용", "본 사건·쟁점에의 적용 논증"],
      ["인용", "조문·판례 형식 일관·정확"],
      ["분량·형식", "메모·에세이·의견서 형식 충족"],
      ["깊이", "판례 요지만이 아니라 **쟁점→법리→결론** 연결"],
    ],
    fail: [
      "법조문 번호 없이 「법적으로 문제」만 반복",
      "판례 요지만 있고 본인 적용 논증 없음",
      "절차·구제수단·입증책임 맥락 누락",
    ],
    safety: [
      "**실제 사건 법률자문·소송 전략** — 학습·과제 논증만",
      "위기·범죄 신고 필요 시 전문 기관 권고",
    ],
  },
  economics: {
    name: "경제학",
    axes: [
      ["모델·가정", "가정 명시·균형·비교정태(해당 시)"],
      ["식별·데이터", "내생성·표본·단위·강건성(해당 시)"],
      ["후생·함의", "탄력성·외부성·분배(해당 시)"],
      ["인용", "논문·데이터가 주장을 지지"],
      ["분량·형식", "에세이·실증 보고 형식 충족"],
      ["깊이", "그래프만이 아니라 **가정→결론→한계** 연결"],
    ],
    fail: [
      "가정·한계 없이 모형 결론만 제시",
      "인과 주장에 IV·DiD 등 식별 전략 없음",
      "표본·단위·외삽 한계 미언급",
    ],
    safety: [
      "**투자·세금·법률 결정** 대행 금지 — 개념·과제만",
    ],
  },
  "business-administration": {
    name: "경영·회계",
    axes: [
      ["문제 정의", "이해관계자·제약·목표 명확"],
      ["분석·근거", "재무·시장·운영 데이터·프레임워크 근거"],
      ["대안·트레이드오프", "선택지·리스크·실행 가능성"],
      ["인용", "사례·보고서·회계 기준이 주장을 지지"],
      ["분량·형식", "케이스·재무제표·발표 형식 충족"],
      ["깊이", "슬로건만이 아니라 **분석→권고→한계** 연결"],
    ],
    fail: [
      "재무·시장 수치 출처 없음",
      "대안·리스크 없이 단일 권고",
      "회계·감사 기준 없는 재무 주장",
    ],
    safety: [
      "**실제 투자·세무·법인 의사결정** 대행 금지",
    ],
  },
  "social-sciences": {
    name: "사회과학",
    axes: [
      ["이론·개념", "개념 조작화·이론 프레임 명시"],
      ["방법·데이터", "표본·설계·편향·윤리(해당 시)"],
      ["해석·한계", "인과 vs 상관·일반화·대안 설명"],
      ["인용", "문헌·데이터가 주장을 지지"],
      ["분량·형식", "논문·리포트·조사 형식 충족"],
      ["깊이", "현상 나열이 아니라 **이론→증거→한계** 연결"],
    ],
    fail: [
      "표본·방법 없이 정책·사회 현상 일반화",
      "상관을 인과로 서술",
      "개념 정의·조작화 불명확",
    ],
    safety: [
      "**실명·민감 개인정보** 수집·노출 지시 금지",
      "연구 윤리·IRB 맥락은 교수 지침 우선",
    ],
  },
  psychology: {
    name: "심리학",
    axes: [
      ["이론·가설", "이론·가설·예측 명확"],
      ["방법·통계", "설계·표본·측정·통계·효과크기"],
      ["윤리", "동의·기밀·취약집단(해당 시)"],
      ["인용", "논문·메타가 주장을 지지"],
      ["분량·형식", "APA 등 과제 형식 충족"],
      ["깊이", "용어 나열이 아니라 **가설→근거→한계** 연결"],
    ],
    fail: [
      "n·효과크기 없이 「유의미」만 반복",
      "측정 타당도·통제 변수 미언급",
      "임상 진단·치료 주장에 근거 없음",
    ],
    safety: [
      "**심리 치료·진단·약물** 대행 금지 — 학습·과제만",
      "자해·위기 신호 시 전문 상담·응급 권고",
    ],
  },
  education: {
    name: "교육학",
    axes: [
      ["목표·기준", "학습목표·평가·교육과정 연결"],
      ["근거", "교육 이론·연구·정책 근거"],
      ["실천·반성", "수업·관찰·개선안·한계"],
      ["인용", "문헌·정책이 주장을 지지"],
      ["분량·형식", "수업안·에세이·포트폴리오 형식 충족"],
      ["깊이", "슬로건만이 아니라 **근거→설계→평가** 연결"],
    ],
    fail: [
      "학습목표·평가 기준 없는 수업안",
      "관찰·증거 없는 「효과적」 주장",
      "아동·학생 실명·식별 정보 노출",
    ],
    safety: [
      "**실습 학생·아동 개인정보** 노출·수집 지시 금지",
      "아동 학대·위기 의심 시 신고·전문 기관 권고",
    ],
  },
  philosophy: {
    name: "철학",
    axes: [
      ["논증", "전제·결론·타당성·명료성"],
      ["반론·재반박", "반례·반론에 대한 응답"],
      ["텍스트", "인용·해석·저자 논지 정확"],
      ["개념", "정의·구분·thought experiment(해당 시)"],
      ["분량·형식", "에세이·논증 형식 충족"],
      ["깊이", "인용 나열이 아니라 **논지→방어** 연결"],
    ],
    fail: [
      "반례 제시 후 재반박 없음",
      "인용만 나열·본인 thesis 불명확",
      "순환 논증·모호한 핵심 개념",
    ],
    safety: [
      "**시험·과제 논증 전체 대행** — 구조·반례 힌트만",
    ],
  },
  linguistics: {
    name: "언어학",
    axes: [
      ["분석 단위", "음운·형태·통사·화용 단위 명시"],
      ["데이터·예시", "예문 gloss·출처·코퍼스(해당 시)"],
      ["이론·일관성", "프레임과 분석 단위 일치"],
      ["인용", "논문·코퍼스가 주장을 지지"],
      ["분량·형식", "과제·기호·전사 형식 충족"],
      ["깊이", "예시 나열이 아니라 **패턴→설명** 연결"],
    ],
    fail: [
      "예문 gloss·출처 없음",
      "이론과 분석 단위(어절 vs 발화) 불일치",
      "통계·표본 없는 일반화(해당 시)",
    ],
    safety: [
      "**과제 분석·전사 전체 대행** — 방법·다음 단계만",
    ],
  },
  "cultural-arts": {
    name: "문화예술",
    axes: [
      ["1차 자료", "작품·프로그램·아카이브·전시 근거"],
      ["맥락", "시대·제도·수용·정책 맥락"],
      ["해석·비평", "주장과 1차 자료 대응·대안 해석"],
      ["인용", "카탈로그·논문 형식 일관"],
      ["분량·형식", "에세이·기획·리뷰 형식 충족"],
      ["깊이", "줄거리만이 아니라 **해석→근거** 연결"],
    ],
    fail: [
      "1차 자료 없이 해석만 반복",
      "시대·맥락 없이 작품 설명",
      "음악·영화·미디어 분석에 출처·장면 근거 없음",
    ],
    safety: [
      "**저작권 침해·불법 배포** 지시 금지",
    ],
  },
  design: {
    name: "디자인",
    axes: [
      ["리서치", "인터뷰·테스트·페르소나 근거(해당 시)"],
      ["결정·대안", "선택 이유·트레이드오프·접근성"],
      ["검증", "프로토타입·지표·한계"],
      ["인용", "사례·문헌·캡션이 주장을 지지"],
      ["분량·형식", "포트폴리오·발표 형식 충족"],
      ["깊이", "시안만이 아니라 **문제→근거→검증** 연결"],
    ],
    fail: [
      "페르소나·테스트 근거 없는 UX 주장",
      "단일 시안만·대안·트레이드오프 없음",
      "접근성·제약 미언급",
    ],
    safety: [
      "**클라이언트 실명·민감 데이터** 포트폴리오 노출 지시 금지",
    ],
  },
  architecture: {
    name: "건축학",
    axes: [
      ["공간·프로그램", "스케일·동선·프로그램 논리"],
      ["구조·재료", "하중·경로·재료·시공 근거"],
      ["환경·규범", "일조·에너지·법규·접근성(해당 시)"],
      ["인용", "도면 캡션·문헌이 주장을 지지"],
      ["분량·형식", "도면·핀업·보고 형식 충족"],
      ["깊이", "이미지만이 아니라 **설계 근거→한계** 연결"],
    ],
    fail: [
      "스케일·재료·구조 근거 없는 설계 주장",
      "일조·에너지·법규 분석 없음",
      "도면과 본문 설명 불일치",
    ],
    safety: [
      "**현장·시공 안전·법규 우회** 지시 금지",
    ],
  },
  "home-economics": {
    name: "생활과학",
    axes: [
      ["가정·소비 맥락", "영양·식품·가정·복지 맥락 명시"],
      ["실증·지표", "표본·지표·데이터 출처"],
      ["정책·한계", "RCT·설문 한계·일반화 범위"],
      ["인용", "데이터·문헌이 주장을 지지"],
      ["분량·형식", "조사·실험·정책 보고 형식 충족"],
      ["깊이", "권고만이 아니라 **근거→함의→한계** 연결"],
    ],
    fail: [
      "표본·지표 없는 영양·정책 주장",
      "RCT·설문 한계·일반화 범위 미언급",
      "HACCP·알레르gen 맥락 누락(해당 시)",
    ],
    safety: [
      "**개인 맞춤 영양·치료 식단** 처方 금지 — 개념·과제만",
    ],
  },
  sports: {
    name: "체육학",
    axes: [
      ["생리·부하", "훈련 부하·적응·회복 근거"],
      ["측정·통계", "n·효과크기·측정 타당도(해당 시)"],
      ["안전", "손상·과훈련·금기(해당 시)"],
      ["인용", "문헌·데이터가 주장을 지지"],
      ["분량·형식", "프로그램·연구 보고 형식 충족"],
      ["깊이", "프로토콜만이 아니라 **근거→적용→한계** 연결"],
    ],
    fail: [
      "n·효과크기 없이 「유의미한 개선」",
      "부하·회복 근거 없는 훈련 권고",
      "생체역학·측정 조건 없는 수치",
    ],
    safety: [
      "**부상·질환 무시 훈련·약물** 권고 금지",
      "통증·심장·호흡 이상 시 의료·응급 권고",
    ],
  },
};

const EN = {
  general: {
    name: "general",
    axes: [
      ["Evidence", "Each claim sourced; not closed with 「generally」 alone"],
      ["Depth", "Why–how–so connected; not definition lists alone"],
      ["Limits", "Counterexamples, uncertainty, and scope stated"],
      ["Citation", "References support the exact sentence; consistent format"],
      ["Format & scope", "Length, sections, figures match the brief"],
      ["Argument", "The piece argues, not just lists terms"],
    ],
    fail: [
      "Claims with no rationale or trade-offs",
      "Empty generalisations (e.g. 「AI improves healthcare」)",
      "Claims without citations, or citations that do not match",
    ],
    safety: [
      "AI does not replace professional judgement in **medicine, law, finance**, or similar",
      "Source check is summary level only — verify important facts in original sources",
    ],
  },
  pharmacy: {
    name: "pharmacy",
    axes: [
      ["Evidence", "Clinical or experimental support per claim; not 「generally」 alone"],
      ["Mechanism", "Drug action, pathophysiology, pharmacokinetics in concrete steps"],
      ["Limits", "Adverse effects, contraindications, study limits, generalisation scope"],
      ["Citation", "References support the exact sentence; consistent format"],
      ["Format & scope", "Word count, sections, figures match the brief"],
      ["Depth", "Why–how–so connected; not definition stacking alone"],
    ],
    fail: [
      "Dosing advice without interactions, dose, or patient factors",
      "Clinical claims without evidence level (RCT, guideline, etc.)",
      "No n, study design, or generalisation limits",
    ],
    safety: [
      "AI does not replace **diagnosis, prescribing, or dosing instructions**",
      "Source check is summary level only — verify clinical and pharmacology claims in originals",
    ],
  },
  cs: {
    name: "computer science",
    axes: [
      ["Algorithm & complexity", "Big-O, edge cases, correctness — not 「efficient」 alone"],
      ["Data structures & design", "Fit-for-purpose structures, trade-offs, alternatives"],
      ["Correctness & verification", "Tests, proofs, reproducible evidence"],
      ["Security & ethics", "Threat model, privacy, vulnerabilities where relevant"],
      ["Format & scope", "Meets assignment format, sections, code/diagrams"],
      ["Depth", "Why–how–so connected, not definition lists"],
    ],
    fail: [
      "「Efficient」 with no Big-O or data-structure argument",
      "Security claims without source, CVE, or threat model",
      "Algorithm claims with no edge cases or limits",
    ],
    safety: [
      "**Full exam/assignment answers** — hints, concepts, next steps only",
      "No malware, bypass, or hacking instructions",
    ],
  },
  medicine: {
    name: "medicine",
    axes: [
      ["Evidence level", "RCT vs guideline vs expert opinion distinguished"],
      ["Pathophysiology", "Mechanism in concrete steps"],
      ["Differential & limits", "Differentials, contraindications, generalisation limits"],
      ["Citation", "References actually support each claim"],
      ["Format & scope", "Case/SOAP/length requirements met"],
      ["Depth", "Symptom lists linked by why–how–so"],
    ],
    fail: [
      "Definitive diagnosis or prescription tone",
      "No n, study design, or generalisation limits",
      "Dental or public-health claims without epidemiology or evidence level",
    ],
    safety: [
      "**No medical diagnosis, prescription, or dosing**",
      "Emergency symptoms → seek professional/urgent care",
    ],
  },
  nursing: {
    name: "nursing",
    axes: [
      ["Evidence & guidelines", "Nursing evidence and care standards linked"],
      ["Nursing process", "Assessment→diagnosis→plan→implement→evaluate coherent"],
      ["Safety & ethics", "Patient safety, infection, privacy, ethical dilemmas"],
      ["Citation", "Texts and guidelines support claims"],
      ["Format & scope", "Care plan/SOAP/case format met"],
      ["Depth", "Assessment→intervention→evaluation connected"],
    ],
    fail: [
      "Interventions with no nursing diagnosis rationale",
      "Generic advice without patient context",
      "No simulation/clinical safety or rubric alignment",
    ],
    safety: [
      "**No real patient care or medication orders** — learning only",
      "Self-harm or emergency → professional help",
    ],
  },
  veterinary: {
    name: "veterinary medicine",
    axes: [
      ["Species & dose", "Species, mg/kg, route explicit"],
      ["Pathophysiology & evidence", "Species-specific mechanism and evidence"],
      ["Withdrawal & food animals", "MRL, withdrawal, off-label limits where relevant"],
      ["Citation", "Veterinary sources support claims"],
      ["Format & scope", "Case/clinical report format met"],
      ["Depth", "Not human medicine copy-paste — species-specific"],
    ],
    fail: [
      "Human doses without species or weight context",
      "Food-animal drugs with no withdrawal or MRL",
      "Ignoring inter-species pharmacokinetics",
    ],
    safety: [
      "**No real animal diagnosis, prescription, or dosing**",
      "Emergencies → veterinarian or urgent care",
    ],
  },
  engineering: {
    name: "engineering",
    axes: [
      ["Numbers & units", "Consistent units, dimensions, error, uncertainty"],
      ["Model & design", "Assumptions, boundary conditions, alternatives"],
      ["Balance & performance", "Mass/energy, circuits, structures as relevant"],
      ["Safety & codes", "HAZOP, margins, standards, regulations where relevant"],
      ["Format & scope", "Drawings, PFD, calculations format met"],
      ["Depth", "Assumption→calculation→implication, not formulas alone"],
    ],
    fail: [
      "「Optimal/efficient」 with no units, balance, or error",
      "Lab/sim numbers with no measurement or calibration",
      "Pilot results generalised with no scale-up or safety limits",
    ],
    safety: [
      "**No hazardous experiments or code bypass**",
      "Lab/field safety follows instructor and regulations",
    ],
  },
  physics: {
    name: "physics",
    axes: [
      ["Physical model", "Assumptions, approximations, validity range"],
      ["Equations & units", "Dimensional consistency, derivation, significant figures"],
      ["Experiment", "Setup, error, reproducibility, data interpretation"],
      ["Citation", "Texts and papers support claims and numbers"],
      ["Format & scope", "Report/proof length and format met"],
      ["Depth", "Physical meaning→prediction, not formula lists"],
    ],
    fail: [
      "Unit or dimensional inconsistency",
      "Model conclusions with unstated approximations",
      "Data with no error or systematic uncertainty",
    ],
    safety: ["**No unsafe radiation/high-voltage experiments**"],
  },
  chemistry: {
    name: "chemistry",
    axes: [
      ["Reaction & mechanism", "Equations, conditions, yield, selectivity"],
      ["Analysis & structure", "Spectra, structure evidence, quantitation where relevant"],
      ["Safety & ethics", "Reagents, waste, toxicity, lab safety where relevant"],
      ["Citation", "Literature and databases support claims"],
      ["Format & scope", "Lab report format met"],
      ["Depth", "Mechanism and limits, not equations alone"],
    ],
    fail: [
      "「Reacts」 with no conditions or yield",
      "Structure claims with no spectral evidence",
      "Synthesis with no safety or disposal",
    ],
    safety: ["**No hazardous synthesis, illegal substances, or safety bypass**"],
  },
  "life-sciences": {
    name: "life sciences",
    axes: [
      ["Biological mechanism", "Pathway, genetics, cell, ecology made concrete"],
      ["Experiment & data", "Design, controls, n, stats, reproducibility where relevant"],
      ["Limits", "Model organism, in vitro limits, generalisation scope"],
      ["Citation", "Papers and databases support claims"],
      ["Format & scope", "Lab/review/poster format met"],
      ["Depth", "Hypothesis→evidence→implication connected"],
    ],
    fail: [
      "「Significant」 with no stats or n",
      "In vitro generalised to in vivo uncritically",
      "Trait claims with no genetic or lineage evidence",
    ],
    safety: ["**No biosafety or gene-editing regulation bypass**"],
  },
  "mathematics-statistics": {
    name: "mathematics & statistics",
    axes: [
      ["Definitions & assumptions", "Clear definitions and proposition conditions"],
      ["Proof & derivation", "Logical steps, contradiction, counterexamples where relevant"],
      ["Statistics & models", "Sample, assumptions, tests, CI, identification where relevant"],
      ["Citation", "Theorems, papers, texts cited accurately"],
      ["Format & scope", "Proof/report notation format met"],
      ["Depth", "Logic, intuition, limits — not symbols alone"],
    ],
    fail: [
      "Missing proof steps or assumptions",
      "p-values only — no effect size or assumption checks",
      "Inconsistent notation or definitions",
    ],
    safety: ["**No full exam/assignment solutions** — hints and next steps only"],
  },
  law: {
    name: "law",
    axes: [
      ["Authority", "Statutes and cases tied to each claim"],
      ["Argument structure", "Facts, law, conclusion separated (IRAC etc.)"],
      ["Application", "Application to facts and issues argued"],
      ["Citation", "Consistent, accurate legal citation"],
      ["Format & scope", "Memo/essay/opinion format met"],
      ["Depth", "Issue→rule→conclusion, not case summaries alone"],
    ],
    fail: [
      "Legal conclusion with no statute or case",
      "Case summary only — no application to facts",
      "Missing procedure, remedy, or burden of proof",
    ],
    safety: [
      "**No real legal advice or litigation strategy** — coursework only",
      "Crime or crisis → appropriate authorities",
    ],
  },
  economics: {
    name: "economics",
    axes: [
      ["Model & assumptions", "Assumptions, equilibrium, comparative statics where relevant"],
      ["Identification & data", "Endogeneity, sample, units, robustness where relevant"],
      ["Welfare & implications", "Elasticity, externality, distribution where relevant"],
      ["Citation", "Papers and data support claims"],
      ["Format & scope", "Essay/empirical report format met"],
      ["Depth", "Assumption→conclusion→limits, not graphs alone"],
    ],
    fail: [
      "Model conclusions with unstated assumptions",
      "Causal claims with no IV/DiD or identification",
      "No sample, unit, or extrapolation limits",
    ],
    safety: ["**No investment, tax, or legal decisions** — concepts and coursework"],
  },
  "business-administration": {
    name: "business & accounting",
    axes: [
      ["Problem definition", "Stakeholders, constraints, objectives clear"],
      ["Analysis & evidence", "Financial, market, operations data and frameworks"],
      ["Alternatives & trade-offs", "Options, risks, feasibility"],
      ["Citation", "Cases, reports, accounting standards support claims"],
      ["Format & scope", "Case/financial/presentation format met"],
      ["Depth", "Analysis→recommendation→limits, not slogans"],
    ],
    fail: [
      "Financial or market numbers without sources",
      "Single recommendation with no alternatives or risks",
      "Accounting claims with no standards cited",
    ],
    safety: ["**No real investment, tax, or corporate decisions**"],
  },
  "social-sciences": {
    name: "social sciences",
    axes: [
      ["Theory & concepts", "Operationalisation and theoretical frame explicit"],
      ["Methods & data", "Sample, design, bias, ethics where relevant"],
      ["Interpretation & limits", "Correlation vs causation, generalisation, alternatives"],
      ["Citation", "Literature and data support claims"],
      ["Format & scope", "Paper/report/survey format met"],
      ["Depth", "Evidence→interpretation→limits connected"],
    ],
    fail: [
      "Policy or social claims with no sample or method",
      "Correlation stated as causation",
      "Unclear concept definitions or operationalisation",
    ],
    safety: [
      "**No collecting or exposing real PII**",
      "Research ethics and IRB per instructor guidance",
    ],
  },
  psychology: {
    name: "psychology",
    axes: [
      ["Theory & hypothesis", "Theory, hypothesis, predictions clear"],
      ["Methods & statistics", "Design, sample, measures, stats, effect size"],
      ["Ethics", "Consent, confidentiality, vulnerable groups where relevant"],
      ["Citation", "Papers and meta-analyses support claims"],
      ["Format & scope", "APA or assignment format met"],
      ["Depth", "Hypothesis→evidence→limits connected"],
    ],
    fail: [
      "「Significant」 with no n or effect size",
      "No validity or control variables discussed",
      "Clinical diagnosis or therapy without evidence",
    ],
    safety: [
      "**No therapy, diagnosis, or medication** — coursework only",
      "Self-harm or crisis → professional support",
    ],
  },
  education: {
    name: "education",
    axes: [
      ["Goals & standards", "Learning objectives, assessment, curriculum linked"],
      ["Evidence", "Educational theory, research, policy evidence"],
      ["Practice & reflection", "Lesson, observation, improvement, limits"],
      ["Citation", "Literature and policy support claims"],
      ["Format & scope", "Lesson plan/essay/portfolio format met"],
      ["Depth", "Evidence→design→assessment connected"],
    ],
    fail: [
      "Lesson plan with no objectives or assessment",
      "「Effective」 claims with no observation or evidence",
      "Identifiable student or child data exposed",
    ],
    safety: [
      "**No exposing student/child PII**",
      "Suspected abuse → reporting and professional channels",
    ],
  },
  philosophy: {
    name: "philosophy",
    axes: [
      ["Argument", "Premises, conclusion, validity, clarity"],
      ["Objection & reply", "Counterexamples and responses"],
      ["Text", "Accurate citation and author thesis"],
      ["Concepts", "Definitions, distinctions, thought experiments where relevant"],
      ["Format & scope", "Essay/argument format met"],
      ["Depth", "Thesis→defence, not citation stacks"],
    ],
    fail: [
      "Objection raised with no reply",
      "Citation stacking with no author thesis",
      "Circular argument or vague key concepts",
    ],
    safety: ["**No full exam/essay ghostwriting** — structure and objections only"],
  },
  linguistics: {
    name: "linguistics",
    axes: [
      ["Analytic unit", "Phonology, morpho-syntax, pragmatics unit explicit"],
      ["Data & examples", "Gloss, source, corpus where relevant"],
      ["Theory & consistency", "Framework matches analytic unit"],
      ["Citation", "Papers and corpora support claims"],
      ["Format & scope", "Notation and transcription format met"],
      ["Depth", "Pattern→explanation, not example lists"],
    ],
    fail: [
      "Examples with no gloss or source",
      "Framework mismatched to unit (word vs utterance)",
      "Generalisation with no stats or sample where needed",
    ],
    safety: ["**No full assignment analysis/transcription** — method and next steps"],
  },
  "cultural-arts": {
    name: "cultural arts",
    axes: [
      ["Primary sources", "Works, programmes, archives, exhibitions evidenced"],
      ["Context", "Period, institution, reception, policy"],
      ["Interpretation", "Claims tied to sources; alternative readings"],
      ["Citation", "Catalogues and papers consistent"],
      ["Format & scope", "Essay/curatorial/review format met"],
      ["Depth", "Interpretation→evidence, not plot summary"],
    ],
    fail: [
      "Interpretation with no primary source",
      "Work described with no period context",
      "Music/film/media analysis with no scene or source reference",
    ],
    safety: ["**No copyright infringement or illegal distribution**"],
  },
  design: {
    name: "design",
    axes: [
      ["Research", "Interviews, tests, personas evidenced where relevant"],
      ["Decisions & alternatives", "Rationale, trade-offs, accessibility"],
      ["Validation", "Prototype, metrics, limits"],
      ["Citation", "Cases, literature, captions support claims"],
      ["Format & scope", "Portfolio/presentation format met"],
      ["Depth", "Problem→evidence→validation connected"],
    ],
    fail: [
      "Persona or UX claims with no research evidence",
      "Single concept with no alternatives or trade-offs",
      "Accessibility or constraints omitted",
    ],
    safety: ["**No client PII in portfolios**"],
  },
  architecture: {
    name: "architecture",
    axes: [
      ["Space & programme", "Scale, circulation, programme logic"],
      ["Structure & materials", "Load path, materials, construction rationale"],
      ["Environment & code", "Daylight, energy, regulations, accessibility where relevant"],
      ["Citation", "Drawing captions and literature support claims"],
      ["Format & scope", "Drawings, pin-up, report format met"],
      ["Depth", "Design rationale→limits, not images alone"],
    ],
    fail: [
      "Design claims with no scale, material, or structure rationale",
      "No daylight, energy, or code analysis",
      "Drawings inconsistent with text",
    ],
    safety: ["**No site/construction safety or code bypass**"],
  },
  "home-economics": {
    name: "home economics",
    axes: [
      ["Household & consumer context", "Nutrition, food, household, welfare explicit"],
      ["Evidence & indicators", "Sample, indicators, data sources"],
      ["Policy & limits", "RCT/survey limits, generalisation scope"],
      ["Citation", "Data and literature support claims"],
      ["Format & scope", "Survey/experiment/policy report format met"],
      ["Depth", "Evidence→implication→limits connected"],
    ],
    fail: [
      "Nutrition or policy claims without sample or indicators",
      "RCT or survey read with no limits",
      "Missing HACCP or allergen context where relevant",
    ],
    safety: ["**No personalised medical nutrition prescriptions**"],
  },
  sports: {
    name: "sports science",
    axes: [
      ["Physiology & load", "Training load, adaptation, recovery evidence"],
      ["Measurement & stats", "n, effect size, validity where relevant"],
      ["Safety", "Injury, overtraining, contraindications where relevant"],
      ["Citation", "Literature and data support claims"],
      ["Format & scope", "Programme/research report format met"],
      ["Depth", "Evidence→application→limits connected"],
    ],
    fail: [
      "「Significant improvement」 with no n or effect size",
      "Training advice with no load or recovery rationale",
      "Numbers with no biomechanics or measurement conditions",
    ],
    safety: [
      "**No training or supplements ignoring injury or illness**",
      "Pain, cardiac, or breathing symptoms → medical/urgent care",
    ],
  },
};

export const GENERIC_RUBRIC = {
  ko: `\n## 기본 채점 기준 (루브릭 없을 때)\n\n1. **근거** — 주장마다 출처·사실 근거. 「일반적으로」만으로 끝나지 않음\n2. **설명 깊이** — 왜·어떻게·그래서가 연결됨; 정의 나열만이 아님\n3. **한계** — 반례·한계·불확실성·적용 범위 명시\n4. **인용** — 참고문헌이 해당 문장을 실제로 지지. 형식 일관\n5. **분량·형식** — 과제 지시(분량, 섹션, 표·그림) 충족\n6. **깊이** — 정의 나열이 아니라 **논증**이 이어짐\n\n각 축: **Pass / Partial / Fail** + 1~3문장 근거 (섹션·문단 인용)\n`,
  "en-GB": `\n## Default rubric (when none supplied)\n\n1. **Evidence** — each claim sourced; not 「generally」 alone\n2. **Depth** — why–how–so connected; not definition lists\n3. **Limits** — counterexamples, uncertainty, scope stated\n4. **Citation** — references actually support each sentence\n5. **Format & scope** — length, sections, figures per brief\n6. **Argument** — the piece argues, not just lists terms\n\nEach axis: **Pass / Partial / Fail** + 1–3 sentence rationale (cite section/paragraph)\n`,
  "zh-TW": `\n## 預設評量規準（未提供規準時）\n\n1. **證據** — 每項主張有來源或事實支持；不能只有「一般來說」\n2. **解釋深度** — why、how、therefore 有連結；不是堆疊定義\n3. **限制** — 反例、不確定性與適用範圍有明確說明\n4. **引用契合** — 參考文獻確實支持所附的句子\n5. **格式** — 字數、必要章節與版面符合作業要求\n6. **論證** — 作品在論述，而非只列名詞\n\n每項：**通過 / 部分通過 / 未通過** + 1–3 句理由（指出章節或段落）\n`,
  ja: `\n## デフォルトルーブリック（ルーブリックなし時）\n\n1. **根拠** — 各主張に出典・事実。「一般的に」だけで終わらない\n2. **説明の深さ** — なぜ・どう・だからがつながる\n3. **限界** — 反例・不確実性・適用範囲\n4. **引用適合** — 文献が該当文を実際に支持\n5. **形式** — 分量・必須セクション・レイアウト\n6. **深さ** — 定義羅列でなく **論証**\n\n各軸: **Pass / Partial / Fail** + 1–3 文（段落引用）\n`,
  fr: `\n## Rubrique par défaut (sans rubrique fournie)\n\n1. **Preuves** — chaque affirmation sourcée ; pas seulement « en général »\n2. **Profondeur** — pourquoi–comment–donc reliés\n3. **Limites** — contre-exemples, incertitude, portée\n4. **Citation** — les références soutiennent réellement chaque phrase\n5. **Format** — longueur, sections, mise en page selon le brief\n6. **Argument** — le texte argumente, pas seulement des listes\n\nChaque axe : **Pass / Partial / Fail** + 1–3 phrases (citer section/paragraphe)\n`,
  es: `\n## Rúbrica predeterminada (sin rúbrica del usuario)\n\n1. **Evidencia** — cada afirmación con fuente ; no solo «en general»\n2. **Profundidad** — por qué–cómo–por tanto conectados\n3. **Límites** — contraejemplos, incertidumbre, alcance\n4. **Cita** — las referencias apoyan realmente cada frase\n5. **Formato** — extensión, secciones, diseño según el encargo\n6. **Argumento** — el texto argumenta, no solo listas\n\nCada eje: **Pass / Partial / Fail** + 1–3 frases (citar sección/párrafo)\n`,
};

export function genericRubricFor(locale) {
  return GENERIC_RUBRIC[locale] || GENERIC_RUBRIC["en-GB"];
}

const LOCALE_UI = {
  ko: {
    rubricHeading: (name) => `## ${name} 기본 루브릭 (사용자 루브릭 없을 때)`,
    tail: "\n\n각 축: **Pass / Partial / Fail** + 1~3문장 근거 (섹션·문단 인용)\n",
    failHeading: (name) => `\n### ${name} Fail 신호\n\n`,
    safetyHeading: (name) => `\n### ${name} 안전 (학습 동반자)\n\n`,
  },
  "en-GB": {
    rubricHeading: (name) => `## ${name} default rubric (when none supplied)`,
    tail: "\n\nEach axis: **Pass / Partial / Fail** + 1–3 sentence rationale (cite section/paragraph)\n",
    failHeading: (name) => `\n### ${name} fail signals\n\n`,
    safetyHeading: (name) => `\n### ${name} safety (study companion)\n\n`,
  },
  "zh-TW": {
    rubricHeading: (name) => `## ${name} 預設評量規準（未提供規準時）`,
    tail: "\n\n每項：**通過 / 部分通過 / 未通過** + 1–3 句理由（指出章節或段落）\n",
    failHeading: (name) => `\n### ${name} 未通過信號\n\n`,
    safetyHeading: (name) => `\n### ${name} 安全（學習夥伴）\n\n`,
  },
  ja: {
    rubricHeading: (name) => `## ${name} デフォルトルーブリック（ルーブリックなし時）`,
    tail: "\n\n各軸: **Pass / Partial / Fail** + 1–3 文（段落引用）\n",
    failHeading: (name) => `\n### ${name} Fail 信号\n\n`,
    safetyHeading: (name) => `\n### ${name} 安全（学習コンパニオン）\n\n`,
  },
  fr: {
    rubricHeading: (name) => `## Rubrique ${name} (sans rubrique fournie)`,
    tail: "\n\nChaque axe : **Pass / Partial / Fail** + 1–3 phrases (citer section/paragraphe)\n",
    failHeading: (name) => `\n### Signaux d'échec — ${name}\n\n`,
    safetyHeading: (name) => `\n### Sécurité — ${name} (compagnon d'étude)\n\n`,
  },
  es: {
    rubricHeading: (name) => `## Rúbrica de ${name} (sin rúbrica del usuario)`,
    tail: "\n\nCada eje: **Pass / Partial / Fail** + 1–3 frases (citar sección/párrafo)\n",
    failHeading: (name) => `\n### Señales de fallo — ${name}\n\n`,
    safetyHeading: (name) => `\n### Seguridad — ${name} (compañero de estudio)\n\n`,
  },
};

const TABLES = { ko: KO, "en-GB": EN };

export { KO, EN };

function buildBlock(locale, trackId, table) {
  const row = table[trackId];
  if (!row) return null;
  const ui = LOCALE_UI[locale] || LOCALE_UI["en-GB"];
  const axesBlock = row.axes
    .map((a, i) => `${i + 1}. **${a[0]}** — ${a[1]}`)
    .join("\n");
  const failBlock = ui.failHeading(row.name) + row.fail.map((b) => `- ${b}`).join("\n") + "\n";
  const safetyBlock =
    ui.safetyHeading(row.name) + row.safety.map((b) => `- ${b}`).join("\n") + "\n";
  return {
    "academic-rubric": `\n${ui.rubricHeading(row.name)}\n\n${axesBlock}${ui.tail}`,
    "academic-fail": failBlock,
    "study-safety": safetyBlock,
  };
}

import { ZH, JA, FR, ES } from "./discipline-rubrics-i18n.mjs";

const I18N_TABLES = {
  "zh-TW": ZH,
  ja: JA,
  fr: FR,
  es: ES,
};

export function rubricFor(trackId, locale) {
  let table = TABLES[locale];
  if (!table && I18N_TABLES[locale]) {
    table = I18N_TABLES[locale];
  }
  if (!table) table = EN;
  return buildBlock(locale, trackId, table);
}
