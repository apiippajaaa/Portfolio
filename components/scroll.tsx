"use client";

import { motion } from "framer-motion";

export default function Scroll() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
      {/* 💧 Area Drop (punya tinggi sendiri) */}
      <div className="relative h-6 flex items-start justify-center">
        <motion.div
          className="w-0.75 h-0.75 bg-zinc-400/80 rounded-full"
          animate={{
            y: [0, 8, 20],
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.9],
          }}
          transition={{
            duration: 1.8,
            ease: [0.4, 0, 0.2, 1],
            repeat: Infinity,
          }}
        />
      </div>

      {/* 📝 Text (fix di bawah) */}
      <p className="mt-2 text-[10px] tracking-wide text-zinc-500">Scroll</p>
    </div>
  );
}
