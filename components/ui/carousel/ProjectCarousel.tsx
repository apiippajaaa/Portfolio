"use client";

import { motion } from "framer-motion";
import { useCarousel } from "@/hooks/useCarousel";
import ProjectCard from "@/app/projects/components/showcase/ProjectCard";
import { ProjectItem } from "@/types/Project";

export default function ProjectCarousel({
  items,
  onItemClick,
}: {
  items: ProjectItem[];
  onItemClick?: (item: ProjectItem) => void;
}) {
  const { active, next, prev, isStart, isEnd } = useCarousel(items.length);

  return (
    <div className="relative lg:hidden overflow-hidden">
      {/* ================= NAV ================= */}
      <div className="absolute inset-x-0 top-[100px] flex justify-between px-3 z-30 pointer-events-none">
        {/* LEFT */}
        <button
          onClick={prev}
          disabled={isStart}
          className={`
            pointer-events-auto
            w-10 h-10 rounded-full
            flex items-center justify-center
            backdrop-blur-xl border border-white/10
            transition-all duration-300
            ${
              isStart
                ? "opacity-30"
                : "bg-white/10 hover:bg-white/20 active:scale-95"
            }
          `}
        >
          <svg viewBox="0 0 320 512" className="w-3.5 h-3.5 fill-white/80">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </button>

        {/* RIGHT */}
        <button
          onClick={next}
          disabled={isEnd}
          className={`
            pointer-events-auto
            w-10 h-10 rounded-full
            flex items-center justify-center
            backdrop-blur-xl border border-white/10
            transition-all duration-300
            ${
              isEnd
                ? "opacity-30"
                : "bg-white/10 hover:bg-white/20 active:scale-95"
            }
          `}
        >
          <svg viewBox="0 0 320 512" className="w-3.5 h-3.5 fill-white/80">
            <path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s-32.8-12.5-45.3 0l192 192z" />
          </svg>
        </button>
      </div>

      {/* ================= TRACK ================= */}
      <motion.div
        className="flex"
        animate={{ x: `-${active * 100}%` }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.05}
        onDragEnd={(e, info) => {
          const threshold = 70;
          if (info.offset.x < -threshold && !isEnd) next();
          if (info.offset.x > threshold && !isStart) prev();
        }}
      >
        {items.map((item, i) => {
          const isActive = i === active;

          return (
            <div key={item.slug} className="w-full shrink-0">
              <motion.div
                animate={{
                  scale: isActive ? 1 : 0.965,
                  opacity: isActive ? 1 : 0.5,
                  y: isActive ? 0 : 8,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard
                  project={item}
                  clickable={!!item.videoUrl}
                  onClick={() => onItemClick?.(item)}
                />
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* ================= DOT ================= */}
      <div className="flex justify-center mt-6 gap-2">
        {items.map((_, i) => {
          const isActive = i === active;

          return (
            <button
              key={i}
              onClick={() => {
                if (i > active) next();
                if (i < active) prev();
              }}
              className="relative flex items-center justify-center"
            >
              <motion.span
                animate={{
                  width: isActive ? 18 : 6,
                  opacity: isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.35 }}
                className="h-[6px] rounded-full bg-white"
              />

              {isActive && (
                <motion.span
                  layoutId="dot-glow"
                  className="absolute w-5 h-5 rounded-full bg-white/20 blur-md"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
