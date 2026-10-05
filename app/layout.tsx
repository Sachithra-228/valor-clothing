import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VALOR | Defined by Valor",
    template: "%s | VALOR"
  },
  description: "Luxury clothing essentials, limited capsules, and editorial fashion by VALOR.",
  keywords: ["VALOR", "luxury clothing", "premium streetwear", "minimal fashion"],
  openGraph: {
    title: "VALOR | Defined by Valor",
    description: "A premium luxury fashion shopping experience.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="noise mobile-safe">{children}</body>
    </html>
  );
}
