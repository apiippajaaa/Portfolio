"use client";

import ProjectHeader from "@/app/projects/components/Header";
import ProjectShowcase from "@/app/projects/components/ProjectShowcase";
import Footer from "@/components/layouts/Footer";

export default function About() {
  return (
    <>
      <section className="w-full max-w-6xl mx-auto ">
        <section
          id="about"
          className="min-h-screen snap-start flex items-center  relative"
        >
          <ProjectHeader />
        </section>
        <ProjectShowcase />
        <Footer />
      </section>
    </>
  );
}
