"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { skills } from "@/constants/skills";

// Custom hook for intersection observer
const useInViewOnce = (threshold: number = 0.5) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect(); // Stop observing after first trigger
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold, hasAnimated]);

  return { ref, hasAnimated };
};

const Skills = () => {
  const { ref, hasAnimated } = useInViewOnce(0.3);

  return (
    <section ref={ref} id="skills">
      {/* Animated Heading */}
      <motion.h2
        className="text-section-header font-header text-center md:text-left my-10"
        initial={{ opacity: 0, x: "-50px" }}
        animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Skills
      </motion.h2>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:m-4"
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center 
                 bg-[#1a1a1a] rounded-xl p-5 
                 hover:scale-105 transition-transform duration-300 
                 shadow-[0_0_8px_rgba(255,255,255,0.05)] 
                 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img src={skill.icon} alt={skill.name} className="w-10 h-10 mb-2" />
            <p className="text-txt-color-1 text-sm md:text-base text-center pt-1">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};

export default Skills;
