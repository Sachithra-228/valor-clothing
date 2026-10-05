import Link from "next/link";
import { Instagram, Mail, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Logo className="h-7" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">Precision silhouettes, limited capsules, and quiet materials for the modern uniform.</p>
        </div>
        <div className="grid gap-3 text-sm text-white/55">
          <p className="mb-2 text-xs uppercase tracking-[.24em] text-white">Navigate</p>
          <Link href="/shop">Shop</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="grid content-start gap-3 text-sm text-white/55">
          <p className="mb-2 text-xs uppercase tracking-[.24em] text-white">Social</p>
          <span className="flex items-center gap-2"><Instagram className="h-4 w-4" /> Instagram</span>
          <span className="flex items-center gap-2"><Twitter className="h-4 w-4" /> X</span>
          <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> Studio</span>
        </div>
        <form className="content-start">
          <p className="mb-4 text-xs uppercase tracking-[.24em]">Newsletter</p>
          <div className="flex rounded-full border border-white/15 p-1">
            <input aria-label="Email" placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/35" />
            <button className="rounded-full bg-white px-5 text-xs font-bold uppercase tracking-[.16em] text-black">Join</button>
          </div>
        </form>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1500px] justify-between border-t border-white/10 pt-6 text-xs uppercase tracking-[.2em] text-white/35">
        <span>© 2026 VALOR</span>
        <span>Colombo / Worldwide</span>
      </div>
    </footer>
  );
}
