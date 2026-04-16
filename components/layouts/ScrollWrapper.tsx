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
        h-svh
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
