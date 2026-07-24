"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { products } from "@/lib/data";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const matches = useMemo(
    () => products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5),
    [query]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/95 px-5 py-8 backdrop-blur-xl"
        >
          <button aria-label="Close search" className="absolute right-6 top-6 rounded-full border border-white/15 p-3" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
          <div className="mx-auto mt-28 max-w-4xl">
            <div className="flex items-center gap-4 border-b border-white/20 pb-5">
              <Search className="h-7 w-7 text-white/50" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search VALOR"
                className="w-full bg-transparent font-display text-4xl uppercase outline-none placeholder:text-white/22 md:text-7xl"
              />
            </div>
            <div className="mt-10 grid gap-3">
              {(query ? matches : products.slice(0, 4)).map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  key={product.id}
                  className="flex items-center justify-between border-b border-white/10 py-5 text-white/70 transition hover:text-white"
                >
                  <span>{product.name}</span>
                  <span className="text-xs uppercase tracking-[.2em]">{product.category}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
