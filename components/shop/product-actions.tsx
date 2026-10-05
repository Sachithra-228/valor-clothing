"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, ShoppingBag, Zap } from "lucide-react";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useStore } from "@/components/layout/providers";

export function ProductActions({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useStore();

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[.2em] text-white/45">Color</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((item) => (
            <button key={item} onClick={() => setColor(item)} className={cn("rounded-full border px-4 py-2 text-xs uppercase tracking-[.16em]", color === item ? "border-white bg-white text-black" : "border-white/15")}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[.2em] text-white/45">Size</p>
        <div className="grid grid-cols-5 gap-2">
          {product.sizes.map((item) => (
            <button key={item} onClick={() => setSize(item)} className={cn("h-11 rounded-md border text-sm", size === item ? "border-white bg-white text-black" : "border-white/15")}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[.2em] text-white/45">Quantity</p>
        <div className="flex w-32 items-center justify-between rounded-full border border-white/15 px-4 py-2">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <Button disabled={!product.inStock} onClick={() => addToCart({ productId: product.slug, color, size, quantity })} className="w-full">
          <span className="flex items-center gap-2"><ShoppingBag className="h-4 w-4" /> Add to Cart</span>
        </Button>
        <button aria-label="Wishlist" onClick={() => toggleWishlist(product.slug)} className={cn("h-12 rounded-full border border-white/15 px-5", wishlist.includes(product.slug) && "bg-white text-black")}>
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <Button
        variant="outline"
        disabled={!product.inStock}
        onClick={() => {
          addToCart({ productId: product.slug, color, size, quantity });
          router.push("/cart");
        }}
        className="w-full"
      >
        <span className="flex items-center gap-2"><Zap className="h-4 w-4" /> Buy Now</span>
      </Button>
    </div>
  );
}
