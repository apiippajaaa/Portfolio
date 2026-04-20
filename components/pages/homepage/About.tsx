"use client";

import { useSectionHash } from "@/hooks/useSectionHash";
import { motion } from "framer-motion";
import Image from "next/image";
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
        className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center"
      >
        <motion.div variants={fadeUp} className="w-full ">
          <div className="relative group overflow-hidden rounded-2xl border border-zinc-800">
            <Image
              width={100}
              height={100}
              src="/1.jpg"
              alt="About me"
              className="w-full h-65 md:h-75 object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

            <div className="pointer-events-none absolute -inset-0.5 rounded-2xl blur-xl opacity-20 bg-white/10 group-hover:opacity-30 transition duration-500" />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="text-center md:text-left flex flex-col items-center md:items-start"
        >
          <p className="text-xs text-zinc-500 tracking-widest uppercase">
            About Me
          </p>

          <h2
            className="mt-3 text-2xl md:text-3xl text-white font-medium leading-snug max-w-md 
          
          "
          >
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
    </section>
  );
}
