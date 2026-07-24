"use client";

import { ProductCard } from "@/components/shop/product-card";
import { useStore } from "@/components/layout/providers";
import { products } from "@/lib/data";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <main className="px-5 pt-28 md:px-8">
      <section className="mx-auto max-w-[1500px] py-16">
        <p className="text-xs uppercase tracking-[.24em] text-white/40">Wishlist</p>
        <h1 className="mt-5 font-display text-6xl uppercase md:text-9xl">Saved pieces.</h1>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {saved.length ? saved.map((product) => <ProductCard key={product.id} product={product} />) : <p className="text-white/55">No saved items yet.</p>}
        </div>
      </section>
    </main>
  );
}
