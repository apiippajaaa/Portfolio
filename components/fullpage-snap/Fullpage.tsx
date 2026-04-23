"use client";

import { useEffect } from "react";
import { useFullpage } from "./useFullpage";

export default function Fullpage({
  children,
}: {
  children: React.ReactNode[];
}) {
  const { onWheel } = useFullpage(children.length);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", onWheel);
    };
  }, [onWheel]);

  return <div className="h-screen w-full">{children}</div>;
}
