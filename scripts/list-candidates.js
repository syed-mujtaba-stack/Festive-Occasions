/* list-candidates.js — dump pickable candidates from the cached Openverse pools.
   Usage: node scripts/list-candidates.js "<query>" [offsetRadius]
   Reads .unsplash-cache/openverse/<query>.json and prints non-BAD, resolution-OK
   candidates with their index so they can be hand-picked into SLOTS.
   Read-only; safe to run while the downloader runs.
*/
const fs = require("fs");
const path = require("path");

const CACHE_DIR = path.join(__dirname, "..", ".unsplash-cache", "openverse");
const MIN_EDGE = Number(process.env.MIN_EDGE || 600);
const MIN_BYTES = Number(process.env.MIN_BYTES || 20000);

const BAD_TITLE =
  /hospital|military|memorial|cemetery|grave|blues|album|melbourne|sydney|cricket|tarp|\bproject 365\b|1\d{3}-|museum|archiv|photorealistic|deviantart|\bwlop\b|concept art|octane|\bsci[- ]?fi\b|blind lemon|kitchen recipe|recipe|menu|billboard|portrait of|painting of|vintage|antique|courthouse|capitol|\bpolitic|\bbishop\b|monk|sangha|temple|synagog|mosque|church|chapel|\bbottle tree\b|\blake\b|\briver\b|\bbay\b|\bpark\b|zoo|phonetograph|tesco|supermarket|street sign|\bgas station\b|\bparking|courtyard|\bloft duplex\b|\bhouse plant\b|\bplant\b|\banimal\b|\bdog\b|\bcat\b|\bhorse\b|\bbird\b|sparkler|fireworks|\bgraffiti\b|graffiter|meeting hall|conference|\boffice building\b|skyscraper|factory|\bwheat\b|harvest|pumpkin|halloween|valentine|easter|thanksgiving|white house|\bOSEC\b|\bn\d+_w\d+\b|\bimg_\d+\b|immeuble|b[âa]timent|geb[äa]ude|facade$/i;

const GOOD_TITLE =
  /christmas|xmas|holiday|wreath|bauble|ornament|festive|illuminat|snow|winter|table set|display window|bokeh|festival of light|nativity|tree (decorated|lights?)|lights? (bokeh|garden|string|fairy|installation|street|night)/i;

const query = process.argv[2];
const radius = Number(process.argv[3] || 25);
if (!query) {
  console.error("usage: node scripts/list-candidates.js \"<query>\" [offsetRadius]");
  process.exit(1);
}

const f = path.join(CACHE_DIR, encodeURIComponent(query) + ".json");
if (!fs.existsSync(f)) {
  console.error("no cache for query:", query);
  process.exit(1);
}
const json = JSON.parse(fs.readFileSync(f, "utf8"));
const results = json.results || [];
console.log(`# query: ${query}  (${results.length} results cached, result_count=${json.result_count})`);

let shown = 0;
results.forEach((r, i) => {
  const title = (r.title || "").trim();
  const bad = BAD_TITLE.test(title);
  if (bad) return;
  const w = r.width || 0;
  const h = r.height || 0;
  if (w < MIN_EDGE || h < MIN_EDGE) return;
  if (!/(\.[a-z]{3,4})(\?|$)/i.test(r.url)) return;
  const good = GOOD_TITLE.test(title);
  const kb = r.filesize ? Math.round(r.filesize / 1024) : "?";
  if (i <= radius * 2 || good) {
    console.log(
      `[${String(i).padStart(3)}] ${w}x${h} ${String(kb).padStart(5)}kb ${good ? "GOOD" : "    "} :: ${title || "(no title)"}`
    );
    shown++;
  }
});
console.log(`# ${shown} candidates shown (of ${results.length} cached)`);