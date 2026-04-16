"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import skills from "@/data/skills.json";

const tabs = [
  { key: "fullstack", label: "Fullstack" },
  { key: "design", label: "Design" },
  { key: "video", label: "Video" },
];

export default function Skills() {
  const [active, setActive] = useState("fullstack");
  const activeIndex = tabs.findIndex((t) => t.key === active);

  return (
    <section className="h-screen snap-start flex items-center justify-center px-4">
      <div className="w-full max-w-6xl text-center">
        {/* Title */}
        <h2 className="text-xl md:text-3xl font-semibold text-white">
          Skills & Tools
        </h2>

        <p className="mt-2 text-zinc-400 text-xs md:text-sm">
          Development, design, dan video production dalam satu workflow.
        </p>

        {/* Tabs */}
        <div className="mt-6 flex justify-center">
          <div className="relative flex w-full max-w-sm bg-zinc-800/60 border border-zinc-700 p-1 rounded-full">
            <motion.div
              animate={{ x: `${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-1 bottom-1 left-1 w-[calc(33.333%-6px)] bg-white rounded-full"
            />

            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className="relative z-10 flex-1 py-1.5 text-xs md:text-sm"
              >
                <span
                  className={
                    active === tab.key ? "text-black" : "text-zinc-400"
                  }
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <div
            className="
              grid 
              grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 
              gap-2
              max-h-[55vh]
              place-content-center
            "
          >
            {skills[active as keyof typeof skills].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ scale: 1.05 }}
                className="
                  group 
                  p-2 rounded-lg 
                  bg-zinc-800/50 border border-zinc-700 
                  hover:bg-zinc-700/60
                  transition
                  
                  h-[70px]
                  flex flex-col items-center justify-center
                "
              >
                {/* Icon */}
                <div className="w-6 h-6 mb-1 rounded bg-zinc-700 flex items-center justify-center text-[10px] text-zinc-300">
                  {item.charAt(0)}
                </div>

                {/* Text */}
                <p className="text-[10px] md:text-xs text-zinc-300 group-hover:text-white text-center leading-tight">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
