"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

import ResumeModal from "@/components/ui/ResumeModal";
import Scroll from "@/components/ui/Scroll";
import { fade, staggerContainer } from "@/lib/animation";
import Section from "@/components/fullpage-snap/Section";
import { useSectionHash } from "@/hooks/useSectionHash";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useSectionHash(ref, "hero");
  return (
    <Section
      ref={ref}
      id="hero"
      className="h-screen snap-start flex items-center justify-center px-6 relative"
    >
      {/* MAIN CONTAINER (AOS GROUP STYLE) */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        {/* TITLE */}
        <motion.h1
          variants={fade("up")}
          className="text-3xl md:text-5xl font-semibold text-white"
        >
          Nur Afif Misbahuddin
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          variants={fade("up")}
          className="mt-3 text-sm md:text-base text-zinc-400"
        >
          Fullstack Developer • Designer • Video Editor
        </motion.p>

        {/* BUTTON GROUP */}
        <motion.div
          variants={fade("up")}
          className="mt-6 flex gap-4 justify-center"
        >
          <Link
            href="#projects"
            className="px-5 py-2 text-sm font-medium rounded-full 
            bg-zinc-800 text-white hover:bg-zinc-700 transition shadow-sm"
          >
            Portfolio
          </Link>

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

      {/* SCROLL INDICATOR */}
      <Scroll />

      {/* MODAL */}
      <ResumeModal isOpen={open} onClose={() => setOpen(false)} />
    </Section>
  );
}
