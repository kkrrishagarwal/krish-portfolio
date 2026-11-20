import Background from "@/components/Background";
import BootLoader from "@/components/BootLoader";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import TechStack from "@/components/TechStack";
import Trophies from "@/components/Trophies";

export default function Home() {
  return (
    <>
      <BootLoader />
      <CustomCursor />
      <CommandPalette />
      <Background />
      <Navbar />
      <main className="relative">
        <Hero />
        <Stats />
        <Experience />
        <Marquee />
        <Projects />
        <TechStack />
        <Trophies />
        <Contact />
      </main>
    </>
  );
}
