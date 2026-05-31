const TRACK_IDS = [
  "pharmacy",
  "general",
  "medicine",
  "nursing",
  "veterinary",
  "cs",
  "engineering",
  "physics",
  "chemistry",
  "life-sciences",
  "mathematics-statistics",
  "law",
  "economics",
  "business-administration",
  "social-sciences",
  "psychology",
  "education",
  "philosophy",
  "linguistics",
  "cultural-arts",
  "design",
  "architecture",
  "home-economics",
  "sports",
];

const LOCALES = ["ko", "en-GB", "zh-TW", "ja", "fr", "es"];

const trackSet = new Set(TRACK_IDS);
const localeSet = new Set(LOCALES);

export function isValidTrack(id) {
  return typeof id === "string" && trackSet.has(id);
}

export function isValidLocale(code) {
  return typeof code === "string" && localeSet.has(code);
}
