import {
  DEFAULT_LOCALE,
  resolveAppLocale,
  loadStoredSelection,
  homeHref,
  fetchGeneralUi,
} from "./locale-resolve.js";
import { applyNotFoundChrome } from "./page-chrome.js";

function urlLang() {
  return new URLSearchParams(location.search).get("lang");
}

async function init() {
  const manifestRes = await fetch("/data/manifest.json");
  if (!manifestRes.ok) return;
  const manifest = await manifestRes.json();
  const stored = loadStoredSelection();
  const locale = resolveAppLocale(manifest, urlLang(), stored?.lang);
  const general = await fetchGeneralUi(manifest, locale);
  const ui = general?.ui;
  if (!ui) return;

  applyNotFoundChrome(ui, general.locale || locale);

  const home = homeHref(locale);
  const back = document.getElementById("not-found-back");
  if (back) back.setAttribute("href", home);
}

init().catch(() => {});
