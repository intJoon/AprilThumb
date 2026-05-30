import { SLIDES_BY_LOCALE, LOCALES, SITE_URL } from "../docs/instagram-carousel/slide-content.mjs";

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

  const roleRows = d.s5.roles
    .map(
      (r, i) => `
        <li class="panel panel--role${i % 3 === 0 ? " panel--acid" : ""}">
          <span class="panel-num">${esc(r.n)}</span>
          <span class="panel-body">
            <strong>${esc(r.t)}</strong>
            <em>${esc(r.d)}</em>
          </span>
        </li>`
    )
    .join("");

  const stickerRot = [-14, 9, -11, 13, -8, 12, -10, 7, -13, 11, -6, 10, -15, 8, -12, 9];
  const stickerLayout = [
    { x: 0, y: 1 },
    { x: 50, y: 0 },
    { x: 22, y: 15 },
    { x: 68, y: 3 },
    { x: 2, y: 27 },
    { x: 40, y: 31 },
    { x: 64, y: 23 },
    { x: 10, y: 45 },
    { x: 52, y: 43 },
    { x: 0, y: 57 },
    { x: 34, y: 61 },
    { x: 70, y: 53 },
    { x: 6, y: 73 },
    { x: 44, y: 77 },
    { x: 66, y: 69 },
    { x: 24, y: 88 },
  ];
  const stickerTier = (text) => {
    const n = text.length;
    if (n <= 2) return "xl";
    if (n <= 4) return "lg";
    if (n <= 6) return "md";
    return "sm";
  };
  const sticker = (text, i) => {
    const tier = stickerTier(text);
    const acid = i % 3 !== 2;
    const r = stickerRot[i % stickerRot.length];
    const pos = stickerLayout[i % stickerLayout.length];
    const scale = acid ? 1.06 : 1;
    return `<span class="sticker sticker--${tier}${acid ? " sticker--acid" : ""}" style="--r:${r}deg;--x:${pos.x}%;--y:${pos.y}%;--s:${scale}">${esc(text)}</span>`;
  };
  const scopeMajors = `<div class="sticker-wall">${d.s6.majors.map((m, i) => sticker(m, i)).join("")}</div>`;
  const langRot = [-10, 8, -7, 11, -9, 6];
  const scopeLangs = d.s6.languages
    .map((l, i) => {
      const r = langRot[i % langRot.length];
      const acid = i % 2 === 0;
      return `<span class="lang-pill${acid ? " lang-pill--acid" : ""}" style="--r:${r}deg">${esc(l)}</span>`;
    })
    .join("");

  const slide = (n, inner, mod = "") =>
    `<section class="slide slide--deck ${mod}" data-n="${n}">
      <header class="slide-top">
        <span class="brand">AprilThumb</span>
        <span class="idx">${String(n).padStart(2, "0")}<span class="idx-total"> / 07</span></span>
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
        --line: rgba(245, 242, 235, 0.14);
        --shadow: 5px 5px 0 rgba(0, 0, 0, 0.45);
        --safe-x: 80px;
        --safe-top: 92px;
        --safe-bottom: 100px;
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
        background-size: 54px 54px;
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
        margin-bottom: 32px;
        flex-shrink: 0;
        padding-bottom: 18px;
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
        margin-bottom: 20px;
      }
      .sub,
      .bullets li,
      .panel-body strong,
      .panel-body em,
      .flow-step span:last-child,
      .cta-text p,
      .stat-cell .l,
      .sticker,
      .lang-pill {
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
      .slide--deck:not(.slide--cover):not(.slide--scope):not(.slide--roles) .head { font-size: 72px; }
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
      .bullets li {
        font-size: 38px;
        font-weight: 700;
        line-height: 1.36;
        padding: 24px 30px;
        border: 2px solid rgba(245, 242, 235, 0.92);
        background: rgba(10, 9, 8, 0.65);
        color: var(--fg);
        box-shadow: var(--shadow);
        transform: rotate(-0.5deg);
      }
      .bullets li:nth-child(2) { transform: rotate(0.6deg); }
      .bullets li:nth-child(3) { transform: rotate(-0.8deg); background: var(--acid); color: var(--bg); border-color: var(--acid); }
      .stat-strip {
        position: relative;
        z-index: 2;
        margin-top: auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .stat-cell {
        padding: 32px 16px;
        text-align: center;
        border: 2px solid rgba(245, 242, 235, 0.85);
        box-shadow: var(--shadow);
      }
      .stat-cell:nth-child(2) {
        background: var(--acid);
        border-color: var(--acid);
      }
      .stat-cell:nth-child(2) .n,
      .stat-cell:nth-child(2) .l { color: var(--bg); }
      .stat-cell .n {
        font-family: ${display};
        font-size: 88px;
        font-weight: ${headWeight};
        letter-spacing: ${headTracking};
        color: var(--acid);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .stat-cell .l {
        margin-top: 10px;
        font-size: 28px;
        font-weight: 700;
        color: var(--fg-soft);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-family: ${mono};
      }
      .stat-cell:not(:nth-child(2)) .l { color: var(--muted); }
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
        border: 2px solid rgba(245, 242, 235, 0.92);
        background: rgba(10, 9, 8, 0.55);
        color: var(--fg);
        box-shadow: var(--shadow);
        transform: rotate(-0.4deg);
      }
      .flow-step:nth-child(2) { transform: rotate(0.5deg); }
      .flow-step:nth-child(3) { transform: rotate(-0.3deg); background: var(--acid); border-color: var(--acid); }
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
        border: 2px solid rgba(245, 242, 235, 0.92);
        background: rgba(10, 9, 8, 0.5);
        box-shadow: var(--shadow);
      }
      .panel--acid {
        background: var(--acid);
        border-color: var(--acid);
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
      .slide--roles .slide-top {
        margin-bottom: 18px;
        padding-bottom: 14px;
      }
      .slide--roles .tag {
        margin-bottom: 10px;
      }
      .slide--roles .head {
        font-size: 56px;
        line-height: 1.08;
        max-width: 920px;
      }
      .slide--roles .roles {
        flex: 1;
        margin-top: 0;
        min-height: 0;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(3, minmax(0, 1fr));
        gap: 18px;
        align-content: stretch;
      }
      .slide--roles .panel {
        padding: 22px 24px;
        background: #181614;
        border-width: 3px;
        align-items: center;
        min-height: 0;
      }
      .slide--roles .panel--acid {
        background: var(--acid);
        border-color: var(--fg);
      }
      .slide--roles .panel--acid .panel-num,
      .slide--roles .panel--acid .panel-body strong,
      .slide--roles .panel--acid .panel-body em {
        color: var(--bg);
      }
      .slide--roles .panel:not(.panel--acid) .panel-body em {
        color: var(--fg);
        opacity: 0.92;
      }
      .slide--roles .panel-num {
        font-size: 32px;
        width: 52px;
        line-height: 1;
      }
      .slide--roles .panel-body {
        gap: 10px;
      }
      .slide--roles .panel-body strong {
        font-size: 40px;
        line-height: 1.16;
      }
      .slide--roles .panel-body em {
        font-size: 30px;
        font-weight: 700;
        line-height: 1.26;
      }
      .slide--roles .panel--acid .panel-body em {
        color: rgba(10, 9, 8, 0.8);
      }
      .locale-en .slide--roles .head { font-size: 52px; }
      .locale-en .slide--roles .panel-body strong { font-size: 34px; }
      .locale-en .slide--roles .panel-body em { font-size: 26px; }
      .locale-zh-TW .slide--roles .panel-body strong { font-size: 36px; }
      .locale-zh-TW .slide--roles .panel-body em { font-size: 28px; }
      .locale-ko .lang-pill,
      .locale-zh-TW .lang-pill:first-child {
        text-transform: none;
        letter-spacing: -0.02em;
      }
      .slide--scope {
        padding-top: 72px;
      }
      .slide--scope .slide-top {
        margin-bottom: 14px;
        padding-bottom: 12px;
      }
      .scope-burst {
        position: absolute;
        right: -180px;
        top: 120px;
        width: 520px;
        height: 520px;
        background: var(--acid);
        opacity: 0.1;
        transform: rotate(28deg);
        z-index: 0;
        pointer-events: none;
      }
      .scope-head {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 4px;
        flex-shrink: 0;
      }
      .scope-head-l {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      .scope-head .tag { margin-bottom: 0; }
      .scope-mega {
        display: flex;
        align-items: baseline;
        gap: 6px;
        font-family: ${display};
        font-weight: 800;
        letter-spacing: -0.08em;
        line-height: 0.85;
        margin-left: auto;
      }
      .scope-mega-a {
        font-size: 128px;
        color: var(--acid);
        text-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5);
      }
      .scope-mega-x {
        font-size: 72px;
        color: var(--fg);
        opacity: 0.45;
        margin: 0 4px;
      }
      .scope-mega-b {
        font-size: 128px;
        color: var(--fg);
        text-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5);
      }
      .scope-badge {
        transform: rotate(-9deg);
        padding: 16px 24px;
        font-family: ${mono};
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        background: var(--acid);
        color: var(--bg);
        border: 3px solid var(--fg);
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.55);
      }
      .scope-bg {
        position: absolute;
        left: 50%;
        top: 48%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: baseline;
        gap: 8px;
        font-family: ${display};
        font-weight: 800;
        letter-spacing: -0.09em;
        line-height: 0.75;
        pointer-events: none;
        z-index: 0;
        user-select: none;
      }
      .scope-bg-n {
        font-size: 520px;
        color: var(--acid);
        opacity: 0.11;
      }
      .scope-bg-n--2 {
        font-size: 380px;
        color: var(--fg);
        opacity: 0.07;
      }
      .slide--scope::before {
        opacity: 1;
        background-size: 48px 48px;
        background-image:
          linear-gradient(rgba(245, 242, 235, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245, 242, 235, 0.055) 1px, transparent 1px);
      }
      .scope-body {
        position: relative;
        z-index: 1;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0;
        min-height: 0;
        margin: 0 -28px;
      }
      .sticker-wall {
        position: relative;
        flex: 1;
        min-height: 720px;
        margin-top: -6px;
      }
      .sticker {
        position: absolute;
        left: var(--x);
        top: var(--y);
        display: inline-block;
        transform: rotate(var(--r)) scale(var(--s));
        border: 3px solid rgba(245, 242, 235, 0.98);
        background: #121110;
        color: var(--fg);
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.12;
        white-space: nowrap;
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.55);
        z-index: 1;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
      }
      .sticker:nth-child(3n) { z-index: 2; }
      .sticker:nth-child(5n) { z-index: 3; }
      .sticker--xl {
        font-size: 52px;
        padding: 20px 34px;
      }
      .sticker--lg {
        font-size: 46px;
        padding: 18px 30px;
      }
      .sticker--md {
        font-size: 36px;
        padding: 16px 26px;
      }
      .sticker--sm {
        font-size: 32px;
        padding: 16px 24px;
        white-space: normal;
        max-width: 300px;
        text-align: center;
      }
      .sticker--acid {
        background: var(--acid);
        border-color: var(--fg);
        color: var(--bg);
        box-shadow: 10px 10px 0 rgba(212, 255, 76, 0.4);
        z-index: 4;
      }
      .lang-rail-wrap {
        flex-shrink: 0;
        padding: 22px 28px 0;
        margin: 0 28px;
        border-top: 3px solid var(--acid);
        position: relative;
        z-index: 2;
        background: linear-gradient(180deg, rgba(212, 255, 76, 0.06) 0%, transparent 100%);
      }
      .scope-label {
        font-family: ${mono};
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--acid);
        margin-bottom: 16px;
      }
      .lang-rail {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 14px 16px;
      }
      .lang-pill {
        display: inline-block;
        transform: rotate(var(--r)) scale(1.02);
        padding: 20px 30px;
        font-family: ${mono};
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--fg);
        border: 3px solid var(--accent-hi);
        background: rgba(10, 9, 8, 0.85);
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5);
      }
      .lang-pill--acid {
        background: var(--acid);
        color: var(--bg);
        border-color: var(--fg);
        box-shadow: 10px 10px 0 rgba(212, 255, 76, 0.35);
      }
      .locale-en .sticker--xl { font-size: 44px; }
      .locale-en .sticker--lg { font-size: 38px; }
      .locale-en .sticker--md { font-size: 30px; }
      .locale-en .sticker--sm { font-size: 26px; max-width: 260px; }
      .locale-en .scope-mega-a,
      .locale-en .scope-mega-b { font-size: 112px; }
      .locale-en .lang-pill { font-size: 28px; padding: 18px 28px; }
      .locale-zh-TW .sticker--sm { font-size: 28px; padding: 14px 20px; max-width: 320px; }
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
        <p class="sub">${esc(d.s3.sub)}</p>
        <div class="stat-strip">
          ${d.s3.stats.map((s) => `<div class="stat-cell"><div class="n">${esc(s.n)}</div><div class="l">${esc(s.l)}</div></div>`).join("")}
        </div>`
      )}
      ${slide(
        4,
        `
        <span class="tag">${esc(d.s4.tag)}</span>
        <h2 class="head">${raw(d.s4.h2)}</h2>
        <div class="flow">
          ${d.s4.steps.map((t, i) => `<div class="flow-step"><span class="arrow-n">${String(i + 1).padStart(2, "0")}</span><span>${esc(t)}</span></div>`).join("")}
        </div>`
      )}
      ${slide(
        5,
        `
        <span class="tag">${esc(d.s5.tag)}</span>
        <h2 class="head">${raw(d.s5.h2)}</h2>
        <ul class="roles">${roleRows}</ul>`,
        "slide--roles"
      )}
      ${slide(
        6,
        `
        <div class="scope-burst" aria-hidden="true"></div>
        <div class="scope-bg" aria-hidden="true"><span class="scope-bg-n">16</span><span class="scope-bg-n scope-bg-n--2">6</span></div>
        <div class="scope-head">
          <div class="scope-head-l">
            <span class="tag">${esc(d.s6.tag)}</span>
            <span class="scope-badge">${esc(d.s6.badge)}</span>
          </div>
          <div class="scope-mega" aria-label="${esc(d.s6.h2.replace(/<br\s*\/?>/gi, " "))}">
            <span class="scope-mega-a">16</span>
            <span class="scope-mega-x">×</span>
            <span class="scope-mega-b">6</span>
          </div>
        </div>
        <div class="scope-body">
          ${scopeMajors}
          <div class="lang-rail-wrap">
            <p class="scope-label">${esc(d.s6.languagesLabel)}</p>
            <div class="lang-rail">${scopeLangs}</div>
          </div>
        </div>`,
        "slide--scope"
      )}
      ${slide(
        7,
        `
        <span class="tag">${esc(d.s7.tag)}</span>
        <h2 class="head">${raw(d.s7.h2)}</h2>
        <div class="cta-wrap">
          <div class="qr-card">
            <img src="qr.png" alt="${esc(SITE_URL)}" width="220" height="220" />
            <span class="scan-lbl">${esc(d.s7.scan)}</span>
          </div>
          <div class="cta-text">
            <p>${esc(d.s7.cta)}</p>
            <p class="url">aprilstumb.vercel.app</p>
            <p>${esc(d.s7.hint)}</p>
          </div>
        </div>
        <p class="fine">${esc(d.s7.disclaimer)}</p>`
      )}
    </div>
  </body>
</html>`;
}
