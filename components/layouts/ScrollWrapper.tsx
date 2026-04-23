"use client";

import { usePathname } from "next/navigation";

export default function ScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      className={`
        w-full
        ${isHome ? "overflow-hidden h-screen" : "overflow-y-auto min-h-screen"}
      `}
    >
      {children}
    </main>
  );
}
