"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import data from "@/data/projects.json";
import Image from "next/image";
import Link from "next/link";
import { useCarousel } from "@/hooks/useCarousel";
import { motion, AnimatePresence } from "framer-motion";
import ImageZoomModal from "../../components/ImageZoomModal";

/* ================= TYPE ================= */
type ProjectItem = {
  title: string;
  slug: string;
  description?: string;
  heroImage: string;
  images?: string[];
  stack: string[];
  link?: string;
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const project = (data as { code: ProjectItem[] }).code.find(
    (item) => item.slug === slug
  );

  if (!project) return notFound();

  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const { active, next, prev, goTo } = useCarousel(
    project.images?.length || 0,
    { loop: true }
  );

  return (
    <div className="text-white">
      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-4 md:px-10 pt-20 md:pt-32 space-y-10">
        <div className="space-y-5 text-center md:text-left">
          <p className="text-[11px] tracking-[0.35em] uppercase text-zinc-500">
            Development
          </p>

          <h1 className="text-3xl md:text-6xl font-semibold tracking-tight">
            {project.title}
          </h1>

          <p className="text-zinc-400 max-w-xl mx-auto md:mx-0">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
            {project.stack.map((item, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5"
              >
                {item}
              </span>
            ))}
          </div>

          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              className="inline-block text-sm mt-2 border-b border-white/20"
            >
              View Live →
            </Link>
          )}
        </div>

        <div className="relative w-full h-[260px] md:h-[520px] rounded-3xl overflow-hidden">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      {project.images && (
        <section className="max-w-6xl mx-auto px-4 md:px-10 py-16 md:py-24 space-y-8">
          <h2 className="text-xl font-medium">Preview</h2>

          {/* ================= MOBILE ================= */}
          <div className="md:hidden relative">
            {/* IMAGE */}
            <div
              onClick={() => setZoomImage(project.images[active])}
              className="relative w-full h-[260px] rounded-2xl overflow-hidden"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.25, 0.8, 0.25, 1],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.images[active]}
                    alt=""
                    fill
                    sizes="100vw"
                    quality={85}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* BUTTONS */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white transition"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white transition"
            >
              ›
            </button>

            {/* INDICATOR */}
            <div className="flex justify-center gap-1.5 mt-4">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    active === i
                      ? "w-6 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {project.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setZoomImage(img)}
                className="relative h-[320px] rounded-2xl overflow-hidden cursor-pointer group"
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="600px"
                  quality={85}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= MODAL ================= */}
      {zoomImage && (
        <ImageZoomModal image={zoomImage} onClose={() => setZoomImage(null)} />
      )}
    </div>
  );
}
