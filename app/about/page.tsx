"use client";

import GetInTouch from "@/components/pages/about/GetInTouch";
import AboutHeader from "@/components/pages/about/Header";
import Journey from "@/components/pages/about/Journey";
import Philosophy from "@/components/pages/about/Philosophy";
import Skills from "@/components/pages/about/Skills";

export default function About() {
  return (
    <>
      <section className="w-full max-w-6xl mx-auto ">
        <section
          id="about"
          className="min-h-screen snap-start flex items-center px-6 relative"
        >
          <AboutHeader />
        </section>
        <Skills />
        <Journey />
        <Philosophy />
        <GetInTouch />
      </section>
    </>
  );
}
