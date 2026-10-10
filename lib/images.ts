/**
 * IMAGE MANIFEST — Festive Occasions
 *
 * All photos are 100% authentic Festive Occasions installations provided by
 * the client (located in public/images/client-work/ project-01 through project-42),
 * plus an ultra-luxury Santa Claus holiday visual for the hero.
 */

/** Shape of a single entry in the `images` manifest below. */
export type ImageEntry = {
  src: string;
  alt: string;
  /**
   * `contain` letterboxes the whole photo instead of cropping it to the frame.
   * Pin this on photos that cannot fill the frames they appear in (the 4:3
   * service-detail blocks) so no part is ever cut off. Overridden by the `fit`
   * prop on <FestiveImage>.
   */
  fit?: "cover" | "contain";
};

export const images = {
  /** Homepage + internal hero — grand commercial & luxury atrium Christmas tree. */
  hero: {
    src: "/images/client-work/project-10.png",
    alt: "Festive Occasions luxury Christmas decoration installation in Dubai — grand illuminated tree",
  },
  /** Ultra-luxury Santa Claus visual for the festive hero section. */
  santaHero: {
    src: "/images/santa-luxury.jpg",
    alt: "Santa Claus festive celebration — Festive Occasions Dubai Christmas decor",
  },
  /** Home intro media (The Studio) — client-supplied 2026-09-27.
   *  Replaces project-42.jpg, which commit a19a792 swapped in without being
   *  asked (and which was a 16:9 landscape crop forced into a portrait frame).
   *  Source: WhatsApp Image 2026-09-27 at 3.50.14 PM.jpeg, 960x1280 (3:4) —
   *  native ratio, so the aspect-[3/4] frame crops nothing.
   *  See scripts/intro-studio-image.mjs. */
  homeIntro: {
    src: "/images/client-work/project-46.jpg",
    alt: "Festive Occasions studio styled interior — Christmas decoration in Dubai by our team",
  },
  /** Signature expanding-frame — full-bleed 100vw. Client-selected:
   *  "WhatsApp Image 2026-09-26 at 3.36.29 PM (2)" -> project-43.jpg.
   *  Enhanced and upscaled to 2400x1792 high-resolution master asset for crisp full-bleed display. */
  signatureDetails: {
    src: "/images/client-work/project-43.jpg",
    alt: "Festive Occasions Christmas decoration installation in Dubai",
  },
  /** Final CTA glow — fireplace garland and warm holiday fireplace. */
  finalCtaGlow: {
    src: "/images/image copy.png",
    alt: "Warm festive fireplace garland decoration in Dubai — Festive Occasions",
  },
  /** Audiences — villa grand entrance archway. */
  audienceVilla: {
    src: "/images/client-work/project-13.jpg",
    alt: "Villa entrance festive Christmas archway with organic pine and red berries in Dubai",
  },
  /** Audiences — executive office & commercial wreath styling. */
  audienceOffice: {
    src: "/images/client-work/project-27.jpg",
    alt: "Festive commercial reception and wreath decoration in Dubai",
  },
  /** Audiences — hospitality & grand venue. */
  audienceVenue: {
    src: "/images/client-work/project-10.png",
    alt: "Hospitality venue styled with grand illuminated Christmas tree",
  },
  /** Package cards — Cheers, Fancy, Luxury. */
  pkgCheers: {
    src: "/images/client-work/project-04.jpg",
    alt: "Classic Christmas tree with rich red velvet bows and warm illumination — Cheers package",
  },
  pkgFancy: {
    src: "/images/client-work/project-23.jpg",
    alt: "Snow-flocked Christmas tree with red snowflake ribbons and baubles — Fancy package",
  },
  pkgLuxury: {
    src: "/images/client-work/project-34.png",
    alt: "Opulent candy cane and peppermint luxury Christmas tree — Luxe package",
  },
  /** Services index cards + service page heroes.
   *  These render inside the fixed aspect-[4/5] stage in
   *  components/sections/services.tsx, so every one of them is a dedicated
   *  4:5 master cut by scripts/recut-services.mjs — named svc-*-45.jpg to
   *  keep them distinct from the gallery's project-NN.jpg photos.
   *  Do not point these at a project-NN file: those are mixed-ratio cuts and
   *  the frame would crop them again. */
  svcComplete: {
    src: "/images/client-work/svc-complete-45.jpg",
    alt: "Grand luxury Christmas doorway archway installation with lush red ornament garland",
  },
  svcVilla: {
    src: "/images/client-work/svc-villa-45.jpg",
    alt: "Christmas villa decoration in Dubai — grand entrance archway",
  },
  svcHome: {
    src: "/images/new7.PNG",
    alt: "Home Christmas decoration in Dubai — elegant villa staircase garland styling with red velvet bows and festive ornaments",
  },

  // User-supplied image for slide 04 Office Christmas Decoration.
  // Shows: indoor office/commercial workspace with hanging red baubles,
  // glowing snowflake ornaments from ceiling, decorated display counter
  // and wooden seating with festive greenery and red ornaments.
  svcOffice: {
    src: "/images/client-work/svc-office-45.jpg",
    alt: "Office Christmas decoration in Dubai — commercial workspace with hanging red baubles, snowflake ornaments and festive display styling",
  },
  svcCorporate: {
    src: "/images/Corporate-Decoration-img.jpg",
    alt: "Corporate Christmas decoration in Dubai — large-scale festive installation for a commercial venue",
  },
  // User-supplied image for slide 06 Christmas Lighting.
  // Shows: tall lush Christmas tree heavily adorned with red and gold baubles,
  // floral picks and warm lighting, surrounded by wrapped gift boxes with red ribbons.
  svcLighting: {
    src: "/images/client-work/svc-lighting-45.jpg",
    alt: "Christmas lighting in Dubai — grand Christmas tree with red and gold baubles, warm lighting and gift boxes",
  },
  // User-supplied image for slide 07 Outdoor Christmas Decoration.
  // Shows: outdoor entranceway with arched doorway draped in pine garlands,
  // red ornaments, twinkling lights, flanked by illuminated gold wire deer
  // figurines and cone light structures on the patio.
  svcOutdoor: {
    src: "/images/new6.PNG",
    alt: "Outdoor Christmas decoration in Dubai — grand entrance archway with festive garland, illuminated deer, lanterns and balcony decoration",
  },

  /** Service page heroes (PageHero = full-bleed 100vw x 62svh, ~2.6:1).
   *  Separate 16:9 cuts from the same masters — a 4:5 photo dropped into
   *  that band keeps only ~28% of its height. Point each service page's
   *  heroImage at the matching *Hero key, not the svc* stage key. */
  /* Service page PageHero masters (full-bleed, distinct from the svc* rail).
   *
   * All seven were re-cut on 2026-09-27 so that no service page hero shares a
   * photo with its own homepage rail slide — verified 0/7 self-duplicates.
   * Sources are declared in scripts/recut-services.mjs (`heroRaw`) and
   * scripts/recut-removed-slots.mjs. The alts below were rewritten at the same
   * time to describe the NEW photo, not the one the hero used to be cut from.
   *
   * Two heroes were re-pointed away from photos the homepage also shows, at the
   * client's request: svcOutdoorHero (was project-41, the homepage hero
   * background) and svcOfficeHero (project-27, the Audiences card). Every
   * conflict-free alternative left in the library is ~1320px, so those two
   * heroes now take a 1.55x upscale at the 2048px the hero requests. */
  svcCompleteHero: {
    // project-05.jpg — 5712x4284, the library's only 24.5MP landscape, so the
    // 16:9 crop keeps 75% of its height instead of the 42% a portrait gives.
    src: "/images/client-work/svc-complete-hero.jpg",
    alt: "Grand luxury Christmas doorway archway installation with lush red ornament garland",
  },
  svcVillaHero: {
    // svc-villa-45.jpg — 4:5 landscape cut, matches homepage rail slide 02
    // Shows: grand villa entrance archway with festive garland and ornament styling
    src: "/images/client-work/svc-villa-45.jpg",
    alt: "Villa Christmas decoration in Dubai — grand entrance archway with festive garland and ornaments",
  },
  svcHomeHero: {
    // svc-home-45.jpg — 4:5 landscape cut, matches homepage rail slide 03
    // Shows: festive living room with lit tree, garlands and warm ambient styling
    src: "/images/client-work/svc-home-45.jpg",
    alt: "Home Christmas decoration in Dubai — festive living room with lit tree and garlands",
  },
  svcOfficeHero: {
    // svc-office-45.jpg — 4:5 landscape cut, matches homepage rail slide 04
    // Shows: indoor office/commercial workspace with hanging red baubles,
    // glowing snowflake ornaments from ceiling, decorated display counter
    // and wooden seating with festive greenery and red ornaments.
    src: "/images/client-work/svc-office-45.jpg",
    alt: "Office Christmas decoration in Dubai — commercial workspace with hanging baubles, snowflake ornaments and festive display styling",
  },
  svcCorporateHero: {
    // Corporate-Decoration-img.jpg — same as the homepage "What We Do" rail slide 05
    // Shows: large-scale festive installation for a commercial venue
    src: "/images/Corporate-Decoration-img.jpg",
    alt: "Corporate Christmas decoration in Dubai — large-scale festive installation for a commercial venue",
  },
  svcLightingHero: {
    // svc-lighting-45.jpg — same as the homepage "What We Do" rail slide 06
    // Shows: tall lush Christmas tree heavily adorned with red and gold baubles,
    // floral picks and warm lighting, surrounded by wrapped gift boxes with red ribbons.
    src: "/images/client-work/svc-lighting-45.jpg",
    alt: "Christmas lighting in Dubai — grand Christmas tree with red and gold baubles, warm lighting and gift boxes",
  },
  svcOutdoorHero: {
    // OutdoorChristmasDecoration.jpg — client-supplied outdoor Christmas hero image
    src: "/images/OutdoorChristmasDecoration.jpg",
    alt: "Outdoor Christmas decoration in Dubai — illuminated garden, entrance and facade lighting",
  },
  /** Corporate Decoration main showpiece image. */
  CorporateDecoration: {
    src: "/images/CorporateDecoration.jpg",
    alt: "Corporate Christmas decoration in Dubai — large-scale festive installation for a commercial venue",
  },

/** Service page detail blocks (unique per service). */
  detailPillar1: {
    src: "/images/client-work/project-34.png",
    alt: "Bespoke peppermint Christmas tree design in Dubai",
  },
  detailPillar2: {
    src: "/images/client-work/project-38.png",
    alt: "Rose gold and champagne Christmas tree styling by Festive Occasions",
  },
  detailPillar3: {
    src: "/images/new1.PNG",
    alt: "Professional Christmas entrance garland and wreath installation in Dubai",
    fit: "contain",
  },
  detailVilla1: {
    src: "/images/client-work/project-13.jpg",
    alt: "Christmas villa entrance archway decoration with organic pine and berries in Dubai",
  },
  detailVilla2: {
    src: "/images/client-work/project-42.jpg",
    alt: "Christmas villa living room styling in Dubai",
  },
  detailVilla3: {
    src: "/images/client-work/project-40.jpg",
    alt: "Villa hallway Christmas tree and candle styling in Dubai",
  },
  detailHome1: {
    src: "/images/client-work/project-23.jpg",
    alt: "Christmas home snow-flocked tree in Dubai",
  },
  detailHome2: {
    src: "/images/client-work/project-04.jpg",
    alt: "Christmas console and table styling in Dubai",
  },
  detailHome3: {
    src: "/images/client-work/project-38.png",
    alt: "Champagne ornament Christmas tree in Dubai residence",
  },
  detailOffice1: {
    src: "/images/client-work/project-01.jpg",
    alt: "Commercial and office entrance candy cane and ornament garland installation in Dubai",
  },
  detailOffice2: {
    src: "/images/client-work/project-27.jpg",
    alt: "Subtle festive commercial illuminated wreath in Dubai",
  },
  detailOffice3: {
    src: "/images/client-work/project-04.jpg",
    alt: "Festive dining and reception table garland styling in Dubai",
  },
  detailCorporate1: {
    src: "/images/client-work/project-10.png",
    alt: "Branded corporate atrium Christmas tree in Dubai",
  },
  detailCorporate2: {
    src: "/images/client-work/project-27.jpg",
    alt: "Large venue Christmas wreath installation in Dubai",
  },
  detailCorporate3: {
    src: "/images/client-work/project-35.jpg",
    alt: "Professional corporate festive tree styling in Dubai",
    // Portrait photo in a landscape aspect-[4/3] block — `cover` would crop the
    // top and bottom off, so this one is letterboxed in full.
    fit: "contain",
  },
  detailLighting1: {
    src: "/images/client-work/project-40.jpg",
    alt: "Christmas candle illumination in Dubai",
  },
  detailLighting2: {
    src: "/images/client-work/project-10.png",
    alt: "Atrium fairy lights and canopy lighting in Dubai",
  },
  detailLighting3: {
    src: "/images/client-work/project-30.png",
    alt: "Illuminated archway garland in Dubai",
  },
  detailOutdoor1: {
    src: "/images/client-work/project-13.jpg",
    alt: "Outdoor entrance Christmas archway in Dubai",
  },
  detailOutdoor2: {
    src: "/images/client-work/project-40.jpg",
    alt: "Doorway Christmas tree and evening lighting in Dubai",
  },
  detailOutdoor3: {
    src: "/images/client-work/project-27.jpg",
    alt: "Exterior festive illuminated ring in Dubai",
  },
  /** Blog post covers. */
  blog1: {
    src: "/images/client-work/project-06.jpg",
    alt: "Festive Occasions decorator styling a grand champagne and gold Christmas tree with luxury gift boxes",
  },
  blog2: {
    src: "/images/client-work/project-07.jpg",
    alt: "Christmas decoration packages in Dubai",
  },
  blog3: {
    src: "/images/client-work/project-08.jpg",
    alt: "Christmas villa decoration guide for Dubai villas",
  },
  blog4: {
    src: "/images/client-work/project-09.jpg",
    alt: "Christmas decoration sizing and styling in Dubai",
  },
  blog5: {
    src: "/images/client-work/project-11.jpg",
    alt: "Christmas decoration styling in Dubai",
  },
  blog6: {
    src: "/images/client-work/project-12.jpg",
    alt: "Office Christmas decoration in Dubai",
  },
  blog7: {
    src: "/images/client-work/project-13.jpg",
    alt: "Organic pine and red berry villa entrance archway decoration in Dubai",
  },
  blog8: {
    src: "/images/client-work/project-14.jpg",
    alt: "Snow-flocked champagne and white winter wonderland tree styling in Dubai",
  },
  // These two were the only blog covers still pointing at 738px-wide WhatsApp
  // exports (project-02 / project-03). The raws are themselves 738px, so there
  // was nothing to re-cut — the photos had to be swapped. They render at
  // `sizes="100vw"` in PageHero (Next asks for 2048px) and 50vw on the /blog
  // card (1080px), so 738px was being upscaled 2.78x and 1.46x respectively:
  // that upscale was the blur. Both replacements are unused on the homepage and
  // clear both thresholds outright.
  blog9: {
    // project-25.jpg (IMG_4910, 4284x5712) — gallery g26, "Bespoke Minimalist
    // Christmas Tree Styling". A restrained single-tree scheme is exactly the
    // argument this post makes about not overcrowding a flat.
    src: "/images/client-work/project-25.jpg",
    alt: "Minimalist Christmas tree styling for an apartment in Dubai — restrained festive decor for a smaller space",
  },
  blog10: {
    // project-21.jpg (IMG_4684, 3024x4032) — gallery g21, "Villa Staircase &
    // Foyer Decoration". 3024px still clears the 2048px hero request.
    src: "/images/client-work/project-21.jpg",
    alt: "Professional Christmas staircase and foyer decoration in a Dubai villa by Festive Occasions",
  },
  blog11: {
    src: "/images/client-work/project-16.jpg",
    alt: "White and gold luxury Christmas tree theme in Dubai",
  },
  blog12: {
    src: "/images/client-work/project-17.jpg",
    alt: "Festive occasion decoration styling in Dubai",
  },
  /** Support-page heroes. */
  pageAreas: {
    src: "/images/client-work/project-15.jpg",
    alt: "Luxury Dubai villa exterior with illuminated wrapped palm trees and festive doorway archway",
  },
  pageAbout: {
    src: "/images/client-work/project-30.png",
    alt: "Christmas decoration craftsmanship — Festive Occasions",
  },
  pageAboutPortrait: {
    src: "/images/client-work/project-38.png",
    alt: "Hand-finished festive holiday tree detail by Festive Occasions",
  },
  pageContact: {
    src: "/images/client-work/project-04.jpg",
    alt: "Festive dining table runner garland with candles — contact Festive Occasions Dubai",
  },
  pageOther: {
    src: "/images/client-work/project-27.jpg",
    alt: "Celebratory festive installations for occasions beyond Christmas",
  },
  pageUae: {
    src: "/images/client-work/project-10.png",
    alt: "Dubai luxury festive installation",
  },
  pageBlog: {
    src: "/images/client-work/project-42.jpg",
    alt: "Christmas decoration ideas and styling in Dubai",
  },
  /** Real client project photos (1 to 41). */
  client01: { src: "/images/client-work/project-01.jpg", alt: "Commercial entrance candy cane and garland pillar by Festive Occasions" },
  client02: { src: "/images/client-work/project-02.jpg", alt: "Velvet crimson ribbons and gold Christmas tree by Festive Occasions" },
  client03: { src: "/images/client-work/project-03.jpg", alt: "Cascading burgundy baubles and floating taper candles by Festive Occasions" },
  client04: { src: "/images/client-work/project-04.jpg", alt: "Festive dining table runner and candle styling by Festive Occasions" },
  client05: { src: "/images/client-work/project-42.jpg", alt: "Festive Occasions installation in Dubai" },
  client06: { src: "/images/client-work/project-06.jpg", alt: "Grand champagne tree styling and luxury gift boxes by Festive Occasions" },
  client07: { src: "/images/client-work/project-07.jpg", alt: "Festive Occasions installation in Dubai" },
  client08: { src: "/images/client-work/project-08.jpg", alt: "Festive Occasions installation in Dubai" },
  client09: { src: "/images/client-work/project-09.jpg", alt: "Festive Occasions installation in Dubai" },
  client10: { src: "/images/client-work/project-10.png", alt: "Festive Occasions installation in Dubai" },
  client11: { src: "/images/client-work/project-11.jpg", alt: "Festive Occasions installation in Dubai" },
  client12: { src: "/images/client-work/project-12.jpg", alt: "Festive Occasions installation in Dubai" },
  client13: { src: "/images/client-work/project-13.jpg", alt: "Organic pine and red berry villa entrance arch by Festive Occasions" },
  client14: { src: "/images/client-work/project-14.jpg", alt: "Snow-flocked champagne winter wonderland tree by Festive Occasions" },
  client15: { src: "/images/client-work/project-15.jpg", alt: "Illuminated palm trees and grand villa doorway arch by Festive Occasions" },
  client16: { src: "/images/client-work/project-16.jpg", alt: "Festive Occasions installation in Dubai" },
  client17: { src: "/images/client-work/project-17.jpg", alt: "Festive Occasions installation in Dubai" },
  client18: { src: "/images/client-work/project-18.jpg", alt: "Festive Occasions installation in Dubai" },
  client21: { src: "/images/client-work/project-21.jpg", alt: "Festive Occasions installation in Dubai" },
  // Preserve the entire IMG_4722 fireplace photo in the gallery tile.
  client22: { src: "/images/client-work/project-22.jpg", alt: "Festive Occasions installation in Dubai", fit: "contain" },
  client23: { src: "/images/client-work/project-23.jpg", alt: "Festive Occasions installation in Dubai" },
  client24: { src: "/images/client-work/project-24.jpg", alt: "Festive Occasions installation in Dubai" },
  // Was project-26.jpg (IMG_5058) — removed at the client's request.
  // Replaced with project-25.jpg (IMG_4910), an unused 4284x5712 portrait that
  // matches the 3:4 gallery tile exactly, so nothing is cropped.
  client26: { src: "/images/client-work/project-25.jpg", alt: "Festive Occasions installation in Dubai" },
  client27: { src: "/images/client-work/project-27.jpg", alt: "Festive Occasions installation in Dubai" },
  client28: { src: "/images/client-work/project-28.jpg", alt: "Festive Occasions installation in Dubai" },
  client29: { src: "/images/client-work/project-29.jpg", alt: "Festive Occasions installation in Dubai" },
  client30: { src: "/images/client-work/project-30.png", alt: "Festive Occasions installation in Dubai" },
  client31: { src: "/images/client-work/project-31.png", alt: "Festive Occasions installation in Dubai" },
  client32: { src: "/images/client-work/project-32.png", alt: "Festive Occasions installation in Dubai" },
  client33: { src: "/images/client-work/project-33.png", alt: "Festive Occasions installation in Dubai" },
  client34: { src: "/images/client-work/project-34.png", alt: "Festive Occasions installation in Dubai" },
  client35: {
    src: "/images/client-work/project-35.jpg",
    alt: "Festive Occasions installation in Dubai",
    // Exported at the same 3:4 as every other gallery photo, so the shared
    // aspect-[3/4] tile covers it exactly — nothing cropped, no special-casing.
    // See scripts/project-35-image.mjs.
  },
  client36: { src: "/images/client-work/project-36.png", alt: "Festive Occasions installation in Dubai" },
  client37: { src: "/images/client-work/project-37.png", alt: "Festive Occasions installation in Dubai" },
  client38: { src: "/images/client-work/project-38.png", alt: "Festive Occasions installation in Dubai" },
  client39: { src: "/images/client-work/project-39.jpg", alt: "Festive Occasions installation in Dubai" },
  client40: { src: "/images/client-work/project-40.jpg", alt: "Festive Occasions installation in Dubai" },
  client41: { src: "/images/client-work/project-41.jpg", alt: "Festive Occasions installation in Dubai" },
  client44: { src: "/images/client-work/project-44.jpg", alt: "Grand spiral red bauble and poinsettia tree installation by Festive Occasions Dubai" },
  client45: { src: "/images/client-work/project-45.jpg", alt: "Dramatic bespoke arched doorway garland with cascading red ornaments by Festive Occasions Dubai" },

  /** Added to the gallery on the client's request.
   *  "WhatsApp Image 2026-09-26 at 6.18.40 PM.jpeg" -> project-47.jpg
   *
   *  KNOWN OVERLAP: this is the same photo as `svcLighting` (the homepage
   *  "What We Do" rail, slide 06, Christmas Lighting) - confirmed by reproducing
   *  that 4:5 cut and comparing pixels (MAD 0.24, vs a known-different control
   *  at 72). It used to back `svcOffice` (slide 04) instead, but the client asked
   *  for a real office photo there, so the cut moved to the Lighting slot, which
   *  is the one this photo actually suits. So it now shows on the homepage once,
   *  in the correct slot, and once more in the gallery below it.
   *
   *  1086x1448 is already 3:4, the exact shape of the gallery tile, so nothing
   *  is cropped and nothing is upscaled. See scripts/project-47-image.mjs. */
  client47: {
    src: "/images/client-work/project-47.jpg",
    alt: "Commercial and office entrance Christmas decoration in Dubai - candy cane and ornament garland installation",
  },

  /** Added to the gallery on the client's request.
   *  "WhatsApp Image 2026-09-26 at 3.36..jpeg" -> project-48.jpg
   *
   *  The double dot in the source filename is real, not a typo.
   *
   *  This file is pixel-identical to `img.png` in the same folder (MAD 0.00 on
   *  3:4 crops, vs a known-different control at 60) — the same photograph saved
   *  twice under two names. `img.png` is no longer referenced by anything: it
   *  used to feed `svcOfficeHero`, which scripts/recut-removed-slots.mjs
   *  re-pointed at IMG_5096 (project-27.jpg) to remove a 1.77x upscale. So this
   *  photo was visible nowhere on the site and adding it duplicates nothing.
   *
   *  1086x1448 is already 3:4, the exact shape of the gallery tile, so nothing
   *  is cropped and nothing is upscaled. See scripts/project-48-image.mjs.
   *
   *  TODO(client): the alt below is a safe generic, not a description of the
   *  subject — no record of what this photo shows exists anywhere in the repo
   *  or its git history. Replace it, and give g43 a real title, once the
   *  subject is known. */
  client48: {
    src: "/images/client-work/project-48.jpg",
    alt: "Festive Occasions Christmas decoration installation in Dubai",
  },

  /** Gallery replacements for the two client photos the client asked to have
   *  removed (IMG_4652 / IMG_4682, formerly client20 / client21).
   *  CC0 / public domain, downloaded via scripts/download-christmas-images.js
   *  and recorded in .unsplash-cache/openverse/downloads-record.json. */
  galleryHome2: {
    src: "/images/christmas/gallery-home-2.jpg",
    alt: "Festive apartment living room with a decorated Christmas tree and warm seasonal styling",
  },
  galleryVillaStair: {
    src: "/images/christmas/gallery-villa-stair.jpg",
    alt: "Christmas staircase and foyer decorated with garland, ornaments and warm lighting",
  },
} as const;

export type ImageKey = keyof typeof images;