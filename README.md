# AprilThumb

Learning and assignment prompt hub for ChatGPT and Gemini. **24 tracks × 6 locales** (23 disciplines + general), **6 prompt roles** — copy once, paste into a new chat.

**Production:** https://aprilthumb.vercel.app

## Name · brand

Rebrand from **AI Prompt Hub** (0.5.0, 2026-05-30). Portmanteau: **A** (AI) + **pril** (Prompt) + **Thumb** (t Hub) → **AprilThumb**.

## Docs (SSOT)

| Doc | Role |
|-----|------|
| [docs/버전.md](docs/버전.md) | Current features, goals, issues — **canonical source** |
| [docs/방법론.md](docs/방법론.md) | Problem definition, chosen approach, deferred alternatives |
| [docs/출처.md](docs/출처.md) | Evidence, references, verification dates |
| [docs/업그레이드.md](docs/업그레이드.md) | Approved legacy → replacement changes |

## Local

```bash
npm run build
npm run dev
```

`npm run build` runs `generate-all-content` then `build-content`.

Production deploy:

```bash
npm run build
npx vercel --prod
```

## Feedback API

- `GET/POST /api/comments` stores public feedback in Neon Postgres.
- Accepted posts from the same public IP are limited to 2 per UTC day.
- Raw IP addresses are not stored. The quota uses a daily HMAC-SHA256 identity in `feedback_rate_limits`.
- Production requires `DATABASE_URL`, `RATE_LIMIT_SECRET`, `sql/001_comments.sql`, and `sql/002_daily_rate_limits.sql`. Missing quota configuration fails closed.

## Layout

- `scripts/lib/` — generation SSOT (`fullGuideFor`, `fullPromptFor`, `ko-prompts`, `locale-packs`, overlays)
- `content/tracks/{track}/{locale}/` — generated `guide.md` and `prompts/*.md` (24×6; rewritten on build)
- `content/manifest.json` — track list, locales, prompt roles
- `content/i18n/` — UI strings
- `scripts/` — `generate-all-content.mjs`, `build-content.mjs`, verify, Instagram export
- `public/` — static site; `public/data/bundles/` — 144 JSON bundles (build output)
- `api/`, `lib/`, `sql/` — feedback API, Neon access, and database migrations
- `docs/` — methodology, sources, version, upgrades
- `.cursor/rules/aprilthumb.mdc` — repository workflow and documentation rules

Track list and counts: see [docs/버전.md](docs/버전.md) (SSOT).
