import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { publishedReviews, type Review } from "@/lib/reviews";

export const dynamic = "force-dynamic";

export async function GET() {
  // Fetch live reviews from Supabase (newest first)
  const { data: submitted, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("Supabase GET error:", error);
    return NextResponse.json({ reviews: publishedReviews }, { status: 500 });
  }

  // Merge seed + live (seed first, then live newest-first)
  const reviews = [...publishedReviews, ...(submitted ?? [])];
  return NextResponse.json(
    { reviews },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    // Honeypot — bots fill this; silently drop
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

    // Insert into Supabase
    const { data: entry, error } = await supabase
      .from("reviews")
      .insert({ quote, name, detail, rating })
      .select()
      .single();

    if (error || !entry) {
      console.error("Supabase INSERT error:", error);
      return NextResponse.json({ error: "Server error." }, { status: 500 });
    }

    // Transform to Review type (snake_case → camelCase)
    const review: Review = {
      quote: entry.quote,
      name: entry.name,
      detail: entry.detail ?? "",
      rating: entry.rating,
    };

    return NextResponse.json({ ok: true, review }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}