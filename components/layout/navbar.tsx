"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { useStore } from "./providers";
import { SearchOverlay } from "./search-overlay";
import { CartDrawer } from "./cart-drawer";

const links = [
  ["Shop", "/shop"],
  ["Collections", "/collections"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, wishlist } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition duration-300", scrolled ? "bg-black/65 backdrop-blur-xl" : "bg-transparent")}>
        <nav className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-8">
          <button aria-label="Open menu" className="lg:hidden" onClick={() => setMenu(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <Logo />
          <div className="hidden items-center gap-8 text-xs uppercase tracking-[.22em] text-white/70 lg:flex">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-white">
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Search" onClick={() => setSearch(true)} className="rounded-full p-2 transition hover:bg-white/10">
              <Search className="h-5 w-5" />
            </button>
            <Link aria-label="Wishlist" href="/wishlist" className="relative hidden rounded-full p-2 transition hover:bg-white/10 sm:block">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-white" />}
            </Link>
            <Link aria-label="Account" href="/login" className="hidden rounded-full p-2 transition hover:bg-white/10 sm:block">
              <User className="h-5 w-5" />
            </Link>
            <button aria-label="Cart" onClick={() => setCartOpen(true)} className="relative rounded-full p-2 transition hover:bg-white/10">
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && <span className="absolute -right-1 -top-1 text-[10px]">{cart.length}</span>}
            </button>
          </div>
        </nav>
      </header>
      {menu && (
        <div className="fixed inset-0 z-[65] bg-black p-6 lg:hidden">
          <button aria-label="Close menu" onClick={() => setMenu(false)} className="absolute right-6 top-6">
            <X className="h-6 w-6" />
          </button>
          <Logo />
          <div className="mt-24 grid gap-7 font-display text-5xl uppercase">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
