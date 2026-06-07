import {
  DEFAULT_LOCALE,
  resolveAppLocale,
  loadStoredSelection,
  homeHref,
  fetchGeneralUi,
} from "./locale-resolve.js";
import { applyNotFoundChrome } from "./page-chrome.js";

const FALLBACK_UI = {
  notFoundTitle: "Page not found — AprilThumb",
  notFoundCode: "404",
  notFoundHeading: "Page not found",
  notFoundBody:
    "The link may be outdated or the page was removed. Return to AprilThumb and pick your discipline and language again.",
  notFoundBack: "Back to AprilThumb",
  notFoundRetry: "Try again",
};

function urlLang() {
  return new URLSearchParams(location.search).get("lang");
}

function applyFallback(locale) {
  applyNotFoundChrome(FALLBACK_UI, locale);
  const home = homeHref(locale);
  const back = document.getElementById("not-found-back");
  if (back) back.setAttribute("href", home);
}

async function init() {
  let locale = DEFAULT_LOCALE;
  try {
    const manifestRes = await fetch("/data/manifest.json");
    if (!manifestRes.ok) {
      applyFallback(locale);
      return;
    }
    const manifest = await manifestRes.json();
    const stored = loadStoredSelection();
    locale = resolveAppLocale(manifest, urlLang(), stored?.lang);
    const general = await fetchGeneralUi(manifest, locale);
    const ui = general?.ui;
    if (!ui) {
      applyFallback(locale);
      return;
    }

    applyNotFoundChrome(ui, general.locale || locale);

    const home = homeHref(locale);
    const back = document.getElementById("not-found-back");
    if (back) back.setAttribute("href", home);
  } catch {
    applyFallback(locale);
  }
}

init();
