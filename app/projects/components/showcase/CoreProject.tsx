"use client";

import { ProjectItem, SectionType } from "@/types/Project";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type Props = {
  project: ProjectItem;
  type: SectionType;
  onPlay: (url: string) => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function CoreProject({ project, type, onPlay }: Props) {
  return (
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
      {/* ================= TEXT ================= */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.4, margin: "-100px" }}
        transition={{ duration: 0.7, ease }}
        className="max-w-xl"
      >
        <p className="text-[11px] uppercase tracking-[0.4em] text-zinc-500">
          Core Project
        </p>

        <h3 className="mt-3 text-2xl md:text-4xl font-medium text-white">
          {project.title}
        </h3>

        <p className="mt-4 text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        {(project.tech || project.tools) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {(project.tech || project.tools)?.map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.4 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.05,
                  ease,
                }}
                className="text-[11px] border border-zinc-700 px-3 py-1 rounded-full text-zinc-400"
              >
                {item}
              </motion.span>
            ))}
          </div>
        )}

        {project.link && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            <Link
              href={project.link}
              className="mt-6 inline-flex items-center gap-2 text-sm text-white group"
            >
              <span className="border-b border-transparent group-hover:border-white transition">
                View project
              </span>
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* ================= IMAGE ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 60 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ amount: 0.4, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        whileHover={{ scale: 1.02 }}
        className="relative group cursor-pointer"
        onClick={() => project.videoUrl && onPlay(project.videoUrl)}
      >
        <div className="overflow-hidden rounded-xl">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={420}
            className="w-full h-[280px] md:h-[420px] object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        {type === "video" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl"
          >
            <span className="text-white text-5xl opacity-80">▶</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
