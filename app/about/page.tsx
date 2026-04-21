"use client";

import GetInTouch from "@/app/about/components/GetInTouch";
import AboutHeader from "@/app/about/components/Header";
import Journey from "@/app/about/components/Journey";
import Philosophy from "@/app/about/components/Philosophy";
import Skills from "@/app/about/components/Skills";
import Footer from "@/components/layouts/Footer";

export default function About() {
  return (
    <>
      <section className="w-full max-w-6xl mx-auto ">
        <section
          id="about"
          className="min-h-screen snap-start flex items-center  relative"
        >
          <AboutHeader />
        </section>
        <Skills />
        <Journey />
        <Philosophy />
        <GetInTouch />
        <Footer />
      </section>
    </>
  );
}
