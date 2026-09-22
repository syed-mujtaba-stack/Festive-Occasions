/**
 * CHRISTMAS PACKAGES — price-anchored collection.
 *
 * Packages mirror the structure the client requested (from pampa.ae's
 * Christmas collection, client-confirmed pricing). Prices are "from"
 * quotes excluding VAT; custom colour themes, add-ons and larger
 * installations are quoted on request.
 */

export type ChristmasPackage = {
  id: string;
  name: string;
  tree: string;
  fromPrice: number;
  blurb: string;
  items: string[];
  featured?: boolean;
};

export const christmasPackages: ChristmasPackage[] = [
  {
    id: "cheers",
    name: "Christmas Cheers",
    tree: "6 ft tree",
    fromPrice: 6000,
    blurb: "A warm, classic touch for home or office.",
    items: [
      "6 ft Christmas tree with ornaments",
      "One table garland",
      "One basic door wreath",
    ],
  },
  {
    id: "fancy",
    name: "Christmas Fancy",
    tree: "7–8 ft tree",
    fromPrice: 15000,
    blurb: "Elevated styling with more presence, room to room.",
    items: [
      "7–8 ft Christmas tree with ornaments",
      "Staircase garland",
      "Door wreath",
      "Table set-up styling",
    ],
  },
  {
    id: "luxury",
    name: "Christmas Luxury",
    tree: "9–10 ft tree",
    fromPrice: 25000,
    blurb: "The full statement, indoors and at the entrance.",
    featured: true,
    items: [
      "9–10 ft tree with luxury ornaments",
      "Door wreath with garlands",
      "Staircase garlands",
      "Table set-up styling",
      "Curated seasonal accessories",
      "Outdoor entrance garlands",
    ],
  },
];

export function formatPrice(price: number): string {
  return price.toLocaleString("en-AE");
}