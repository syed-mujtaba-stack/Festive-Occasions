export type GalleryProject = {
  id: string;
  /** Title shown under the image. Neutral + honest until client photos arrive. */
  title: string;
  category:
    | "Villa Decoration"
    | "Home Decoration"
    | "Office Decoration"
    | "Christmas Tree"
    | "Lighting & Outdoor"
    | "Corporate & Hospitality";
  year: string;
  ratio: "portrait" | "landscape" | "tall";
  theme: "champagne" | "burgundy" | "evergreen" | "night";
  image:
    | "livingroomTree"
    | "outdoorHouseLights"
    | "officeLobbyTree"
    | "treeRedBaubles"
    | "stringLightsBokeh"
    | "tableSetting"
    | "livingroomFireplace"
    | "treeGoldBaubles"
    | "treeGreenLarge"
    | "goldenBaubleTree"
    | "treeManyOrnaments";
  /** Transitional: decorative imagery until real client project photos arrive. */
  placeholder: true;
};

/**
 * GALLERY — TRANSITIONAL IMAGERY
 * Current images are high-quality Unsplash Christmas photography used to
 * demonstrate the editorial layout. NO real project names or locations are
 * claimed. Replace titles/details and swap images (lib/images.ts) once client
 * project photos are supplied.
 */
export const galleryProjects: GalleryProject[] = [
  {
    id: "p1",
    title: "Private Villa — Christmas Living",
    category: "Villa Decoration",
    year: "Season 2026",
    ratio: "portrait",
    theme: "burgundy",
    image: "livingroomTree",
    placeholder: true,
  },
  {
    id: "p2",
    title: "Residential Entrance — Festive Welcome",
    category: "Home Decoration",
    year: "Season 2026",
    ratio: "landscape",
    theme: "evergreen",
    image: "outdoorHouseLights",
    placeholder: true,
  },
  {
    id: "p3",
    title: "Office Lobby — Corporate Christmas",
    category: "Office Decoration",
    year: "Season 2025",
    ratio: "tall",
    theme: "night",
    image: "officeLobbyTree",
    placeholder: true,
  },
  {
    id: "p4",
    title: "Signature Tree — Statement Installation",
    category: "Christmas Tree",
    year: "Season 2025",
    ratio: "portrait",
    theme: "champagne",
    image: "treeRedBaubles",
    placeholder: true,
  },
  {
    id: "p5",
    title: "Garden & Outdoor — Evening Illumination",
    category: "Lighting & Outdoor",
    year: "Season 2025",
    ratio: "landscape",
    theme: "evergreen",
    image: "stringLightsBokeh",
    placeholder: true,
  },
  {
    id: "p6",
    title: "Hotel Reception — Hospitality Styling",
    category: "Corporate & Hospitality",
    year: "Season 2024",
    ratio: "portrait",
    theme: "night",
    image: "tableSetting",
    placeholder: true,
  },
  {
    id: "p7",
    title: "Luxury Tree Detail — Champagne Gold",
    category: "Christmas Tree",
    year: "Season 2024",
    ratio: "landscape",
    theme: "champagne",
    image: "goldenBaubleTree",
    placeholder: true,
  },
  {
    id: "p8",
    title: "Grand Tree — Full-Height Installation",
    category: "Christmas Tree",
    year: "Season 2024",
    ratio: "portrait",
    theme: "evergreen",
    image: "treeGreenLarge",
    placeholder: true,
  },
  {
    id: "p9",
    title: "Fireplace Scheme — Warm Living",
    category: "Home Decoration",
    year: "Season 2023",
    ratio: "landscape",
    theme: "burgundy",
    image: "livingroomFireplace",
    placeholder: true,
  },
  {
    id: "p10",
    title: "Ornament Detail — Twinkling Lights",
    category: "Christmas Tree",
    year: "Season 2023",
    ratio: "portrait",
    theme: "night",
    image: "treeManyOrnaments",
    placeholder: true,
  },
];