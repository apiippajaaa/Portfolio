"use client";

import skillsData from "@/data/skills.json";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Skill = {
  name: string;
  level: string;
  primary?: boolean;
};

type SkillCategory = {
  title: string;
  description: string;
  skills: Skill[];
};

export default function Skills() {
  const [active, setActive] = useState(0);
  const categories = skillsData as SkillCategory[];

  return (
    <section className="py-24 md:py-32 px-5">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <header className="text-center mb-14 md:mb-18">
          <p className="text-xs tracking-[0.28em] text-zinc-500 uppercase">
            Skills
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-white tracking-tight">
            Tools & Technologies
          </h2>

          <p className="mt-4 max-w-md mx-auto text-zinc-400 leading-relaxed">
            Focused expertise across engineering and design disciplines.
          </p>
        </header>

        {/* 🔥 TOGGLE (APPLE SEGMENTED) */}
        <div className="mb-12 flex justify-center">
          <div className="flex gap-1 p-1 rounded-full bg-zinc-900/60 backdrop-blur-sm">
            {categories.map((cat, i) => {
              const isActive = active === i;

              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="relative px-3 py-1.5 text-sm rounded-full whitespace-nowrap"
                >
                  {/* active pill */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition ${
                      isActive
                        ? "text-black font-medium"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-10 md:space-y-12"
          >
            {/* CORE */}
            <div className="text-center">
              <p className="text-[11px] text-zinc-500 uppercase tracking-[0.25em] mb-5">
                Core Skills
              </p>

              <div
                className="
                flex flex-wrap justify-center
                gap-x-5 gap-y-2.5
                max-w-2xl mx-auto
              "
              >
                {categories[active].skills
                  .filter((s) => s.primary)
                  .map((skill, i) => (
                    <span
                      key={i}
                      className="
                        text-base md:text-lg
                        font-medium text-white
                        tracking-tight
                        transition
                        hover:opacity-80
                      "
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-zinc-800/60 max-w-xs mx-auto" />

            {/* OTHER */}
            <div className="text-center">
              <p className="text-[11px] text-zinc-500 uppercase tracking-[0.25em] mb-5">
                Other Tools
              </p>

              <div
                className="
                flex flex-wrap justify-center
                gap-x-4 gap-y-1.5
                max-w-2xl mx-auto
              "
              >
                {categories[active].skills
                  .filter((s) => !s.primary)
                  .map((skill, i) => (
                    <span
                      key={i}
                      className="
                        text-sm text-zinc-500
                        transition
                        hover:text-zinc-300
                      "
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
