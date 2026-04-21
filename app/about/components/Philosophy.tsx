"use client";

import { motion, type Variants } from "framer-motion";

const sentence = `"Everything that seems impossible is simply a limit yet to be broken, and every possibility belongs to those who are willing to try and keep moving forward."`;

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.018,
      delayChildren: 0.12,
    },
  },
};

const letter: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 1.04,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Philosophy() {
  return (
    <section className="py-32 md:py-40 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }} // ✅ ulang tiap masuk viewport
          className="
            text-lg md:text-xl lg:text-2xl
            font-light
            tracking-tight
            leading-relaxed

            text-zinc-300
            [text-shadow:0_0_12px_rgba(255,255,255,0.08)]
          "
        >
          {sentence.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letter}
              className="inline-block will-change-transform"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
