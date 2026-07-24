"use client";

import Image from "next/image";
import { useStore } from "@/components/layout/providers";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart } = useStore();
  const items = cart.map((item) => ({ ...item, product: products.find((product) => product.id === item.productId)! }));
  const subtotal = items.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0);

  return (
    <main className="px-5 pt-28 md:px-8">
      <section className="mx-auto grid max-w-[1500px] gap-10 py-16 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="text-xs uppercase tracking-[.24em] text-white/40">Cart</p>
          <h1 className="mt-5 font-display text-6xl uppercase md:text-9xl">Checkout.</h1>
          <div className="mt-10 divide-y divide-white/10">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-5 py-6">
                <Image src={item.product.images[0]} alt={item.product.name} width={120} height={150} className="h-36 w-28 rounded-md object-cover" />
                <div>
                  <p>{item.product.name}</p>
                  <p className="mt-2 text-xs uppercase tracking-[.16em] text-white/45">{item.color} / {item.size} / Qty {item.quantity}</p>
                  <p className="mt-5">{formatPrice(item.product.salePrice ?? item.product.price)}</p>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="py-10 text-white/55">Your cart is empty.</p>}
          </div>
        </div>
        <aside className="h-fit rounded-lg border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[.24em] text-white/45">Order Summary</p>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span>Estimated shipping</span><span>{subtotal > 250 ? "Complimentary" : "$18"}</span></div>
            <input placeholder="Coupon code" className="h-12 w-full rounded-md border border-white/10 bg-white/[.03] px-4 outline-none" />
            <button className="h-12 w-full rounded-full bg-white text-xs font-bold uppercase tracking-[.18em] text-black">Premium Checkout</button>
          </div>
        </aside>
      </section>
    </main>
  );
}
