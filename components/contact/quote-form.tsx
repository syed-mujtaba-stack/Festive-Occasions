"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";

const propertyTypes = [
  "Villa",
  "Home / Apartment",
  "Office",
  "Hotel / Hospitality",
  "Restaurant / Retail",
  "Corporate Event",
  "Other",
];

const services = [
  "Full Christmas Decoration",
  "Christmas Tree",
  "Villa Decoration",
  "Home Decoration",
  "Office Decoration",
  "Corporate Decoration",
  "Christmas Lighting",
  "Outdoor Decoration",
];

/**
 * QuoteForm — captures enquiry details and opens WhatsApp with a prefilled
 * message. No backend required; the client receives the enquiry directly.
 */
export function QuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [property, setProperty] = useState(propertyTypes[0]);
  const [service, setService] = useState(services[0]);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hi Festive Occasions, I would like a quote for Christmas decoration.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Property type: ${property}`,
      `Service: ${service}`,
    ];
    if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "w-full rounded-lg border hairline bg-white/70 px-4 py-3 text-sm text-espresso placeholder:text-cocoa/40 transition-colors focus:border-champagne focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border hairline bg-white/70 p-7 shadow-soft sm:p-9"
    >
      <p className="text-label text-champagne-deep">Request a quote</p>
      <h3 className="mt-2 font-display text-2xl text-espresso">
        Tell us about your space.
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-cocoa">
        Fill in the details and it opens WhatsApp with your message ready to
        send — nothing is stored on this site.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-espresso">
            Name
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-espresso">
            Phone / WhatsApp
          </span>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+971 5x xxx xxxx"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-espresso">
            Property type
          </span>
          <select
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            className={inputCls}
          >
            {propertyTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-espresso">
            Service
          </span>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputCls}
          >
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-espresso">
            Notes <span className="font-normal text-cocoa">(optional)</span>
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Area, dates, tree size, style preference…"
            rows={4}
            className={`${inputCls} resize-none`}
          />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1faa55] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#178a45] hover:-translate-y-0.5"
      >
        Send request on WhatsApp
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}