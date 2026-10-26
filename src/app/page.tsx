import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <About />
        <FeaturedProjects />
        <Skills />
        <ExperienceTimeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
