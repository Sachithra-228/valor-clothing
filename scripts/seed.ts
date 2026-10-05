import { existsSync } from "node:fs";
import path from "node:path";
import { getDb, getMongoClient } from "../lib/mongodb";
import { ensureProductsCollection, productsCollection } from "../lib/models/product";
import { seedProducts } from "../lib/seed-data";

// Upserts the catalog by slug, so it is safe to run repeatedly.
// Run with: npm run seed
async function seed() {
  const missing = seedProducts
    .flatMap((product) => product.images)
    .filter((image) => !existsSync(path.join(process.cwd(), "public", image)));
  if (missing.length) throw new Error(`Image paths not found in /public:\n${missing.join("\n")}`);

  const db = await getDb();
  await ensureProductsCollection(db);

  // Stagger createdAt so "newest first" follows the order of the seed list.
  const now = Date.now();
  const result = await productsCollection(db).bulkWrite(
    seedProducts.map((product, index) => ({
      updateOne: {
        filter: { slug: product.slug },
        update: { $set: product, $setOnInsert: { createdAt: new Date(now - index * 1000) } },
        upsert: true
      }
    }))
  );

  console.log(`Seeded ${seedProducts.length} products into "${db.databaseName}" (${result.upsertedCount} inserted, ${result.modifiedCount} updated).`);
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await (await getMongoClient()).close();
    } catch {
      // Never connected; nothing to close.
    }
  });
