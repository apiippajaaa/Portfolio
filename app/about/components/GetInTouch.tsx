"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GetInTouch() {
  return (
    <section className="py-20 md:py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-start md:items-center gap-5 md:gap-6 text-left md:text-center">
          {/* line → fade-right */}
          <motion.span
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, margin: "-80px" }}
            className="h-px w-16 bg-white/60"
          />

          {/* headline → fade-left */}
          <motion.h2
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, margin: "-80px" }}
            className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-snug max-w-xl"
          >
            Build something better.
          </motion.h2>

          {/* subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            viewport={{ once: false }}
            className="text-sm text-zinc-500 max-w-sm leading-relaxed"
          >
            Open for ideas and collaboration.
          </motion.p>

          {/* button */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, margin: "-80px" }}
            className="mt-2"
          >
            <Link href="/#GetInTouch" className="group relative">
              <span
                className="
                  relative z-10
                  inline-flex items-center gap-3
                  px-6 py-3
                  text-sm md:text-base
                  font-medium
                  text-white
                  rounded-full
                  border border-white/15
                  bg-white/5
                  backdrop-blur-md
                  transition-all duration-300
                  group-hover:bg-white/10
                  group-hover:border-white/30
                  group-hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)]
                  group-hover:scale-[1.03]
                "
              >
                get in touch
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>

              <span className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
