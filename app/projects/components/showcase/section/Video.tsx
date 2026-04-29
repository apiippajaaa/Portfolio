"use client";

import SectionHeader from "../SectionHeader";
import AppleButton from "../AppleButton";
import ProjectCarousel from "@/components/ui/carousel/ProjectCarousel";
import ProjectCard from "../ProjectCard";
import { ProjectItem } from "@/types/Project";

type Props = {
  video: ProjectItem[];
  onOpen: (url: string) => void;
};

export default function Video({ video, onOpen }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-10 space-y-16">
      <SectionHeader
        label="Motion"
        title="Video"
        subtitle="Storytelling & motion"
      />

      <div className="hidden md:grid grid-cols-3 gap-6">
        {video.slice(0, 6).map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            clickable
            onClick={() => p.videoUrl && onOpen(p.videoUrl)}
          />
        ))}
      </div>

      <ProjectCarousel
        items={video}
        onItemClick={(item) => item.videoUrl && onOpen(item.videoUrl)}
      />

      <AppleButton href="/work/video" label="Explore All Video" />
    </section>
  );
}
