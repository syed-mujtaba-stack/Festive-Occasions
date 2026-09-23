export const siteConfig = {
  name: "Festive Occasions",
  legalName: "Festive Occasions Decoration Studio",
  domain: "festiveoccasions.ae",
  url: "https://festiveoccasions.ae",
  tagline: "Premium Christmas Decoration in Dubai",

  // ✅ CLIENT-VERIFIED 2026-09-23
  phone: "+971 56 428 4444",
  phoneDisplay: "+971 56 428 4444",
  whatsapp: "971564284444", // digits only, country code
  email: "info@festiveoccasions.ae", // ✅ client-verified
  addressLine:
    "Business Centre, Sharjah Publishing City Free Zone, Sharjah, United Arab Emirates",
  serviceArea: ["Dubai", "Sharjah", "UAE"],
  // ✅ CLIENT-VERIFIED 2026-09-23: enquiries & bookings are open 24/7 via
  // WhatsApp/email; the office itself is closed Sat & Sun, so weekend
  // replies may be slower.
  hours: "Open 24/7 — enquiries via WhatsApp & email",
  hoursDetail: "Office closed Sat & Sun · weekend replies may be slower",

  social: {
    instagram: "https://www.instagram.com/festive_ocassions", // ✅ client-verified
    facebook: "https://facebook.com/", // TODO: verify future use
  },

  whatsappMessage:
    "Hi Festive Occasions, I would like to enquire about Christmas decoration for my property in Dubai.",
} as const;

export type SiteConfig = typeof siteConfig;

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}

export function telLink() {
  return `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`;
}