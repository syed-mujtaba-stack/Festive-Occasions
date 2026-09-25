// Ping IndexNow (Bing, Yandex, Seznam, DuckDuckGo) so the full site is
// picked up fast. Google ignores IndexNow — that's GSC's job (see docs).
// Run: node scripts/ping-indexnow.mjs
//      node scripts/ping-indexnow.mjs --base http://localhost:3000  (local test)
const HOST = "www.festiveoccasions.ae";
const KEY = "263ee88d-2bf9-4981-b450-efde7fd51153";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  const base = process.argv.includes("--base")
    ? process.argv[process.argv.indexOf("--base") + 1]
    : `https://${HOST}`;

  // Pull URLs from the build's sitemap, normalise to the www host.
  const res = await fetch(`${base}/sitemap.xml`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace("https://festiveoccasions.ae", `https://${HOST}`))
    .filter((u, i, a) => a.indexOf(u) === i);

  console.log(`Submitting ${urls.length} URLs to IndexNow for ${HOST}...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  console.log("IndexNow response:", r.status, r.statusText);
  if (r.status === 200 || r.status === 202) {
    console.log("Accepted — URLs submitted to Bing/IndexNow.");
  } else {
    const body = await r.text().catch(() => "");
    console.log("Body:", body.slice(0, 300));
    process.exitCode = 1;
  }
}

main();