import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { collections, products } from "@/lib/data";

export const metadata: Metadata = { title: "Collections" };

export default function CollectionsPage() {
  return (
    <main className="pt-28">
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs uppercase tracking-[.24em] text-white/40">Collections</p>
          <h1 className="mt-5 max-w-5xl font-display text-6xl uppercase leading-none md:text-9xl">Capsules with controlled release.</h1>
        </div>
      </section>
      <section className="grid">
        {collections.map((collection, index) => {
          const product = products.find((item) => item.collection === collection) ?? products[index];
          return (
            <Link href={`/shop?collection=${encodeURIComponent(collection)}`} key={collection} className="group relative flex min-h-[58vh] items-end overflow-hidden border-t border-white/10 px-5 py-10 md:px-8">
              <Image src={product.images[0]} alt={collection} fill className="object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              <div className="relative z-10 mx-auto w-full max-w-[1500px]">
                <p className="text-xs uppercase tracking-[.24em] text-white/45">Collection 0{index + 1}</p>
                <h2 className="mt-3 font-display text-5xl uppercase md:text-8xl">{collection}</h2>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
