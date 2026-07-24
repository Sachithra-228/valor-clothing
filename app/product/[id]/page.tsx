import Image from "next/image";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/ui/accordion";
import { ProductActions } from "@/components/shop/product-actions";
import { ProductCard } from "@/components/shop/product-card";
import { formatPrice } from "@/lib/utils";
import { getProduct, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <main className="px-5 pt-28 md:px-8">
      <section className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {product.images.concat(product.images).slice(0, 4).map((image, index) => (
            <div key={`${image}-${index}`} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white/5">
              <Image src={image} alt={product.name} fill priority={index === 0} className="object-cover" />
            </div>
          ))}
        </div>
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-xs uppercase tracking-[.24em] text-white/40">{product.collection}</p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-none md:text-7xl">{product.name}</h1>
          <p className="mt-5 text-2xl">{formatPrice(product.salePrice ?? product.price)}</p>
          <p className="mt-6 text-sm leading-7 text-white/58">{product.description}</p>
          <div className="my-8 grid grid-cols-3 gap-3 text-center text-xs uppercase tracking-[.16em] text-white/50">
            <div className="rounded-md border border-white/10 p-4">360 View</div>
            <div className="rounded-md border border-white/10 p-4">Zoom</div>
            <div className="rounded-md border border-white/10 p-4">{product.inStock ? "In Stock" : "Waitlist"}</div>
          </div>
          <ProductActions product={product} />
          <div className="mt-10">
            <Accordion
              items={[
                { title: "Description", content: product.description },
                { title: "Shipping", content: "Complimentary express shipping on orders above $250. Dispatches in 1-2 business days." },
                { title: "Returns", content: "Return eligible items within 14 days in original condition with all garment tags attached." },
                { title: "Reviews", content: "Rated 4.9 by private clients for fabric weight, silhouette, and finish." }
              ]}
            />
          </div>
        </aside>
      </section>
      <section className="mx-auto max-w-[1500px] py-24">
        <h2 className="mb-10 font-display text-4xl uppercase md:text-6xl">Related Products</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </main>
  );
}
