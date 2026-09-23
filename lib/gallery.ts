import type { ImageKey } from "@/lib/images";

export type GalleryProject = {
  id: string;
  /** Minimal, neutral caption — stays honest until client photos arrive. */
  title: string;
  category:
    | "Villa Decoration"
    | "Home Decoration"
    | "Office Decoration"
    | "Corporate & Hospitality"
    | "Lighting & Outdoor"
    | "Signature Styling";
  year: string;
  ratio: "portrait" | "landscape" | "tall";
  image: ImageKey;
  /** Real client-supplied installation photo (public/images/client/*). */
  placeholder: boolean;
};

/**
 * GALLERY — 35 curated project photos.
 * 12 real client installation photos (client01–12) lead the grid; the
 * remaining entries are current section styling images. Everything here is
 * transitional until the client's full set replaces these slots via
 * lib/images.ts — captions stay neutral so nothing needs rewording later.
 */
export const galleryProjects: GalleryProject[] = [
  {
    id: "g01",
    title: "Festive Scheme — Villa",
    category: "Villa Decoration",
    year: "Recent Work",
    ratio: "portrait",
    image: "client01",
    placeholder: false,
  },
  {
    id: "g02",
    title: "Residential Scheme — Welcome",
    category: "Home Decoration",
    year: "Recent Work",
    ratio: "portrait",
    image: "client02",
    placeholder: false,
  },
  {
    id: "g03",
    title: "Villa Scheme — Interior",
    category: "Villa Decoration",
    year: "Recent Work",
    ratio: "portrait",
    image: "client03",
    placeholder: false,
  },
  {
    id: "g04",
    title: "Home Scheme — Living",
    category: "Home Decoration",
    year: "Recent Work",
    ratio: "portrait",
    image: "client04",
    placeholder: false,
  },
  {
    id: "g05",
    title: "Decorated Room — Home",
    category: "Home Decoration",
    year: "Recent Work",
    ratio: "portrait",
    image: "client05",
    placeholder: false,
  },
  {
    id: "g06",
    title: "Festive Styling — Detail",
    category: "Signature Styling",
    year: "Recent Work",
    ratio: "tall",
    image: "client06",
    placeholder: false,
  },
  {
    id: "g07",
    title: "Table & Room Styling",
    category: "Home Decoration",
    year: "Recent Work",
    ratio: "landscape",
    image: "client07",
    placeholder: false,
  },
  {
    id: "g08",
    title: "Villa Scheme — Festive",
    category: "Villa Decoration",
    year: "Recent Work",
    ratio: "portrait",
    image: "client08",
    placeholder: false,
  },
  {
    id: "g09",
    title: "Home Scheme — Festive",
    category: "Home Decoration",
    year: "Recent Work",
    ratio: "portrait",
    image: "client09",
    placeholder: false,
  },
  {
    id: "g10",
    title: "Decorated Interior — Home",
    category: "Home Decoration",
    year: "Recent Work",
    ratio: "portrait",
    image: "client10",
    placeholder: false,
  },
  {
    id: "g11",
    title: "Festive Room — Villa",
    category: "Villa Decoration",
    year: "Recent Work",
    ratio: "portrait",
    image: "client11",
    placeholder: false,
  },
  {
    id: "g12",
    title: "Installation Detail — Home",
    category: "Home Decoration",
    year: "Recent Work",
    ratio: "landscape",
    image: "client12",
    placeholder: false,
  },
  {
    id: "g13",
    title: "Signature Villa Scheme",
    category: "Villa Decoration",
    year: "Styling Reference",
    ratio: "landscape",
    image: "hero",
    placeholder: true,
  },
  {
    id: "g14",
    title: "Styled Living Space",
    category: "Home Decoration",
    year: "Styling Reference",
    ratio: "portrait",
    image: "homeIntro",
    placeholder: true,
  },
  {
    id: "g15",
    title: "Ornament Detail",
    category: "Signature Styling",
    year: "Styling Reference",
    ratio: "tall",
    image: "signatureDetails",
    placeholder: true,
  },
  {
    id: "g16",
    title: "Warm Festive Glow",
    category: "Lighting & Outdoor",
    year: "Styling Reference",
    ratio: "landscape",
    image: "finalCtaGlow",
    placeholder: true,
  },
  {
    id: "g17",
    title: "Villa Exterior — Evening",
    category: "Villa Decoration",
    year: "Styling Reference",
    ratio: "landscape",
    image: "audienceVilla",
    placeholder: true,
  },
  {
    id: "g18",
    title: "Office Lobby — Reception",
    category: "Office Decoration",
    year: "Styling Reference",
    ratio: "landscape",
    image: "audienceOffice",
    placeholder: true,
  },
  {
    id: "g19",
    title: "Venue — Hospitality Styling",
    category: "Corporate & Hospitality",
    year: "Styling Reference",
    ratio: "landscape",
    image: "audienceVenue",
    placeholder: true,
  },
  {
    id: "g20",
    title: "Cheers — Compact Scheme",
    category: "Home Decoration",
    year: "Styling Reference",
    ratio: "landscape",
    image: "pkgCheers",
    placeholder: true,
  },
  {
    id: "g21",
    title: "Fancy — Elevated Scheme",
    category: "Home Decoration",
    year: "Styling Reference",
    ratio: "landscape",
    image: "pkgFancy",
    placeholder: true,
  },
  {
    id: "g22",
    title: "Luxury — Full Statement",
    category: "Villa Decoration",
    year: "Styling Reference",
    ratio: "landscape",
    image: "pkgLuxury",
    placeholder: true,
  },
  {
    id: "g23",
    title: "Complete Decoration Scheme",
    category: "Signature Styling",
    year: "Styling Reference",
    ratio: "landscape",
    image: "svcComplete",
    placeholder: true,
  },
  {
    id: "g24",
    title: "Villa Decoration",
    category: "Villa Decoration",
    year: "Styling Reference",
    ratio: "landscape",
    image: "svcVilla",
    placeholder: true,
  },
  {
    id: "g25",
    title: "Home Decoration",
    category: "Home Decoration",
    year: "Styling Reference",
    ratio: "portrait",
    image: "svcHome",
    placeholder: true,
  },
  {
    id: "g26",
    title: "Office Decoration",
    category: "Office Decoration",
    year: "Styling Reference",
    ratio: "landscape",
    image: "svcOffice",
    placeholder: true,
  },
  {
    id: "g27",
    title: "Corporate Decoration",
    category: "Corporate & Hospitality",
    year: "Styling Reference",
    ratio: "landscape",
    image: "svcCorporate",
    placeholder: true,
  },
  {
    id: "g28",
    title: "Christmas Lighting",
    category: "Lighting & Outdoor",
    year: "Styling Reference",
    ratio: "landscape",
    image: "svcLighting",
    placeholder: true,
  },
  {
    id: "g29",
    title: "Outdoor Decoration",
    category: "Lighting & Outdoor",
    year: "Styling Reference",
    ratio: "landscape",
    image: "svcOutdoor",
    placeholder: true,
  },
  {
    id: "g30",
    title: "Bespoke Design — Detail",
    category: "Signature Styling",
    year: "Styling Reference",
    ratio: "portrait",
    image: "detailPillar1",
    placeholder: true,
  },
  {
    id: "g31",
    title: "Entrance & Foyer",
    category: "Villa Decoration",
    year: "Styling Reference",
    ratio: "landscape",
    image: "detailVilla1",
    placeholder: true,
  },
  {
    id: "g32",
    title: "Living Room — Home",
    category: "Home Decoration",
    year: "Styling Reference",
    ratio: "portrait",
    image: "detailHome1",
    placeholder: true,
  },
  {
    id: "g33",
    title: "Lobby & Reception",
    category: "Office Decoration",
    year: "Styling Reference",
    ratio: "landscape",
    image: "detailOffice1",
    placeholder: true,
  },
  {
    id: "g34",
    title: "Branded Corporate Scheme",
    category: "Corporate & Hospitality",
    year: "Styling Reference",
    ratio: "landscape",
    image: "detailCorporate1",
    placeholder: true,
  },
  {
    id: "g35",
    title: "Lighting Design — Facade",
    category: "Lighting & Outdoor",
    year: "Styling Reference",
    ratio: "portrait",
    image: "detailLighting1",
    placeholder: true,
  },
];

/** Real client project photos only — used by the trust note and JSON-LD. */
export const clientGalleryProjects = galleryProjects.filter(
  (p) => !p.placeholder
);