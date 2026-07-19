# Instagram carousel

## Structure

```
docs/instagram-carousel/
├── slide-content.mjs    # Copy for ko, en, and zh-TW
├── caption.txt          # Per-locale caption blocks
├── qr.png               # CTA QR, regenerated during export
├── slides.html          # Korean preview, updated during export
├── slides-{ko,en,zh-TW}.html
└── export/
    ├── ko/              # Six upload-ready slides
    ├── en/
    ├── zh-TW/
    └── aprilthumb-carousel-01~06.png  # Korean copies
```

## Publishing

| Item | Recommendation |
|---|---|
| **Slides** | Publish one locale per post from `export/ko`, `en`, or `zh-TW` |
| **Caption** | Use only the matching locale block from `caption.txt` |
| **Slide 5** | Show the complete 24-discipline and 6-locale pill grid |

## Export

```bash
npm run instagram:export
```

Export one locale:

```bash
npm run instagram:export:ko
npm run instagram:export:en
npm run instagram:export:zh
```

## Slide roles

| # | Role | Key information |
|---|---|---|
| 1 | Hook | ChatGPT and Gemini with a one-line value proposition |
| 2 | Problem | Three pain points |
| 3 | Solution | One URL and three benefits, without scope numbers |
| 4 | Roles | Six purpose-specific prompt roles |
| 5 | Scope | 24 disciplines and 6 locales; numeric SSOT |
| 6 | CTA | QR code, URL, and save prompt |

Keep scope figures such as **24×6×6** only in the **slide 5 grid and `caption.txt`**. Do not repeat them on slide 3, watermarks, or other slides.

## Style

- **Typography:** ko/zh — IBM Plex Sans + Mono; en — Syne + DM Sans
- **Design:** shared deck-card system; bold on slides 1 and 5, restrained on slides 2, 3, 4, and 6

## Editing copy

Edit `slide-content.mjs`, then rerun `npm run instagram:export`.
