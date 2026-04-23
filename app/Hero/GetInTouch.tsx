"use client";

import { useRef } from "react";
import Section from "@/components/fullpage-snap/Section";
import { useSectionHash } from "@/hooks/useSectionHash";
import { motion } from "framer-motion";

import { fade, staggerContainer } from "@/lib/animation";

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
    <Section ref={ref} id="getInTouch" className="px-6">
      {/* MAIN GRID */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: false, // 🔥 penting: biar replay setiap masuk view
          amount: 0.3,
        }}
        className="w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT */}
        <motion.div variants={fade("right")}>
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

        {/* RIGHT */}
        <motion.div variants={fade("left")} className="space-y-6">
          <p className="text-sm text-zinc-500">Reach me through</p>

          {socials.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              whileHover="hover"
              variants={fade("up", 0.05)}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl md:text-2xl font-medium text-zinc-400 tracking-wide group-hover:text-white transition">
                  {item.name}
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

              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.35 }}
                className="h-px mt-2 bg-zinc-800 group-hover:bg-zinc-400"
              />
            </motion.a>
          ))}

          <motion.div
            variants={fade("up")}
            className="pt-6 text-xs text-zinc-500"
          >
            © {new Date().getFullYear()} | Nur Afif Misbahuddin
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
