import About from "@/app/Hero/About";
import GetInTouch from "@/app/Hero/GetInTouch";
import Hero from "@/app/Hero/Hero";
import Projects from "@/app/Hero/Projects";
import HomeLayout from "@/components/layouts/HomeLayout";

export default function Home() {
  return (
    <>
      <HomeLayout>
        <Hero />

        <About />

        <Projects />

        <GetInTouch />
      </HomeLayout>
    </>
  );
}
