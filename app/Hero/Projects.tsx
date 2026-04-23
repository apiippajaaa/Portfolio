"use client";

import { useSectionHash } from "@/hooks/useSectionHash";
import Section from "@/components/fullpage-snap/Section";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { fade, staggerContainer } from "@/lib/animation";

const images = ["/1.jpg", "/2.jpg", "/3.jpg"];

const cardVariants = {
  center: {
    x: 0,
    scale: 1,
    rotate: 0,
    zIndex: 3,
    filter: "brightness(1)",
  },
  left: {
    x: -80,
    scale: 0.92,
    rotate: -6,
    zIndex: 2,
    filter: "brightness(0.3)",
  },
  right: {
    x: 80,
    scale: 0.92,
    rotate: 6,
    zIndex: 2,
    filter: "brightness(0.3)",
  },
  back: {
    x: 0,
    scale: 0.85,
    rotate: 0,
    zIndex: 1,
    filter: "brightness(0.4)",
  },
};

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  useSectionHash(ref, "projects");

  // auto rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const getPosition = (i: number) => {
    const relative = (i - index + images.length) % images.length;

    if (relative === 0) return "center";
    if (relative === 1) return "right";
    if (relative === 2) return "left";
    return "back";
  };

  return (
    <Section ref={ref} id="projects" className="px-6">
      {/* GRID */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.4 }}
        className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center"
      >
        {/* TEXT SIDE */}
        <motion.div variants={fade("right")}>
          <p className="text-xs text-zinc-500 tracking-widest uppercase">
            Selected Work
          </p>

          <h2 className="mt-3 text-2xl md:text-3xl text-white font-medium leading-snug max-w-md">
            I build clean and functional digital experiences with focus on
            performance and design.
          </h2>

          <Link
            href="/projects"
            className="inline-block mt-6 text-sm text-zinc-400 hover:text-white transition-colors duration-300"
          >
            View Projects →
          </Link>
        </motion.div>

        {/* CAROUSEL SIDE */}
        <motion.div
          variants={fade("left")}
          className="relative w-full max-w-md h-70 mx-auto"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {images.map((src, i) => {
              const position = getPosition(i);

              return (
                <motion.img
                  key={src}
                  src={`projects/${src}`}
                  alt={`Project ${i}`}
                  className="absolute w-[85%] h-60 md:h-65 object-cover rounded-2xl border border-zinc-800 shadow-2xl cursor-pointer"
                  animate={position}
                  variants={cardVariants}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  drag={position === "center" ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) {
                      setIndex((prev) => (prev + 1) % images.length);
                    }
                    if (info.offset.x > 60) {
                      setIndex(
                        (prev) => (prev - 1 + images.length) % images.length
                      );
                    }
                  }}
                  onClick={() => setIndex((prev) => (prev + 1) % images.length)}
                />
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
