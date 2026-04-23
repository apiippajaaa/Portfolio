"use client";

import { usePathname } from "next/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div
      className={
        isHome
          ? `
            h-screen
            overflow-y-scroll
            snap-y
            snap-mandatory
            scroll-smooth
            overscroll-none
          `
          : `
            min-h-screen
            overflow-y-auto
            scroll-smooth
          `
      }
    >
      {children}
    </div>
  );
}
