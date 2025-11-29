"use client"
import useInViewOnce from "@/context/context"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image";
import { useState } from "react"

interface Project {
    _id: number;
    name: string;
    description: string;
    image: string;
    link: string;
    live: boolean;
    techStack: string[];
    details: string[];
}

const projects: Project[] = [
    {
        _id: 1,
        name: "Nexus – Social Media Platform",
        description: "A full-stack social platform featuring real-time messaging, microservices architecture, and optimized media handling.",
        image: "/images/projects/nexus-preview.png",
        link: "https://nexus-sandy-chi.vercel.app/",
        live: true,
        techStack: ["React", "Spring Boot", "Express", "Socket.io", "MongoDB", "Docker", "ImageKit"],
        details: [
            "Engineered a microservices architecture separating a Dockerized Spring Boot REST API (core data) from a lightweight Node.js/Socket.io service (real-time chat), isolating failure domains.",
            "Implemented WebSocket-based real-time messaging and media optimization using ImageKit.io for profile images and post content.",
            "Orchestrated production deployment across Vercel (Frontend) and Render (Backend), leveraging Docker containerization for environment consistency.",
            "Designed a centralized JWT authentication strategy validating user sessions across Java and Node.js services."
        ]
    },
    {
        _id: 2,
        name: "Deliveroo",
        description: "A live full-stack application aiming to streamline food ordering processes.",
        image: "/images/projects/deliveroo.png",
        link: "https://deliveroo-xi.vercel.app/",
        live: true,
        techStack: ["React", "Express", "MongoDB Atlas", "Tailwind CSS", "Stripe API", "Cloduinary CDN API"],
        details: [
            "React was used for the frontend to create a dynamic UI.",
            "Cloudinary API was integrated for seamless image upload and distribution.",
            "Express.js and Node.js handle backend routing and authentication with JWT.",
            "MongoDB Atlas serves as the database for storing orders and user details.",
            "Tailwind CSS is used for styling to ensure responsiveness.",
            "Stripe API was used for payments"
        ]
    },
    {
        _id: 3,
        name: "Get me a coffee",
        description: "A crowdfunding platform designed to help raise funds for various causes.",
        image: "/images/projects/getmeacofee.png",
        link: "https://get-me-a-coffee-fundraiser-app-wndd.vercel.app/",
        live: true,
        techStack: ["Next.js", "MongoDB Atlas", "Tailwind CSS", "Razorpay API"],
        details: [
            "Next.js enables server-side rendering for better SEO.",
            "Github OAuth by next-auth handles user sign-in securely.",
            "Razorpay is integrated for seamless donation transactions."
        ]
    },
    {
        _id: 4,
        name: "BookEasy",
        description: "A full-stack travel booking platform.",
        image: "/images/projects/bookeasy.png",
        link: "https://bookeasy-frontend.onrender.com/",
        live: true,
        techStack: ["React", "Express.js", "Node.js", "MongoDB Atlas"],
        details: [
            "React manages the frontend with a responsive UI.",
            "Node.js and Express power the backend API for booking management.",
            "MongoDB Atlas stores user bookings details."
        ]
    },
    {
        _id: 5,
        name: "Old portfolio",
        description: "My old portfolio built with react and tailwindcss",
        image: "/images/projects/portfolio.png",
        link: "https://karthik-bha.github.io/portfolio/",
        live: true,
        techStack: ["React", "Tailwind CSS"],
        details: ["React and tailwind CSS were used for creating a responsive UI."]
    },
    {
        _id: 6,
        name: "FirstBench Frontend",
        description: "A pure frontend project built using react. Upon landing, navigate to dashboard to view.",
        image: "/images/projects/firstbench.png",
        link: "https://karthik-bha.github.io/Firstbench-Frontend/",
        live: true,
        techStack: ["React", "Tailwind CSS"],
        details: ["React and tailwind CSS were used for creating a responsive UI."]
    },
    {
        _id: 7,
        name: "American Sign Language Detection",
        description: "A full stack application which is used to detect the handsigns of the American Sign language using the VGG16 model",
        image: "/images/projects/asl.png",
        link: "https://github.com/karthik-bha/ASL",
        live: false,
        techStack: ["HTML", "CSS", "Javascript", "python", "Flask", "Tensorflow"],
        details: [
            "HTML, CSS and Javascript were used to develop frontend.",
            "python and Flask were used to develop backend."
        ]
    },
    {
        _id: 8,
        name: "College Management System",
        description: "A full stack MERN application which is used to manage college entities like students, teachers and admins",
        image: "/images/projects/cms.png",
        link: "https://github.com/karthik-bha/CMS",
        live: false,
        techStack: ["React", "Express.js", "Node.js", "MongoDB Community"],
        details: [
            "React manages the frontend with a responsive UI.",
            "Node.js and Express power the backend API for college management.",
            "MongoDB stores user teacher, student and admin details."
        ]
    },
    {
        _id: 9,
        name: "Disease Predictor",
        description: "A full stack application used to predict diseases based on inputted symptoms",
        image: "/images/projects/dp.png",
        link: "https://github.com/karthik-bha/Disease-Predictor",
        live: false,
        techStack: ["HTML", "CSS", "Javascript", "python", "Flask", "MySQL", "Tensorflow"],
        details: [
            "HTML, CSS and Javascript were used to develop frontend.",
            "python and Flask were used to develop backend.",
            "MySQL was used to store user data."
        ]
    }
];


const Projects = () => {
    const { ref, hasAnimated } = useInViewOnce(0.3);
    const [size, setSize] = useState<number>(4);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section ref={ref}>
            <motion.h2 className="text-center md:text-left font-header text-section-header my-10"
                initial={{ opacity: 0, x: "-50px" }}
                animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                id="projects"
            >
                Projects
            </motion.h2>

            {/* Project Grid */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:mx-4"
                initial="hidden"
                animate={hasAnimated ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 },
                    },
                }}
            >
                {projects.slice(0, size).map((items) => (
                    <motion.div
                        key={items._id}
                        className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    >
                        <div className="flex flex-col gap-3">
                            <Image
                                src={items.image}
                                alt={items.name}
                                width={1080}
                                height={1920}
                                className="rounded-lg h-56 object-cover"
                            />
                            <div>
                                <p className="text-lg font-semibold">{items.name}</p>
                                <p className="text-sm text-gray-400 min-h-[48px] md:min-h-[79px] lg:min-h-[48px]">
                                    {items.description}
                                </p>

                            </div>
                            <div className="flex flex-wrap gap-2 mt-2 items-center">
                                {items.techStack.slice(0, 3).map((tech) => (
                                    <span key={tech} className="text-xs px-2 py-1 bg-white/10 rounded-md">
                                        {tech}
                                    </span>
                                ))}
                                {items.techStack.length > 3 && <span className="text-xs text-gray-400">+ more</span>}
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <a
                                    href={items.link}
                                    target="_blank"
                                    className="text-blue-400 hover:text-blue-300"
                                >
                                    {items.live ? "Live ↗" : "GitHub ↗"}
                                </a>
                                <button
                                    className="text-gray-400 hover:text-white"
                                    onClick={() => setSelectedProject(items)}
                                >
                                    Details →
                                </button>
                            </div>
                        </div>
                    </motion.div>

                ))}
            </motion.div>

            {/* View More / View Less Button */}
            <div className="mx-auto flex items-center justify-center my-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md text-gray-200 
               hover:bg-white/10 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                    onClick={() => setSize(size >= projects.length ? 4 : Math.min(size + 4, projects.length))}
                >
                    {size >= projects.length ? "View less ↑" : "View more ↓"}
                </motion.button>
            </div>


            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)} // close when clicking outside
                    >
                        <motion.div
                            className="relative bg-white/5 backdrop-blur-md border border-white/10 text-white p-6 rounded-2xl max-w-lg w-full shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-y-auto max-h-[80vh]"
                            initial={{ y: 60, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 60, opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()} // prevent click bubbling
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl transition-colors"
                                onClick={() => setSelectedProject(null)}
                            >
                                &times;
                            </button>

                            {/* Project Image */}
                            <div className="overflow-hidden rounded-lg mb-4">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.name}
                                    width={1080}
                                    height={1920}
                                    className="rounded-lg w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Project Title */}
                            <h3 className="text-2xl font-bold mb-2">{selectedProject.name}</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                {selectedProject.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {selectedProject.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs px-2 py-1 bg-white/10 rounded-md text-gray-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Details */}
                            <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
                                {selectedProject.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>

                            {/* Links */}
                            <div className="mt-6 flex gap-4">
                                <a
                                    href={selectedProject.link}
                                    target="_blank"
                                    className="px-4 py-2 bg-white/10 rounded-md text-blue-400 hover:bg-white/20 transition"
                                >
                                    {selectedProject.live ? "View Live ↗" : "View Code ↗"}
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    )
}

export default Projects
