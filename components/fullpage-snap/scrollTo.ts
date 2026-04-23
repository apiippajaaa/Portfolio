// scrollTo.ts

import { easeInOutCubic } from "./easing";

let rafId: number | null = null;

export function scrollToPosition(
  targetY: number,
  duration: number = 700,
  easing = easeInOutCubic,
  onComplete?: () => void
) {
  // cancel animation sebelumnya
  if (rafId) cancelAnimationFrame(rafId);

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  if (Math.abs(distance) < 1) {
    onComplete?.();
    return;
  }

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const eased = easing(progress);
    const currentY = startY + distance * eased;

    window.scrollTo(0, currentY);

    if (progress < 1) {
      rafId = requestAnimationFrame(animate);
    } else {
      rafId = null;
      onComplete?.();
    }
  }

  rafId = requestAnimationFrame(animate);
}