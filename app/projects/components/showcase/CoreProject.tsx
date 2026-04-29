"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectItem } from "@/types/Project";

type Props = {
  project: ProjectItem;
};

function ViewDetails({ slug }: { slug: string }) {
  return (
    <Link
      href={`/projects/explore/${slug}`}
      className="text-sm text-white px-5 py-2 rounded-full border border-white/10 bg-white/5 active:scale-[0.97] transition"
    >
      View More Skinylabs→
    </Link>
  );
}

export default function CoreProject({ project }: Props) {
  return (
    <motion.div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
      {/* TEXT */}
      <div className="space-y-5 text-center md:text-left">
        <h3 className="text-2xl md:text-4xl text-white">{project.title}</h3>

        {project.description && (
          <p className="text-zinc-400">{project.description}</p>
        )}

        {/* DESKTOP ONLY */}
        <div className="hidden md:block">
          <ViewDetails slug={project.slug} />
        </div>
      </div>

      {/* IMAGE + MOBILE BUTTON */}
      <div className="space-y-4">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Image
            src={project.heroImage}
            alt={project.title}
            width={800}
            height={400}
            className="w-full h-[260px] md:h-[320px] object-cover rounded-xl"
          />
        </motion.div>

        {/* MOBILE ONLY (AFTER IMAGE) */}
        <div className="md:hidden flex justify-center">
          <ViewDetails slug={project.slug} />
        </div>
      </div>
    </motion.div>
  );
}
