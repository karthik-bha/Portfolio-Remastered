import Certifications from "@/components/certifications/Certificates";
import Experience from "@/components/experience/Experience";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";


export default function Home() {
  return (
    <div>
      <Hero />
      <section className="max-w-[1200px] mx-auto">
        <div className="mx-4 md:mx-8">
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
        </div>
      </section>
    </div>
  );
}
