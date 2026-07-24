import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop/shop-grid";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <main className="pt-28">
      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs uppercase tracking-[.24em] text-white/40">Shop</p>
          <h1 className="mt-4 max-w-5xl font-display text-6xl uppercase leading-none md:text-9xl">Luxury essentials for severe wardrobes.</h1>
        </div>
      </section>
      <ShopGrid />
    </main>
  );
}
