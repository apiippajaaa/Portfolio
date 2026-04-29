"use client";

import { useState } from "react";
import { ProjectData } from "@/types/Project";
import Development from "./showcase/section/Development";
import Design from "./showcase/section/Design";
import Video from "./showcase/section/Video";
import VideoModal from "./showcase/VideoModal";

type Props = {
  data: ProjectData;
};

export default function ProjectShowcase({ data }: Props) {
  const { code, design, video } = data;

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="w-full mt-28 md:mt-36 space-y-44 md:space-y-56">
      <Development code={code} />
      <Design design={design} />
      <Video video={video} onOpen={setActiveVideo} />

      <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
