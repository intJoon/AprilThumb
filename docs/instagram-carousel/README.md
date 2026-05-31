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
    ├── ko/              # 업로드용 6장
    ├── en/
    ├── zh-TW/
    └── aprilstumb-carousel-01~06.png  # ko 복사본
```

## 게시 방식

| 구분 | 권장 |
|------|------|
| **슬라이드** | 게시 1회 = 언어 1종 (`export/ko` · `en` · `zh-TW`) |
| **캡션** | `caption.txt`에서 해당 언어 블록만 |
| **5번** | 24 전공 + 6 언어 전체 pill 그리드 |

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

## 슬라이드 역할 (중복 최소화)

| # | 역할 | 핵심 정보 |
|---|------|-----------|
| 1 | 훅 | ChatGPT·Gemini · 한 줄 가치 |
| 2 | 문제 | 3가지 pain point |
| 3 | 솔루션 | 한 URL · perks 3종 (숫자 없음) |
| 4 | Roles | 목적별 프롬프트 6종 |
| 5 | Scope | 24전공 + 6언어 그리드 (숫자 SSOT) |
| 6 | CTA | QR · URL · 저장 유도 |

**24×6×6** 같은 스펙 숫자는 **5번 그리드 + `caption.txt`** 에만 둡니다. 3번·워터마크 등 다른 슬라이드에 반복하지 않습니다.

## 스타일

- **타이포**: ko/zh — IBM Plex Sans + Mono · en — Syne + DM Sans
- **디자인**: deck-card 공통 · **과감(1·5)** · **정돈(2·3·4·6)**

## 문구 수정

`slide-content.mjs` 편집 후 `npm run instagram:export` 다시 실행.
