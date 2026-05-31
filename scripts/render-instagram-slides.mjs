import { SLIDES_BY_LOCALE, LOCALES, SITE_URL, SLIDE_COUNT } from "../docs/instagram-carousel/slide-content.mjs";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function raw(html) {
  return html;
}

const FONT_BY_LOCALE = {
  ko: {
    links: `
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet" />`,
    display: '"IBM Plex Sans KR", sans-serif',
    body: '"IBM Plex Sans KR", sans-serif',
    mono: '"IBM Plex Mono", "IBM Plex Sans KR", sans-serif',
    headWeight: "700",
    headTracking: "-0.04em",
    headLineHeight: "1.14",
  },
  en: {
    links: `
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,500;0,9..40,600;0,9..40,700&family=IBM+Plex+Mono:wght@500;600&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />`,
    display: '"Syne", sans-serif',
    body: '"DM Sans", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    headWeight: "800",
    headTracking: "-0.04em",
    headLineHeight: "1.02",
  },
  "zh-TW": {
    links: `
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans+TC:wght@400;500;600;700&display=swap" rel="stylesheet" />`,
    display: '"IBM Plex Sans TC", sans-serif',
    body: '"IBM Plex Sans TC", sans-serif',
    mono: '"IBM Plex Mono", "IBM Plex Sans TC", sans-serif',
    headWeight: "700",
    headTracking: "-0.035em",
    headLineHeight: "1.14",
  },
};

export function renderSlidesHtml(localeId) {
  const meta = LOCALES.find((l) => l.id === localeId);
  const d = SLIDES_BY_LOCALE[localeId];
  if (!meta || !d) throw new Error(`Unknown locale: ${localeId}`);

  const font = FONT_BY_LOCALE[localeId] ?? FONT_BY_LOCALE.en;
  const { display, body, mono, links, headWeight, headTracking, headLineHeight } = font;

  const roleRows = d.s4.roles
    .map(
      (r, i) => `
        <li class="panel deck-card panel--role${i % 3 === 0 ? " panel--acid deck-card--acid" : ""}">
          <span class="panel-body">
            <strong>${esc(r.t)}</strong>
            <em>${esc(r.d)}</em>
          </span>
        </li>`
    )
    .join("");

  const deckBurst = `<div class="deck-burst" aria-hidden="true"></div>`;

  const majorChips = d.s5.majors
    .map(
      (m, i) =>
        `<span class="major-chip deck-card${(Math.floor(i / 4) + (i % 4)) % 2 === 0 ? " major-chip--acid deck-card--acid" : ""}">${esc(m)}</span>`
    )
    .join("");
  const scopeMajors = `
        <p class="section-label section-label--majors">${esc(d.s5.majorsLabel)}</p>
        <div class="major-grid">${majorChips}</div>`;
  const scopeLangs = d.s5.languages
    .map((l, i) => {
      const acid = i % 2 === 0;
      return `<span class="lang-pill deck-card${acid ? " lang-pill--acid deck-card--acid" : ""}">${esc(l)}</span>`;
    })
    .join("");

  const slide = (n, inner, mod = "") =>
    `<section class="slide slide--deck ${mod}" data-n="${n}">
      <header class="slide-top">
        <span class="brand">AprilThumb</span>
        <span class="idx">${String(n).padStart(2, "0")}<span class="idx-total"> / ${String(SLIDE_COUNT).padStart(2, "0")}</span></span>
      </header>
      ${inner}
    </section>`;

  return `<!DOCTYPE html>
<html lang="${esc(meta.htmlLang)}" class="locale-${esc(localeId)}">
  <head>
    <meta charset="UTF-8" />
    <title>AprilThumb v2 — ${esc(meta.label)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    ${links}
    <style>
      :root {
        --w: 1080px;
        --h: 1350px;
        --bg: #0a0908;
        --fg: #f5f2eb;
        --fg-soft: rgba(245, 242, 235, 0.88);
        --muted: rgba(245, 242, 235, 0.78);
        --muted-soft: rgba(245, 242, 235, 0.62);
        --accent: #0f766e;
        --accent-hi: #2dd4bf;
        --acid: #d4ff4c;
        --surface: #181614;
        --line: rgba(245, 242, 235, 0.14);
        --border: rgba(245, 242, 235, 0.92);
        --border-w: 3px;
        --shadow: 5px 5px 0 rgba(0, 0, 0, 0.45);
        --grid-size: 54px;
        --safe-x: 80px;
        --safe-top: 88px;
        --safe-bottom: 96px;
      }
      .deck-card {
        border: var(--border-w) solid var(--border);
        background: var(--surface);
        box-shadow: var(--shadow);
      }
      .section-label {
        position: relative;
        z-index: 2;
        font-family: ${mono};
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--acid);
        margin-bottom: 10px;
      }
      .deck-burst {
        position: absolute;
        right: -160px;
        top: 96px;
        width: 480px;
        height: 480px;
        background: var(--acid);
        opacity: 0.08;
        transform: rotate(24deg);
        z-index: 0;
        pointer-events: none;
      }
      .slide--cover .deck-burst { opacity: 0.11; top: 72px; }
      .slide--cover .head { font-size: 108px; }
      .slide--cover .head--duo .line.accent {
        text-shadow: 8px 8px 0 rgba(0, 0, 0, 0.45);
      }
      .slide--cover .swipe-hint::after { width: 96px; height: 4px; }
      .slide--spotlight .perk-cell {
        padding: 36px 14px;
        text-align: center;
        font-size: 38px;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.2;
        color: var(--fg);
      }
      .slide--spotlight .perk-cell:nth-child(2) {
        box-shadow: 8px 8px 0 rgba(212, 255, 76, 0.38);
        transform: scale(1.05);
        color: var(--bg);
      }
      .perk-strip {
        position: relative;
        z-index: 2;
        margin-top: auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .slide--scope .head {
        font-size: 72px;
        line-height: 1.04;
        text-shadow: 6px 6px 0 rgba(0, 0, 0, 0.35);
      }
      .slide--scope .major-chip {
        box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.5);
      }
      .slide--scope .major-chip--acid {
        box-shadow: 6px 6px 0 rgba(212, 255, 76, 0.38);
      }
      .slide--cta .head { font-size: 80px; }
      .slide--cta .qr-card {
        width: 320px;
        border-width: 4px;
        box-shadow: 8px 8px 0 rgba(212, 255, 76, 0.28);
      }
      .slide--cta .qr-card img { width: 240px; height: 240px; }
      .slide--cta .url {
        font-size: 42px;
        text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4);
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        margin: 0;
        padding: 24px;
        background: #1a1917;
        font-family: ${body};
        color: var(--fg);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
      .toolbar {
        max-width: var(--w);
        margin: 0 auto 20px;
        padding: 14px 18px;
        background: #242220;
        color: #c9c4bc;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.5;
      }
      .toolbar strong { color: var(--accent-hi); }
      .slides { display: flex; flex-direction: column; align-items: center; gap: 24px; }
      .slide--deck {
        width: var(--w);
        height: var(--h);
        position: relative;
        overflow: hidden;
        padding: var(--safe-top) var(--safe-x) var(--safe-bottom);
        display: flex;
        flex-direction: column;
        background: var(--bg);
        color: var(--fg);
      }
      .slide--deck::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(245, 242, 235, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245, 242, 235, 0.05) 1px, transparent 1px);
        background-size: var(--grid-size) var(--grid-size);
        pointer-events: none;
      }
      .slide--deck::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--acid);
        z-index: 3;
        pointer-events: none;
      }
      .slide-top {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        flex-shrink: 0;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--line);
      }
      .brand {
        font-family: ${mono};
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--muted-soft);
      }
      .idx {
        font-family: ${mono};
        font-size: 24px;
        font-weight: 600;
        color: var(--muted);
      }
      .idx-total { color: var(--muted-soft); font-weight: 500; }
      .tag {
        position: relative;
        z-index: 2;
        display: inline-block;
        font-family: ${mono};
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--accent-hi);
        margin-bottom: 16px;
      }
      .sub,
      .bullets li,
      .panel-body strong,
      .panel-body em,
      .flow-step span:last-child,
      .cta-text p,
      .perk-cell,
      .lang-pill,
      .major-chip {
        font-family: ${body};
      }
      .head {
        position: relative;
        z-index: 2;
        font-family: ${display};
        font-weight: ${headWeight};
        letter-spacing: ${headTracking};
        line-height: ${headLineHeight};
        font-synthesis: none;
        color: var(--fg);
      }
      .head--duo { margin-bottom: 8px; }
      .head--duo .line { display: block; }
      .head--duo .line.accent { color: var(--acid); }
      .slide--cover .head { font-size: 100px; }
      .slide--deck:not(.slide--cover):not(.slide--scope) .head { font-size: 72px; }
      .sub {
        position: relative;
        z-index: 2;
        margin-top: 28px;
        font-size: 38px;
        font-weight: 600;
        line-height: 1.42;
        color: var(--fg-soft);
        max-width: 840px;
      }
      .swipe-hint {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 16px;
        font-family: ${mono};
        font-size: 26px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
      }
      .swipe-hint::after {
        content: "";
        width: 72px;
        height: 2px;
        background: var(--acid);
      }
      .bullets {
        list-style: none;
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 22px;
        position: relative;
        z-index: 2;
      }
      .bullets li,
      .flow-step,
      .perk-cell,
      .panel,
      .major-chip,
      .lang-pill {
        border: var(--border-w) solid var(--border);
        background: var(--surface);
        box-shadow: var(--shadow);
      }
      .deck-card--acid,
      .bullets li:nth-child(3),
      .flow-step:nth-child(3),
      .panel--acid,
      .major-chip--acid,
      .lang-pill--acid,
      .slide--spotlight .perk-cell:nth-child(2) {
        background: var(--acid);
        border-color: var(--fg);
        color: var(--bg);
      }
      .bullets li {
        font-size: 38px;
        font-weight: 700;
        line-height: 1.36;
        padding: 24px 30px;
        color: var(--fg);
      }
      .bullets li:nth-child(3) {
        color: var(--bg);
      }
      .flow {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .flow {
        position: relative;
        z-index: 2;
      }
      .flow-step {
        display: flex;
        align-items: center;
        gap: 22px;
        padding: 28px 32px;
        color: var(--fg);
      }
      .flow-step:nth-child(3) .arrow-n { background: var(--bg); color: var(--acid); }
      .flow-step:nth-child(3) span:last-child { color: var(--bg); }
      .flow-step .arrow-n {
        font-family: ${mono};
        font-size: 26px;
        font-weight: 600;
        color: var(--bg);
        flex-shrink: 0;
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--acid);
        border: 2px solid var(--acid);
        font-variant-numeric: tabular-nums;
      }
      .flow-step span:last-child {
        font-size: 44px;
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1.28;
      }
      .flow-step:not(:last-child)::after {
        content: "↓";
        position: absolute;
        left: 50%;
        display: none;
      }
      .roles {
        position: relative;
        z-index: 2;
        list-style: none;
        margin-top: 12px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
      .panel {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        padding: 20px 22px;
      }
      .panel--acid {
        border-color: var(--fg);
      }
      .panel--acid .panel-num { color: var(--bg); }
      .panel--acid .panel-body strong,
      .panel--acid .panel-body em { color: var(--bg); }
      .panel-num {
        font-family: ${mono};
        font-size: 24px;
        font-weight: 700;
        color: var(--acid);
        width: 40px;
        flex-shrink: 0;
        font-variant-numeric: tabular-nums;
      }
      .panel-body {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }
      .panel-body strong {
        font-size: 28px;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.2;
        color: var(--fg);
      }
      .panel-body em {
        font-style: normal;
        font-size: 22px;
        color: var(--fg-soft);
        font-weight: 600;
        line-height: 1.28;
      }
      .panel--acid .panel-body em { color: rgba(10, 9, 8, 0.72); }
      .slide--roles .head {
        margin-bottom: 8px;
      }
      .slide--roles .roles {
        flex: 1;
        margin-top: 28px;
        min-height: 0;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(3, minmax(0, 1fr));
        gap: 14px;
      }
      .slide--roles .panel {
        padding: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        min-height: 0;
      }
      .slide--roles .panel--acid .panel-body strong,
      .slide--roles .panel--acid .panel-body em {
        color: var(--bg);
      }
      .slide--roles .panel:not(.panel--acid) .panel-body em {
        color: var(--fg);
        opacity: 0.92;
      }
      .slide--roles .panel-body {
        flex: 1;
        justify-content: center;
        gap: 10px;
      }
      .slide--roles .panel-body strong {
        font-size: 44px;
        line-height: 1.14;
      }
      .slide--roles .panel-body em {
        font-size: 36px;
        font-weight: 700;
        line-height: 1.22;
      }
      .slide--roles .panel--acid .panel-body em {
        color: rgba(10, 9, 8, 0.8);
      }
      .locale-en .slide--roles .panel-body strong { font-size: 40px; }
      .locale-en .slide--roles .panel-body em { font-size: 32px; }
      .locale-zh-TW .slide--roles .panel-body strong { font-size: 42px; }
      .locale-zh-TW .slide--roles .panel-body em { font-size: 34px; }
      .locale-ko .lang-pill,
      .locale-zh-TW .lang-pill:first-child {
        text-transform: none;
        letter-spacing: -0.02em;
      }
      .scope-body {
        position: relative;
        z-index: 2;
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        margin-top: auto;
      }
      .section-label--majors {
        margin-bottom: 8px;
      }
      .major-grid {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-template-rows: repeat(6, minmax(0, 1fr));
        gap: 8px;
        min-height: 0;
        margin-bottom: 12px;
      }
      .major-chip {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 10px 4px;
        font-weight: 800;
        font-size: 36px;
        letter-spacing: -0.03em;
        line-height: 1.12;
        color: var(--fg);
        min-width: 0;
        word-break: keep-all;
        overflow: hidden;
      }
      .major-chip--acid,
      .lang-pill--acid {
        color: var(--bg);
      }
      .deck-divider {
        flex-shrink: 0;
        padding: 12px 0 0;
        border-top: var(--border-w) solid var(--acid);
        position: relative;
        z-index: 2;
      }
      .lang-rail {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      .lang-pill {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px 8px;
        font-family: ${mono};
        font-size: 34px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--fg);
        text-align: center;
        min-width: 0;
      }
      .lang-pill--acid {
        color: var(--bg);
      }
      .locale-en .major-chip { font-size: 30px; letter-spacing: -0.04em; }
      .locale-en .lang-pill { font-size: 28px; }
      .locale-zh-TW .major-chip { font-size: 30px; letter-spacing: -0.04em; }
      .locale-zh-TW .lang-pill { font-size: 30px; }
      .locale-en .panel-body strong { font-size: 26px; }
      .locale-en .panel-body em { font-size: 20px; }
      .cta-wrap {
        position: relative;
        z-index: 2;
        margin-top: auto;
        display: flex;
        gap: 22px;
        align-items: stretch;
      }
      .qr-card {
        flex-shrink: 0;
        width: 300px;
        background: #fff;
        padding: 26px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 3px solid var(--acid);
        box-shadow: var(--shadow);
      }
      .qr-card img { width: 220px; height: 220px; display: block; }
      .qr-card .scan-lbl {
        margin-top: 16px;
        font-family: ${mono};
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--bg);
      }
      .cta-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 8px;
      }
      .cta-text .url {
        font-family: ${mono};
        font-size: 36px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--acid);
        margin: 18px 0;
        white-space: nowrap;
      }
      .cta-text p {
        font-size: 34px;
        line-height: 1.45;
        color: var(--fg-soft);
        font-weight: 600;
      }
      .fine {
        position: relative;
        z-index: 2;
        margin-top: 22px;
        font-size: 22px;
        color: var(--muted-soft);
        font-family: ${mono};
        letter-spacing: 0.06em;
      }
      .swipe-hint { position: relative; z-index: 2; }
      @media print {
        body { padding: 0; }
        .toolbar { display: none; }
        .slides { gap: 0; }
      }
    </style>
  </head>
  <body>
    <div class="toolbar">
      <code>npm run instagram:export</code> · ko/zh: IBM Plex · en: Syne + DM Sans
    </div>
    <div class="slides">
      ${slide(
        1,
        `
        ${deckBurst}
        <span class="tag">${esc(d.s1.tag)}</span>
        <h1 class="head head--duo">
          <span class="line">${esc(d.s1.h1)}</span>
          <span class="line accent">${esc(d.s1.h1b)}</span>
        </h1>
        <p class="sub">${esc(d.s1.sub)}</p>
        <div class="swipe-hint">${esc(d.s1.hint)}</div>`,
        "slide--cover"
      )}
      ${slide(
        2,
        `
        <span class="tag">${esc(d.s2.tag)}</span>
        <h2 class="head">${raw(d.s2.h2)}</h2>
        <ul class="bullets">${d.s2.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
      )}
      ${slide(
        3,
        `
        <span class="tag">${esc(d.s3.tag)}</span>
        <h2 class="head">${raw(d.s3.h2)}</h2>
        <div class="perk-strip">
          ${d.s3.perks.map((p) => `<div class="perk-cell deck-card">${esc(p)}</div>`).join("")}
        </div>`,
        "slide--spotlight"
      )}
      ${slide(
        4,
        `
        <span class="tag">${esc(d.s4.tag)}</span>
        <h2 class="head">${raw(d.s4.h2)}</h2>
        <ul class="roles">${roleRows}</ul>`,
        "slide--roles"
      )}
      ${slide(
        5,
        `
        ${deckBurst}
        <span class="tag">${esc(d.s5.tag)}</span>
        <h2 class="head">${raw(d.s5.h2)}</h2>
        <div class="scope-body">
          ${scopeMajors}
          <div class="deck-divider">
            <p class="section-label">${esc(d.s5.languagesLabel)}</p>
            <div class="lang-rail">${scopeLangs}</div>
          </div>
        </div>`,
        "slide--scope"
      )}
      ${slide(
        6,
        `
        <span class="tag">${esc(d.s6.tag)}</span>
        <h2 class="head">${raw(d.s6.h2)}</h2>
        <div class="cta-wrap">
          <div class="qr-card">
            <img src="qr.png" alt="${esc(SITE_URL)}" width="240" height="240" />
            <span class="scan-lbl">${esc(d.s6.scan)}</span>
          </div>
          <div class="cta-text">
            <p>${esc(d.s6.cta)}</p>
            <p class="url">aprilstumb.vercel.app</p>
          </div>
        </div>
        <p class="fine">${esc(d.s6.disclaimer)}</p>`,
        "slide--cta"
      )}
    </div>
  </body>
</html>`;
}
