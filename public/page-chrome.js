import { htmlLangAttr } from "./locale-resolve.js";

const OG_LOCALE = {
  ko: "ko_KR",
  "en-GB": "en_GB",
  "zh-TW": "zh_TW",
  ja: "ja_JP",
  fr: "fr_FR",
  es: "es_ES",
};

function setMetaName(name, content) {
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el && content) el.setAttribute("content", content);
}

function setMetaProperty(property, content) {
  const el = document.querySelector(`meta[property="${property}"]`);
  if (el && content) el.setAttribute("content", content);
}

export function applyPageChrome(ui, locale) {
  if (!ui) return;
  document.documentElement.lang = htmlLangAttr(locale);
  document.title = ui.siteTitle;

  if (ui.metaDescription) {
    setMetaName("description", ui.metaDescription);
    setMetaProperty("og:description", ui.metaDescription);
    setMetaName("twitter:description", ui.metaDescription);
  }

  setMetaProperty("og:title", ui.siteTitle);
  setMetaName("twitter:title", ui.siteTitle);
  setMetaProperty("og:locale", OG_LOCALE[locale] || OG_LOCALE["en-GB"]);

  const hero = document.getElementById("hero-label");
  if (hero && ui.heroLabel) hero.textContent = ui.heroLabel;

  const guide = document.getElementById("guide");
  if (guide && ui.ariaGuide) guide.setAttribute("aria-label", ui.ariaGuide);

  const prompts = document.querySelector(".prompts");
  if (prompts && ui.promptsLabel) prompts.setAttribute("aria-label", ui.promptsLabel);

  const feedback = document.getElementById("feedback-section");
  if (feedback && ui.commentsTitle) feedback.setAttribute("aria-label", ui.commentsTitle);
}

export function applyNotFoundChrome(ui, locale) {
  if (!ui) return;
  document.documentElement.lang = htmlLangAttr(locale);
  document.title = ui.notFoundTitle;

  const code = document.getElementById("not-found-code");
  const heading = document.getElementById("not-found-heading");
  const body = document.getElementById("not-found-body");
  const back = document.getElementById("not-found-back");
  const retry = document.getElementById("not-found-retry");

  if (code && ui.notFoundCode) code.textContent = ui.notFoundCode;
  if (heading && ui.notFoundHeading) heading.textContent = ui.notFoundHeading;
  if (body && ui.notFoundBody) body.textContent = ui.notFoundBody;
  if (back && ui.notFoundBack) back.textContent = ui.notFoundBack;
  if (retry && ui.notFoundRetry) retry.textContent = ui.notFoundRetry;
}
