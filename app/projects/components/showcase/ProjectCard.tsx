"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

type ProjectItem = {
  title: string;
  slug: string; // 🔥 tambahin ini
  description?: string;
  heroImage: string;
  images: string;
  stack: string[];
  videoUrl?: string;
};

const container: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProjectCard({
  project,
  onClick,
  clickable,
}: {
  project: ProjectItem;
  onClick?: () => void;
  clickable?: boolean;
}) {
  const router = useRouter();

  const handleClick = () => {
    // 🔥 priority: kalau ada custom onClick (misal video)
    if (onClick) {
      onClick();
      return;
    }

    // 🔥 default redirect
    router.push(`/projects/explore/${project.slug}`);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onClick={handleClick}
      className={`group flex flex-col cursor-pointer active:scale-[0.97]`}
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-xl">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Image
            src={project.heroImage}
            alt={project.title}
            width={500}
            height={300}
            className="w-full h-[220px] object-cover"
          />
        </motion.div>

        {project.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xl"
          >
            ▶
          </motion.div>
        )}
      </div>

      {/* CONTENT */}
      <div className="mt-3 space-y-1 px-1">
        <h4 className="text-white text-sm">{project.title}</h4>

        {project.description && (
          <p className="text-xs text-zinc-400 line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 pt-1">
          {project.stack.slice(0, 3).map((item, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-zinc-400 bg-white/3"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
