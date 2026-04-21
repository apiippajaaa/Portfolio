"use client";

import Scroll from "@/components/scroll";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useSectionHash } from "@/hooks/useSectionHash";
import ResumeModal from "@/components/ui/ResumeModal";

const container = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useSectionHash(ref, "hero");

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-svh snap-center flex items-center justify-center px-6"
    >
      <motion.div
        variants={container}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="text-3xl md:text-5xl font-semibold text-white"
        >
          Nur Afif Misbahuddin
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-3 text-sm md:text-base text-zinc-400"
        >
          Fullstack Developer • Designer • Video Editor
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex gap-4 justify-center"
        >
          <Link
            href="#projects"
            className="px-5 py-2 text-sm font-medium rounded-full 
            bg-zinc-800 text-white hover:bg-zinc-700 transition shadow-sm"
          >
            Portfolio
          </Link>

          {/* RESUME BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="px-5 py-2 text-sm font-medium rounded-full 
            border border-zinc-700 text-zinc-300 
            hover:bg-zinc-800 transition"
          >
            Resume
          </button>
        </motion.div>
      </motion.div>

      <Scroll />

      {/* MODAL */}
      <ResumeModal isOpen={open} onClose={() => setOpen(false)} />
    </section>
  );
}
