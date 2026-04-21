"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/Footer";

export default function ShowFooter() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <Footer />;
}
