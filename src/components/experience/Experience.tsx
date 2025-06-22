"use client"; // This component needs to be a Client Component

import { motion } from 'framer-motion'; // Import motion
import useInViewOnce from '@/context/context'; // Your custom hook
import React from 'react';

const Experience = () => {
    // Reference the outermost scrollable section or a wrapper that contains everything you want to animate on scroll
    // Placing the ref on the main <section> for the entire Experience block
    const { ref, hasAnimated } = useInViewOnce(0.3); // Adjust threshold as needed

    // Define animation variants for individual items
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 0.5
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
                stiffness: 120,
                damping: 15,
                duration: 0.6
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
        <section ref={ref} id="experience"> {/* Attach the ref to the main section */}
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
                    <div className="grid gap-4 mx-4 sm:grid-cols-12">
                        <div className="col-span-12 sm:col-span-3">
                            <motion.div
                                className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-gray-400"
                                variants={itemVariants} // Apply item variants
                            >
                                {/* This header describes the overall section */}
                                <h3 className="text-3xl font-header">Full Stack Development</h3>
                                <span className="text-sm font-content tracking-wider uppercase text-txt-color-2">Deepened understanding of full stack development through internships</span>
                            </motion.div>
                        </div>
                        <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 before:bg-txt-color-2 sm:before:-left-3"> {/* Moved before:bg-gray-700 */}

                                {/* QuickIntell Experience */}
                                <motion.div
                                    className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-gray-400"
                                    variants={itemVariants} // Apply item variants
                                >
                                    <h3 className="text-xl font-header">Full Stack Development Intern - QuickIntell</h3>
                                    <time className="text-xs font-content text-txt-color-2">April 2025 - June 2025</time>
                                    <ul className="mt-2 list-disc list-inside font-content text-gray-300">
                                        <li>Contributed significantly to the redesign and frontend development of oflisting.com, enhancing UI, increasing website performance and SEO by more than 20% on various devices.</li>
                                        <li>Made significant contributions to the frontend development and API integrations for a medical e-commerce application for client WondRX using React Native.</li>
                                    </ul>
                                </motion.div>

                                {/* Freelance Experience */}
                                <motion.div
                                    className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-gray-400"
                                    variants={itemVariants} // Apply item variants
                                >
                                    <h3 className="text-xl font-header">Full Stack Development Intern - Freelance</h3>
                                    <time className="text-xs font-content text-txt-color-2">Jan 2025 - April 2025</time>
                                    <ul className="mt-2 list-disc list-inside font-content text-gray-300">
                                        <li>Solo developed 2 Full-stack applications for employer’s clients.</li>
                                        <li><b>Restaurant & Office Management System:</b> Designed a role-based platform for 15+ users with 5 user roles, allowing Super Admins to manage regions, Admins to oversee offices/restaurants, and Offices to manage employees/preferences.</li>
                                        <li>Built dashboards for order audit and implemented manual & auto-ordering via an Express server.</li>
                                        <li><b>Wedding Invitation Platform:</b> Developed an animated platform with Framer Motion, a categorized photo gallery, and WhatsApp integration for sending invitations.</li>
                                        <li>Handled images via Node.js filesystem & Optional Google Drive API.</li>
                                    </ul>
                                </motion.div>

                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </section>
    );
};

export default Experience;