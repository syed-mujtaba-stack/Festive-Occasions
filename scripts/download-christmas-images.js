/* Download fresh Christmas decoration photos per site section.
 * Source: Openverse API (CC0 / public domain — no attribution required).
 * Downloads come straight from the source CDN (live.staticflickr.com etc.),
 * which is open. Lessons from earlier runs:
 *   - anonymous Openverse rejects page_size > 20 with 401/403 bursts;
 *   - niche queries return 0 results — each slot carries alt queries;
 *   - some CDN urls serve WEBP/PNG under a .jpg name — everything is
 *     transcoded through sharp (JPEG, max 2400px, q82) and dimension-checked;
 *     results are cached to disk so reruns only fetch what is missing.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const OUT_DIR = path.join(__dirname, "..", "public", "images", "christmas");
const CACHE_DIR = path.join(__dirname, "..", ".unsplash-cache", "openverse");
const RECORD_FILE = path.join(CACHE_DIR, "downloads-record.json");

/* MIN_EDGE rejects tiny product shots; MAX_EDGE keeps files web-sized. */
const MIN_EDGE = 900;
const MAX_EDGE = 2400;
const MIN_BYTES = 15000;

/* Titles that clearly do NOT match premium Christmas content — skip these
   candidates entirely (Flickr archives, album art, unrelated subjects). */
const BAD_TITLE =
  /hospital|military|memorial|cemetery|grave|blues|album|melbourne|sydney|cricket|tarp|\bproject 365\b|1\d{3}-|museum|archiv|photorealistic|deviantart|\bwlop\b|concept art|octane|\bsci[- ]?fi\b|blind lemon|kitchen recipe|recipe|menu|billboard|portrait of|painting of|vintage|antique|courthouse|capitol|\bpolitic|\bbishop\b|monk|sangha|temple|synagog|mosque|church|chapel|\bbottle tree\b|\blake\b|\briver\b|\bbay\b|\bpark\b|zoo|phonetograph|tesco|supermarket|street sign|\bgas station\b|\bparking|courtyard|\bloft duplex\b|\bhouse plant\b|\bplant\b|\banimal\b|\bdog\b|\bcat\b|\bhorse\b|\bbird\b|sparkler|fireworks|\bgraffiti\b|graffiter|meeting hall|conference|\boffice building\b|skyscraper|factory|\bwheat\b|harvest|pumpkin|halloween|valentine|easter|thanksgiving|white house|\bOSEC\b|\bn\d+_w\d+\b|\bimg_\d+\b|immeuble|b[âa]timent|geb[äa]ude|facade$|\d{4}-\d{3}-|\buntitled\b|\blight ?panel\b|\bhanging of the greens\b/i;

/* Candidates must be Christmas-holiday related: title OR any tag must carry
   at least one festive keyword. Keeps out generic/off-topic Flickr shots. */
const GOOD_TITLE =
  /christmas|xmas|no[eë]l|weihnacht|advents|navidad|f[êe]te des lumi[eè]res|holiday|festive|festival of lights|santa|saint nicholas|st\.? nicholas|wreath|garland|bauble|ornament|stocking|mistletoe|snowflake|snowman|snow-?covered|candy cane|gingerbread|tree (decorat|lights|ornament)|decorated (tree|room|hall|window|door)|festive (decor|lights|table|room)|christmas (tree|lights|decor|ornament|wreath|garland|ball|bazaar|market|display|window|table|interior|room|home|house|villa|garden|candle|card|gift|present|party|dinner|dining|mantel|fireplace|staircase|entrance|porch|facade)/i;

const SLOTS = [
  // Hero + intro — luxury interior shots.
  { file: "hero-signature", query: "christmas tree decorated living room", offset: 0 },
  { file: "home-intro", query: "christmas living room decorated", offset: 1 },
  { file: "signature-details", query: "christmas ornaments baubles", offset: 2 },
  { file: "final-cta-glow", query: "christmas lights bokeh", offset: 1 },
  // Audience cards — villa / office / venue.
  {
    file: "audience-villa",
    query: "christmas house lights night",
    alts: ["christmas lights street evening", "christmas dining room decorated"],
    offset: 1,
  },
  {
    file: "audience-office",
    query: "office christmas tree reception",
    alts: ["office christmas tree", "christmas party decoration"],
    offset: 1,
  },
  {
    file: "audience-venue",
    query: "christmas party decoration",
    alts: ["christmas restaurant decoration", "christmas dining room decorated"],
    offset: 3,
  },
  // Packages — cheer / fancy / luxury.
  {
    file: "pkg-cheers",
    query: "small decorated christmas tree",
    alts: ["christmas tree decorated living room"],
    offset: 0,
  },
  {
    file: "pkg-fancy",
    query: "christmas tree decorated living room",
    alts: ["gold christmas tree luxury", "christmas dining room decorated"],
    offset: 4,
  },
  {
    file: "pkg-luxury",
    query: "gold christmas tree luxury",
    alts: ["christmas party decoration", "christmas ornaments baubles"],
    offset: 0,
  },
  // Services.
  {
    file: "svc-complete",
    query: "christmas decorations interior",
    alts: ["christmas interior decoration", "christmas living room decorated"],
    offset: 9,
  },
  {
    file: "svc-villa",
    query: "christmas house lights night",
    alts: ["christmas dining room decorated", "christmas lights street evening"],
    offset: 11,
  },
  {
    file: "svc-home",
    query: "cozy christmas living room",
    alts: ["christmas tree decorated living room", "christmas fireplace mantel"],
    offset: 0,
  },
  {
    file: "svc-office",
    query: "office christmas tree",
    alts: ["office christmas tree reception", "christmas party decoration"],
    offset: 2,
  },
  {
    file: "svc-corporate",
    query: "christmas party decoration",
    alts: ["christmas decorations interior", "christmas store window display"],
    offset: 4,
  },
  {
    file: "svc-lighting",
    query: "christmas lights street evening",
    alts: ["christmas party decoration", "christmas decorations interior"],
    offset: 30,
  },
  {
    file: "svc-outdoor",
    query: "christmas garden decoration lights",
    alts: ["christmas lights street evening", "christmas house lights night"],
    offset: 1,
  },
  // Detail strip — one per page section.
  {
    file: "detail-pillar-1",
    query: "christmas decorations interior",
    alts: ["christmas ornaments baubles", "christmas table setting"],
    offset: 1,
  },
  { file: "detail-pillar-2", query: "christmas table setting", alts: ["christmas party decoration"], offset: 1 },
  {
    file: "detail-pillar-3",
    query: "christmas party decoration",
    alts: ["christmas lights street evening", "christmas decorations interior"],
    offset: 18,
  },
  {
    file: "detail-villa-1",
    query: "christmas dining room decorated",
    alts: ["christmas house lights night", "christmas decorations interior"],
    offset: 0,
  },
  {
    file: "detail-villa-2",
    query: "christmas dining room decorated",
    alts: ["christmas table setting", "christmas decorations interior"],
    offset: 2,
  },
  {
    file: "detail-villa-3",
    query: "christmas party decoration",
    alts: ["christmas house lights night", "christmas decorations interior"],
    offset: 26,
  },
  {
    file: "detail-home-1",
    query: "cozy christmas living room",
    alts: ["christmas tree decorated living room", "christmas living room decorated"],
    offset: 1,
  },
  {
    file: "detail-home-2",
    query: "christmas living room decorated",
    alts: ["christmas tree decorated living room", "christmas decorations interior"],
    offset: 2,
  },
  {
    file: "detail-home-3",
    query: "christmas decorations interior",
    alts: ["cozy christmas home interior", "christmas ornaments baubles"],
    offset: 13,
  },
  {
    file: "detail-office-1",
    query: "christmas party decoration",
    alts: ["christmas decorations interior", "christmas store window display"],
    offset: 41,
  },
  {
    file: "detail-office-2",
    query: "christmas party decoration",
    alts: ["christmas decorations interior", "christmas store window display"],
    offset: 52,
  },
  {
    file: "detail-office-3",
    query: "christmas party decoration",
    alts: ["christmas decorations interior", "christmas store window display"],
    offset: 58,
  },
  {
    file: "detail-corporate-1",
    query: "christmas store window display",
    alts: ["christmas party decoration", "christmas decorations interior"],
    offset: 1,
  },
  {
    file: "detail-corporate-2",
    query: "christmas party decoration",
    alts: ["christmas decorations interior", "christmas store window display"],
    offset: 8,
  },
  {
    file: "detail-corporate-3",
    query: "christmas party decoration",
    alts: ["christmas restaurant decoration", "christmas dining room decorated"],
    offset: 9,
  },
  {
    file: "detail-lighting-1",
    query: "christmas lights bokeh",
    alts: ["christmas ornaments baubles", "christmas lights installation"],
    offset: 3,
  },
  {
    file: "detail-lighting-2",
    query: "christmas lights street evening",
    alts: ["christmas party decoration", "christmas decorations interior"],
    offset: 24,
  },
  {
    file: "detail-lighting-3",
    query: "christmas lights bokeh",
    alts: ["christmas lights installation", "christmas party decoration"],
    offset: 8,
  },
  {
    file: "detail-outdoor-1",
    query: "christmas lights street evening",
    alts: ["christmas party decoration", "christmas decorations interior"],
    offset: 40,
  },
  {
    file: "detail-outdoor-2",
    query: "christmas lights street evening",
    alts: ["christmas party decoration", "christmas decorations interior"],
    offset: 33,
  },
  {
    file: "detail-outdoor-3",
    query: "christmas lights street evening",
    alts: ["christmas garden decoration lights", "christmas house lights night"],
    offset: 4,
  },
  // Blog heroes (distinct images).
  {
    file: "blog-1",
    query: "christmas party decoration",
    alts: ["christmas decorations interior", "christmas ornaments baubles"],
    offset: 46,
  },
  {
    file: "blog-2",
    query: "christmas decoration packages gifts",
    alts: ["christmas decorations interior", "christmas table setting"],
    offset: 0,
  },
  {
    file: "blog-3",
    query: "christmas dining room decorated",
    alts: ["christmas house lights night", "christmas lights street evening"],
    offset: 9,
  },
  {
    file: "blog-4",
    query: "christmas ornaments baubles",
    alts: ["christmas decorations interior", "christmas table setting"],
    offset: 1,
  },
  {
    file: "blog-5",
    query: "christmas tree decorated living room",
    alts: ["small decorated christmas tree", "christmas gifts under tree"],
    offset: 2,
  },
  {
    file: "blog-6",
    query: "christmas party decoration",
    alts: ["office christmas tree", "christmas decorations interior"],
    offset: 6,
  },
  {
    file: "blog-7",
    query: "christmas lights bokeh",
    alts: ["christmas lights installation", "christmas garden decoration lights"],
    offset: 6,
  },
  { file: "blog-8", query: "christmas party decoration", alts: ["christmas living room decorated", "christmas decorations interior"], offset: 56 },
  // Support-page heroes — one distinct image per page section.
  {
    file: "page-areas",
    query: "christmas lights street evening",
    alts: ["christmas garden decoration lights", "christmas house lights night"],
    offset: 0,
  },
  {
    file: "page-about",
    query: "christmas ornaments baubles",
    alts: ["christmas decorations interior", "christmas table setting"],
    offset: 3,
  },
  {
    file: "page-about-portrait",
    query: "christmas ornaments baubles",
    alts: ["cozy christmas living room", "christmas table setting"],
    offset: 5,
  },
  {
    file: "page-contact",
    query: "christmas table setting",
    alts: ["christmas ornaments baubles", "christmas party decoration"],
    offset: 3,
  },
  {
    file: "page-other",
    query: "christmas party decoration",
    alts: ["christmas decorations interior", "christmas restaurant decoration"],
    offset: 36,
  },
  {
    file: "page-uae",
    query: "christmas lights street evening",
    alts: ["christmas lights installation", "christmas house lights night"],
    offset: 13,
  },
  {
    file: "page-blog",
    query: "christmas table setting",
    alts: ["christmas ornaments baubles", "christmas decorations interior"],
    offset: 0,
  },
];

const UA = "FestiveOccasions/1.0 (asset pipeline; contact: hello@festiveoccasions.ae)";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/* null-safe: some Openverse results have a null title. */
const clean = (s) =>
  String(s || "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* fetch with network retry (DNS hiccups surface as "fetch failed"). */
async function fetchWithRetry(url, retries = 3) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      return res;
    } catch (e) {
      lastErr = e;
      await sleep(3000 * (i + 1));
    }
  }
  throw lastErr || new Error("fetch failed " + url);
}

async function fetchJson(url, retries = 7) {
  for (let i = 0; i < retries; i++) {
    const res = await fetchWithRetry(url, 3);
    // 401/403/429 = throttled anonymous access — back off long.
    if (res.status === 429 || res.status === 401 || res.status === 403) {
      const wait = Math.min(Number(res.headers.get("retry-after") || 45), 120) * 1000;
      console.log("...throttled (" + res.status + "), backoff " + wait + "ms");
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error("HTTP " + res.status + " " + url);
    return res.json();
  }
  throw new Error("retries exhausted " + url);
}

/* Fetch up to MAX_PAGES of results per query and merge them into one cached
   JSON (page-1-only caches were exhausting shared query pools too fast). */
const MAX_PAGES = 3;

async function search(query) {
  const cacheFile = path.join(CACHE_DIR, encodeURIComponent(query) + ".json");
  if (fs.existsSync(cacheFile)) {
    const cached = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    if ((cached.results || []).length > 0) return cached;
  }
  const results = [];
  let resultCount = 0;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const url =
      "https://api.openverse.org/v1/images/?q=" +
      encodeURIComponent(query) +
      "&license=cc0,pdm&page_size=20&page=" +
      page;
    const json = await fetchJson(url);
    if (page === 1) resultCount = json.result_count || 0;
    results.push(...(json.results || []));
    if (page < MAX_PAGES) await sleep(15000); // pace — anonymous API throttles bursts
  }
  const merged = {
    result_count: resultCount,
    page_count: Math.ceil(resultCount / 20),
    page_size: 20,
    page: 1,
    results,
  };
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(cacheFile, JSON.stringify(merged));
  return merged;
}

/* First non-empty result list among query + its alts (all cached). */
async function searchWithAlts(slot) {
  const queries = [slot.query, ...(slot.alts || [])];
  for (const q of queries) {
    const json = await search(q);
    if ((json.results || []).length) return json;
    console.log("   (0 results for \"" + q + "\", trying alt)");
  }
  return { results: [] };
}

/* Flickr static urls use size suffixes; try a larger size first. */
function bigUrl(url) {
  if (/live\.staticflickr\.com\/.*_b\.jpg$/.test(url)) {
    return url.replace(/_b\.jpg$/, "_h.jpg");
  }
  return url;
}

/* Download → transcode via sharp (JPEG, bounded) → dimension check. */
async function download(url, filePath) {
  let res = await fetchWithRetry(url, 3);
  if (!res.ok) {
    // fall back to original url if the upscaled one 404'd
    if (url.includes("_h.jpg")) return download(url.replace("_h.jpg", "_b.jpg"), filePath);
    throw new Error("HTTP " + res.status + " " + url);
  }
  const raw = Buffer.from(await res.arrayBuffer());
  if (raw.length < MIN_BYTES) throw new Error("too small " + raw.length);
  const out = await sharp(raw)
    .rotate() // honor EXIF orientation
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  const meta = await sharp(out).metadata();
  const edge = Math.max(meta.width, meta.height);
  if (edge < MIN_EDGE) throw new Error("low-res " + meta.width + "x" + meta.height);
  fs.writeFileSync(filePath, out);
}

/* Seed already-used source filenames from previous runs' record. */
function loadRecord() {
  try {
    return JSON.parse(fs.readFileSync(RECORD_FILE, "utf8"));
  } catch {
    return [];
  }
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const record = loadRecord();
  const used = new Set(
    record.map((r) => (r.sourceUrl || "").split("/").pop()).filter(Boolean)
  );
  let ok = 0;
  let fail = 0;

  for (const slot of SLOTS) {
    const outFile = path.join(OUT_DIR, slot.file + ".jpg");
    if (fs.existsSync(outFile) && fs.statSync(outFile).size > MIN_BYTES) {
      console.log("SKIP " + slot.file);
      ok++;
      continue;
    }
    try {
      const json = await searchWithAlts(slot);
      const results = (json.results || []).filter((r) => r && r.url);
      if (!results.length) throw new Error("no results for " + slot.query);

      // Ordered candidate list around the slot's offset, deduped within run.
      const order = [];
      for (let d = 0; d <= 12 && order.length < results.length; d++) {
        for (const idx of [slot.offset + d, slot.offset - d]) {
          if (idx >= 0 && idx < results.length) order.push(results[idx]);
        }
      }

      let pick = null;
      let lastErr = null;
      /* Prefer festive-keyworded candidates; fall back to any non-BAD pick so
         thin pools still fill. */
      const festive = [];
      const plain = [];
      for (const cand of order) {
        const key = cand.url.split("/").pop();
        if (used.has(key)) continue;
        /* Skip clearly-unrelated / archival / AI-art candidates by title. */
        if (BAD_TITLE.test((cand.title || "") + " " + (cand.tags || []).map((t) => t.name || "").join(" ")))
          continue;
        const text = (cand.title || "") + " " + (cand.tags || []).map((t) => t.name || "").join(" ");
        (GOOD_TITLE.test(text) ? festive : plain).push(cand);
      }
      const ordered = festive.length ? festive : plain;
      for (const cand of ordered) {
        const key = cand.url.split("/").pop();
        try {
          await download(bigUrl(cand.url), outFile);
          pick = cand;
          used.add(key);
          break;
        } catch (e) {
          lastErr = e; // try next candidate
        }
      }
      if (!pick) throw lastErr || new Error("no usable result for " + slot.query);

      ok++;
      const entry = {
        file: slot.file + ".jpg",
        title: clean(pick.title),
        license: pick.license,
        sourceUrl: pick.url,
        foreignId: pick.foreign_landing_url || "",
      };
      const at = record.findIndex((r) => r.file === entry.file);
      if (at >= 0) record[at] = entry;
      else record.push(entry);
      console.log("OK " + slot.file + " <- " + clean(pick.title).slice(0, 48));
    } catch (e) {
      fail++;
      console.log("FAIL " + slot.file + " :: " + e.message);
    }
    await sleep(4000); // pace between slots
  }

  fs.writeFileSync(RECORD_FILE, JSON.stringify(record, null, 2));
  console.log("\nDONE ok=" + ok + " fail=" + fail);
  if (fail > 0) process.exitCode = 1;
})().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
