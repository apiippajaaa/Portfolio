"use client";

import { useSectionHash } from "@/hooks/useSectionHash";
import { motion } from "framer-motion";
import { useRef } from "react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const left = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const right = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
  },
};

const socials = [
  { name: "Email", href: "mailto:afifmisbahuddin7@gmail.com" },
  { name: "LinkedIn", href: "https://linkedin.com/in/afifmisbahuddin" },
  { name: "GitHub", href: "https://github.com/afifmisbahuddin" },
  { name: "WhatsApp", href: "https://wa.me/6285601569136" },
];

export default function GetInTouch() {
  const ref = useRef<HTMLElement>(null);
  useSectionHash(ref, "getInTouch");
  return (
    <section
      ref={ref}
      id="getInTouch"
      className="min-h-screen snap-start flex items-center justify-center px-6"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT */}
        <motion.div variants={left}>
          <p className="text-xs text-zinc-500 tracking-widest uppercase">
            Get in Touch
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl text-white font-semibold leading-tight">
            Let’s create something impactful together.
          </h2>

          <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-md">
            Open for freelance, collaboration, or full-time opportunities. Let’s
            talk and build something meaningful.
          </p>

          <motion.a
            href="mailto:youremail@example.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              mt-8 inline-block px-7 py-3 rounded-full 
              border border-white text-white text-sm font-medium
              hover:bg-white hover:text-black transition
            "
          >
            Let’s Talk →
          </motion.a>
        </motion.div>

        {/* RIGHT - REFINED TYPO */}
        <motion.div variants={right} className="space-y-6">
          <p className="text-sm text-zinc-500">Reach me through</p>

          {socials.map((itemData) => (
            <motion.a
              key={itemData.name}
              href={itemData.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              whileHover="hover"
              className="group block"
            >
              {/* TEXT */}
              <div className="flex items-center justify-between">
                <span
                  className="
                    text-xl md:text-2xl font-medium
                    text-zinc-400 tracking-wide
                    group-hover:text-white
                    transition
                  "
                >
                  {itemData.name}
                </span>

                <motion.span
                  variants={{
                    hover: { x: 4 },
                  }}
                  className="text-zinc-600 group-hover:text-white transition"
                >
                  →
                </motion.span>
              </div>

              {/* LINE */}
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.35 }}
                className="
                  h-px mt-2 
                  bg-zinc-800 group-hover:bg-zinc-400
                "
              />
            </motion.a>
          ))}

          <div className="pt-6 text-xs text-zinc-500">
            © {new Date().getFullYear()} | Nur Afif Misbahuddin
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
