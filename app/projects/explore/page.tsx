"use client";

import data from "@/data/projects.json";
import ProjectCard from "@/app/projects/components/showcase/ProjectCard";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

type ProjectItem = {
  title: string;
  slug: string;
  description?: string;
  image: string;
  tech?: string[];
  tools?: string[];
  link?: string;
  videoUrl?: string;
  isCore?: boolean;
};

/* ================= ANIMATION ================= */
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AllDevelopmentPage() {
  const { code } = data as { code: ProjectItem[] };

  return (
    <div className="min-h-screen  text-white">
      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-32 pb-16">
        <motion.div
          key="header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          variants={container}
          className="space-y-6"
        >
          <motion.p
            variants={item}
            className="text-[11px] tracking-[0.35em] uppercase text-zinc-500"
          >
            Engineering
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl font-semibold tracking-tight"
          >
            All Development
          </motion.h1>

          <motion.p variants={item} className="text-zinc-400 max-w-xl">
            A collection of systems, web apps, and engineering-focused projects.
          </motion.p>
        </motion.div>
      </div>

      {/* ================= GRID ================= */}
      <motion.div
        key="grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        className="max-w-6xl mx-auto px-5 md:px-10 pb-24 grid sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {code.map((project, i) => (
          <motion.div key={project.slug || i} variants={item}>
            <Link href={`/projects/explore/${project.slug}`}>
              <ProjectCard project={project} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
