import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="VALOR home"
      className={cn("font-display text-xl font-black uppercase tracking-[.46em] text-white", className)}
    >
      VALOR
    </Link>
  );
}
