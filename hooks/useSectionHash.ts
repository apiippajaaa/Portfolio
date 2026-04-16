"use client";

import { useEffect } from "react";
import { useInView } from "framer-motion";

export function useSectionHash(
    ref: React.RefObject<HTMLElement | null>,
    id: string
  ) {
  const isInView = useInView(ref, {
    amount: 0.6, // berapa persen terlihat
  });

  useEffect(() => {
    if (isInView) {
      history.replaceState(null, "", `#${id}`);
    }
  }, [isInView, id]);
}