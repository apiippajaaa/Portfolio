"use client";

import data from "@/data/projects.json";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

/* ================= TYPES ================= */
type ProjectItem = {
  title: string;
  description: string;
  image: string;
  link?: string;
  videoUrl?: string;
  tech?: string[];
  tools?: string[];
  isCore?: boolean;
};

type SectionType = "code" | "design" | "video";

type SectionProps = {
  title: string;
  subtitle: string;
  items: ProjectItem[];
  type: SectionType;
  viewAllLink: string;
};

/* ================= SECTION ================= */
function Section({ title, subtitle, items, type, viewAllLink }: SectionProps) {
  const core = items.find((i) => i.isCore) ?? null;
  const highlights = items.filter((i) => !i.isCore).slice(0, 3);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const tagLabel =
    type === "code"
      ? "Built with"
      : type === "design"
      ? "Designed with"
      : "Edited with";

  const categoryLabel =
    type === "code"
      ? "Engineering"
      : type === "design"
      ? "Visual Craft"
      : "Motion";

  return (
    <section className="space-y-16 md:space-y-20">
      {/* ================= HEADER ================= */}
      {/* ================= HEADER ================= */}
      <div className="space-y-4">
        {/* category (di luar garis) */}
        <p className="text-[11px] tracking-[0.35em] text-zinc-500 uppercase">
          {categoryLabel}
        </p>

        {/* line + content */}
        <div className="border-l-2 border-white pl-4">
          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight ">
            {title}
          </h2>

          <p className="mt-2 text-zinc-500 text-sm max-w-md leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* ================= CORE ================= */}
      {core && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center"
        >
          <div className="max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.4em] text-zinc-500">
              Core Project
            </p>

            <h3 className="mt-3 text-2xl md:text-4xl font-medium text-white">
              {core.title}
            </h3>

            <p className="mt-4 text-zinc-400 leading-relaxed">
              {core.description}
            </p>

            {(core.tech || core.tools) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {(core.tech || core.tools)?.map((item, i) => (
                  <span
                    key={i}
                    className="text-[11px] border border-zinc-700 px-3 py-1 rounded-full text-zinc-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {core.link && (
              <Link
                href={core.link}
                className="mt-6 inline-flex items-center gap-2 text-sm text-white group"
              >
                <span className="border-b border-transparent group-hover:border-white transition">
                  View project
                </span>
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            )}
          </div>

          <div
            className="relative group cursor-pointer"
            onClick={() => core.videoUrl && setActiveVideo(core.videoUrl)}
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={core.image}
                alt={core.title}
                className="w-full h-[280px] md:h-[420px] object-cover group-hover:scale-105 transition duration-700"
              />
            </div>

            {type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
                <span className="text-white text-5xl opacity-80">▶</span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ================= HIGHLIGHTS ================= */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {highlights.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-[180px] object-cover"
              />
            </div>

            <div className="mt-3">
              <h4 className="text-white text-base">{p.title}</h4>
              <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                {p.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= BUTTON ================= */}
      <div className="pt-6">
        <Link
          href={viewAllLink}
          className="inline-flex items-center gap-2 text-sm text-white group"
        >
          <span className="border-b border-zinc-600 group-hover:border-white transition">
            Explore {title}
          </span>
          <span className="group-hover:translate-x-1 transition">→</span>
        </Link>
      </div>

      {/* ================= VIDEO MODAL ================= */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div className="w-[90%] md:w-[900px] aspect-video">
            <iframe
              src={activeVideo}
              className="w-full h-full rounded-xl"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* ================= MAIN ================= */
export default function ProjectShowcase() {
  const { code, design, video } = data as {
    code: ProjectItem[];
    design: ProjectItem[];
    video: ProjectItem[];
  };

  return (
    <div className="w-full mt-28 md:mt-36 space-y-40 md:space-y-64">
      <div className="max-w-6xl mx-auto px-5 md:px-10 space-y-40">
        <Section
          title="Development"
          subtitle="Engineering systems & web applications"
          items={code}
          type="code"
          viewAllLink="/work/code"
        />

        <Section
          title="Design"
          subtitle="Interfaces, experiences & visual systems"
          items={design}
          type="design"
          viewAllLink="/work/design"
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <Section
          title="Motion & Video"
          subtitle="Cinematic edits & motion storytelling"
          items={video}
          type="video"
          viewAllLink="/work/video"
        />
      </div>
    </div>
  );
}
