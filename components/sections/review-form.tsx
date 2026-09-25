"use client";

import { useState, type FormEvent } from "react";
import { FaTree } from "react-icons/fa";
import { StarInput } from "@/components/ui/star-rating";
import type { Review } from "@/lib/reviews";

const SERVICES = [
  "Christmas Decoration",
  "Villa Decoration",
  "Home Decoration",
  "Office Decoration",
  "Corporate Decoration",
  "Outdoor / Lighting",
  "Other",
];

const inputCls =
  "w-full rounded-md border hairline bg-background px-3 py-2 text-sm text-espresso placeholder:text-warm-gray-deep " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne transition-colors";

/**
 * Review form (lives inside the Rate-Us modal). Sends the review to
 * /api/reviews; on success the new review object is handed straight up
 * via `onPosted` so it appears in the testimonials grid instantly —
 * no page reload, no window events.
 */
export function ReviewForm({
  onClose,
  onPosted,
}: {
  onClose: () => void;
  onPosted: (review: Review) => void;
}) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [honey, setHoney] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honey.trim()) return; // bot trap

    if (!name.trim()) return setError("Please add your name.");
    if (!rating) return setError("Please choose a star rating (1–5).");
    if (!review.trim()) return setError("Please write a few words about your experience.");

    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          quote: review.trim(),
          detail: service,
          honey,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; review?: Review }
        | null;
      if (!res.ok || !data?.review) throw new Error("submit failed");

      // Hand the published review to the grid immediately — no reload needed.
      onPosted(data.review);
      setSent(true);
      setName("");
      setService("");
      setRating(0);
      setHover(0);
      setReview("");
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="mt-6 flex flex-1 flex-col items-start justify-center gap-3 rounded-md border border-champagne/40 bg-champagne/10 p-6">
        <p className="text-lg font-semibold text-espresso">
          Thank you! Your review is now live.{" "}
          <FaTree aria-hidden className="inline-block h-5 w-5 text-emerald-600" />
        </p>
        <p className="text-sm leading-relaxed text-cocoa">
          It appears in our testimonials section for everyone to see.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-1 rounded-md border hairline px-5 py-2.5 text-sm font-semibold text-espresso transition-colors hover:bg-espresso/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
      <div className="sr-only" aria-hidden>
        <label htmlFor="hp-company">Company</label>
        <input
          id="hp-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="rv-name" className="text-sm font-semibold text-espresso">
          Name <span aria-hidden className="text-red-700">*</span>
        </label>
        <input
          id="rv-name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={`${inputCls} mt-1.5`}
        />
      </div>

      <div>
        <label htmlFor="rv-service" className="text-sm font-semibold text-espresso">
          Service (optional)
        </label>
        <select
          id="rv-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={`${inputCls} mt-1.5`}
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="text-sm font-semibold text-espresso">Your rating</span>
        <div className="mt-1.5">
          <StarInput value={rating} onChange={setRating} hover={hover} onHover={setHover} />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="rv-review" className="text-sm font-semibold text-espresso">
          Your review <span aria-hidden className="text-red-700">*</span>
        </label>
        <textarea
          id="rv-review"
          required
          rows={4}
          maxLength={400}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Tell us about your experience…"
          className={`${inputCls} mt-1.5 resize-none`}
        />
        <p className="mt-1 text-right text-xs text-warm-gray-deep">{review.length}/400</p>
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="rounded-md bg-espresso px-5 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-espresso/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne disabled:opacity-60"
      >
        {sending ? "Posting…" : "Post Review"}
      </button>
      <p className="text-xs leading-relaxed text-warm-gray-deep">
        Your review appears publicly after a quick spam check. We never invent
        reviews — every one here is from a real submission.
      </p>
    </form>
  );
}