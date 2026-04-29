"use client";

import { motion } from "framer-motion";

import ProjectCarousel from "@/components/ui/carousel/ProjectCarousel";
import SectionHeader from "../SectionHeader";
import CoreProject from "../CoreProject";
import ProjectCard from "../ProjectCard";
import AppleButton from "../AppleButton";
import { ProjectItem } from "@/types/Project";

type Props = {
  code: ProjectItem[];
};

export default function Development({ code }: Props) {
  const core = code.find((i) => i.isCore);

  return (
    <motion.section className="max-w-6xl mx-auto px-5 md:px-10 space-y-16">
      <SectionHeader
        label="Engineering"
        title="Development"
        subtitle="Engineering systems & web applications"
      />

      {core && <CoreProject project={core} />}

      <div className="hidden md:grid grid-cols-3 gap-6">
        {code
          .filter((i) => !i.isCore)
          .slice(0, 6)
          .map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
      </div>

      <ProjectCarousel items={code.filter((i) => !i.isCore)} />

      <AppleButton href="/projects/explore/" label="Explore All Development" />
    </motion.section>
  );
}
