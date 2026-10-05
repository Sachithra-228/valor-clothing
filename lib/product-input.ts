import type { ProductDocument } from "./models/product";

export type ProductInput = Omit<ProductDocument, "slug" | "createdAt">;
export type ProductInputErrors = Partial<Record<keyof ProductInput, string>>;

const BADGES = ["New", "Limited", "Sale"] as const;
const GENDERS = ["Men", "Women", "Unisex"] as const;

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Uploaded images are stored as Vercel Blob URLs; bundled ones as paths under /public.
export function isBlobUrl(image: string) {
  try {
    const url = new URL(image);
    return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

function isImageReference(value: string) {
  return (value.startsWith("/") && !value.startsWith("//")) || isBlobUrl(value);
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function textList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(text).filter(Boolean))];
}

// Validates an untrusted request body against the same rules the collection validator enforces.
export function parseProductInput(body: unknown): { data: ProductInput } | { errors: ProductInputErrors } {
  const input = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const errors: ProductInputErrors = {};

  const name = text(input.name);
  if (!name) errors.name = "Name is required.";
  else if (!slugify(name)) errors.name = "Name must contain letters or numbers.";

  const description = text(input.description);
  if (!description) errors.description = "Description is required.";

  const category = text(input.category);
  if (!category) errors.category = "Category is required.";

  const collection = text(input.collection);
  if (!collection) errors.collection = "Collection is required.";

  const price = Number(input.price);
  if (input.price === "" || input.price == null || !Number.isFinite(price) || price < 0) errors.price = "Enter a price of 0 or more.";

  let salePrice: number | undefined;
  if (input.salePrice !== "" && input.salePrice != null) {
    salePrice = Number(input.salePrice);
    if (!Number.isFinite(salePrice) || salePrice < 0) errors.salePrice = "Enter a sale price of 0 or more.";
    else if (Number.isFinite(price) && salePrice >= price) errors.salePrice = "Sale price must be lower than the price.";
  }

  const stock = Number(input.stock);
  if (input.stock === "" || input.stock == null || !Number.isInteger(stock) || stock < 0) errors.stock = "Enter a whole number of 0 or more.";

  const badge = BADGES.find((item) => item === input.badge);
  if (input.badge && !badge) errors.badge = "Choose a valid badge.";

  const gender = GENDERS.find((item) => item === input.gender);
  if (!gender) errors.gender = "Choose who the product is for.";

  const sizes = textList(input.sizes);
  if (!sizes.length) errors.sizes = "Add at least one size.";

  const colors = textList(input.colors);
  if (!colors.length) errors.colors = "Add at least one colour.";

  const images = textList(input.images);
  if (!images.length) errors.images = "Add at least one image.";
  else if (!images.every(isImageReference)) errors.images = "One of the images has an invalid address.";

  if (Object.keys(errors).length || !gender) return { errors };

  return {
    data: {
      name,
      description,
      category,
      collection,
      price,
      gender,
      sizes,
      colors,
      images,
      stock,
      ...(salePrice !== undefined && { salePrice }),
      ...(badge && { badge })
    }
  };
}
