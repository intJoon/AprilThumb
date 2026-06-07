# AprilThumb

ChatGPT·Gemini용 학습·과제 프롬프트 허브. **24개 전공 × 6개 언어**, 복사 한 번으로 새 대화에 붙여넣기.

**프로덕션:** https://aprilstumb.vercel.app

## 이름 · 브랜드

**AprilThumb**은 초기 서비스명 **AI Prompt Hub**(에이아이프롬프트허브)를 한 단어로 이어 붙인 이름입니다 (리브랜딩 0.5.0, 2026-05-30).

| 원래 | 끊어 읽기 | **AprilThumb** 조각 |
|------|-----------|---------------------|
| **AI** | 에이 | **A** |
| **Prompt** | 프럴 | **pril** |
| **t Hub** | 썸 | **Thumb** |

**A** + **pril** + **Thumb** → **AprilThumb**. 뜻은 그대로 「AI 프롬프트 허브」입니다.

**English:** *AprilThumb* (formerly **AI Prompt Hub**) — *AI* + *Prompt* + *t Hub* blended into one word; same product idea.

## 문서 (SSOT)

| 문서 | 역할 |
|------|------|
| [docs/버전.md](docs/버전.md) | 현재 기능·목표·이슈 — **최종 기준** |
| [docs/방법론.md](docs/방법론.md) | 문제 정의·선택한 방법·보류 대안 |
| [docs/출처.md](docs/출처.md) | 근거·참고·확인 날짜 |

## 로컬

```bash
npm run build
npm run dev
```

`npm run build` = 콘텐츠 생성(`generate-all-content`) + 번들 빌드(`build-content`).

프로덕션 배포 (SSOT 경로):

```bash
npm run build
npx vercel --prod
```

## 구조

- `content/tracks/{전공}/{locale}/` — 프롬프트·가이드 (`guide.md`는 `fullGuideFor()`로 24×6 생성)
- `content/tracks/{general|pharmacy}/ko/prompts/` — KO 프롬프트 디스크 SSOT · non-KO는 `locale-packs`에서 주입
- `archive/icloud-source/` — iCloud 약학 KO MD·템플릿 원본 (읽기 전용 보관)
- `content/i18n/` — UI 문자열
- `scripts/` — 생성·빌드·전공 overlay·locale 팩
- `public/` — 정적 사이트 + `data/bundles/` 빌드 산출물 (144)
- `docs/` — 방법론·출처·버전 (SSOT 문서)
