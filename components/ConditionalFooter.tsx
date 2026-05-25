"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (!pathname || pathname.startsWith("/dashboard/librarian") || pathname === "/login"  ) {
    return null;
  }

  return (
    <section id="footer" className="w-full">
      <Footer />
    </section>
  );
}
