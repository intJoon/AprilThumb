import fs from "fs";

function assignSemver(chronoIndex) {
  if (chronoIndex === 0) return "0.0.1";
  if (chronoIndex <= 5) return `0.${chronoIndex}.0`;
  if (chronoIndex === 6) return "1.0.0";
  if (chronoIndex <= 11) return `1.0.${chronoIndex - 6}`;
  if (chronoIndex === 12) return "1.1.0";
  if (chronoIndex <= 27) return `1.1.${chronoIndex - 12}`;
  if (chronoIndex === 28) return "1.2.0";
  if (chronoIndex <= 40) return `1.2.${chronoIndex - 28}`;
  if (chronoIndex === 41) return "1.3.0";
  if (chronoIndex <= 43) return `1.3.${chronoIndex - 41}`;
  if (chronoIndex === 44) return "1.4.0";
  if (chronoIndex === 45) return "1.5.0";
  if (chronoIndex <= 64) return `1.5.${chronoIndex - 45}`;
  if (chronoIndex === 65) return "1.6.0";
  if (chronoIndex <= 74) return `1.6.${chronoIndex - 65}`;
  throw new Error(`index ${chronoIndex}`);
}

const map = new Map();
for (let i = 0; i <= 57; i++) map.set(`1.0.${i}`, assignSemver(i + 6));
map.set("1.0.22", "1.2.0");
map.set("1.0.60", "1.6.2");
map.set("1.0.60.1", "1.6.3");
map.set("1.0.61", "1.6.4");
map.set("1.0.61.1", "1.6.5");
map.set("1.0.61.2", "1.6.6");
map.set("1.0.61.3", "1.6.7");
map.set("1.0.61.4", "1.6.8");
map.set("1.0.61.5", "1.6.9");
map.set("1.0.63", "1.6.4");

const keys = [...map.keys()].sort((a, b) => b.length - a.length);

function replaceVersions(text) {
  let out = text;
  for (const old of keys) {
    const esc = old.replace(/\./g, "\\.");
    out = out.replace(
      new RegExp(`(?<![\\d.])${esc}(?![\\d.])`, "g"),
      map.get(old)
    );
  }
  return out;
}

function patchMethods() {
  let text = fs.readFileSync("docs/방법론.md", "utf8");
  text = text.replace(
    "## 2026-06-04 — SEO·PWA·접근성 보강 (1.0.61)",
    "## 2026-06-04 — SEO·PWA·접근성 보강 (1.6.6)"
  );
  text = replaceVersions(text);
  fs.writeFileSync("docs/방법론.md", text);
}

function patchSources() {
  const text = replaceVersions(fs.readFileSync("docs/출처.md", "utf8"));
  fs.writeFileSync("docs/출처.md", text);
}

patchMethods();
patchSources();
console.log("patched methods + sources");
