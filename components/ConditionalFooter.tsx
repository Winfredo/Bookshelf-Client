"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (!pathname || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <section id="footer" className="w-full">
      <Footer />
    </section>
  );
}
