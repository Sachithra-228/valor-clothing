import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// /logo-mark.png is the wordmark from /logo.jpeg, trimmed and with the black background made transparent.
export function LogoImage({ className, priority = false }: { className?: string; priority?: boolean }) {
  return <Image src="/logo-mark.png" alt="VALOR" width={1167} height={207} priority={priority} className={cn("h-5 w-auto", className)} />;
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="VALOR home" className="block">
      <LogoImage className={className} priority />
    </Link>
  );
}
