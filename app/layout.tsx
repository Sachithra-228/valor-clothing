import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/animations/cursor";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { StoreProvider } from "@/components/layout/providers";

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
      <body className="noise mobile-safe">
        <StoreProvider>
          <SmoothScroll />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
