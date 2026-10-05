import type { Collection, Db, WithId } from "mongodb";
import type { Product } from "../../types/product";

export const PRODUCTS_COLLECTION = "products";

// Shape of a product as stored in MongoDB. `images` holds paths under /public, never file data.
export type ProductDocument = {
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  collection: string;
  badge?: "New" | "Limited" | "Sale";
  gender: "Men" | "Women" | "Unisex";
  sizes: string[];
  colors: string[];
  images: string[];
  stock: number;
  createdAt: Date;
};

const stringArray = { bsonType: "array", items: { bsonType: "string" } };

export const productJsonSchema = {
  bsonType: "object",
  required: ["name", "slug", "description", "price", "category", "collection", "gender", "sizes", "colors", "images", "stock", "createdAt"],
  properties: {
    name: { bsonType: "string", minLength: 1 },
    slug: { bsonType: "string", pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" },
    description: { bsonType: "string" },
    price: { bsonType: ["int", "long", "double"], minimum: 0 },
    salePrice: { bsonType: ["int", "long", "double"], minimum: 0 },
    category: { bsonType: "string" },
    collection: { bsonType: "string" },
    badge: { enum: ["New", "Limited", "Sale"] },
    gender: { enum: ["Men", "Women", "Unisex"] },
    sizes: stringArray,
    colors: stringArray,
    images: stringArray,
    stock: { bsonType: ["int", "long", "double"], minimum: 0 },
    createdAt: { bsonType: "date" }
  }
};

export function productsCollection(db: Db): Collection<ProductDocument> {
  return db.collection<ProductDocument>(PRODUCTS_COLLECTION);
}

// Creates the collection if needed, then applies the schema validator and the unique slug index.
export async function ensureProductsCollection(db: Db) {
  const exists = await db.listCollections({ name: PRODUCTS_COLLECTION }).hasNext();
  const validator = { $jsonSchema: productJsonSchema };
  if (exists) {
    await db.command({ collMod: PRODUCTS_COLLECTION, validator });
  } else {
    await db.createCollection(PRODUCTS_COLLECTION, { validator });
  }
  await productsCollection(db).createIndex({ slug: 1 }, { unique: true });
}

export function toProduct(doc: WithId<ProductDocument>): Product {
  return {
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    price: doc.price,
    salePrice: doc.salePrice,
    category: doc.category,
    collection: doc.collection,
    badge: doc.badge,
    gender: doc.gender,
    sizes: doc.sizes,
    colors: doc.colors,
    images: doc.images,
    stock: doc.stock,
    inStock: doc.stock > 0,
    createdAt: doc.createdAt.toISOString()
  };
}
