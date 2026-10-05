import type { Product } from "@/types/product";
import { getDb } from "./mongodb";
import { productsCollection, toProduct } from "./models/product";

export async function getProducts(): Promise<Product[]> {
  const db = await getDb();
  const docs = await productsCollection(db).find().sort({ createdAt: -1, _id: 1 }).toArray();
  return docs.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = await getDb();
  const doc = await productsCollection(db).findOne({ slug });
  return doc ? toProduct(doc) : null;
}

export function uniqueValues(products: Product[], key: "category" | "collection") {
  return [...new Set(products.map((product) => product[key]))];
}
