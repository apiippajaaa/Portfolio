"use client";

import { useSectionHash } from "@/hooks/useSectionHash";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useSectionHash(ref, "about");
  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen snap-start flex items-center justify-center px-6"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.4 }}
        className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center"
      >
        {/* 🖼️ LEFT (SINGLE IMAGE) */}
        <motion.div variants={fadeUp} className="w-full max-w-md mx-auto">
          <div className="relative group overflow-hidden rounded-2xl border border-zinc-800">
            {/* Image */}
            <img
              src="/1.jpg"
              alt="About me"
              className="w-full h-[260px] md:h-[300px] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />

            {/* Gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Soft glow */}
            <div className="pointer-events-none absolute -inset-0.5 rounded-2xl blur-xl opacity-20 bg-white/10 group-hover:opacity-30 transition duration-500" />
          </div>
        </motion.div>

        {/* 📝 RIGHT (CONTENT) */}
        <motion.div
          variants={fadeUp}
          className="text-center md:text-left flex flex-col items-center md:items-start"
        >
          {/* Label */}
          <p className="text-xs text-zinc-500 tracking-widest uppercase">
            About Me
          </p>

          {/* Title */}
          <h2
            className="mt-3 text-2xl md:text-3xl text-white font-medium leading-snug max-w-md 
          
          "
          >
            Crafting digital experiences with clarity, performance, and purpose.
          </h2>
          {/* border-l border-zinc-700 pl-4 */}
          {/* Description */}
          {/* <p className="mt-5 text-zinc-400 text-sm md:text-base leading-relaxed max-w-md">
            I am a Fullstack Developer who enjoys building scalable and
            user-friendly applications. I combine development, design, and
            problem-solving to deliver solutions that are efficient and
            intuitive.
          </p> */}

          {/* Journey */}
          {/* <div className="mt-6 border-l border-zinc-700 pl-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wide">
              Journey
            </p>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-md">
              Started from design and evolved into fullstack development,
              working on real-world systems, improving performance, and creating
              meaningful digital products.
            </p>
          </div> */}

          {/* CTA */}
          <Link
            href="/about"
            className="mt-6 text-sm text-zinc-400 hover:text-white transition-colors duration-300"
          >
            Learn More →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
