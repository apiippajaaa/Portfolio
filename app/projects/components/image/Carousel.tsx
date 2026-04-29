"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";

type Props = {
  images: string[];
  startIndex: number;
  onClose: () => void;
};

export default function ImagePreviewModal({
  images,
  startIndex,
  onClose,
}: Props) {
  const { active, next, prev, goTo } = useCarousel(images.length, {
    loop: true,
  });

  const [direction, setDirection] = useState(0);

  /* set initial index */
  useEffect(() => {
    goTo(startIndex);
  }, [startIndex]);

  /* keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {
        setDirection(1);
        next();
      }

      if (e.key === "ArrowLeft") {
        setDirection(-1);
        prev();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const prevIndex = (active - 1 + images.length) % images.length;
  const nextIndex = (active + 1) % images.length;

  useEffect(() => {
    const body = document.body;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, []);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        />

        {/* MAIN */}
        <div className="relative flex-1 flex items-center justify-center px-4 md:px-10">
          <div className="relative w-full max-w-6xl h-[70vh] md:h-[80vh]">
            {/* TOP */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 md:px-6 py-4 text-white/70 z-20">
              <div className="text-xs md:text-sm">
                {active + 1} / {images.length}
              </div>

              <button onClick={onClose}>Close</button>
            </div>

            {/* PEEK LEFT */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[28%] md:w-[26%] h-[75%] opacity-30">
              <Image
                src={images[prevIndex]}
                alt=""
                fill
                className="object-contain"
              />
            </div>

            {/* PEEK RIGHT */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[28%] md:w-[26%] h-[75%] opacity-30">
              <Image
                src={images[nextIndex]}
                alt=""
                fill
                className="object-contain"
              />
            </div>

            {/* MAIN IMAGE */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[78%] md:w-[70%] h-full">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active}
                    custom={direction}
                    initial={{
                      x: direction > 0 ? 80 : -80,
                      opacity: 0,
                      scale: 0.985,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      x: direction > 0 ? -80 : 80,
                      opacity: 0,
                      scale: 0.985,
                    }}
                    transition={{
                      x: {
                        type: "spring",
                        stiffness: 260,
                        damping: 28,
                      },
                      opacity: {
                        duration: 0.25,
                        ease: "easeOut",
                      },
                      scale: {
                        duration: 0.25,
                        ease: "easeOut",
                      },
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[active]}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-contain"
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* BUTTONS */}
            <button
              onClick={() => {
                setDirection(-1);
                prev();
              }}
              className="absolute left-[6%] md:left-[10%] top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-2xl md:text-3xl"
            >
              ‹
            </button>

            <button
              onClick={() => {
                setDirection(1);
                next();
              }}
              className="absolute right-[6%] md:right-[10%] top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-2xl md:text-3xl"
            >
              ›
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
