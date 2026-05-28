const STORAGE_KEY = "aprilstumb";

const landing = document.getElementById("landing");
const appView = document.getElementById("app-view");
const guideEl = document.getElementById("guide");
const app = document.getElementById("app");
const toast = document.getElementById("toast");
const headerActions = document.getElementById("header-actions");
const btnChangeTrack = document.getElementById("btn-change-track");
const btnChangeLang = document.getElementById("btn-change-lang");
const btnEnter = document.getElementById("btn-enter");
const trackGrid = document.getElementById("track-grid");
const langRow = document.getElementById("lang-row");
const panelTracks = document.getElementById("panel-tracks");
const landingTracksHint = document.getElementById("landing-tracks-hint");

let toastTimer;
let manifest;
let selectedTrack = null;
let selectedLang = null;
let currentBundle = null;
let landingUi = null;

const CHEVRON = `<svg class="chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

marked.setOptions({ gfm: true, breaks: true });

function renderMd(md) {
  const div = document.createElement("div");
  div.className = "md";
  div.innerHTML = marked.parse(md);
  return div;
}

function getParams() {
  const p = new URLSearchParams(location.search);
  return {
    track: p.get("track"),
    lang: p.get("lang"),
  };
}

function setParams(track, lang) {
  const p = new URLSearchParams();
  if (track) p.set("track", track);
  if (lang) p.set("lang", lang);
  const qs = p.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

function saveSelection(track, lang) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ track, lang }));
  } catch {}
}

function loadSelection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function ui(key) {
  return currentBundle?.ui?.[key] ?? key;
}

function trackLabel(id) {
  return landingUi?.tracks?.[id] ?? currentBundle?.ui?.tracks?.[id] ?? id;
}

function langLabel(code) {
  return landingUi?.locales?.[code] ?? currentBundle?.ui?.locales?.[code] ?? code;
}

async function loadLandingUi(lang) {
  const locale = lang || "ko";
  const entry = manifest.bundles.find((b) => b.trackId === "general" && b.locale === locale)
    ?? manifest.bundles.find((b) => b.trackId === "general" && b.locale === "ko");
  if (!entry) return;
  const res = await fetch(`/data/bundles/${entry.file}`);
  if (!res.ok) return;
  const bundle = await res.json();
  landingUi = bundle.ui;
  updateLandingLabels(landingUi);
}

function showToast(text) {
  toast.textContent = text;
  toast.hidden = false;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.hidden = true;
    }, 200);
  }, 1800);
}

async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
  const prev = btn.textContent;
  btn.textContent = ui("copied");
  btn.classList.add("copied");
  setTimeout(() => {
    btn.textContent = prev;
    btn.classList.remove("copied");
  }, 1400);
  showToast(ui("toastCopied"));
}

function renderPrompt(item) {
  const details = document.createElement("details");
  details.className = "prompt";

  const summary = document.createElement("summary");
  summary.className = "prompt-summary";
  summary.innerHTML = `${CHEVRON}<div class="prompt-text"><strong></strong><span></span></div>`;
  summary.querySelector("strong").textContent = item.title;
  summary.querySelector("span").textContent = item.description;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-copy";
  btn.textContent = ui("copy");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    copyText(item.copyText, btn);
  });
  summary.appendChild(btn);

  details.appendChild(summary);

  const preview = document.createElement("div");
  preview.className = "prompt-preview";
  preview.appendChild(renderMd(item.copyText));
  details.appendChild(preview);

  return details;
}

function updateLandingLabels(bundleUi) {
  document.getElementById("landing-title").textContent = bundleUi.landingTitle;
  document.getElementById("landing-tracks-label").textContent = bundleUi.landingTracks;
  document.getElementById("landing-langs-label").textContent = bundleUi.landingLanguages;
  landingTracksHint.textContent = bundleUi.landingTracksHint ?? "";
  btnEnter.textContent = bundleUi.enter;
}

function renderLandingGrid() {
  const langReady = Boolean(selectedLang);

  langRow.replaceChildren();
  for (const locale of manifest.locales) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-chip";
    if (locale === selectedLang) btn.classList.add("selected");
    btn.textContent = langLabel(locale);
    btn.dataset.lang = locale;
    btn.addEventListener("click", async () => {
      if (selectedLang !== locale) {
        selectedTrack = null;
      }
      selectedLang = locale;
      await loadLandingUi(selectedLang);
      renderLandingGrid();
      updateEnterState();
    });
    langRow.appendChild(btn);
  }

  panelTracks.classList.toggle("is-locked", !langReady);
  landingTracksHint.hidden = langReady;

  trackGrid.replaceChildren();
  for (const track of manifest.tracks) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "track-card";
    btn.disabled = !langReady;
    if (track.id === selectedTrack) btn.classList.add("selected");
    btn.textContent = trackLabel(track.id);
    btn.dataset.track = track.id;
    btn.addEventListener("click", () => {
      if (!selectedLang) return;
      selectedTrack = track.id;
      renderLandingGrid();
      updateEnterState();
    });
    trackGrid.appendChild(btn);
  }
}

function updateEnterState() {
  btnEnter.disabled = !(selectedTrack && selectedLang);
}

function showLanding() {
  landing.hidden = false;
  appView.hidden = true;
  headerActions.hidden = true;
}

function showApp() {
  landing.hidden = true;
  appView.hidden = false;
  headerActions.hidden = false;
}

async function loadBundle(track, lang) {
  const entry = manifest.bundles.find((b) => b.trackId === track && b.locale === lang);
  if (!entry) throw new Error("bundle not found");
  const res = await fetch(`/data/bundles/${entry.file}`);
  if (!res.ok) throw new Error("load failed");
  currentBundle = await res.json();

  document.getElementById("site-title").textContent = currentBundle.siteTitle;
  document.title = currentBundle.siteTitle;
  document.getElementById("hero-label").textContent = currentBundle.ui.heroLabel;
  document.getElementById("footer-text").textContent = currentBundle.ui.footerDisclaimer;
  document.getElementById("prompts-label").textContent = currentBundle.ui.promptsLabel;
  btnChangeTrack.textContent = currentBundle.ui.changeTrack;
  btnChangeLang.textContent = currentBundle.ui.changeLang;

  updateLandingLabels(currentBundle.ui);

  guideEl.replaceChildren();
  guideEl.appendChild(renderMd(currentBundle.guide.markdown));

  app.replaceChildren();
  for (const item of currentBundle.prompts) {
    app.appendChild(renderPrompt(item));
  }

  document.documentElement.lang = lang === "en-GB" ? "en" : lang.split("-")[0];
}

async function enterApp(track, lang) {
  selectedTrack = track;
  selectedLang = lang;
  saveSelection(track, lang);
  setParams(track, lang);
  await loadBundle(track, lang);
  showApp();
}

async function init() {
  const res = await fetch("/data/manifest.json");
  if (!res.ok) throw new Error("manifest load failed");
  manifest = await res.json();

  const params = getParams();
  const stored = loadSelection();
  selectedTrack = params.track || stored?.track || null;
  selectedLang = params.lang || stored?.lang || null;

  await loadLandingUi(selectedLang || "ko");
  renderLandingGrid();
  updateEnterState();

  btnEnter.addEventListener("click", () => {
    if (selectedTrack && selectedLang) enterApp(selectedTrack, selectedLang);
  });

  btnChangeTrack.addEventListener("click", () => {
    renderLandingGrid();
    updateEnterState();
    showLanding();
  });

  btnChangeLang.addEventListener("click", () => {
    renderLandingGrid();
    updateEnterState();
    showLanding();
  });

  if (selectedTrack && selectedLang && params.track && params.lang) {
    try {
      await enterApp(selectedTrack, selectedLang);
      return;
    } catch {
      showLanding();
    }
  }

  showLanding();
}

init().catch(() => {
  landing.innerHTML = `<p class="loading">${landingUi?.loadError ?? "Could not load."}</p>`;
});
