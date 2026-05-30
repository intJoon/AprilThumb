# AprilThumb

ChatGPT·Gemini용 학습·과제 프롬프트 허브. 16개 전공 × 6개 언어, 복사 한 번으로 새 대화에 붙여넣기.

**프로덕션:** https://aprilstumb.vercel.app

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
cd C:\Users\user\Desktop\AprilThumb
npm run build
npx vercel --prod
```

## 구조

- `content/tracks/{전공}/{locale}/` — 프롬프트·가이드 원본 (pharmacy/ko는 디스크 SSOT)
- `archive/icloud-source/` — iCloud 약학 KO MD·템플릿 원본 (읽기 전용 보관)
- `content/i18n/` — UI 문자열
- `scripts/` — 생성·빌드·전공 overlay·locale 팩
- `public/` — 정적 사이트 + `data/bundles/` 빌드 산출물
- `docs/` — 방법론·출처·버전 (SSOT 문서)
