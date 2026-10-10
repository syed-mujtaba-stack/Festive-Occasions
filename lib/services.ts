export type Service = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  section: string;
  href: string;
  description: string;
  items: string[];
  theme: "champagne" | "burgundy" | "evergreen";
  ctaText?: string;
  ctaHref?: string;
  /**
   * Optional — omit to run the slide as copy only. The rail then drops to a
   * single centred column instead of leaving the right half empty.
   */
  image?:
    | "svcComplete"
    | "svcVilla"
    | "svcHome"
    | "svcOffice"
    | "svcCorporate"
    | "svcLighting"
    | "svcOutdoor";
};

/** Only services the client actually provides should be enabled. */
export const services: Service[] = [
  {
    id: "christmas-decoration",
    number: "01",
    title: "Christmas",
    subtitle: "Decoration",
    section: "THE COMPLETE TRANSFORMATION",
    href: "/christmas-decoration-dubai",
    description:
      "We provide Christmas decorations, Especially in Palm Jumeirah, Tilal Al Ghaf, Al Barari, DAMAC Hills, Al Furjan, Arabian Ranches 1, Dubai Hills Estate, Jumeirah Lakes, Jumeirah Village Circle, Mudon, Arabian Ranches 2, Arabian Ranches 3, Jumeirah Island, Jumeirah Golf Estates, The Springs, and The Meadows and all over Dubai.\n\nBook your decoration today and make this Christmas truly magical!",
    items: ["Homes", "Villas", "Offices", "Commercial spaces"],
    theme: "champagne",
    ctaText: "Book your decoration today and make this Christmas truly magical!",
    image: "svcComplete",
  },
  {
    id: "villa-decoration",
    number: "02",
    title: "Villa Christmas",
    subtitle: "Decoration",
    section: "THE FULL RESIDENCE",
    href: "/christmas-villa-decoration-dubai",
    description:
      "Complete villa styling — entrance, living spaces, staircase, garden and outdoor lighting given one cohesive festive identity.",
    items: ["Entrance", "Living & dining", "Staircase", "Garden & outdoor"],
    theme: "burgundy",
    image: "svcVilla",
  },
  {
    id: "home-decoration",
    number: "03",
    title: "Home Christmas",
    subtitle: "Decoration",
    section: "THE WARM DETAIL",
    href: "/christmas-home-decoration-dubai",
    description:
      "Considered home decoration that makes every room feel festive — layered, warm and elegantly understated.",
    items: ["Living room", "Entrance", "Fireplace & windows", "Ambient lighting"],
    theme: "champagne",
    image: "svcHome",
  },
  {
    id: "office-decoration",
    number: "04",
    title: "Office Christmas",
    subtitle: "Decoration",
    section: "THE IMPRESSIVE SPACE",
    href: "/christmas-office-decoration-dubai",
    description:
      "Lobby, reception and workspace styling that welcomes clients and lifts the team — installed around your working day.",
    items: ["Lobby & reception", "Meeting areas", "Employee areas", "Corporate branding"],
    theme: "evergreen",
    image: "svcOffice",
  },
  {
    id: "corporate-decoration",
    number: "05",
    title: "Corporate",
    subtitle: "Decoration",
    section: "THE BRANDED EXPERIENCE",
    href: "/christmas-corporate-decoration-dubai",
    description:
      "Large-scale festive installations for corporate events, hotels and commercial venues — branded, precise and professionally executed.",
    items: ["Corporate events", "Hotels", "Commercial venues", "Large installations"],
    theme: "burgundy",
    image: "svcCorporate",
  },
  {
    id: "christmas-lighting",
    number: "06",
    title: "Christmas",
    subtitle: "Lighting",
    section: "THE OUTDOOR GLOW",
    href: "/christmas-lighting-dubai",
    description:
      "Facade, garden and entrance lighting that transforms a property after dark — warm, cinematic and beautifully composed.",
    items: ["Facade", "Garden", "Entrance & driveway", "Commercial lighting"],
    theme: "evergreen",
    image: "svcLighting",
  },
  {
    id: "outdoor-decoration",
    number: "07",
    title: "Outdoor Christmas",
    subtitle: "Decoration",
    section: "THE EXTERIOR STORY",
    href: "/outdoor-christmas-decoration-dubai",
    description:
      "Entrances, gardens and outdoor entertaining spaces dressed for the season — designed to welcome from the first glance.",
    items: ["Entrance styling", "Garden", "Outdoor entertaining", "Wayfinding lights"],
    theme: "champagne",
    image: "svcOutdoor",
  },
] as const;

export function getService(id: string) {
  return services.find((s) => s.id === id);
}