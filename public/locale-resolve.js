export const STORAGE_KEY = "aprilstumb";
export const DEFAULT_LOCALE = "en-GB";

export function matchLocaleTag(tag, supported) {
  if (!tag || !supported?.length) return null;
  const lower = String(tag).trim().replace(/_/g, "-").toLowerCase();
  const exact = supported.find((l) => l.toLowerCase() === lower);
  if (exact) return exact;

  const parts = lower.split("-");
  const base = parts[0];
  const region = parts[1];

  if (base === "en" && supported.includes("en-GB")) return "en-GB";
  if (base === "ko" && supported.includes("ko")) return "ko";
  if (base === "ja" && supported.includes("ja")) return "ja";
  if (base === "fr" && supported.includes("fr")) return "fr";
  if (base === "es" && supported.includes("es")) return "es";

  if (base === "zh" && supported.includes("zh-TW")) {
    if (
      region === "tw" ||
      region === "hk" ||
      region === "mo" ||
      lower.includes("hant")
    ) {
      return "zh-TW";
    }
  }

  return null;
}

export function resolveDeviceLocale(supported) {
  const prefs =
    navigator.languages?.length > 0
      ? navigator.languages
      : navigator.language
        ? [navigator.language]
        : [];
  for (const tag of prefs) {
    const hit = matchLocaleTag(tag, supported);
    if (hit) return hit;
  }
  return null;
}

export function loadStoredSelection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function resolveAppLocale(manifest, urlLang, storedLang) {
  const supported = manifest?.locales;
  if (urlLang && supported?.includes(urlLang)) return urlLang;
  if (storedLang && supported?.includes(storedLang)) return storedLang;
  return resolveDeviceLocale(supported) || DEFAULT_LOCALE;
}

export function htmlLangAttr(locale) {
  return locale === "en-GB" ? "en" : locale.split("-")[0];
}

export function homeHref(locale) {
  if (!locale || locale === DEFAULT_LOCALE) return "/";
  return `/?lang=${encodeURIComponent(locale)}`;
}

export async function fetchGeneralUi(manifest, locale) {
  const pick =
    manifest.bundles.find((b) => b.trackId === "general" && b.locale === locale) ??
    manifest.bundles.find((b) => b.trackId === "general" && b.locale === DEFAULT_LOCALE);
  if (!pick) return null;
  const res = await fetch(`/data/bundles/${pick.file}`);
  if (!res.ok) return null;
  const bundle = await res.json();
  return { ui: bundle.ui, locale: pick.locale };
}
