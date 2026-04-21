"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ProjectItem } from "@/types/Project";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{
        amount: 0.3,
        margin: "-60px",
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="group"
    >
      {/* IMAGE */}
      <div className="overflow-hidden rounded-lg">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={180}
          className="w-full h-[180px] object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="mt-3 space-y-2">
        <h4 className="text-white text-base">{project.title}</h4>

        <p className="text-sm text-zinc-400 leading-relaxed">
          <span className="block group-hover:hidden line-clamp-2">
            {project.description}
          </span>
          <span className="hidden group-hover:block">
            {project.description}
          </span>
        </p>

        {(project.tech || project.tools) && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(project.tech || project.tools)?.slice(0, 3).map((item, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08 + idx * 0.04,
                  ease,
                }}
                className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-zinc-400 bg-white/5 backdrop-blur-md"
              >
                {item}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
