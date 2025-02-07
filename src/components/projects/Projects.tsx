"use client"
import useInViewOnce from "@/context/context"
import { motion, AnimatePresence } from "framer-motion"
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
        name: "Deliveroo",
        description: "A live full-stack application aiming to streamline food ordering processes.",
        image: "/images/projects/deliveroo.png",
        link: "https://deliveroo-xi.vercel.app/",
        live: true,
        techStack: ["React", "Express", "MongoDB Atlas", "Tailwind CSS","Stripe API", "Cloduinary CDN API"],
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
        _id: 2,
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
        _id: 3,
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
    }, {
        _id: 4,
        name: "Old portfolio",
        description: "My old portfolio built with react and tailwindcss",
        image: "/images/projects/portfolio.png",
        link: "https://karthik-bha.github.io/portfolio/",
        live: true,
        techStack: ["React","Tailwind CSS"],
        details: [
            "React and tailwind CSS were used for creating a responsive UI.",            
        ]
    }, {
        _id: 5,
        name: "FirstBench Frontend",
        description: "A pure frontend project built using react. Upon landing, navigate to dashboard to view.",
        image: "/images/projects/firstbench.png",
        link: "https://karthik-bha.github.io/Firstbench-Frontend/",
        live: true,
        techStack: ["React","Tailwind CSS"],
        details: [
            "React and tailwind CSS were used for creating a responsive UI.",            
        ]
    }, {
        _id: 6,
        name: "American Sign Language Detection",
        description: "A full stack application which is used to detect the handsigns of the American Sign language using the VGG16 model",
        image: "/images/projects/asl.png",
        link: "https://github.com/karthik-bha/ASL",
        live: false,
        techStack: ["HTML", "CSS", "Javascript","python","Flask","Tensorflow"],
        details: [
            "HTML, CSS and Javascript were used to develop frontend.",
            "python and Flask were used to develop backend."
        ]

    }, {
        _id: 7,
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

    }, {
        _id: 8,
        name: "Disease Predictor",
        description: "A full stack application used to predict diseases based on inputted symptoms",
        image: "/images/projects/dp.png",
        link: "https://github.com/karthik-bha/Disease-Predictor",
        live: false,
        techStack: ["HTML", "CSS", "Javascript","python","Flask","MySQL","Tensorflow"],
        details: [
            "HTML, CSS and Javascript were used to develop frontend.",
            "python and Flask were used to develop backend.",
            "MySQL was used to store user data."
        ]
    }
]

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
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-6"
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
                    <motion.div key={items._id}
                        className="rounded-t-md shadow-gray-400/50 hover:shadow-lg transition-shadow flex flex-col gap-2"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div className="w-full rounded-md">
                            <img src={items.image} alt={items.name} className="rounded-t-lg max-h-[30vh] object-cover w-full" />
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            <p className="text-sub-heading">{items.name}</p>
                            <p>{items.description}</p>
                            <div className="flex gap-4">
                                {items.live ? (
                                    <a href={items.link} target="_blank" className="hover:text-white text-[#848484] cursor-pointer">Live Link</a>
                                ) : (
                                    <a href={items.link} target="_blank" className="hover:text-white text-[#848484] cursor-pointer">GitHub Link</a>
                                )}
                                <button
                                    className="text-[#848484] hover:text-white"
                                    onClick={() => setSelectedProject(items)}
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* View More / View Less Button */}
            <div className="mx-auto flex items-center justify-center my-6">
                {size >= projects.length ? (
                    <button className="rounded-md border-2 border-white px-4 py-1 hover:bg-white hover:text-black" onClick={() => setSize(4)}>
                        View less &uarr;
                    </button>
                ) : (
                    <button className="rounded-md border-2 border-white px-4 py-1 hover:bg-white hover:text-black"
                        onClick={() => setSize(prevSize => Math.min(prevSize + 4, projects.length))}>
                        View more &darr;
                    </button>
                )}
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-[#0a0a0a] text-white p-6 rounded-lg max-w-md w-full relative"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
                                onClick={() => setSelectedProject(null)}
                            >
                                &times;
                            </button>

                            {/* Project Image */}
                            <img src={selectedProject.image} alt={selectedProject.name} className="rounded-md w-full mb-4" />

                            {/* Project Name */}
                            <h3 className="text-xl font-bold">{selectedProject.name}</h3>

                            {/* Tech Stack */}
                            <p className="mt-2"><span className="font-semibold">Tech Stack:</span> {selectedProject.techStack.join(", ")}</p>

                            {/* Details */}
                            <ul className="mt-2 list-disc list-inside">
                                {selectedProject.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>

                            {/* Links */}
                            <div className="mt-4 flex gap-4">
                                {selectedProject.live ? (
                                    <a href={selectedProject.link} target="_blank" className="hover:text-white text-blue-400">
                                        Live Link
                                    </a>
                                ) : (
                                    <a href={selectedProject.link} target="_blank" className="hover:text-white text-blue-400">
                                        GitHub Link
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Projects
