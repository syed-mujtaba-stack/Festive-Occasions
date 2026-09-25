import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { publishedReviews, type Review } from "@/lib/reviews";

/**
 * Reviews API — live, public review store (no WhatsApp hop).
 *
 * Storage: a JSON file on the server (data/reviews.json). Works on `next start`
 * and any Node/VPS hosting. If the site later moves to serverless (Vercel),
 * swap the two fs helpers for a KV store — the API contract stays identical.
 *
 * GET  /api/reviews → curated seed (lib/reviews.ts) + live submissions
 * POST /api/reviews → validate + append + return the new review
 *
 * Spam basics (no backend): honeypot field, length caps, 1–5 integer rating,
 * max submissions cap. Reviews go public instantly as the client requested.
 */

const FILE = path.join(process.cwd(), "data", "reviews.json");
const MAX_SUBMITTED = 200;

type ReviewStore = { submitted: Review[] };

async function readStore(): Promise<ReviewStore> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as ReviewStore;
    return Array.isArray(parsed?.submitted) ? parsed : { submitted: [] };
  } catch {
    return { submitted: [] };
  }
}

export const dynamic = "force-dynamic";

export async function GET() {
  const { submitted } = await readStore();
  const reviews = [...publishedReviews, ...submitted];
  return NextResponse.json(
    { reviews },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    // Honeypot — bots fill this; silently drop.
    if (typeof body.honey === "string" && body.honey.trim()) {
      return NextResponse.json({ error: "spam" }, { status: 400 });
    }

    const name = String(body.name ?? "").trim().slice(0, 60);
    const quote = String(body.quote ?? "").trim().slice(0, 400);
    const detail = String(body.detail ?? "").trim().slice(0, 80);
    const rating = Number(body.rating);

    if (!name || !quote) {
      return NextResponse.json({ error: "Name and review are required." }, { status: 400 });
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be an integer 1–5." }, { status: 400 });
    }

    const store = await readStore();
    if (store.submitted.length >= MAX_SUBMITTED) {
      return NextResponse.json({ error: "Store full." }, { status: 429 });
    }

    const entry: Review = { quote, name, detail, rating };
    store.submitted.push(entry);

    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(store, null, 2), "utf8");

    return NextResponse.json({ ok: true, review: entry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}