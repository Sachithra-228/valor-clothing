import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { requireAdmin } from "@/lib/auth";
import { getProducts, uniqueValues } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <>
      <h1 className="font-display text-4xl uppercase">Edit product</h1>
      <p className="mt-2 text-sm text-white/45">/product/{product.slug}</p>
      <ProductForm product={product} categories={uniqueValues(products, "category")} collections={uniqueValues(products, "collection")} uploadsEnabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} />
    </>
  );
}
