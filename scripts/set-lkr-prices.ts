import { getDb, getMongoClient } from "../lib/mongodb";
import { productsCollection } from "../lib/models/product";
import { seedProducts } from "../lib/seed-data";

// Sets only the price of each seeded product, leaving edits made in the admin dashboard untouched.
// Run with: npx tsx --env-file=.env.local scripts/set-lkr-prices.ts
async function setPrices() {
  const db = await getDb();
  for (const { slug, price } of seedProducts) {
    const before = await productsCollection(db).findOneAndUpdate({ slug }, { $set: { price } });
    console.log(before ? `${slug}: ${before.price} -> ${price}${before.salePrice !== undefined ? ` (sale price still ${before.salePrice})` : ""}` : `${slug}: not found`);
  }
}

setPrices()
  .catch((error) => {
    console.error("Price update failed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await (await getMongoClient()).close();
    } catch {
      // Never connected; nothing to close.
    }
  });
