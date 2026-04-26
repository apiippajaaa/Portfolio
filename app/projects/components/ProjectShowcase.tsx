"use client";

import { useState } from "react";
import data from "@/data/projects.json";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import ProjectCarousel from "@/components/ui/carousel/ProjectCarousel";
import ProjectCard from "./showcase/ProjectCard";

type ProjectItem = {
  title: string;
  description?: string;
  image: string;
  tech?: string[];
  tools?: string[];
  link?: string;
  videoUrl?: string;
  isCore?: boolean;
};

/* ================= ANIMATION ================= */
const section: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut", // ✅ FIX
    },
  },
};

/* ================= HEADER ================= */
function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div variants={item} className="text-center md:text-left space-y-4">
      <p className="text-[11px] tracking-[0.35em] uppercase text-zinc-500">
        {label}
      </p>

      <div className="space-y-3 md:border-l md:border-white/20 md:pl-5">
        <h2 className="text-3xl md:text-5xl font-semibold text-white">
          {title}
        </h2>

        <p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto md:mx-0">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

/* ================= BUTTON ================= */
function AppleButton({ href, label }: { href: string; label: string }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="flex justify-center mt-10"
    >
      <Link
        href={href}
        className="text-sm text-white/80 hover:text-white transition px-5 py-2 rounded-full border border-white/10 bg-white/3 hover:bg-white/6"
      >
        {label}
      </Link>
    </motion.div>
  );
}

/* ================= MAIN ================= */
export default function ProjectShowcase() {
  const { code, design, video } = data as {
    code: ProjectItem[];
    design: ProjectItem[];
    video: ProjectItem[];
  };

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const core = code.find((i) => i.isCore);

  return (
    <div className="w-full mt-28 md:mt-36 space-y-44 md:space-y-56">
      {/* ================= DEVELOPMENT ================= */}
      <motion.section
        variants={section}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }} // ✅ REPEAT
        className="max-w-6xl mx-auto px-5 md:px-10 space-y-16"
      >
        <SectionHeader
          label="Engineering"
          title="Development"
          subtitle="Engineering systems & web applications"
        />

        {core && (
          <motion.div
            variants={item}
            className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center"
          >
            <div className="space-y-5 text-center md:text-left">
              <h3 className="text-2xl md:text-4xl text-white">{core.title}</h3>

              <p className="text-zinc-400 max-w-md mx-auto md:mx-0">
                {core.description}
              </p>

              <div className="hidden md:block">
                <Link
                  href={core.link || "#"}
                  className="text-sm text-white/80 border-b border-white/20"
                >
                  View Details →
                </Link>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Image
                src={core.image}
                alt={core.title}
                width={800}
                height={400}
                className="w-full h-[260px] md:h-[320px] object-cover rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}

        <motion.div
          variants={item}
          className="hidden md:grid grid-cols-3 gap-6"
        >
          {code
            .filter((i) => !i.isCore)
            .slice(0, 6)
            .map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
        </motion.div>

        <ProjectCarousel items={code.filter((i) => !i.isCore)} />

        <AppleButton href="/work/code" label="Explore All Development" />
      </motion.section>

      {/* DESIGN */}
      <motion.section
        variants={section}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="max-w-6xl mx-auto px-5 md:px-10 space-y-16"
      >
        <SectionHeader
          label="Visual Craft"
          title="Design"
          subtitle="Interfaces & visual systems"
        />

        <motion.div
          variants={item}
          className="hidden md:grid grid-cols-3 gap-6"
        >
          {design.slice(0, 6).map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </motion.div>

        <ProjectCarousel items={design} />

        <AppleButton href="/work/design" label="Explore All Design" />
      </motion.section>

      {/* VIDEO */}
      <motion.section
        variants={section}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="max-w-6xl mx-auto px-5 md:px-10 space-y-16"
      >
        <SectionHeader
          label="Motion"
          title="Video"
          subtitle="Storytelling & motion"
        />

        <motion.div
          variants={item}
          className="hidden md:grid grid-cols-3 gap-6"
        >
          {video.slice(0, 6).map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              clickable
              onClick={() => p.videoUrl && setActiveVideo(p.videoUrl)}
            />
          ))}
        </motion.div>

        <ProjectCarousel
          items={video}
          onItemClick={(item) => item.videoUrl && setActiveVideo(item.videoUrl)}
        />

        <AppleButton href="/work/video" label="Explore All Video" />
      </motion.section>

      {/* MODAL */}
      {activeVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
          >
            <iframe
              src={activeVideo}
              className="w-[90vw] md:w-[900px] aspect-video rounded-xl"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
