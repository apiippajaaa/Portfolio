"use client";

import { useRef, useState } from "react";

export function useFullpage(sectionCount: number) {
  const [index, setIndex] = useState(0);
  const isScrolling = useRef(false);

  const moveTo = (next: number) => {
    if (isScrolling.current) return;
    if (next < 0 || next >= sectionCount) return;

    const sections = document.querySelectorAll("[data-section]");
    const el = sections[next] as HTMLElement;

    if (!el) {
      console.log("SECTION NOT FOUND");
      return;
    }

    console.log("MOVE TO:", next);

    isScrolling.current = true;

    window.scrollTo({
      top: el.offsetTop,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIndex(next);
      isScrolling.current = false;
    }, 700);
  };

  const next = () => moveTo(index + 1);
  const prev = () => moveTo(index - 1);

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    console.log("WHEEL:", e.deltaY);

    if (e.deltaY > 0) next();
    else prev();
  };

  return { onWheel };
}