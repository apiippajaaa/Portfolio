"use client";

import SectionHeader from "../SectionHeader";
import AppleButton from "../AppleButton";
import ProjectCarousel from "@/components/ui/carousel/ProjectCarousel";
import ProjectCard from "../ProjectCard";
import { ProjectItem } from "@/types/Project";

type Props = {
  design: ProjectItem[];
};

export default function Design({ design }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-10 space-y-16">
      <SectionHeader
        label="Visual Craft"
        title="Design"
        subtitle="Interfaces & visual systems"
      />

      <div className="hidden md:grid grid-cols-3 gap-6">
        {design.slice(0, 6).map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <ProjectCarousel items={design} />

      <AppleButton href="/work/design" label="Explore All Design" />
    </section>
  );
}
