export type GalleryProject = {
  id: string;
  /** Title shown under the image. Neutral + honest until client photos arrive. */
  title: string;
  category: string;
  year: string;
  ratio: "portrait" | "landscape" | "tall";
  theme: "champagne" | "burgundy" | "evergreen" | "night";
  /** Flag: all entries are placeholders until real client photos are supplied. */
  placeholder: true;
};

/**
 * GALLERY — PLACEHOLDER DATA
 * Every entry is a locally-generated preview. No real project names or
 * locations are fabricated. Replace `title`/`category`/`year` with verified
 * client project details and swap images via `app/gallery` when available.
 */
export const galleryProjects: GalleryProject[] = [
  {
    id: "p1",
    title: "Private Villa — Christmas Living",
    category: "Villa Decoration",
    year: "Season 2026",
    ratio: "portrait",
    theme: "burgundy",
    placeholder: true,
  },
  {
    id: "p2",
    title: "Residential Entrance — Festive Welcome",
    category: "Home Decoration",
    year: "Season 2026",
    ratio: "landscape",
    theme: "evergreen",
    placeholder: true,
  },
  {
    id: "p3",
    title: "Office Lobby — Corporate Christmas",
    category: "Office Decoration",
    year: "Season 2025",
    ratio: "tall",
    theme: "night",
    placeholder: true,
  },
  {
    id: "p4",
    title: "Signature Tree — Statement Installation",
    category: "Christmas Tree",
    year: "Season 2025",
    ratio: "portrait",
    theme: "champagne",
    placeholder: true,
  },
  {
    id: "p5",
    title: "Garden & Outdoor — Evening Illumination",
    category: "Lighting & Outdoor",
    year: "Season 2025",
    ratio: "landscape",
    theme: "evergreen",
    placeholder: true,
  },
  {
    id: "p6",
    title: "Hotel Reception — Hospitality Styling",
    category: "Corporate & Hospitality",
    year: "Season 2024",
    ratio: "portrait",
    theme: "night",
    placeholder: true,
  },
];