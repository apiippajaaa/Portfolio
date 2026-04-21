"use client";

import { motion, type Variants } from "framer-motion";

const sentence =
  "I build simple, thoughtful, and high-performance digital experiences.";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
};

const letter: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const, // ✅ fix TS
    },
  },
};

export default function Philosophy() {
  return (
    <section className="py-28 md:py-32 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="
            text-2xl md:text-4xl lg:text-5xl
            font-light
            text-white
            tracking-tight
            leading-[1.4]
            [text-shadow:0_0_30px_rgba(255,255,255,0.05)]
          "
        >
          {sentence.split("").map((char, i) => (
            <motion.span key={i} variants={letter}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
