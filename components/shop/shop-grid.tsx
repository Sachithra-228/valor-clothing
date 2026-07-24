"use client";

import { SlidersHorizontal, Grid2X2, List } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

export function ShopGrid() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [compact, setCompact] = useState(false);
  const filtered = useMemo(() => {
    const items = category === "All" ? [...products] : products.filter((product) => product.category === category);
    return items.sort((a, b) => (sort === "Price" ? a.price - b.price : sort === "Popular" ? b.images.length - a.images.length : 0));
  }, [category, sort]);

  return (
    <section className="px-5 py-10 md:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="sticky top-20 z-30 mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 bg-black/80 py-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 flex items-center gap-2 text-xs uppercase tracking-[.2em] text-white/45"><SlidersHorizontal className="h-4 w-4" /> Filters</span>
            {["All", ...categories].map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={cn("rounded-full border px-4 py-2 text-xs uppercase tracking-[.14em] transition", category === item ? "border-white bg-white text-black" : "border-white/10 text-white/55 hover:text-white")}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-white/10 bg-black px-4 py-2 text-xs uppercase tracking-[.14em] outline-none">
              <option>Newest</option>
              <option>Popular</option>
              <option>Price</option>
            </select>
            <button aria-label="Grid view" onClick={() => setCompact(false)} className={cn("rounded-full p-2", !compact && "bg-white text-black")}><Grid2X2 className="h-4 w-4" /></button>
            <button aria-label="List view" onClick={() => setCompact(true)} className={cn("rounded-full p-2", compact && "bg-white text-black")}><List className="h-4 w-4" /></button>
          </div>
        </div>
        <div className={cn("grid gap-x-5 gap-y-12", compact ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}>
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-24 animate-pulse rounded-lg bg-white/[.04]" />)}
        </div>
      </div>
    </section>
  );
}
