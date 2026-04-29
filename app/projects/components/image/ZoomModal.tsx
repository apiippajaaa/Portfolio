"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";

type Props = {
  image: string;
  onClose: () => void;
};

export default function ImageZoomModal({ image, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isZoomed, setIsZoomed] = useState(false);

  const [bounds, setBounds] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  const [imgSize, setImgSize] = useState({
    width: 0,
    height: 0,
  });

  /* ================= LOAD IMAGE SIZE ================= */
  useEffect(() => {
    const img = new window.Image();
    img.src = image;

    img.onload = () => {
      setImgSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [image]);

  /* ================= UPDATE BOUNDS ================= */
  const updateBounds = useCallback(() => {
    const el = containerRef.current;
    if (!el || !imgSize.width) return;

    const cw = el.clientWidth;
    const ch = el.clientHeight;
    const s = scale.get();

    const containerRatio = cw / ch;
    const imageRatio = imgSize.width / imgSize.height;

    let baseWidth = 0;
    let baseHeight = 0;

    if (imageRatio > containerRatio) {
      baseWidth = cw;
      baseHeight = cw / imageRatio;
    } else {
      baseHeight = ch;
      baseWidth = ch * imageRatio;
    }

    const scaledWidth = baseWidth * s;
    const scaledHeight = baseHeight * s;

    const overflowX = Math.max(0, (scaledWidth - cw) / 2);
    const overflowY = Math.max(0, (scaledHeight - ch) / 2);

    setBounds({
      left: -overflowX,
      right: overflowX,
      top: -overflowY,
      bottom: overflowY,
    });

    const clamp = (val: number, min: number, max: number) =>
      Math.min(Math.max(val, min), max);

    x.set(clamp(x.get(), -overflowX, overflowX));
    y.set(clamp(y.get(), -overflowY, overflowY));
  }, [imgSize, scale, x, y]);

  /* ================= LISTEN SCALE ================= */
  useEffect(() => {
    const unsub = scale.on("change", (v) => {
      setIsZoomed(v > 1);
      updateBounds();
    });

    return () => unsub();
  }, [scale, updateBounds]);

  /* ================= UPDATE WHEN READY ================= */
  useEffect(() => {
    updateBounds();
  }, [imgSize, updateBounds]);

  /* ================= RESIZE ================= */
  useEffect(() => {
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [updateBounds]);

  /* ================= PINCH ZOOM ================= */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startDist = 0;
    let startScale = 1;

    const getDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        startDist = getDistance(e.touches);
        startScale = scale.get();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();

        const newDist = getDistance(e.touches);
        const nextScale = startScale * (newDist / startDist);

        scale.set(Math.max(1, Math.min(3, nextScale)));
      }
    };

    const onTouchEnd = () => {
      const current = scale.get();

      // 🔥 reset ke kondisi awal kalau sudah zoom out
      if (current <= 1.05) {
        animate(scale, 1, { duration: 0.2 });
        animate(x, 0, { duration: 0.2 });
        animate(y, 0, { duration: 0.2 });
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [scale, x, y]);

  /* ================= RESET ================= */
  const reset = () => {
    animate(scale, 1, { duration: 0.2 });
    animate(x, 0, { duration: 0.2 });
    animate(y, 0, { duration: 0.2 });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP */}
        <div
          onClick={() => {
            if (isZoomed) reset();
            else onClose();
          }}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 text-white"
        >
          ✕
        </button>

        {/* CONTAINER */}
        <div
          ref={containerRef}
          className="relative w-full max-w-4xl aspect-[16/10] overflow-hidden rounded-2xl touch-none"
        >
          <motion.div
            style={{ scale, x, y }}
            drag={isZoomed}
            dragConstraints={bounds}
            dragElastic={0}
            dragMomentum={false}
            className="w-full h-full flex items-center justify-center"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="100vw"
              className="object-contain pointer-events-none select-none"
              draggable={false}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
