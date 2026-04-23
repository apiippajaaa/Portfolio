import { Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

/**
 * AOS-style fade animation (Framer Motion version)
 */
export function fade(direction: Direction = "up", delay = 0): Variants {
  const distance = 40;

  const dir = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  return {
    initial: {
      opacity: 0,
      ...dir[direction],
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      },
    },
  };
}

/**
 * AOS: zoom-in-up (Framer Motion version)
 */
export function zoomInUp(delay = 0): Variants {
  return {
    initial: {
      opacity: 0,
      scale: 0.85,
      y: 40,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1], // smooth "spring-like" ease
      },
    },
  };
}

/**
 * AOS-like stagger container
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};