import { MongoServerError } from "mongodb";
import type { Product } from "@/types/product";
import { deleteUploadedImages } from "./blob";
import { getDb } from "./mongodb";
import { productsCollection, toProduct } from "./models/product";
import { slugify, type ProductInput } from "./product-input";

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

export class DuplicateSlugError extends Error {}

// The slug comes from the name and never changes afterwards, so product links stay stable.
export async function createProduct(input: ProductInput): Promise<Product> {
  const db = await getDb();
  const doc = { ...input, slug: slugify(input.name), createdAt: new Date() };
  try {
    const { insertedId } = await productsCollection(db).insertOne(doc);
    return toProduct({ ...doc, _id: insertedId });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) throw new DuplicateSlugError();
    throw error;
  }
}

export async function updateProduct(slug: string, input: ProductInput): Promise<Product | null> {
  const db = await getDb();
  const cleared = {
    ...(input.salePrice === undefined && { salePrice: "" as const }),
    ...(input.badge === undefined && { badge: "" as const })
  };
  const previous = await productsCollection(db).findOneAndUpdate(
    { slug },
    { $set: input, ...(Object.keys(cleared).length && { $unset: cleared }) },
    { returnDocument: "before" }
  );
  if (!previous) return null;

  await deleteUploadedImages(previous.images.filter((image) => !input.images.includes(image)));
  return getProductBySlug(slug);
}

export async function deleteProduct(slug: string): Promise<boolean> {
  const db = await getDb();
  const removed = await productsCollection(db).findOneAndDelete({ slug });
  if (!removed) return false;

  await deleteUploadedImages(removed.images);
  return true;
}
