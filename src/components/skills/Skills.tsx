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
        className="grid grid-cols-2 md:grid-cols-6 gap-4 m-4"
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2, // Delay each child animation
            },
          },
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="flex gap-4 bg-[#282828] p-2 items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
            <p className="text-white mt-2 text-[1rem]">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
