/**
 * IMAGE MANIFEST — Festive Occasions
 *
 * `client*` entries are the client-supplied project photos (public/images/client/)
 * — real Festive Occasions installations. The remaining `christmas/*` Unsplash
 * images are atmospheric scene-builders still used on service pages.
 */

export const images = {
  /** Homepage hero — client landscape installation photo. */
  hero: {
    src: "/images/client/client-hero.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  /** Intro media — client portrait installation photo. */
  clientIntro: {
    src: "/images/client/client-01.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client01: {
    src: "/images/client/client-01.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client02: {
    src: "/images/client/client-02.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client03: {
    src: "/images/client/client-03.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client04: {
    src: "/images/client/client-04.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client05: {
    src: "/images/client/client-05.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client06: {
    src: "/images/client/client-06.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client07: {
    src: "/images/client/client-07.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client08: {
    src: "/images/client/client-08.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client09: {
    src: "/images/client/client-09.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client10: {
    src: "/images/client/client-10.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client11: {
    src: "/images/client/client-11.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  client12: {
    src: "/images/client/client-12.jpg",
    alt: "Christmas decoration installation by Festive Occasions",
  },
  treeGreenLarge: {
    src: "/images/christmas/tree-green-large.jpg",
    alt: "Large green Christmas tree with warm decorations",
  },
  treeStringLights: {
    src: "/images/christmas/tree-string-lights.jpg",
    alt: "Christmas tree with string lights",
  },
  treeBaublesCloseup: {
    src: "/images/christmas/tree-baubles-closeup.jpg",
    alt: "Close-up of baubles on a Christmas tree",
  },
  treeGoldBaubles: {
    src: "/images/christmas/tree-gold-baubles.jpg",
    alt: "Gold baubles on a Christmas tree",
  },
  treeRedBaubles: {
    src: "/images/christmas/tree-red-baubles.jpg",
    alt: "Green Christmas tree with red baubles",
  },
  treeWithBaubles: {
    src: "/images/christmas/tree-with-baubles.jpg",
    alt: "Christmas tree decorated with baubles",
  },
  treeManyOrnaments: {
    src: "/images/christmas/tree-many-ornaments.jpg",
    alt: "Christmas tree decorated with many ornaments",
  },
  treeSilverBaubles: {
    src: "/images/christmas/tree-silver-baubles.jpg",
    alt: "Silver baubles on a green Christmas tree",
  },
  goldenBaubleTree: {
    src: "/images/christmas/golden-bauble-tree.jpg",
    alt: "Golden bauble ornament on a decorated Christmas tree",
  },
  goldBaublesSet: {
    src: "/images/christmas/gold-baubles-set.jpg",
    alt: "Gold Christmas baubles",
  },
  livingroomFireplace: {
    src: "/images/christmas/livingroom-fireplace.jpg",
    alt: "Living room decorated for Christmas with a fireplace",
  },
  livingroomTree: {
    src: "/images/christmas/livingroom-tree.jpg",
    alt: "Living room filled with furniture and a Christmas tree",
  },
  livingroomCandles: {
    src: "/images/christmas/livingroom-candles.jpg",
    alt: "Living room decorated for Christmas with candles",
  },
  livingroomCozyTree: {
    src: "/images/christmas/livingroom-cozy-tree.jpg",
    alt: "Cozy living room decorated for Christmas with a tree",
  },
  officeLobbyTree: {
    src: "/images/christmas/office-lobby-tree.jpg",
    alt: "Decorated Christmas tree in a modern office lobby",
  },
  tableSetting: {
    src: "/images/christmas/table-setting-festive.jpg",
    alt: "Christmas table setting with festive decorations and lights",
  },
  ornamentsTwinkling: {
    src: "/images/christmas/ornaments-twinkling.jpg",
    alt: "Close-up of festive Christmas ornaments with twinkling lights",
  },
  stringLightsBokeh: {
    src: "/images/christmas/string-lights-bokeh.jpg",
    alt: "Christmas string lights with a bokeh background",
  },
  stringLightsShallow: {
    src: "/images/christmas/string-lights-shallow.jpg",
    alt: "Close-up of warm string lights",
  },
  treeStringLightsGreen: {
    src: "/images/christmas/tree-string-lights-green.jpg",
    alt: "Green Christmas tree with warm string lights",
  },
  outdoorHouseLights: {
    src: "/images/christmas/outdoor-house-lights.jpg",
    alt: "Stone house with outdoor Christmas string lights in a garden at night",
  },
} as const;

export type ImageKey = keyof typeof images;