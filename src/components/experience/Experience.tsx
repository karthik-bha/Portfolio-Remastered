"use client";

import { motion } from 'framer-motion';
import useInViewOnce from '@/context/context';
import React from 'react';
const experienceData = [
    {
        role: "Full Stack Development Intern",
        company: "QuickIntell",
        duration: "April 2025 - June 2025",
        highlights: [
            "Redesigned and rebuilt the frontend of oflisting.com, creating 9+ pages, ~6–7 complex interactive forms, and 10+ reusable components using Next.js and Tailwind CSS.",
            "Integrated an AI-powered chatbot into oflisting.com to automate and streamline customer query resolution.",
            "Contributed to the frontend of a medical e-commerce application, crafting 25+ mobile screens and 50+ reusable components with React Native (Expo), and implementing state management using Zustand.",
            "Integrated 10+ client APIs, ensuring seamless collaboration with backend developers."
        ]
    },
    {
        role: "Full Stack Development Intern",
        company: "Didwaniappstore",
        duration: "Jan 2025 - April 2025",
        highlights: [
            "Designed a role-based Restaurant & Office Management System supporting 15+ active users across 5 roles, enabling Super Admins to manage regions, Admins to oversee offices/restaurants, and Office users to manage employees and preferences.",
            "Built 27 pages and ~20–25 reusable components, and engineered ~80–100 backend APIs in Next.js to support manual and automated ordering workflows, interactive dashboards, and role-based functionalities.",
            "Developed an animated, interactive Wedding Invitation Platform with Framer Motion, featuring a categorized photo gallery and automated WhatsApp invitation sharing via Puppeteer, with scalable Google Drive media integration."
        ]
    }
];

const Experience = () => {
    // Reference the outermost scrollable section or a wrapper that contains everything you want to animate on scroll
    // Placing the ref on the main <section> for the entire Experience block
    const { ref, hasAnimated } = useInViewOnce(0.3); // Adjust threshold as needed

    // Define animation variants for individual items
    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 20,
                duration: 0.8,
                ease: "easeOut"
            }
        },
    };


    // Define variants for the main header (optional, can be similar to itemVariants or different)
    const headerVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 18,
                duration: 0.8,
                ease: "easeOut"
            }
        },
    };


    // Variants for the container that will stagger its children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Each child will animate with a 0.2s delay after the previous one
            },
        },
    };


    return (
        <section ref={ref} id="experience">
            <motion.h2
                className='text-section-header font-header text-center md:text-left my-10'
                variants={headerVariants}
                initial="hidden"
                animate={hasAnimated ? "visible" : "hidden"}
            >
                Experience
            </motion.h2>

            <motion.section
                variants={containerVariants} // Apply container variants
                initial="hidden"
                animate={hasAnimated ? "visible" : "hidden"}
            >
                <div className="pb-12 pt-4 mx-auto">
                    <div className="grid gap-4 md:mx-4 sm:grid-cols-12">
                        <div className="relative col-span-12 space-y-6 sm:col-span-9">

                            <div className="space-y-12">
                                {experienceData.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="grid sm:grid-cols-4 md:grid-cols-2 gap-8 items-start"
                                    >
                                        {/* Left column: company + duration */}
                                        <div className="sm:col-span-1 text-sm text-gray-400 space-y-1">
                                            <p className="font-semibold text-white text-base">{exp.company}</p>
                                            <p className="text-xs text-gray-500">{exp.duration}</p>
                                        </div>

                                        {/* Right column: role + highlights */}
                                        <div className="sm:col-span-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-md">
                                            <h3 className="text-lg font-semibold text-white mb-3">{exp.role}</h3>
                                            <ul className="list-disc list-inside text-gray-300 text-sm leading-relaxed space-y-1">
                                                {exp.highlights.map((point, i) => (
                                                    <li key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>



                        </div>
                    </div>
                </div>
            </motion.section>
        </section>
    );
};

export default Experience;