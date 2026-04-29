"use client";

import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

type Props = {
  image: string;
  onClose: () => void;
};

export default function ImageZoomModal({ image, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [bounds, setBounds] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  const [isDesktop, setIsDesktop] = useState(false);

  /* ================= DETECT DEVICE ================= */
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ================= BOUNDS ================= */
  const updateBounds = () => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const s = scale.get();

    if (s <= 1) {
      setBounds({ left: 0, right: 0, top: 0, bottom: 0 });
      x.set(0);
      y.set(0);
      return;
    }

    const overflowX = (rect.width * (s - 1)) / 2;
    const overflowY = (rect.height * (s - 1)) / 2;

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
  };

  useEffect(() => {
    const unsub = scale.on("change", updateBounds);
    updateBounds();
    return () => unsub();
  }, []);

  /* ================= PINCH (MOBILE) ================= */
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
        let nextScale = startScale * (newDist / startDist);
        scale.set(Math.max(1, Math.min(4, nextScale)));
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  /* ================= SCROLL ZOOM (DESKTOP) ================= */
  useEffect(() => {
    if (!isDesktop) return;

    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      let nextScale = scale.get() + delta;
      scale.set(Math.max(1, Math.min(4, nextScale)));
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [isDesktop]);

  /* ================= DOUBLE CLICK ================= */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleDoubleClick = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      const newScale = scale.get() > 1 ? 1 : 2;
      scale.set(newScale);

      if (newScale > 1) {
        x.set(-offsetX);
        y.set(-offsetY);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    el.addEventListener("dblclick", handleDoubleClick);

    return () => {
      el.removeEventListener("dblclick", handleDoubleClick);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
        >
          ✕
        </button>

        {/* WRAPPER */}
        <motion.div
          ref={containerRef}
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="relative w-[92vw] max-w-5xl h-[75vh] overflow-hidden rounded-2xl touch-none"
        >
          {/* IMAGE */}
          <motion.div
            style={{ scale, x, y }}
            drag
            dragConstraints={bounds}
            dragElastic={0}
            dragMomentum={false}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="100vw"
              className="object-contain select-none pointer-events-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* ================= SCROLL HINT (DESKTOP ONLY) ================= */}
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [10, 0, 0, -10],
            }}
            transition={{
              duration: 3,
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/60 pointer-events-none"
          >
            Scroll to zoom
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
