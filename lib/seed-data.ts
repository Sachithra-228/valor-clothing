import type { ProductDocument } from "./models/product";

// Source catalog for `npm run seed`. Listed in display order (first = newest).
export const seedProducts: Omit<ProductDocument, "createdAt">[] = [
  {
    slug: "heritage-guardian",
    name: "VALOR® Heritage Guardian",
    category: "Graphic Tees",
    collection: "Heritage",
    price: 48,
    badge: "New",
    gender: "Unisex",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
    description: "An oversized heavyweight tee carrying a Sri Lankan mask dancer across the back, with a three-tile heritage emblem on the chest.",
    images: [
      "/products/heritage-guardian/black-back.png",
      "/products/heritage-guardian/black-front.png",
      "/products/heritage-guardian/white-back.png",
      "/products/heritage-guardian/white-front.png"
    ]
  },
  {
    slug: "signature-script",
    name: "VALOR® Signature Script",
    category: "Logo Tees",
    collection: "Statement",
    price: 42,
    gender: "Unisex",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
    description: "The VALOR wordmark overlaid with a red hand script. Small on the chest, full width across the back: courage, culture, identity.",
    images: [
      "/products/signature-script/black-front.png",
      "/products/signature-script/black-back-model.png",
      "/products/signature-script/white-front.png",
      "/products/signature-script/white-back-model.png"
    ]
  },
  {
    slug: "club-bold-edition",
    name: "VALOR® Club — Bold Edition",
    category: "Logo Tees",
    collection: "Core Noir",
    price: 42,
    gender: "Unisex",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
    description: "A clean black front with a tonal grey VALOR Club print across the back. Built to be bold, made in Sri Lanka.",
    images: [
      "/products/club-bold-edition/back.png",
      "/products/club-bold-edition/back-model.png",
      "/products/club-bold-edition/front.png",
      "/products/club-bold-edition/front-back.png"
    ]
  },
  {
    slug: "classic-varsity",
    name: "VALOR® Classic Varsity",
    category: "Varsity",
    collection: "Statement",
    price: 45,
    badge: "Limited",
    gender: "Unisex",
    colors: ["Black", "Navy", "White"],
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
    description: "A limited edition oversized tee with an arched collegiate VALOR print and an Est. 2025 mark.",
    images: [
      "/products/classic-varsity/black.png",
      "/products/classic-varsity/navy.png",
      "/products/classic-varsity/white.png"
    ]
  },
  {
    slug: "stealth-essential",
    name: "VALOR® Stealth Essential",
    category: "Essentials",
    collection: "Core Noir",
    price: 38,
    gender: "Unisex",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
    description: "The everyday black tee: heavyweight cotton, dropped shoulders, and a tonal embroidered VALOR at the chest.",
    images: [
      "/products/stealth-essential/front.png",
      "/products/stealth-essential/model.png",
      "/products/stealth-essential/back.png"
    ]
  },
  {
    slug: "festive-heart",
    name: "VALOR® Festive Heart",
    category: "Graphic Tees",
    collection: "Festive",
    price: 40,
    gender: "Unisex",
    colors: ["White", "Black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
    description: "A seasonal tee with a heart of holiday illustrations around the VALOR wordmark. Wear your courage.",
    images: [
      "/products/festive-heart/white-front.png",
      "/products/festive-heart/black-front.png",
      "/products/festive-heart/white-front-back.png",
      "/products/festive-heart/white-back.png"
    ]
  }
];
