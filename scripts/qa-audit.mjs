#!/usr/bin/env node
/**
 * QA + SEO audit crawler for Festive Occasions.
 * Fetches every route from the sitemap, plus known extras, and checks:
 *   status, title length, meta description, canonical, OG/Twitter, H1/H2,
 *   JSON-LD, image alt text, internal link health, image availability.
 * Output: JSON report to stdout (run: node scripts/qa-audit.mjs [baseUrl])
 */
import { writeFileSync } from "node:fs";
const BASE = process.argv[2] || "http://localhost:3000";

const KNOWN_ROUTES = [
  "/",
  "/about",
  "/areas-we-serve",
  "/blog",
  "/contact",
  "/gallery",
  "/other-occasions",
  "/packages",
  "/privacy-policy",
  "/terms",
  "/christmas-decoration-dubai",
  "/christmas-decoration-uae",
  "/christmas-villa-decoration-dubai",
  "/christmas-home-decoration-dubai",
  "/christmas-office-decoration-dubai",
  "/christmas-corporate-decoration-dubai",
  "/christmas-lighting-dubai",
  "/outdoor-christmas-decoration-dubai",
];

async function fetchHtml(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "user-agent": "qa-audit/1.0" },
    redirect: "follow",
  });
  const html = await res.text();
  return { res, html };
}

function grab(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

function grabAll(html, re) {
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1] !== undefined ? m[1] : m[0]);
  return out;
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

async function auditPage(path) {
  let res, html;
  try {
    ({ res, html } = await fetchHtml(path));
  } catch (e) {
    return { path, status: "FETCH_ERROR", error: String(e) };
  }
  if (!res.ok) return { path, status: res.status, error: `HTTP ${res.status}` };

  const title = grab(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const descMeta = grab(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    || grab(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const canonical = grab(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)
    || grab(html, /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
  const ogTitle = grab(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
  const ogDesc = grab(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i);
  const ogImage = grab(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i);
  const ogUrl = grab(html, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']*)["']/i);
  const twCard = grab(html, /<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']*)["']/i);
  const h1s = grabAll(html, /<h1[^>]*>[\s\S]*?<\/h1>/gi);
  const h2s = grabAll(html, /<h2[^>]*>[\s\S]*?<\/h2>/gi);
  const jsonLd = grabAll(html, /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  const imgs = grabAll(html, /<img[\s>][^>]*>/gi);
  const missingAlt = imgs.filter((t) => !/\salt=["']/.test(t));
  const emptyAlt = imgs.filter((t) => /\salt=["']\s*["']/.test(t));
  const links = grabAll(html, /<a[^>]+href=["']([^"']*)["'][^>]*>/gi)
    .map(decodeEntities)
    .filter((h) => h && !h.startsWith("#") && !h.startsWith("mailto:") && !h.startsWith("tel:") && !h.startsWith("javascript:") && !h.startsWith("data:"));

  const h1Texts = h1s.map((h) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  const h2Texts = h2s.map((h) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());

  const issues = [];
  const cleanTitle = title ? decodeEntities(title).replace(/\s+/g, " ").trim() : null;
  if (!cleanTitle) issues.push("missing <title>");
  else if (cleanTitle.length > 70) issues.push(`title too long (${cleanTitle.length} chars): ${cleanTitle}`);
  else if (cleanTitle.length < 15) issues.push(`title too short (${cleanTitle.length} chars): ${cleanTitle}`);

  if (!descMeta) issues.push("missing meta description");
  else if (descMeta.length > 165) issues.push(`meta description too long (${descMeta.length} chars)`);
  else if (descMeta.length < 40) issues.push(`meta description too short (${descMeta.length} chars)`);

  if (!canonical) issues.push("missing canonical");
  else if (path === "/" && canonical !== "https://festiveoccasions.ae") issues.push(`canonical mismatch: ${canonical}`);
  else if (path !== "/" && !canonical.endsWith(path)) issues.push(`canonical mismatch: ${canonical} (page: ${path})`);

  if (!ogTitle) issues.push("missing og:title");
  if (!ogDesc) issues.push("missing og:description");
  if (!ogImage) issues.push("missing og:image");
  if (ogUrl && decodeEntities(ogUrl) !== `${BASE}${path}` && !decodeEntities(ogUrl).includes("festiveoccasions.ae")) issues.push(`og:url odd: ${ogUrl}`);
  if (!twCard) issues.push("missing twitter:card");

  if (h1s.length === 0) issues.push("no H1");
  else if (h1s.length > 1) issues.push(`multiple H1s (${h1s.length}): ${h1Texts.join(" | ")}`);

  if (!jsonLd.length) issues.push("no JSON-LD");
  else if (jsonLd.filter((j) => { try { JSON.parse(j.replace(/<[^>]+>/g, "")); return true; } catch { return false; } }).length === 0) issues.push("JSON-LD present but unparseable");

  if (missingAlt.length) issues.push(`${missingAlt.length} <img> without alt attribute`);
  if (emptyAlt.length) issues.push(`${emptyAlt.length} <img> with empty alt (decorative only)`);

  return {
    path,
    status: res.status,
    title: cleanTitle,
    titleLen: cleanTitle ? cleanTitle.length : 0,
    descLen: descMeta ? descMeta.length : 0,
    canonical,
    og: { title: !!ogTitle, desc: !!ogDesc, image: !!ogImage, url: ogUrl },
    tw: !!twCard,
    h1: h1Texts,
    h2Count: h2s.length,
    jsonLdCount: jsonLd.length,
    imgCount: imgs.length,
    missingAltCount: missingAlt.length,
    links: links,
    issues,
  };
}

async function headCheck(url) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    return res.status;
  } catch {
    return "ERR";
  }
}

async function main() {
  // Discover blog routes from sitemap
  let routes = [...KNOWN_ROUTES];
  try {
    const sx = await (await fetch(`${BASE}/sitemap.xml`)).text();
    const urls = grabAll(sx, /<loc>([^<]+)<\/loc>/g).map((u) => decodeEntities(u).replace(/^https:\/\/festiveoccasions\.ae/, ""));
    routes = [...new Set([...routes, ...urls])];
  } catch {
    /* fine */
  }

  const report = { base: BASE, generated: new Date().toISOString(), pages: [], brokenLinks: {}, brokenImages: [] };

  for (const route of routes) {
    if (route.includes("sitemap") || route.includes("robots")) continue;
    const page = await auditPage(route);
    report.pages.push(page);
  }

  // Global link health — collect unique internal links across pages
  const linkSet = new Set();
  for (const p of report.pages) {
    if (!p.links) continue;
    for (const l of p.links) {
      if (l.startsWith("http")) continue; // external
      linkSet.add(l.split(/[?#]/)[0] === "/" ? "/" : l.split(/[?#]/)[0]);
    }
  }
  for (const href of [...linkSet].sort()) {
    if (href.startsWith("/images") || href.startsWith("/_next") || href.startsWith("/favicon") || href.startsWith("/icon")) continue;
    const status = await headCheck(`${BASE}${href}`);
    if (status === 404 || status === "ERR") report.brokenLinks[href] = `${status}`;
  }

  // Image health — images referenced in HTML
  const imgSet = new Set();
  for (const p of report.pages) {
    const html = await (await fetch(`${BASE}${p.path}`)).text();
    for (const src of grabAll(html, /<img[^>]+src=["']([^"']+)["']/gi)) {
      if (src.startsWith("data:")) continue;
      imgSet.add(src.split(/[?#]/)[0]);
    }
    for (const src of grabAll(html, /srcSet=["'][^"']*["']/gi)) {
      const urls = src.match(/https?:\/\/[^\s,]+|["']([^"']+)["']/g);
      for (const u of (urls || [])) {
        const s = u.replace(/^["']|["']$/g, "");
        if (s && !s.startsWith("data:")) imgSet.add(s.split(/[?#]/)[0]);
      }
    }
  }
  for (const src of [...imgSet].sort()) {
    const status = await headCheck(`${BASE}${src}`);
    if (status === 404 || status === "ERR") report.brokenImages.push({ src, status: `${status}` });
  }

  // Summaries
  const withIssues = report.pages.filter((p) => p.issues && p.issues.length);
  report.summary = {
    pagesChecked: report.pages.length,
    pagesWithIssues: withIssues.length,
    brokenLinks: Object.keys(report.brokenLinks).length,
    brokenImages: report.brokenImages.length,
    totalIssues: withIssues.reduce((a, p) => a + p.issues.length, 0) + Object.keys(report.brokenLinks).length + report.brokenImages.length,
  };

  writeFileSync(`${process.cwd()}/scripts/qa-report.json`, JSON.stringify(report, null, 2), "utf8");
  console.error(`WROTE scripts/qa-report.json — ${report.summary.pagesChecked} pages, ${report.summary.totalIssues} issues`);
  process.exit(0);
}

main();