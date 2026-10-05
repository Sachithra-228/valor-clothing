import { CustomCursor } from "@/components/animations/cursor";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { StoreProvider } from "@/components/layout/providers";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider>
      <SmoothScroll />
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
    </StoreProvider>
  );
}
