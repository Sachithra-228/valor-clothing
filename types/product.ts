export type Product = {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  salePrice?: number;
  badge?: "New" | "Limited" | "Sale";
  gender: "Men" | "Women" | "Unisex";
  colors: string[];
  sizes: string[];
  inStock: boolean;
  description: string;
  images: string[];
};

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};
