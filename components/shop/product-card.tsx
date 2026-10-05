"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/components/layout/providers";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const active = wishlist.includes(product.slug);

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-white/5">
        <Image src={product.images[0]} alt={product.name} fill priority={priority} sizes="(min-width: 1024px) 33vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
        {product.images[1] && <Image src={product.images[1]} alt="" fill sizes="(min-width: 1024px) 33vw, 90vw" className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70" />
        {product.badge && <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-black">{product.badge}</span>}
        <span className="absolute bottom-4 left-4 translate-y-4 text-xs uppercase tracking-[.2em] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Quick View
        </span>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/product/${product.slug}`} className="text-sm transition hover:text-white/65">{product.name}</Link>
          <p className="mt-1 text-xs uppercase tracking-[.18em] text-white/40">{product.category}</p>
          <p className="mt-2 text-sm">
            {product.salePrice ? <><span>{formatPrice(product.salePrice)}</span> <span className="text-white/35 line-through">{formatPrice(product.price)}</span></> : formatPrice(product.price)}
          </p>
        </div>
        <div className="flex gap-2">
          <button aria-label="Wishlist" onClick={() => toggleWishlist(product.slug)} className={cn("rounded-full border border-white/10 p-2 transition hover:bg-white hover:text-black", active && "bg-white text-black")}>
            <Heart className="h-4 w-4" />
          </button>
          <button
            aria-label="Add to cart"
            disabled={!product.inStock}
            onClick={() => addToCart({ productId: product.slug, color: product.colors[0], size: product.sizes[0], quantity: 1 })}
            className="rounded-full border border-white/10 p-2 transition hover:bg-white hover:text-black disabled:opacity-30"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
