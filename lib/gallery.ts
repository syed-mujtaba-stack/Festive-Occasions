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
    | "treeManyOrnaments"
    | "client01"
    | "client02"
    | "client03"
    | "client04"
    | "client05"
    | "client06"
    | "client07"
    | "client08"
    | "client09"
    | "client10";
  /** Real client-supplied project photo. */
  placeholder: boolean;
};

/**
 * GALLERY — CLIENT PROJECT PHOTOS
 * The gallery is now populated with real Festive Occasions installation
 * photos supplied by the client (public/images/client/*). Titles/categories
 * are neutral until the client confirms per-photo captions.
 */
export const galleryProjects: GalleryProject[] = [
  {
    id: "p1",
    title: "Festive Scheme — Christmas Installation",
    category: "Villa Decoration",
    year: "Recent Work",
    ratio: "portrait",
    theme: "burgundy",
    image: "client01",
    placeholder: false,
  },
  {
    id: "p2",
    title: "Residential Scheme — Festive Welcome",
    category: "Home Decoration",
    year: "Recent Work",
    ratio: "portrait",
    theme: "evergreen",
    image: "client02",
    placeholder: false,
  },
  {
    id: "p3",
    title: "Commercial Scheme — Corporate Christmas",
    category: "Office Decoration",
    year: "Recent Work",
    ratio: "portrait",
    theme: "night",
    image: "client03",
    placeholder: false,
  },
  {
    id: "p4",
    title: "Signature Tree — Statement Installation",
    category: "Christmas Tree",
    year: "Recent Work",
    ratio: "portrait",
    theme: "champagne",
    image: "client04",
    placeholder: false,
  },
  {
    id: "p5",
    title: "Garden & Outdoor — Evening Illumination",
    category: "Lighting & Outdoor",
    year: "Recent Work",
    ratio: "portrait",
    theme: "evergreen",
    image: "client05",
    placeholder: false,
  },
  {
    id: "p6",
    title: "Hospitality Scheme — Festive Styling",
    category: "Corporate & Hospitality",
    year: "Recent Work",
    ratio: "portrait",
    theme: "night",
    image: "client06",
    placeholder: false,
  },
  {
    id: "p7",
    title: "Tree Detail — Festive Finishing",
    category: "Christmas Tree",
    year: "Recent Work",
    ratio: "portrait",
    theme: "champagne",
    image: "client07",
    placeholder: false,
  },
  {
    id: "p8",
    title: "Grand Tree — Full-Height Installation",
    category: "Christmas Tree",
    year: "Recent Work",
    ratio: "portrait",
    theme: "evergreen",
    image: "client08",
    placeholder: false,
  },
  {
    id: "p9",
    title: "Living Scheme — Warm Christmas",
    category: "Home Decoration",
    year: "Recent Work",
    ratio: "portrait",
    theme: "burgundy",
    image: "client09",
    placeholder: false,
  },
  {
    id: "p10",
    title: "Ornament Detail — Twinkling Lights",
    category: "Christmas Tree",
    year: "Recent Work",
    ratio: "portrait",
    theme: "night",
    image: "client10",
    placeholder: false,
  },
];