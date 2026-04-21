"use client";

import data from "@/data/projects.json";
import { ProjectItem } from "@/types/Projects";
import Section from "./showcase/Section";

export default function ProjectShowcase() {
  const { code, design, video } = data as {
    code: ProjectItem[];
    design: ProjectItem[];
    video: ProjectItem[];
  };

  return (
    <div className="w-full mt-28 md:mt-36 space-y-40 md:space-y-64">
      <div className="max-w-6xl mx-auto px-5 md:px-10 space-y-40">
        <Section
          title="Development"
          subtitle="Engineering systems & web applications"
          items={code}
          type="code"
          viewAllLink="/work/code"
        />

        <Section
          title="Design"
          subtitle="Interfaces, experiences & visual systems"
          items={design}
          type="design"
          viewAllLink="/work/design"
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <Section
          title="Motion & Video"
          subtitle="Cinematic edits & motion storytelling"
          items={video}
          type="video"
          viewAllLink="/work/video"
        />
      </div>
    </div>
  );
}
