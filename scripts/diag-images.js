/* Quick state diagnostic — which slots exist, from which query, source info. */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "public", "images", "christmas");
const RECORD = path.join(__dirname, "..", ".unsplash-cache", "openverse", "downloads-record.json");

const record = JSON.parse(fs.readFileSync(RECORD, "utf8"));
const byFile = new Map(record.map((r) => [r.file, r]));

const slots = [
  "hero-signature","home-intro","signature-details","final-cta-glow",
  "audience-villa","audience-office","audience-venue",
  "pkg-cheers","pkg-fancy","pkg-luxury",
  "svc-complete","svc-villa","svc-home","svc-office","svc-corporate","svc-lighting","svc-outdoor",
  "detail-pillar-1","detail-pillar-2","detail-pillar-3",
  "detail-villa-1","detail-villa-2","detail-villa-3",
  "detail-home-1","detail-home-2","detail-home-3",
  "detail-office-1","detail-office-2","detail-office-3",
  "detail-corporate-1","detail-corporate-2","detail-corporate-3",
  "detail-lighting-1","detail-lighting-2","detail-lighting-3",
  "detail-outdoor-1","detail-outdoor-2","detail-outdoor-3",
  "blog-1","blog-2","blog-3","blog-4","blog-5","blog-6","blog-7","blog-8",
  "page-areas","page-about","page-about-portrait","page-contact","page-other","page-uae","page-blog",
];

for (const s of slots) {
  const file = s + ".jpg";
  const onDisk = fs.existsSync(path.join(OUT, file));
  const size = onDisk ? Math.round(fs.statSync(path.join(OUT, file)).size / 1024) + "kb" : "—";
  const rec = byFile.get(file);
  const title = rec ? rec.title.slice(0, 70) : "(no record)";
  const src = rec ? rec.sourceUrl.split("/").pop() : "";
  console.log(`${onDisk ? "  ✓" : "✗✗"} ${file.padEnd(28)} ${size.padEnd(6)} ${title.padEnd(72)} ${src}`);
}