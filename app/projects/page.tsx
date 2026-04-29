import ProjectHeader from "@/app/projects/components/Header";
import Footer from "@/components/layouts/Footer";
import ProjectShowcase from "./components/ProjectShowcase";
import data from "@/data/projects.json";
import { ProjectData } from "@/types/Project";

const projectData = data as ProjectData;

export default function ProjectPage() {
  return (
    <section className="w-full max-w-6xl mx-auto">
      <section className="min-h-screen flex items-center">
        <ProjectHeader />
      </section>

      <ProjectShowcase data={projectData} />
      <Footer />
    </section>
  );
}
