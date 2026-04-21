"use client";

import { useState, useRef, useEffect } from "react";
import { motion, cubicBezier } from "framer-motion";
import experiences from "@/data/experiences.json";

type Experience = {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
};

const INITIAL_VISIBLE = 4;

// 🔥 responsive animation
const cardVariants = {
  hidden: ({ isLeft, isMobile }: { isLeft: boolean; isMobile: boolean }) => ({
    opacity: 0,
    y: 60,
    x: isMobile ? 0 : isLeft ? -40 : 40,
    scale: 0.96,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
};

export default function Journey() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const data = experiences as Experience[];
  const visibleData = expanded ? data : data.slice(0, INITIAL_VISIBLE);

  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [inView, setInView] = useState<boolean[]>([]);

  // ✅ detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ✅ observer anti flicker (HYSTERESIS)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setInView((prev) => {
          const updated = [...prev];

          entries.forEach((entry) => {
            const index = refs.current.findIndex((el) => el === entry.target);

            if (index === -1) return;

            const ratio = entry.intersectionRatio;

            if (ratio > 0.45) {
              updated[index] = true;
            } else if (ratio < 0.15) {
              updated[index] = false;
            }
          });

          return updated;
        });
      },
      {
        threshold: [0, 0.15, 0.45, 1],
      }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleData]);

  return (
    <section className="py-20 md:py-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="mb-16 md:mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Journey
          </p>

          <h2 className="mt-4 text-2xl md:text-5xl font-semibold text-white">
            Work Experience
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm md:text-base text-zinc-500">
            A curated journey of my work, growth, and the experiences that
            shaped how I approach building thoughtful digital products.
          </p>
        </header>

        {/* TIMELINE */}
        <div className="relative">
          {/* 🔥 LINE responsive */}
          <div
            className="
              absolute top-0 bottom-0 w-px bg-zinc-800
              left-4 md:left-1/2 md:-translate-x-1/2
            "
          />

          <div className="space-y-12 md:space-y-20">
            {visibleData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                  custom={{ isLeft, isMobile }}
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView[index] ? "visible" : "hidden"}
                  transition={{ delay: index * 0.06 }}
                  style={{ willChange: "transform, opacity" }}
                  className={`
                    relative flex flex-col
                    items-start md:items-center md:flex-row
                    ${isLeft ? "md:justify-start" : "md:justify-end"}
                  `}
                >
                  {/* 🔥 CARD */}
                  <motion.div
                    whileHover={isMobile ? {} : { y: -6, scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className={`
                      w-full md:w-[45%]
                      pl-10 md:pl-0
                      will-change-transform
                      ${isLeft ? "md:pr-12" : "md:pl-12"}
                    `}
                  >
                    <article
                      className="
                        group relative overflow-hidden
                        rounded-2xl border border-zinc-800
                        bg-zinc-900/60 md:bg-zinc-900/40
                        backdrop-blur-xl
                        p-5 md:p-7
                        transition-all duration-300
                        hover:border-zinc-700 hover:bg-zinc-900/60

                        shadow-lg md:shadow-none
                      "
                    >
                      {/* glow */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                      <span className="text-xs text-zinc-500">
                        {item.period}
                      </span>

                      <h3 className="mt-2 text-base md:text-xl font-medium text-white">
                        {item.role}
                      </h3>

                      <p className="text-sm text-zinc-400">{item.company}</p>

                      <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                        {item.description}
                      </p>
                    </article>
                  </motion.div>

                  {/* 🔥 DOT responsive */}
                  <div
                    className="
                      absolute top-6
                      left-4 md:left-1/2
                      -translate-x-1/2
                    "
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="
              group inline-flex items-center gap-2
              rounded-full border border-zinc-800
              px-6 py-2.5 text-sm text-zinc-300
              transition-all duration-300
              hover:bg-zinc-900 hover:text-white
            "
          >
            {expanded ? "See less" : "See more"}
            <span className="transition group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
