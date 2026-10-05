import { del } from "@vercel/blob";
import { isBlobUrl } from "./product-input";

// Removes uploaded images from Vercel Blob. Paths under /public are left alone.
// Best effort: a failed cleanup must not fail the product change that triggered it.
export async function deleteUploadedImages(images: string[]) {
  const urls = images.filter(isBlobUrl);
  if (!urls.length || !process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    await del(urls);
  } catch (error) {
    console.error("Could not delete uploaded images:", error instanceof Error ? error.message : error);
  }
}
