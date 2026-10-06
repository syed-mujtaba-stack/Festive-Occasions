"use client";

import { useState } from "react";
import { FaTree, FaHome, FaCity, FaBriefcase, FaHotel } from "react-icons/fa";
import { cn } from "@/lib/utils";

const SPACE_TYPES = [
  { id: "villa", label: "Luxury Villa", icon: FaHome },
  { id: "apartment", label: "Apartment / Penthouse", icon: FaCity },
  { id: "office", label: "Corporate Office", icon: FaBriefcase },
  { id: "venue", label: "Hotel / Grand Venue", icon: FaHotel },
];

const EVENT_TYPES = [
  "Christmas Decoration",
  "Villa Christmas Decoration",
  "Home Christmas Decoration",
  "Office Christmas Decoration",
  "Corporate Christmas Decoration",
  "Christmas Lighting",
  "Outdoor Christmas Decoration",
  "Other",
];

const inputCls = "w-full rounded-md border hairline bg-background px-3 py-2 text-sm text-espresso placeholder:text-warm-gray-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne transition-colors";

export function BookingForm({ initialData }: { initialData: { eventType: string } }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [spaceType, setSpaceType] = useState(initialData.eventType || "Christmas Decoration");
  const [budget, setBudget] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter your email.");
    if (!phone.trim()) return setError("Please enter your phone number.");
    
    setLoading(true);
    setError("");
    setSent(false);

    // Generate WhatsApp message
    const whatsappMessage = `Hi Festive Occasions, I would like to enquire about ${spaceType}. 

Details:
• Name: ${name}
• Email: ${email}
• Phone: ${phone}
• Budget: ${budget || "Not specified"}
• Additional Notes: ${additionalNotes || "None"}`

    window.open(`https://wa.me/971564284444?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    setSent(true);
    setName("");
    setEmail("");
    setPhone("");
    setBudget("");
    setAdditionalNotes("");
    setLoading(false);
  };

  return (
    <Section id="booking" tone="cream">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Get a Custom Quote"
            title={initialData.eventType || "Christmas Decoration Inquiry"}
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Name */}
          <div>
            <label htmlFor="bf-name" className="text-sm font-semibold text-espresso mb-2">
              Full Name <span aria-hidden className="text-red-700">*</span>
            </label>
            <input
              id="bf-name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${inputCls} mb-4`}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="bf-email" className="text-sm font-semibold text-espresso mb-2">
              Email <span aria-hidden className="text-red-700">*</span>
            </label>
            <input
              id="bf-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputCls} mb-4`}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="bf-phone" className="text-sm font-semibold text-espresso mb-2">
              Phone Number <span aria-hidden className="text-red-700">*</span>
            </label>
            <input
              id="bf-phone"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${inputCls} mb-4`}
            />
          </div>

          {/* Space Type */}
          <div>
            <label htmlFor="bf-space" className="text-sm font-semibold text-espresso mb-2">
              Property Type
            </label>
            <select
              id="bf-space"
              value={spaceType}
              onChange={(e) => setSpaceType(e.target.value)}
              className="w-full rounded-md border hairline bg-background px-3 py-2 text-sm text-espresso placeholder:text-warm-gray-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne transition-colors mb-4"
            >
              <option value="">Select property type...</option>
              {SPACE_TYPES.map((space) => (
                <option key={space.id} value={space.label}>
                  {space.label}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="bf-budget" className="text-sm font-semibold text-espresso mb-2">
              Budget Range (AED)
            </label>
            <input
              id="bf-budget"
              type="number"
              placeholder="e.g., 15000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-md border hairline bg-background px-3 py-2 text-sm text-espresso placeholder:text-warm-gray-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne transition-colors mb-4"
            />
            <p className="text-xs text-warm-gray-deet">Starting from AED 6,000 + VAT for Christmas Cheers package</p>
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="bf-notes" className="text-sm font-semibold text-espresso mb-2">
              Additional Notes
            </label>
            <textarea
              id="bf-notes"
              rows={3}
              placeholder="Share any specific requirements, ceiling heights, preferred dates, or inspiration images..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full rounded-md border hairline bg-background px-3 py-2 text-sm text-espresso placeholder:text-warm-gray-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne resize-none mb-4"
            />
          </div>

          {/* WhatsApp CTA */}
          <div className="lg:col-span-3">
            <Button
              variant="whatsapp"
              href={`https://wa.me/971564284444?text=${encodeURIComponent(`Hi Festive Occasions, I'd like a quote for ${spaceType}.`)}`}
              external
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-emerald-500 px-6 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaTree className="h-5 w-5 shrink-0 text-night" />
              <span>WhatsApp for a Quote</span>
            </Button>
            <p className="mt-3 text-center text-[11px] text-ivory/50">
              Direct response from the studio owner. Custom pricing & confirmed dates.
            </p>
          </div>
        </div>

        {/* Success state */}
        {sent && (
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/10 px-6 py-4 text-sm font-semibold text-espresso">
              <FaTree aria-hidden className="inline-block h-5 w-5 text-emerald-600" />
              <span>Thank you! Your inquiry has been sent. We'll contact you shortly on WhatsApp.</span>
            </div>
            <p className="mt-3 text-sm text-warm-gray-deep">
              A member of our team will get back to you within 24 hours to discuss your festive decoration project.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}