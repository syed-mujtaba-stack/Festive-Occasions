import type { ReactNode } from "react";
import { JsDriver } from "@/animations/registry";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { CustomCursor } from "@/components/ui/custom-cursor";

/**
 * PageShell — consistent chrome for every inner page:
 * progressive-enhancement driver, smooth scroll, navbar, main (skip-link
 * target), floating WhatsApp/call actions and footer.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <JsDriver />
      <SmoothScroll />
      <Navbar />
      <main id="main-content">{children}</main>
      <FloatingActions />
      <CustomCursor />
      <Footer />
    </>
  );
}