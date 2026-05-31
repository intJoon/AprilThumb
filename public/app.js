const STORAGE_KEY = "aprilstumb";

import { mountFeedbackPanel } from "./feedback-panel.js";

const picker = document.getElementById("picker");
const pickerLabel = document.getElementById("picker-label");
const pickerOptions = document.getElementById("picker-options");
const appView = document.getElementById("app-view");
const guideEl = document.getElementById("guide");
const app = document.getElementById("app");
const toast = document.getElementById("toast");
const btnChangeTrack = document.getElementById("btn-change-track");
const btnChangeLang = document.getElementById("btn-change-lang");
const btnLabelLang = document.getElementById("btn-label-lang");
const btnLabelTrack = document.getElementById("btn-label-track");
const btnCopyLink = document.getElementById("btn-copy-link");

let toastTimer;
let manifest;
let selectedTrack = null;
let selectedLang = null;
let currentBundle = null;
let landingUi = null;
let pickerMode = null;
let feedbackPanel = null;
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

function uiSource() {
  return currentBundle?.ui ?? landingUi;
}

function ui(key) {
  return currentBundle?.ui?.[key] ?? landingUi?.[key] ?? key;
}

function trackLabel(id) {
  return landingUi?.tracks?.[id] ?? currentBundle?.ui?.tracks?.[id] ?? id;
}

function langLabel(code) {
  return landingUi?.locales?.[code] ?? currentBundle?.ui?.locales?.[code] ?? code;
}

async function loadLandingUi(lang) {
  const locale = lang || "ko";
  const entry =
    manifest.bundles.find((b) => b.trackId === "general" && b.locale === locale) ??
    manifest.bundles.find((b) => b.trackId === "general" && b.locale === "ko");
  if (!entry) return;
  const res = await fetch(`/data/bundles/${entry.file}`);
  if (!res.ok) return;
  const bundle = await res.json();
  landingUi = bundle.ui;
  document.getElementById("footer-text").textContent = landingUi.footerDisclaimer;
  document.getElementById("site-title").textContent = landingUi.siteTitle;
  feedbackPanel?.updateLabels?.();
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

function getSiteUrl() {
  const base = (manifest?.siteUrl || location.origin).replace(/\/$/, "");
  return `${base}/`;
}

async function writeClipboard(text) {
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
}

async function copyText(text, btn) {
  await writeClipboard(text);
  const prev = btn.textContent;
  btn.textContent = ui("copied");
  btn.classList.add("copied");
  btn.setAttribute("aria-label", ui("copied"));
  setTimeout(() => {
    btn.textContent = prev;
    btn.classList.remove("copied");
    btn.removeAttribute("aria-label");
  }, 1400);
  showToast(ui("toastCopied"));
}

async function copySiteLink() {
  await writeClipboard(getSiteUrl());
  btnCopyLink.classList.add("copied");
  setTimeout(() => btnCopyLink.classList.remove("copied"), 1400);
  showToast(ui("toastLinkCopied"));
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

function updateHeaderButtons() {
  const src = uiSource();
  if (!src) return;
  btnLabelLang.textContent = selectedLang ? langLabel(selectedLang) : src.pickLanguage;
  btnLabelTrack.textContent = selectedTrack ? trackLabel(selectedTrack) : src.pickTrack;
  btnChangeLang.classList.toggle("is-empty", !selectedLang);
  btnChangeTrack.classList.toggle("is-empty", !selectedTrack);
  btnChangeLang.setAttribute("aria-label", src.changeLang);
  btnChangeTrack.setAttribute("aria-label", src.changeTrack);
  btnChangeLang.setAttribute("aria-expanded", pickerMode === "lang" ? "true" : "false");
  btnChangeTrack.setAttribute("aria-expanded", pickerMode === "track" ? "true" : "false");
  btnCopyLink.setAttribute("aria-label", src.copyLink);
}

function renderPicker(mode) {
  pickerMode = mode;
  const src = uiSource();
  picker.hidden = false;
  pickerOptions.className = "track-grid";
  pickerOptions.replaceChildren();

  if (mode === "lang") {
    pickerLabel.textContent = src.landingLanguages;
    for (const locale of manifest.locales) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "track-card";
      if (locale === selectedLang) btn.classList.add("selected");
      btn.textContent = langLabel(locale);
      btn.dataset.lang = locale;
      btn.addEventListener("click", () => onPickLang(locale));
      pickerOptions.appendChild(btn);
    }
  } else {
    pickerLabel.textContent = src.landingTracks;
    for (const track of manifest.tracks) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "track-card";
      if (track.id === selectedTrack) btn.classList.add("selected");
      btn.textContent = trackLabel(track.id);
      btn.dataset.track = track.id;
      btn.addEventListener("click", () => onPickTrack(track.id));
      pickerOptions.appendChild(btn);
    }
  }

  updateHeaderButtons();
}

function closePicker() {
  pickerMode = null;
  picker.hidden = true;
  updateHeaderButtons();
}

function openPicker(mode) {
  if (pickerMode === mode) {
    closePicker();
    return;
  }
  renderPicker(mode);
}

async function onPickLang(locale) {
  selectedLang = locale;
  if (!currentBundle || currentBundle.locale !== locale) {
    await loadLandingUi(selectedLang);
  }
  closePicker();
  updateHeaderButtons();
  await tryLoadContent();
}

async function onPickTrack(trackId) {
  selectedTrack = trackId;
  closePicker();
  updateHeaderButtons();
  await tryLoadContent();
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
  landingUi = currentBundle.ui;
  feedbackPanel?.updateLabels?.();

  guideEl.replaceChildren();
  guideEl.appendChild(renderMd(currentBundle.guide.markdown));

  app.replaceChildren();
  for (const item of currentBundle.prompts) {
    app.appendChild(renderPrompt(item));
  }

  document.documentElement.lang = lang === "en-GB" ? "en" : lang.split("-")[0];
  await feedbackPanel?.prefetchCount?.();
}

async function tryLoadContent() {
  if (selectedTrack && selectedLang) {
    saveSelection(selectedTrack, selectedLang);
    setParams(selectedTrack, selectedLang);
    try {
      await loadBundle(selectedTrack, selectedLang);
      appView.hidden = false;
    } catch {
      appView.hidden = true;
      showToast(ui("loadError"));
    }
  } else {
    appView.hidden = true;
    setParams(selectedTrack, selectedLang);
    if (selectedTrack || selectedLang) {
      saveSelection(selectedTrack, selectedLang);
    }
  }
  updateHeaderButtons();
  feedbackPanel?.prefetchCount?.();
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
  feedbackPanel = mountFeedbackPanel({
    ui,
    trackLabel,
    langLabel,
    selectedTrack: () => selectedTrack,
    selectedLang: () => selectedLang,
    showToast,
  });
  updateHeaderButtons();
  picker.hidden = true;

  btnChangeLang.addEventListener("click", () => openPicker("lang"));
  btnChangeTrack.addEventListener("click", () => openPicker("track"));
  btnCopyLink.addEventListener("click", () => copySiteLink());

  await tryLoadContent();
}

init().catch(() => {
  document.body.innerHTML = `<main class="wrap"><p class="loading">${landingUi?.loadError ?? "Could not load."}</p></main>`;
});
