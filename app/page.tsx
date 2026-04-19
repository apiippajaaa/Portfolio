import About from "@/components/pages/homepage/About";
import GetInTouch from "@/components/pages/homepage/GetInTouch";
import Hero from "@/components/pages/homepage/Hero";
import Projects from "@/components/pages/homepage/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <GetInTouch />
    </>
  );
}
