// Scan source files for emoji characters so they can be replaced with icons.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  ".vercel",
  ".unsplash-cache",
  "client-originals",
  "public",
]);
const EXTS = new Set([".tsx", ".ts", ".css", ".mdx", ".mjs", ".js"]);

// Broad emoji / pictograph ranges (including variation selectors & keycaps)
const EMOJI_RE =
  /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{2190}-\u{21FF}\u{2300}-\u{23FF}\u{2460}-\u{24FF}\u{25A0}-\u{25FF}\u{2763}-\u{2764}\u{2934}-\u{2935}\u{1F1E6}-\u{1F1FF}]/gu;

function walk(dir, out) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (SKIP_DIRS.has(entry)) continue;
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, out);
    } else if (EXTS.has(extname(full).toLowerCase())) {
      const src = readFileSync(full, "utf8");
      EMOJI_RE.lastIndex = 0;
      let m;
      while ((m = EMOJI_RE.exec(src))) {
        const line = src.slice(0, m.index).split(/\r?\n/).length;
        out.push({ file: full, line, char: m[0], code: `U+${m[0].codePointAt(0).toString(16).toUpperCase()}` });
      }
    }
  }
  return out;
}

const results = walk(ROOT, []);
if (results.length === 0) {
  console.log("NO EMOJIS FOUND");
} else {
  for (const r of results) {
    console.log(`${r.file}:${r.line}  ${r.code}  ${r.char}`);
  }
  console.log(`\nTOTAL: ${results.length}`);
}