import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { requireAdmin } from "@/lib/auth";
import { getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await getProducts();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl uppercase">Products</h1>
          <p className="mt-2 text-sm text-white/55">{products.length} in the shop</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-bold uppercase tracking-[.16em] text-black transition hover:bg-silver">
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-10 rounded-lg border border-white/10 p-10 text-center text-sm text-white/55">No products yet. Add your first one.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-[.16em] text-white/45">
              <tr>
                <th className="px-4 py-3 font-normal">Product</th>
                <th className="px-4 py-3 font-normal">Category</th>
                <th className="px-4 py-3 font-normal">Price</th>
                <th className="px-4 py-3 font-normal">Stock</th>
                <th className="px-4 py-3 font-normal"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {products.map((product) => (
                <tr key={product.slug}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Image src={product.images[0]} alt="" width={48} height={60} className="h-14 w-11 shrink-0 rounded object-cover" />
                      <div>
                        <p>{product.name}</p>
                        <p className="mt-1 text-xs text-white/40">{product.collection}{product.badge && ` · ${product.badge}`}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/70">{product.category}</td>
                  <td className="px-4 py-3">
                    {formatPrice(product.salePrice ?? product.price)}
                    {product.salePrice !== undefined && <span className="ml-2 text-white/35 line-through">{formatPrice(product.price)}</span>}
                  </td>
                  <td className="px-4 py-3">{product.stock > 0 ? product.stock : <span className="text-red-400">Out of stock</span>}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-5 text-xs uppercase tracking-[.14em]">
                      <Link href={`/admin/products/${product.slug}/edit`} className="text-white/70 transition hover:text-white">Edit</Link>
                      <DeleteProductButton slug={product.slug} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
