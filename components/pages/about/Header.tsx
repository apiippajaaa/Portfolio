"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const imageAnim = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function AboutHeader() {
  return (
    <>
      {/* ================= MOBILE (FULL BLEED HERO) ================= */}
      <section
        className="
          md:hidden
          relative min-h-screen flex items-center

          w-screen
          left-1/2 -translate-x-1/2   /* 🔥 full-bleed fix */
        "
      >
        {/* BG */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt=""
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* gradient depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/30 to-black" />
        </div>

        {/* CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="w-full max-w-md px-6"
        >
          <motion.p
            variants={item}
            className="text-[11px] text-zinc-400 tracking-[0.3em] uppercase"
          >
            About Me
          </motion.p>

          <motion.h2
            variants={item}
            className="mt-3 text-3xl font-semibold leading-tight text-white"
          >
            I design & build
            <span className="block text-zinc-300">digital experiences</span>
            that matter.
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-5 text-zinc-400 text-sm leading-relaxed"
          >
            Full-stack developer crafting scalable apps with clean architecture,
            smooth performance, and thoughtful UX.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex items-center gap-4 text-xs text-zinc-400"
          >
            <span>Indonesia</span>
            <div className="h-3 w-px bg-zinc-600" />
            <span>Open to work</span>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.6 }}
            className="mt-6 h-[2px] bg-white"
          />
        </motion.div>
      </section>

      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="hidden md:grid w-full max-w-5xl mx-auto grid-cols-2 gap-8 items-center"
      >
        {/* LEFT */}
        <div className="py-2">
          <motion.p
            variants={item}
            className="text-[11px] text-zinc-500 tracking-[0.25em] uppercase"
          >
            About Me
          </motion.p>

          <motion.h2
            variants={item}
            className="mt-3 text-3xl md:text-5xl font-semibold leading-tight text-white"
          >
            I design & build
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              digital experiences
            </span>
            that matter.
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-5 text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg"
          >
            A full-stack developer focused on crafting scalable applications
            with clean architecture, smooth performance, and thoughtful user
            experience.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex items-center gap-4 text-xs"
          >
            <span className="text-zinc-500">Based in Indonesia</span>
            <div className="h-3 w-px bg-zinc-700" />
            <span className="text-zinc-500">Open for opportunities</span>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 90 }}
            transition={{ duration: 0.7 }}
            className="mt-6 h-[2px] bg-white"
          />
        </div>

        {/* RIGHT */}
        <motion.div
          variants={imageAnim}
          className="relative w-full h-[440px] flex items-center justify-center"
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
                className="w-full h-full object-cover transition duration-700 hover:scale-105"
                alt=""
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
