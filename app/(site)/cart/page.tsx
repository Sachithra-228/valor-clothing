"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useCartItems } from "@/components/layout/providers";
import { whatsappUrl } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

const inputClass = "w-full rounded-md border border-white/10 bg-white/[.03] px-4 outline-none placeholder:text-white/35";

export default function CartPage() {
  const items = useCartItems();
  const subtotal = items.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0);

  // No online payment yet: the order is sent to VALOR as a pre-filled WhatsApp message.
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const field = (name: string) => String(form.get(name) ?? "").trim();
    const lines = [
      "*New VALOR order*",
      "",
      ...items.flatMap((item, index) => {
        const price = item.product.salePrice ?? item.product.price;
        return [
          `${index + 1}. ${item.product.name}`,
          `   Colour: ${item.color} | Size: ${item.size} | Qty: ${item.quantity}`,
          `   ${formatPrice(price)} x ${item.quantity} = ${formatPrice(price * item.quantity)}`
        ];
      }),
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      "Delivery charge: to be confirmed",
      "",
      "*Delivery details*",
      `Name: ${field("name")}`,
      `Phone: ${field("phone")}`,
      `Address: ${field("address")}`,
      `City: ${field("city")}`,
      ...(field("note") ? [`Note: ${field("note")}`] : [])
    ];
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");
  }

  return (
    <main className="px-5 pt-28 md:px-8">
      <section className="mx-auto grid max-w-[1500px] gap-10 py-16 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="text-xs uppercase tracking-[.24em] text-white/40">Cart</p>
          <h1 className="mt-5 font-display text-6xl uppercase md:text-9xl">Checkout.</h1>
          <div className="mt-10 divide-y divide-white/10">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-5 py-6">
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
            <div className="flex justify-between"><span>Delivery</span><span className="text-white/55">Confirmed on WhatsApp</span></div>
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm">
            <p className="text-xs uppercase tracking-[.24em] text-white/45">Delivery Details</p>
            <input name="name" required aria-label="Full name" placeholder="Full name" className={`h-12 ${inputClass}`} />
            <input name="phone" type="tel" required aria-label="Phone number" placeholder="Phone number" className={`h-12 ${inputClass}`} />
            <textarea name="address" required aria-label="Delivery address" placeholder="Delivery address" rows={3} className={`py-3 ${inputClass}`} />
            <input name="city" required aria-label="City" placeholder="City" className={`h-12 ${inputClass}`} />
            <input name="note" aria-label="Order note" placeholder="Order note (optional)" className={`h-12 ${inputClass}`} />
            <button disabled={items.length === 0} className="h-12 w-full rounded-full bg-white text-xs font-bold uppercase tracking-[.18em] text-black disabled:opacity-40">Order on WhatsApp</button>
            <p className="text-xs leading-5 text-white/40">This opens WhatsApp with your order ready to send. We confirm the delivery charge and payment there.</p>
          </form>
        </aside>
      </section>
    </main>
  );
}
