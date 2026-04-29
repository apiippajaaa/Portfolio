"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  loop?: boolean;
  autoplay?: boolean;
  interval?: number;
};

export function useCarousel(length: number, options?: Options) {
  const { loop = false, autoplay = false, interval = 3000 } = options || {};

  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isStart = active === 0;
  const isEnd = active === length - 1;

  /* ================= NAVIGATION ================= */
  const next = () => {
    setActive((prev) => {
      if (prev === length - 1) return loop ? 0 : prev;
      return prev + 1;
    });
  };

  const prev = () => {
    setActive((prev) => {
      if (prev === 0) return loop ? length - 1 : prev;
      return prev - 1;
    });
  };

  const goTo = (index: number) => {
    if (index >= 0 && index < length) {
      setActive(index);
    }
  };

  /* ================= SCROLL SYNC ================= */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const width = el.clientWidth;

      const index = Math.round(scrollLeft / width);
      setActive(index);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= AUTO PLAY ================= */
  useEffect(() => {
    if (!autoplay) return;

    const id = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(id);
  }, [autoplay, interval]);

  /* ================= SCROLL TO ACTIVE ================= */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTo({
      left: el.clientWidth * active,
      behavior: "smooth",
    });
  }, [active]);

  return {
    active,
    next,
    prev,
    goTo,
    isStart,
    isEnd,
    length,
    containerRef,
  };
}