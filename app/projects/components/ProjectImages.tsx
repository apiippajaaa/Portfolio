"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCarousel } from "@/hooks/useCarousel";
import dynamic from "next/dynamic";

const ImageZoomModal = dynamic(() => import("./image/ZoomModal"), {
  ssr: false,
});

const ImagePreviewModal = dynamic(() => import("./image/Carousel"), {
  ssr: false,
});

export default function ProjectImages({ images }: { images: string[] }) {
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const { active, next, prev, goTo } = useCarousel(images.length, {
    loop: true,
  });

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 md:py-24 space-y-8">
      <h2 className="text-xl font-medium">Preview</h2>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        <div className="relative w-full h-[260px] rounded-2xl overflow-hidden">
          {/* IMAGE */}
          <div
            onClick={() => setZoomImage(images[active])}
            className="absolute inset-0"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  const threshold = 80;

                  if (info.velocity.x < -300 || info.offset.x < -threshold) {
                    next();
                  } else if (
                    info.velocity.x > 300 ||
                    info.offset.x > threshold
                  ) {
                    prev();
                  }
                }}
                initial={{
                  opacity: 0,
                  x: 40,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -40,
                  scale: 0.96,
                }}
                transition={{
                  x: { type: "spring", stiffness: 260, damping: 26 },
                  scale: { duration: 0.25, ease: "easeOut" },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing will-change-transform"
              >
                <Image
                  src={images[active]}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={100}
                  className="object-cover pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white"
          >
            ‹
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white"
          >
            ›
          </button>
        </div>

        {/* INDICATOR */}
        <div className="flex justify-center gap-1.5 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${
                active === i ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setPreviewIndex(i)} // ✅ buka carousel
            className="relative h-[320px] rounded-2xl overflow-hidden cursor-pointer group"
          >
            <Image
              src={img}
              alt=""
              fill
              sizes="600px"
              quality={60}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* ================= MOBILE ZOOM ================= */}
      {zoomImage && (
        <ImageZoomModal image={zoomImage} onClose={() => setZoomImage(null)} />
      )}

      {/* ================= DESKTOP CAROUSEL ================= */}
      {previewIndex !== null && (
        <ImagePreviewModal
          images={images}
          startIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
        />
      )}
    </section>
  );
}
