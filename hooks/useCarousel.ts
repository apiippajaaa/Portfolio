"use client";

import { useState } from "react";

export function useCarousel(length: number) {
  const [active, setActive] = useState(0);

  const isStart = active === 0;
  const isEnd = active === length - 1;

  const next = () => {
    if (!isEnd) setActive((prev) => prev + 1);
  };

  const prev = () => {
    if (!isStart) setActive((prev) => prev - 1);
  };

  const goTo = (index: number) => {
    if (index >= 0 && index < length) {
      setActive(index);
    }
  };

  return {
    active,
    next,
    prev,
    goTo,
    isStart,
    isEnd,
    length,
  };
}