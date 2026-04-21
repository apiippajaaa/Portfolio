"use client";

import Footer from "@/components/layouts/Footer";

import ProjectHeader from "@/components/pages/projects/Header";
import ProjectShowcase from "@/components/pages/projects/Showcase";

export default function About() {
  return (
    <>
      <section className="w-full max-w-6xl mx-auto ">
        <section
          id="about"
          className="min-h-screen snap-start flex items-center px-6 relative"
        >
          <ProjectHeader />
        </section>
        <ProjectShowcase />
        {/* <Skills />
        <Journey />
        <Philosophy />
        <GetInTouch /> */}
      </section>
    </>
  );
}
