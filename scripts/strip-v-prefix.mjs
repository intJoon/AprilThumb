import fs from "fs";

const VER = /(?<![.@\w/])v(\d+\.\d+(?:\.\d+)?(?:\.\d+)?)/g;

const files = [
  "docs/버전.md",
  "docs/방법론.md",
  "docs/출처.md",
  "README.md",
  "scripts/renumber-versions.mjs",
  "scripts/patch-doc-versions.mjs",
];

for (const file of files) {
  let text = fs.readFileSync(file, "utf8");
  text = text.replace(/^## v([\d.]+(?:\.\d+)?) — /gm, "## $1 — ");
  text = text.replace(VER, "$1");
  fs.writeFileSync(file, text);
  const left = (text.match(/(?<![.@\w/])v\d+\.\d+/g) || []).length;
  console.log(`${file}: ${left} v-prefixed versions remain`);
}
