"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black" />

      {/* Glow 1 */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full top-[-150px] left-[-150px]"
      />

      {/* Glow 2 */}
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full bottom-[-150px] right-[-150px]"
      />
    </div>
  );
}
