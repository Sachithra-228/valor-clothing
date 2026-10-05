export type Product = {
  slug: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  salePrice?: number;
  badge?: "New" | "Limited" | "Sale";
  gender: "Men" | "Women" | "Unisex";
  colors: string[];
  sizes: string[];
  stock: number;
  inStock: boolean;
  description: string;
  images: string[];
  createdAt: string;
};

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};
