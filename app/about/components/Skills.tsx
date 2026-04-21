"use client";

import skillsData from "@/data/skills.json";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type Skill = {
  name: string;
};

type SkillCategory = {
  title: string;
  description: string;
  skills: Skill[];
};

export default function Skills() {
  const categories = skillsData as SkillCategory[];

  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [padding, setPadding] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  // ================= MOBILE CENTER =================
  useEffect(() => {
    const calcPadding = () => {
      if (!mobileRef.current) return;

      const container = mobileRef.current;
      const card = container.querySelector("[data-card]") as HTMLElement;
      if (!card) return;

      setPadding((container.clientWidth - card.clientWidth) / 2);
    };

    calcPadding();
    window.addEventListener("resize", calcPadding);
    return () => window.removeEventListener("resize", calcPadding);
  }, []);

  // ================= HEIGHT SYNC =================
  useEffect(() => {
    const getContainer = () =>
      window.innerWidth < 1024 ? mobileRef.current : desktopRef.current;

    const calcHeight = () => {
      const container = getContainer();
      if (!container) return;

      const cards = container.querySelectorAll("[data-card]");
      let max = 0;

      cards.forEach((card) => {
        const h = (card as HTMLElement).offsetHeight;
        if (h > max) max = h;
      });

      setCardHeight(max);
    };

    const observer = new ResizeObserver(calcHeight);

    const observeCards = () => {
      const container = getContainer();
      if (!container) return;

      const cards = container.querySelectorAll("[data-card]");
      cards.forEach((card) => observer.observe(card));
    };

    observeCards();
    calcHeight();

    window.addEventListener("resize", calcHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calcHeight);
    };
  }, [categories]);

  // ================= CAROUSEL =================
  const scrollToIndex = (index: number) => {
    if (!mobileRef.current) return;

    const container = mobileRef.current;
    const el = container.children[index] as HTMLElement;

    const offset =
      el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;

    container.scrollTo({
      left: offset,
      behavior: "smooth",
    });

    setActive(index);
  };

  const next = () => scrollToIndex(Math.min(active + 1, categories.length - 1));
  const prev = () => scrollToIndex(Math.max(active - 1, 0));

  // ================= CARD =================
  const Card = ({ cat }: { cat: SkillCategory }) => (
    <motion.div
      data-card
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      style={{ height: cardHeight || "auto" }}
      className="
        min-w-[280px] sm:min-w-[340px]
        snap-center
        p-6 rounded-2xl
  
        bg-white/[0.04]
        border border-white/10
        backdrop-blur-xl
  
        flex flex-col
        relative
  
        transition-all duration-300
        hover:bg-white/[0.06]
        hover:border-white/20
      "
    >
      {/* subtle top highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent" />

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-white tracking-tight">
          {cat.title}
        </h3>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          {cat.description}
        </p>
      </div>

      {/* DIVIDER */}
      <div className="my-5 h-px w-full bg-white/10" />

      {/* SKILLS */}
      <div className="relative flex-1 overflow-hidden">
        <div className="flex flex-wrap gap-2 content-start">
          {cat.skills.map((skill, i) => (
            <span
              key={i}
              className="
                px-3 py-1.5 text-xs rounded-full
                bg-white/[0.05]
                text-zinc-300
                border border-white/10
  
                transition duration-200
                hover:bg-white/[0.12]
                hover:text-white
              "
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6" />
    </motion.div>
  );

  return (
    <section className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-14 text-center">
          <p className="text-xs tracking-[0.28em] text-zinc-500 uppercase">
            Skills
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-white">
            My Tech Stack
          </h2>

          <p className="mt-3 text-zinc-400 text-sm max-w-md mx-auto">
            Technologies I use to build scalable and beautiful products.
          </p>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="lg:hidden relative">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-zinc-900/70 border border-zinc-700 text-white flex items-center justify-center"
          >
            ←
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-zinc-900/70 border border-zinc-700 text-white flex items-center justify-center"
          >
            →
          </button>

          <div
            ref={mobileRef}
            style={{ paddingLeft: padding, paddingRight: padding }}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 scroll-smooth scrollbar-hide"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                className="flex"
                animate={{
                  scale: i === active ? 1 : 0.94,
                  opacity: i === active ? 1 : 0.6,
                }}
              >
                <Card cat={cat} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div
          ref={desktopRef}
          className="hidden lg:grid grid-cols-3 gap-6 items-stretch"
        >
          {categories.map((cat, i) => (
            <Card key={i} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
