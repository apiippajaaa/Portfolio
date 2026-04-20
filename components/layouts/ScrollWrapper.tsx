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
         min-h-svh
        overflow-x-auto
        overflow-y-auto
        scroll-smooth
        ${isHome ? "snap-y snap-mandatory no-scrollbar" : ""}
      `}
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      {children}
    </main>
  );
}
