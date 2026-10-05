"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartItems, useStore } from "./providers";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { removeFromCart } = useStore();
  const items = useCartItems();
  const subtotal = items.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/55"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 z-[61] h-full w-full max-w-md bg-coal p-6 shadow-luxury"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl uppercase">Cart</h2>
              <button aria-label="Close cart" onClick={onClose} className="rounded-full border border-white/15 p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8 space-y-5">
              {items.length === 0 && <p className="text-sm text-white/55">Your cart is empty.</p>}
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                  <Image src={item.product.images[0]} alt={item.product.name} width={96} height={120} className="h-28 w-20 rounded-md object-cover" />
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm">{item.product.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[.14em] text-white/45">
                      {item.color} / {item.size} / Qty {item.quantity}
                    </p>
                    <button onClick={() => removeFromCart(item.productId)} className="mt-auto w-fit text-xs uppercase tracking-[.18em] text-white/45">
                      Remove
                    </button>
                  </div>
                  <p className="text-sm">{formatPrice(item.product.salePrice ?? item.product.price)}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-x-6 bottom-6 border-t border-white/10 pt-5">
              <div className="mb-4 flex justify-between text-sm uppercase tracking-[.18em]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Link href="/cart" onClick={onClose} className="flex h-12 items-center justify-center rounded-full bg-white text-xs font-bold uppercase tracking-[.18em] text-black">
                Checkout
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
