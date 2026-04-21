export type ProjectItem = {
    title: string;
    description: string;
    image: string;
    link?: string;
    videoUrl?: string;
    tech?: string[];
    tools?: string[];
    isCore?: boolean;
  };
  
  export type SectionType = "code" | "design" | "video";