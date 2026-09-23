import type { ImageKey } from "@/lib/images";

export type ServicePage = {
  /** Route slug — also used for canonical and keywords */
  slug: string;
  /** H1 for the page */
  title: string;
  /** Short eyebrow above H1 */
  eyebrow: string;
  /** Meta description */
  metaDescription: string;
  /** Hero image */
  heroImage: ImageKey;
  /** Intro copy (section 2) */
  intro: {
    heading: string;
    body: string;
  };
  /** What We Decorate — space-focused list */
  whatWeDecorate: {
    heading: string;
    items: string[];
  };
  /** Service details — numbered editorial blocks */
  details: {
    number: string;
    title: string;
    body: string;
    image: ImageKey;
  }[];
  /** Styles / themes available */
  styles: string[];
  /** FAQ specific to this service */
  faqs: { q: string; a: string }[];
};

export const servicePages: Record<string, ServicePage> = {
  "christmas-decoration-dubai": {
    slug: "christmas-decoration-dubai",
    title: "Christmas Decoration in Dubai",
    eyebrow: "The Complete Service",
    metaDescription:
      "Christmas decorators in Dubai — bespoke Christmas decoration for homes, villas, offices and commercial spaces, designed, styled and installed by Festive Occasions. Request a consultation.",
    heroImage: "svcComplete",
    intro: {
      heading: "One studio. Every festive space in Dubai.",
      body: "Festive Occasions is a premium Christmas decoration studio serving Dubai and the UAE. As professional Christmas decorators we design and install complete festive schemes — from a single statement tree to a full villa, office or commercial transformation. Every project is composed around the space itself, its architecture, light and character, and matched to the right scale and style for your own setting.",
    },
    whatWeDecorate: {
      heading: "What we decorate",
      items: [
        "Homes & apartments",
        "Villas & estates",
        "Office lobbies & receptions",
        "Hotels & hospitality venues",
        "Restaurants & cafés",
        "Retail & commercial spaces",
      ],
    },
    details: [
      {
        number: "01",
        title: "Bespoke design",
        body: "We begin with your space, not a template. Measure, photograph and study the architecture, then propose a palette, theme and layout that belongs there.",
        image: "detailPillar1",
      },
      {
        number: "02",
        title: "Styling & finishing",
        body: "Trees, garlands, table dressing, entrance styling and ambient lighting — layered and finished by hand to a premium standard.",
        image: "detailPillar2",
      },
      {
        number: "03",
        title: "Installation & removal",
        body: "A professional team installs on schedule and removes carefully after the season, leaving the space exactly as we found it.",
        image: "detailPillar3",
      },
    ],
    styles: ["Classic", "Winter Wonderland", "Pure White", "Modern Minimal", "Luxury Gold", "Custom"],
    faqs: [
      {
        q: "What does a full Christmas decoration service include?",
        a: "A complete festive scheme for your property — design around your space, tree and interior styling, entrance and outdoor elements where relevant, professional installation on schedule and careful removal after the season.",
      },
      {
        q: "How does the design process work for a bespoke scheme?",
        a: "We start with your space, not a template — we look at your architecture, proportions and light, then propose a palette, theme and layout before any installation begins.",
      },
      {
        q: "Can one studio decorate both my home and my office?",
        a: "Yes. We style homes, villas, offices and commercial venues, and a single studio can plan residential and business schemes together if you manage both.",
      },
      {
        q: "What happens to the decoration after Christmas?",
        a: "Our team removes everything carefully after the festive period and leaves the property exactly as we found it — removal is part of the service.",
      },
      {
        q: "Do you provide the Christmas tree?",
        a: "Yes — we supply and assemble premium artificial trees (and can source fresh trees on request) as part of a full styling service.",
      },
      {
        q: "Can you decorate a tree I already have?",
        a: "Yes. We re-dress existing trees with a curated theme and premium finishing.",
      },
      {
        q: "Do you decorate commercial or lobby trees?",
        a: "Yes. We style large and statement trees for lobbies, hotels, restaurants and retail spaces.",
      },
      {
        q: "How do I get a quote for my space?",
        a: "Send us photos and your preferred dates on WhatsApp or by email, and we will confirm the right scale and a clear quote for your property before you commit.",
      },
    ],
  },

  "christmas-villa-decoration-dubai": {
    slug: "christmas-villa-decoration-dubai",
    title: "Christmas Villa Decoration in Dubai",
    eyebrow: "The Full Residence",
    metaDescription:
      "Complete Christmas villa decoration in Dubai — entrance, living spaces, staircase, garden and outdoor lighting composed into one cohesive scheme by Festive Occasions.",
    heroImage: "svcVilla",
    intro: {
      heading: "A villa dressed as one home.",
      body: "Villas have scale, and scale deserves a designed scheme. We style the entrance, living and dining spaces, staircase, garden and outdoor areas so the whole villa reads as one warm, festive composition.",
    },
    whatWeDecorate: {
      heading: "Villa spaces we style",
      items: [
        "Entrance & foyer",
        "Living & dining rooms",
        "Staircase & landings",
        "Bedrooms (on request)",
        "Garden & poolside",
        "Outdoor lighting",
      ],
    },
    details: [
      {
        number: "01",
        title: "Entrance & foyer",
        body: "First impressions — garlands, statement pieces, lighting and scent set the tone the moment the door opens.",
        image: "detailVilla1",
      },
      {
        number: "02",
        title: "Living & dining",
        body: "Trees, mantel styling, table settings and ambient layers that make every gathering feel festive.",
        image: "detailVilla2",
      },
      {
        number: "03",
        title: "Garden & outdoor",
        body: "Entrance lights, garden dressing and poolside touches to make the exterior equally magical after dark.",
        image: "detailVilla3",
      },
    ],
    styles: ["Classic", "Winter Wonderland", "Pure White", "Modern Minimal", "Luxury Gold", "Custom"],
    faqs: [
      {
        q: "Do you decorate the outdoor areas of villas?",
        a: "Yes — entrances, gardens, driveways and poolside areas can all be dressed, including outdoor lighting.",
      },
      {
        q: "Can you work around a villa that is occupied?",
        a: "Yes. We plan installation around your schedule and work carefully through the areas being decorated.",
      },
      {
        q: "Do you provide villa-sized trees?",
        a: "Yes — we supply and style full-height trees appropriate for double-height villa interiors.",
      },
      {
        q: "Do you cover villa communities across Dubai?",
        a: "We serve Dubai and surrounding UAE areas. Share your community and we will confirm coverage.",
      },
    ],
  },

  "christmas-home-decoration-dubai": {
    slug: "christmas-home-decoration-dubai",
    title: "Christmas Home Decoration in Dubai",
    eyebrow: "The Warm Detail",
    metaDescription:
      "Considered home Christmas decoration in Dubai — living rooms, entrances, windows and ambient lighting styled elegantly by Festive Occasions.",
    heroImage: "svcHome",
    intro: {
      heading: "A home that feels festively yours.",
      body: "Home decoration is about warmth and detail. We style living rooms, entrances, windows and mantels with a layered, elegant hand — festive without being heavy, premium without being cold.",
    },
    whatWeDecorate: {
      heading: "Home spaces we style",
      items: [
        "Living room & family areas",
        "Entrance & hallway",
        "Dining & breakfast nooks",
        "Fireplaces & mantels",
        "Windows & sills",
        "Ambient lighting",
      ],
    },
    details: [
      {
        number: "01",
        title: "Living room",
        body: "A hero tree, layered vignettes and soft lighting that make the main room feel optimally festive.",
        image: "detailHome1",
      },
      {
        number: "02",
        title: "Entrance & hallway",
        body: "Greenery, garlands and a warm welcome the moment you step inside.",
        image: "detailHome2",
      },
      {
        number: "03",
        title: "Dining & windows",
        body: "Table dressing, window displays and festive details that carry the theme through the home.",
        image: "detailHome3",
      },
    ],
    styles: ["Classic", "Winter Wonderland", "Pure White", "Modern Minimal", "Luxury Gold", "Custom"],
    faqs: [
      {
        q: "How much decoration do you recommend for a home?",
        a: "It depends on the space and the atmosphere you want. We propose a considered scheme — from a single tree to a full home dressing.",
      },
      {
        q: "Do you use fresh or artificial greenery?",
        a: "We work with high-quality artificial greenery for durability, and can incorporate fresh elements on request.",
      },
      {
        q: "Can you match our existing interior style?",
        a: "Yes — every scheme is designed to sit naturally within your existing décor and palette.",
      },
    ],
  },

  "christmas-office-decoration-dubai": {
    slug: "christmas-office-decoration-dubai",
    title: "Office Christmas Decoration in Dubai",
    eyebrow: "The Impressive Workspace",
    metaDescription:
      "Office Christmas decoration in Dubai — lobby, reception, meeting and employee areas styled professionally by Festive Occasions around your working day.",
    heroImage: "svcOffice",
    intro: {
      heading: "A workspace that welcomes the season.",
      body: "Offices deserve festive styling that impresses clients and lifts the team. We decorate lobbies, receptions, meeting areas and employee spaces — planned and installed around your working day, with minimal disruption.",
    },
    whatWeDecorate: {
      heading: "Office spaces we style",
      items: [
        "Lobby & reception",
        "Meeting & boardrooms",
        "Employee areas & breakouts",
        "Corridor & entrances",
        "Desk & workstation touches",
        "Reception tree",
      ],
    },
    details: [
      {
        number: "01",
        title: "Lobby & reception",
        body: "A statement tree and reception styling that greet clients the moment they arrive.",
        image: "detailOffice1",
      },
      {
        number: "02",
        title: "Meeting & employee areas",
        body: "Subtle festive touches in shared spaces — balanced so the office stays professional.",
        image: "detailOffice2",
      },
      {
        number: "03",
        title: "Working-day installation",
        body: "We schedule installation to avoid disrupting your business hours wherever possible.",
        image: "detailOffice3",
      },
    ],
    styles: ["Classic", "Modern Minimal", "Corporate Palette", "Winter Wonderland", "Custom"],
    faqs: [
      {
        q: "Can you decorate our office outside working hours?",
        a: "Yes — we schedule installation around your business hours, including evenings and weekends.",
      },
      {
        q: "Do you offer branded corporate decoration?",
        a: "Yes — we can incorporate brand colours and identity into festive schemes for corporate spaces.",
      },
      {
        q: "Do you decorate office parties?",
        a: "We decorate the office space itself; venue styling for corporate parties is also available. Talk to us about your event.",
      },
      {
        q: "Do you handle removal after the season?",
        a: "Yes — removal and repacking are included, again scheduled around your working day.",
      },
    ],
  },

  "christmas-corporate-decoration-dubai": {
    slug: "christmas-corporate-decoration-dubai",
    title: "Corporate Christmas Decoration in Dubai",
    eyebrow: "The Branded Experience",
    metaDescription:
      "Corporate Christmas decoration in Dubai — branded festive installations, event styling and large-scale displays for offices, hotels and venues by Festive Occasions.",
    heroImage: "svcCorporate",
    intro: {
      heading: "Festive, on-brand, impeccably executed.",
      body: "Corporate spaces and events need decoration that is impressive yet on-brand. We deliver large-scale festive installations for offices, hotels, restaurants and commercial venues — designed, built and professionally installed.",
    },
    whatWeDecorate: {
      heading: "Corporate settings we style",
      items: [
        "Corporate offices & HQs",
        "Hotels & hospitality venues",
        "Restaurants & cafés",
        "Retail & mall spaces",
        "Event & party venues",
        "Branded installations",
      ],
    },
    details: [
      {
        number: "01",
        title: "Branded design",
        body: "We design schemes that carry your brand colours and identity into a premium festive expression.",
        image: "detailCorporate1",
      },
      {
        number: "02",
        title: "Large installations",
        body: "Statement trees, branded displays and big-scene decoration executed to venue scale.",
        image: "detailCorporate2",
      },
      {
        number: "03",
        title: "Professional execution",
        body: "Proposals, scheduling, installation and removal handled by one accountable team.",
        image: "detailCorporate3",
      },
    ],
    styles: ["Brand Colours", "Luxury Gold", "Classic", "Modern Minimal", "Custom"],
    faqs: [
      {
        q: "Can you work to our brand colours?",
        a: "Yes — brand identities can be carried through into palette, ribbon, baubles and installations.",
      },
      {
        q: "Do you decorate hotel and hospitality venues?",
        a: "Yes — lobbies, entrances, restaurants and large-scale venue displays are core corporate services.",
      },
      {
        q: "Can you deliver large-scale installations?",
        a: "Yes — we plan, build and install statement pieces proportioned to the venue.",
      },
      {
        q: "Do you manage the full project?",
        a: "Yes — a single team handles design, proposal, installation, and removal.",
      },
    ],
  },

  "christmas-lighting-dubai": {
    slug: "christmas-lighting-dubai",
    title: "Christmas Lighting in Dubai",
    eyebrow: "The Outdoor Glow",
    metaDescription:
      "Professional Christmas lighting in Dubai — villa facades, gardens, entrances and commercial lighting installed and styled by Festive Occasions.",
    heroImage: "svcLighting",
    intro: {
      heading: "Light your property, brilliantly.",
      body: "Festive lighting transforms a property after dark. We design and install warm, cinematic lighting for villa facades, gardens, entrances and commercial spaces — beautifully composed, safe and energy-conscious.",
    },
    whatWeDecorate: {
      heading: "Lighting we install",
      items: [
        "Villa facades",
        "Garden & trees",
        "Entrances & driveways",
        "Balconies & terraces",
        "Commercial frontages",
        "Warm string & projection",
      ],
    },
    details: [
      {
        number: "01",
        title: "Design",
        body: "A lighting scheme composed for your architecture — placement, warmth and balance designed first.",
        image: "detailLighting1",
      },
      {
        number: "02",
        title: "Installation",
        body: "Careful, professional installation — safely fixed and neatly routed, with energy-conscious lighting.",
        image: "detailLighting2",
      },
      {
        number: "03",
        title: "After the season",
        body: "Clean removal and storage so your façade returns exactly as it was.",
        image: "detailLighting3",
      },
    ],
    styles: ["Warm Classic", "Crisp White", "Gold Glow", "Colour Accent", "Custom"],
    faqs: [
      {
        q: "Do you install outdoor Christmas lighting?",
        a: "Yes — villa facades, gardens, entrances and commercial frontages are installed professionally.",
      },
      {
        q: "Is the lighting energy-efficient?",
        a: "We use energy-conscious LED lighting and design schemes that are beautiful without waste.",
      },
      {
        q: "Do you supply and install the lights?",
        a: "Yes — we supply, install, manage and later remove the complete lighting scheme.",
      },
      {
        q: "Do you take the lighting down after Christmas?",
        a: "Yes — removal and packing are part of the service.",
      },
    ],
  },

  "outdoor-christmas-decoration-dubai": {
    slug: "outdoor-christmas-decoration-dubai",
    title: "Outdoor Christmas Decoration in Dubai",
    eyebrow: "The Exterior Story",
    metaDescription:
      "Outdoor Christmas decoration in Dubai — entrances, gardens and outdoor entertaining spaces styled to welcome by Festive Occasions.",
    heroImage: "svcOutdoor",
    intro: {
      heading: "Welcome them from the first glance.",
      body: "The exterior is the first scene your guests see. We style entrances, gardens and outdoor entertaining spaces — greenery, lighting and festive moments that make arriving feel like part of the celebration.",
    },
    whatWeDecorate: {
      heading: "Outdoor spaces we style",
      items: [
        "Front entrance & doorway",
        "Garden & courtyards",
        "Poolside & terraces",
        "Driveways & pathways",
        "Balconies (villa)",
        "Outdoor entertaining",
      ],
    },
    details: [
      {
        number: "01",
        title: "Entrance styling",
        body: "Doorway greenery, wreaths, statement pieces and warm lighting that set the tone on arrival.",
        image: "detailOutdoor1",
      },
      {
        number: "02",
        title: "Garden & poolside",
        body: "Festive dressing that turns gardens and terraces into places to gather after dark.",
        image: "detailOutdoor2",
      },
      {
        number: "03",
        title: "Lighting & path",
        body: "Pathway and tree lights that guide and welcome — designed for the Dubai climate.",
        image: "detailOutdoor3",
      },
    ],
    styles: ["Classic", "Winter Wonderland", "Warm Glow", "Modern Sculptural", "Custom"],
    faqs: [
      {
        q: "Does outdoor decoration hold up in the UAE climate?",
        a: "Yes — we use materials and lighting suited to the climate and advise on placement for durability.",
      },
      {
        q: "Do you decorate villa entrances and gardens?",
        a: "Yes — entrance styling and garden dressing are core outdoor services.",
      },
      {
        q: "Can you light outdoor areas too?",
        a: "Yes — we combine decoration with professional outdoor lighting as one scheme.",
      },
      {
        q: "What happens after the festive season?",
        a: "We remove and pack everything, leaving the exterior as it was.",
      },
    ],
  },
};

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages[slug];
}

export const servicePageSlugs = Object.keys(servicePages);