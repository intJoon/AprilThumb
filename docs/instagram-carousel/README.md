# Instagram 캐러셀

## 구조

```
docs/instagram-carousel/
├── slide-content.mjs    # 문구 (ko / en / zh-TW)
├── caption.txt          # 게시 캡션 (언어별 블록)
├── qr.png               # CTA QR (export 시 재생성)
├── slides.html          # ko 미리보기 (export 시 갱신)
├── slides-{ko,en,zh-TW}.html
└── export/
    ├── ko/              # 업로드용 7장
    ├── en/
    ├── zh-TW/
    └── aprilstumb-carousel-01~07.png  # ko 복사본
```

## 게시 방식

| 구분 | 권장 |
|------|------|
| **슬라이드** | 게시 1회 = 언어 1종 (`export/ko` · `en` · `zh-TW`) |
| **캡션** | `caption.txt`에서 해당 언어 블록만 |
| **6번** | 24 전공 + 6 언어 전체 pill 그리드 |

## Export

```bash
npm run instagram:export
```

한 언어만:

```bash
npm run instagram:export:ko
npm run instagram:export:en
npm run instagram:export:zh
```

## 스타일

- **타이포**: ko/zh — IBM Plex Sans + Mono · en — Syne + DM Sans
- **디자인 시스템**: 다크 deck + 라임 포인트 · **가독성**: `--fg-soft`/`--muted` 상향, 패널·스티커 배경 채움, 6번 긴 과목명 줄바꿈
- **비율**: 1080×1350 (4:5)
- **6번**: 메가 `24×6` · 스캐터 스티커(±15°·라임 ~67%) · `전부 표시` 배지 · 언어 pill 대형

## 문구 수정

`slide-content.mjs` 편집 후 `npm run instagram:export` 다시 실행.
