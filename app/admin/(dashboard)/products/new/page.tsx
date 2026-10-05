import { ProductForm } from "@/components/admin/product-form";
import { requireAdmin } from "@/lib/auth";
import { getProducts, uniqueValues } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdmin();
  const products = await getProducts();

  return (
    <>
      <h1 className="font-display text-4xl uppercase">Add product</h1>
      <ProductForm categories={uniqueValues(products, "category")} collections={uniqueValues(products, "collection")} uploadsEnabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} />
    </>
  );
}
