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
      "End-to-end Christmas decoration designed around your space — from a single statement piece to a full property transformation.",
    items: ["Homes", "Villas", "Offices", "Commercial spaces"],
    theme: "champagne",
  },
  {
    id: "christmas-tree",
    number: "02",
    title: "Christmas Tree",
    subtitle: "Decoration",
    section: "THE CENTREPIECE",
    href: "/christmas-tree-decoration-dubai",
    description:
      "Signature trees styled by hand — from intimate tabletops to grand statement installations, dressed in curated themes.",
    items: ["Small trees", "Large trees", "Luxury trees", "Commercial trees"],
    theme: "evergreen",
  },
  {
    id: "villa-decoration",
    number: "03",
    title: "Villa Christmas",
    subtitle: "Decoration",
    section: "THE FULL RESIDENCE",
    href: "/christmas-villa-decoration-dubai",
    description:
      "Complete villa styling — entrance, living spaces, staircase, garden and outdoor lighting given one cohesive festive identity.",
    items: ["Entrance", "Living & dining", "Staircase", "Garden & outdoor"],
    theme: "burgundy",
  },
  {
    id: "home-decoration",
    number: "04",
    title: "Home Christmas",
    subtitle: "Decoration",
    section: "THE WARM DETAIL",
    href: "/christmas-home-decoration-dubai",
    description:
      "Considered home decoration that makes every room feel festive — layered, warm and elegantly understated.",
    items: ["Living room", "Entrance", "Fireplace & windows", "Ambient lighting"],
    theme: "champagne",
  },
  {
    id: "office-decoration",
    number: "05",
    title: "Office Christmas",
    subtitle: "Decoration",
    section: "THE IMPRESSIVE SPACE",
    href: "/christmas-office-decoration-dubai",
    description:
      "Lobby, reception and workspace styling that welcomes clients and lifts the team — installed around your working day.",
    items: ["Lobby & reception", "Meeting areas", "Employee areas", "Corporate branding"],
    theme: "evergreen",
  },
  {
    id: "corporate-decoration",
    number: "06",
    title: "Corporate",
    subtitle: "Decoration",
    section: "THE BRANDED EXPERIENCE",
    href: "/christmas-corporate-decoration-dubai",
    description:
      "Large-scale festive installations for corporate events, hotels and commercial venues — branded, precise and professionally executed.",
    items: ["Corporate events", "Hotels", "Commercial venues", "Large installations"],
    theme: "burgundy",
  },
  {
    id: "christmas-lighting",
    number: "07",
    title: "Christmas",
    subtitle: "Lighting",
    section: "THE OUTDOOR GLOW",
    href: "/christmas-lighting-dubai",
    description:
      "Facade, garden and entrance lighting that transforms a property after dark — warm, cinematic and beautifully composed.",
    items: ["Facade", "Garden", "Entrance & driveway", "Commercial lighting"],
    theme: "evergreen",
  },
  {
    id: "outdoor-decoration",
    number: "08",
    title: "Outdoor Christmas",
    subtitle: "Decoration",
    section: "THE EXTERIOR STORY",
    href: "/outdoor-christmas-decoration-dubai",
    description:
      "Entrances, gardens and outdoor entertaining spaces dressed for the season — designed to welcome from the first glance.",
    items: ["Entrance styling", "Garden", "Outdoor entertaining", "Wayfinding lights"],
    theme: "champagne",
  },
] as const;

export function getService(id: string) {
  return services.find((s) => s.id === id);
}