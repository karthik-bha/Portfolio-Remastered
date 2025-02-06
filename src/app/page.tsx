import Certifications from "@/components/certifications/Certificates";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";


export default function Home() {
  return (
    <div>
      <Hero />
      <div className="max-w-[1200px] mx-auto">
        <Skills />
        <Projects />
        <Certifications/>
      </div>
    </div>
  );
}
