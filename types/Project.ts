export type ProjectItem = {
  title: string;
  slug: string;

  description?: string;
  isCore?: boolean;

  // ✅ NEW STRUCTURE
  heroImage: string;
  images?: string[];

  // ✅ unified stack
  stack: string[];

  // optional
  videoUrl?: string;
  link?: string;
};


export type ProjectData = {
  code: ProjectItem[];
  design: ProjectItem[];
  video: ProjectItem[];
};

export type SectionType = "code" | "design" | "video";