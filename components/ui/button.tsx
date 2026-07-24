import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
  variant?: "solid" | "ghost" | "outline";
  children: ReactNode;
};

export function Button({ className, variant = "solid", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 text-xs font-semibold uppercase tracking-[.18em] transition duration-300 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "solid" && "bg-white text-black hover:bg-silver",
        variant === "ghost" && "bg-white/5 text-white hover:bg-white/12",
        variant === "outline" && "border border-white/20 text-white hover:border-white/55",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
