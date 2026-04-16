"use client";

import { motion, cubicBezier } from "framer-motion";

const sentence =
  "I build simple, thoughtful, and high-performance digital experiences.";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.2,
    },
  },
};

const letter = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
};

export default function Philosophy() {
  return (
    <section className="py-32 md:py-40 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            text-2xl md:text-4xl lg:text-5xl
            font-light
            text-white
            tracking-tight
            leading-[1.4]
            
            [text-shadow:0_0_40px_rgba(255,255,255,0.06)]
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
