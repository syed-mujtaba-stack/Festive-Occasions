"use client";

import { useState, type FormEvent } from "react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { StarInput } from "@/components/ui/star-rating";
import type { Review } from "@/lib/reviews";

const SERVICES = [
  "Christmas Decoration",
  "Villa Decoration",
  "Home Decoration",
  "Office Decoration",
  "Corporate Decoration",
  "Outdoor / Lighting",
  "Rental Christmas Decoration",
  "Other",
];

const RATING_LABELS: Record<number, string> = {
  1: "Needs Improvement",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Exceptional ★★★★★",
};

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm text-white placeholder:text-white/35 " +
  "focus:outline-none focus:border-[#dfba73] focus:ring-2 focus:ring-[#dfba73]/25 transition-all " +
  "hover:border-white/30 shadow-inner";

const labelCls = "block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1";

export function ReviewForm({
  onClose,
  onPosted,
}: {
  onClose: () => void;
  onPosted: (review: Review) => void;
}) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(5); // Pre-selected 5 stars for positive sentiment
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [honey, setHoney] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const displayRating = hover || rating;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    if (honey.trim()) return;

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!rating || rating < 1) {
      setError("Please select a star rating (1–5).");
      return;
    }
    if (!review.trim()) {
      setError("Please write a few words about your experience.");
      return;
    }

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
        | { ok?: boolean; review?: Review; error?: string }
        | null;

      if (!res.ok || !data?.review) {
        throw new Error(data?.error || "Submit failed");
      }

      onPosted(data.review);
      setSent(true);
    } catch {
      setError("Something went wrong — please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center py-6 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg">
          <FaCheckCircle className="h-8 w-8 text-emerald-400" aria-hidden />
        </div>
        <div>
          <h4 className="text-2xl font-serif font-bold text-white">
            Thank you, {name || "valued client"}!
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-white/70 max-w-sm">
            Your review is now live and featured in our Dubai client testimonials.
          </p>
        </div>

        <div className="flex items-center gap-1.5 my-2">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} className="h-4 w-4 text-amber-400 drop-shadow-[0_2px_4px_rgba(251,191,36,0.4)]" />
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 rounded-xl bg-gradient-to-r from-[#dfba73] via-[#f5e4bf] to-[#c6a15b] px-8 py-3 text-sm font-bold text-[#171312] shadow-lg transition-all hover:brightness-105 active:scale-95"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
      {/* Bot spam protection */}
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

      {/* Name Input */}
      <div>
        <label htmlFor="rv-name" className={labelCls}>
          Your Name <span aria-hidden className="text-amber-400 ml-0.5">*</span>
        </label>
        <input
          id="rv-name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          placeholder="e.g. Sarah Jenkins or The Al-Maktoum Family"
          className={inputCls}
        />
      </div>

      {/* Service Selection */}
      <div>
        <label htmlFor="rv-service" className={labelCls}>
          Service Provided <span className="text-[10px] font-normal text-white/50 normal-case">(Optional)</span>
        </label>
        <select
          id="rv-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={`${inputCls} cursor-pointer [&>option]:bg-[#1e1b19] [&>option]:text-white`}
        >
          <option value="">Select your service type…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Rating Picker Card */}
      <div className="rounded-2xl border border-[#c6a15b]/30 bg-[#c6a15b]/[0.08] p-3.5 sm:p-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
            Your Rating <span aria-hidden className="text-amber-400 ml-0.5">*</span>
          </span>
          {displayRating > 0 && (
            <span className="text-xs font-semibold text-[#dfba73] bg-[#c6a15b]/20 px-2.5 py-0.5 rounded-full border border-[#c6a15b]/30">
              {RATING_LABELS[displayRating] || `${displayRating} Stars`}
            </span>
          )}
        </div>
        <div className="flex items-center justify-start">
          <StarInput value={rating} onChange={setRating} hover={hover} onHover={setHover} />
        </div>
      </div>

      {/* Review Textarea */}
      <div>
        <label htmlFor="rv-review" className={labelCls}>
          Your Review <span aria-hidden className="text-amber-400 ml-0.5">*</span>
        </label>
        <textarea
          id="rv-review"
          required
          rows={3}
          maxLength={500}
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Share your experience — styling quality, installation team, or how the space looked..."
          className={`${inputCls} resize-none min-h-[95px] leading-relaxed`}
        />
        <div className="mt-1 flex items-center justify-between text-[11px] text-white/45">
          <span>Honest feedback helps others decide</span>
          <span>{review.length}/500</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div role="alert" className="rounded-xl bg-red-950/60 border border-red-500/40 px-4 py-3 text-xs sm:text-sm text-red-200 flex items-center gap-2.5 animate-fade-in">
          <svg className="h-4 w-4 shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-gradient-to-r from-[#dfba73] via-[#f5e4bf] to-[#c6a15b] px-6 py-3.5 text-sm font-bold text-[#171312] tracking-wide transition-all duration-300 hover:brightness-105 hover:shadow-[0_6px_25px_rgba(223,186,115,0.4)] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] shadow-[0_4px_20px_rgba(223,186,115,0.25)] flex items-center justify-center gap-2 cursor-pointer"
      >
        {sending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-[#171312]" viewBox="0 0 24 24" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting Your Review…
          </span>
        ) : (
          "Post Review"
        )}
      </button>

      <p className="text-[11px] leading-relaxed text-white/50 text-center">
        Your review appears immediately on our live carousel.
      </p>
    </form>
  );
}