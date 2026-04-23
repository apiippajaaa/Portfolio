"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import Section from "@/components/fullpage-snap/Section";
import { useSectionHash } from "@/hooks/useSectionHash";
import { fade, staggerContainer } from "@/lib/animation";

import { motion } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useSectionHash(ref, "about");

  return (
    <Section ref={ref} id="about" className="px-6">
      {/* GRID CONTAINER */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.4 }}
        className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center"
      >
        {/* IMAGE */}
        <motion.div variants={fade("right")}>
          <div className="relative group overflow-hidden rounded-2xl border border-zinc-800">
            <Image
              width={500}
              height={500}
              src="/images/profile.png"
              alt="About me"
              className="
    w-full h-65 md:h-75 object-cover
    grayscale
    transition-all duration-500
    group-hover:grayscale-0
    group-hover:scale-[1.04]
  "
            />

            {/* overlay gradient */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

            {/* glow effect */}
            <div className="pointer-events-none absolute -inset-0.5 rounded-2xl blur-xl opacity-20 bg-white/10 group-hover:opacity-30 transition duration-500" />
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          variants={fade("left")}
          className="text-center md:text-left flex flex-col items-center md:items-start"
        >
          <p className="text-xs text-zinc-500 tracking-widest uppercase">
            About Me
          </p>

          <h2 className="mt-3 text-2xl md:text-3xl text-white font-medium leading-snug max-w-md">
            Crafting digital experiences with clarity, performance, and purpose.
          </h2>

          <Link
            href="/about"
            className="mt-6 text-sm text-zinc-400 hover:text-white transition-colors duration-300"
          >
            Learn More →
          </Link>
        </motion.div>
      </motion.div>
    </Section>
  );
}
