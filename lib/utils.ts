import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number) {
  return `LKR ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)}`;
}
