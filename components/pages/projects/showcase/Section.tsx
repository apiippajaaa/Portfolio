"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import CoreProject from "./CoreProject";
import ProjectCard from "./ProjectCard";
import SectionFooter from "./SectionFooter";
import VideoModal from "./VideoModal";
import { ProjectItem, SectionType } from "@/types/Projects";

type Props = {
  title: string;
  subtitle: string;
  items: ProjectItem[];
  type: SectionType;
  viewAllLink: string;
};

export default function Section({
  title,
  subtitle,
  items,
  type,
  viewAllLink,
}: Props) {
  const core = items.find((i) => i.isCore) ?? null;
  const highlights = items.filter((i) => !i.isCore).slice(0, 3);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="space-y-16 md:space-y-20">
      <SectionHeader title={title} subtitle={subtitle} type={type} />

      {core && (
        <CoreProject
          project={core}
          type={type}
          onPlay={(url) => setActiveVideo(url)}
        />
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {highlights.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} />
        ))}
      </div>

      <SectionFooter title={title} link={viewAllLink} />

      {activeVideo && (
        <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}
