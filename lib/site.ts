export const siteConfig = {
  name: "Festive Occasions",
  legalName: "Festive Occasions Decoration Studio",
  domain: "festiveoccasions.ae",
  url: "https://festiveoccasions.ae",
  tagline: "Premium Christmas Decoration in Dubai",

  // ⚠️ VERIFY WITH CLIENT — never publish wrong contact details
  phone: "+971 50 000 0000", // TODO: verify client phone
  phoneDisplay: "+971 50 000 0000",
  whatsapp: "971500000000", // TODO: verify client WhatsApp (digits only, country code)
  email: "hello@festiveoccasions.ae", // TODO: verify client email
  addressLine: "Dubai, United Arab Emirates",
  serviceArea: ["Dubai", "UAE"],
  hours: "Available daily · 9:00 AM – 9:00 PM", // TODO: verify

  social: {
    instagram: "https://instagram.com/", // TODO: verify
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