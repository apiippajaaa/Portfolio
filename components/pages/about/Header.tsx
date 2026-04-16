"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const imageAnim = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function AboutHeader() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
    >
      {/* LEFT - TEXT */}
      <div>
        <motion.p
          variants={item}
          className="text-xs text-zinc-500 tracking-[0.3em] uppercase"
        >
          About Me
        </motion.p>

        <motion.h2
          variants={item}
          className="mt-5 text-4xl md:text-6xl font-semibold leading-tight text-white"
        >
          I design & build
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            digital experiences
          </span>
          that matter.
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-8 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl"
        >
          A full-stack developer focused on crafting scalable applications with
          clean architecture, smooth performance, and thoughtful user
          experience.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex items-center gap-6">
          <span className="text-sm text-zinc-500">Based in Indonesia</span>

          <div className="h-4 w-px bg-zinc-700" />

          <span className="text-sm text-zinc-500">Open for opportunities</span>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 120 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-10 h-[2px] bg-white"
        />
      </div>

      {/* RIGHT - IMAGE */}
      <motion.div
        variants={imageAnim}
        className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center"
      >
        <div className="absolute w-[110%] h-[110%] bg-white/5 blur-3xl rounded-full" />

        <motion.div
          initial={{ rotate: -6 }}
          animate={{ rotate: -6 }}
          whileHover={{ rotate: -1, scale: 1.03 }}
          transition={{ duration: 0.4 }}
          className="relative w-[90%] h-full"
        >
          <div className="absolute inset-0 rounded-2xl border border-zinc-700 translate-x-4 translate-y-4" />

          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-zinc-800 bg-black">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
              alt="About visual"
              className="w-full h-full object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
