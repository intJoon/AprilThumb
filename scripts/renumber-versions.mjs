import fs from "fs";

const path = "docs/버전.md";
const raw = fs.readFileSync(path, "utf8");
const re = /^## ([\d.]+(?:\.\d+)?) — /gm;
const matches = [...raw.matchAll(re)];
const entries = [];
for (let i = 0; i < matches.length; i++) {
  const start = matches[i].index;
  const end = i + 1 < matches.length ? matches[i + 1].index : raw.length;
  entries.push({
    oldHeader: matches[i][1],
    body: raw.slice(start, end),
  });
}

const chronological = entries.slice().reverse();

function assignSemver(chronoIndex) {
  if (chronoIndex === 0) return "0.0.1";
  if (chronoIndex <= 5) return `0.${chronoIndex}.0`;
  if (chronoIndex === 6) return "1.0.0";
  if (chronoIndex <= 11) return `1.0.${chronoIndex - 6}`;
  if (chronoIndex === 12) return "1.1.0";
  if (chronoIndex <= 27) return `1.1.${chronoIndex - 12}`;
  if (chronoIndex === 28) return "1.2.0";
  if (chronoIndex <= 40) return `1.2.${chronoIndex - 28}`;
  if (chronoIndex === 41) return "1.3.0";
  if (chronoIndex <= 43) return `1.3.${chronoIndex - 41}`;
  if (chronoIndex === 44) return "1.4.0";
  if (chronoIndex === 45) return "1.5.0";
  if (chronoIndex <= 64) return `1.5.${chronoIndex - 45}`;
  if (chronoIndex === 65) return "1.6.0";
  if (chronoIndex <= 74) return `1.6.${chronoIndex - 65}`;
  throw new Error(`chrono index ${chronoIndex} exceeds planned semver slots`);
}

chronological.forEach((e, i) => {
  e.newVer = assignSemver(i);
});

const oldToNew = new Map();
for (const e of chronological) {
  if (!oldToNew.has(e.oldHeader)) oldToNew.set(e.oldHeader, e.newVer);
}
const keys = [...oldToNew.keys()].sort((a, b) => b.length - a.length);

function replaceAllOldVersions(body) {
  const tokens = new Map();
  let out = body;
  keys.forEach((old, i) => {
    const token = `\uE000${i}\uE001`;
    tokens.set(token, oldToNew.get(old));
    const esc = old.replace(/\./g, "\\.");
    out = out.replace(new RegExp(`(?<![\\d.])${esc}(?![\\d.])`, "g"), token);
  });
  for (const [token, neu] of tokens) out = out.split(token).join(neu);
  return out;
}

const milestoneRows = [
  ["0.0.1~0.5.0", "기획·정적 UI·AI Prompt Hub·locale·AprilThumb 리브랜드"],
  ["1.0.0", "GitHub SSOT + 16×6 번들 공식 릴리스 (첫 안정 허브)"],
  ["1.0.1~1.0.5", "인프라·배포·초기 locale/UI 보강 (patch)"],
  ["1.1.0", "전 조합 콘텐츠 품질 평준화 (pharmacy/ko 기준)"],
  ["1.1.1~1.1.15", "헤더 UX·전공 예시·인스타 캐러셀 준비 (patch)"],
  ["1.2.0", "24전공 확장 + 144 번들"],
  ["1.2.1~1.2.12", "24전공 루브릭·가이드·overlay (patch)"],
  ["1.3.0", "24×6 가이드 구조 통일"],
  ["1.3.1~1.3.2", "문서 정리·프롬프트 생성 SSOT (patch)"],
  ["1.4.0", "Instagram 캐러셀 6장·export 파이프라인"],
  ["1.5.0", "피드백 API(Neon) + 패널"],
  ["1.5.1~1.5.19", "피드백·선택 UI·인터랙션 폴리시 (patch)"],
  ["1.6.0", "기기 locale·OG/PWA/404·다국어 chrome"],
  ["1.6.1~1.6.9", "404·iOS 탭·피드백 스크롤 등 (patch)"],
  ["1.7.0", "SemVer 마일스톤 재번호·브랜드 문서"],
]
  .map(([v, d]) => `| ${v} | ${d} |`)
  .join("\n");

const remapRows = chronological
  .map((e) => `| ${e.oldHeader} | ${e.newVer} |`)
  .join("\n");

const header = `# 버전 (SSOT)

최신 항목이 최상단. 하위 이력은 삭제·병합하지 않음.

## 번호 체계 (2026-06-04 SemVer)

### 1.0.0 검토

**1.0.0 = GitHub SSOT + 16×6 + AprilThumb 공식 릴리스**로 둠.

- **0.5.0**은 리브랜드·Vercel 정리 단계(제품 미완)
- **1.0.0**은 96 번들·6프롬프트·복사 UI·문서 SSOT가 갖춰진 **첫 안정 공개 허브**
- 24×6·API·SEO는 **1.2~1.6 minor**로 분리 (1.0.0을 뒤로 미루지 않음)

### 마일스톤 요약

| 버전 | 의미 |
|------|------|
${milestoneRows}

### 패치 순차(구 헤더) → SemVer 매핑

| 구 헤더 (재번호 직전) | 신 SemVer |
|----------------------|-----------|
${remapRows}

---

## 1.7.0 — 2026-06-04

**현재 기능**

- 1.6.9 + 버전 SSOT **마일스톤 SemVer** 재번호 (1.0.0 검토 반영)

**해결된 문제**

- \`1.0.61.5\`·\`1.0.60.1\` 등 비표준·패치 카운터만 증가하던 번호 체계

---

`;

const newBodies = entries.map((e) => {
  const match = chronological.find((c) => c.body === e.body);
  let body = replaceAllOldVersions(e.body);
  body = body.replace(/^## [\d.]+(?:\.\d+)? — /, `## ${match.newVer} — `);
  return body;
});

const out = header + newBodies.join("");
fs.writeFileSync(path, out);

const hs = [...out.matchAll(/^## ([\d.]+(?:\.\d+)?) — /gm)].map((m) => m[1]);
const unique = new Set(hs);
if (unique.size !== hs.length) {
  const dupes = hs.filter((h, i) => hs.indexOf(h) !== i);
  throw new Error(`duplicate headers: ${[...new Set(dupes)].join(", ")}`);
}

console.log(
  `done: ${chronological.length} entries + 1.7.0 meta, latest feature ${chronological[chronological.length - 1].newVer} (was ${chronological[chronological.length - 1].oldHeader})`
);
