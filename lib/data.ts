import type { Product } from "@/types/product";

export const campaignImages = {
  hero: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=2200&q=90",
  story: "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=1600&q=85",
  atelier: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85",
  video: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2200&q=90"
};

export const products: Product[] = [
  {
    id: "valor-oversized-tee",
    name: "Monolith Oversized Tee",
    category: "Oversized Tees",
    collection: "Core Noir",
    price: 118,
    badge: "New",
    gender: "Unisex",
    colors: ["Black", "Ash", "Bone"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    description: "A heavyweight cotton tee with dropped shoulders, compact ribs, and a sculpted box fit.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583744946564-b52d01e7f922?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: "valor-hoodie",
    name: "Obsidian Double Knit Hoodie",
    category: "Hoodies",
    collection: "Winter Silence",
    price: 246,
    badge: "Limited",
    gender: "Unisex",
    colors: ["Charcoal", "Black"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    description: "Dense brushed fleece, structured hood, concealed hardware, and a calm oversized profile.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: "valor-cargo",
    name: "Tactical Wool Cargo",
    category: "Cargo",
    collection: "Utility Edit",
    price: 298,
    gender: "Men",
    colors: ["Black", "Graphite"],
    sizes: ["28", "30", "32", "34", "36"],
    inStock: true,
    description: "Tailored cargo trousers in technical wool with tonal pocketing and adjustable hems.",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: "valor-jacket",
    name: "Compressed Field Jacket",
    category: "Jackets",
    collection: "Core Noir",
    price: 420,
    badge: "New",
    gender: "Unisex",
    colors: ["Black"],
    sizes: ["S", "M", "L"],
    inStock: true,
    description: "A minimal field jacket with compressed padding, hidden placket, and angular seam work.",
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: "valor-cap",
    name: "Silverline Cap",
    category: "Accessories",
    collection: "Objects",
    price: 86,
    salePrice: 68,
    badge: "Sale",
    gender: "Unisex",
    colors: ["Black", "Ash"],
    sizes: ["OS"],
    inStock: true,
    description: "Structured six-panel cap with a tonal embroidered VALOR signature.",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: "valor-knit",
    name: "Ash Rib Knit Layer",
    category: "Knitwear",
    collection: "Winter Silence",
    price: 188,
    gender: "Women",
    colors: ["Ash", "Bone"],
    sizes: ["XS", "S", "M", "L"],
    inStock: false,
    description: "Fine rib knit with elongated cuffs, soft stretch, and a narrow architectural silhouette.",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85"
    ]
  }
];

export const categories = ["Oversized Tees", "Hoodies", "Cargo", "Jackets", "Accessories"];
export const collections = ["Core Noir", "Winter Silence", "Utility Edit", "Objects"];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}
