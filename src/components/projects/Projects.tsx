"use client"
import useInViewOnce from "@/context/context"
import { motion } from "framer-motion"
const Projects = () => {
    const projects = [
        {
            _id: 1,
            name: "Deliveroo",
            description: "A live full-stack application aiming to streamline food ordering processes.",
            image: "/images/projects/deliveroo.png",
            link: "https://deliveroo-xi.vercel.app/",
            live: true,
        },
        {
            _id: 2,
            name: "Get Me A Coffee",
            description: "A live full-stack crowdfunding platform designed to help raise funds.",
            image: "/images/projects/getmeacofee.png",
            link: "https://get-me-a-coffee-fundraiser-app-wndd.vercel.app/",
            live: true,
        },
        {

            _id: 3,
            name: "BookEasy",
            description: "A live full-stack application for booking and managing travel",
            image: "/images/projects/bookeasy.png",
            link: "https://bookeasy-frontend.onrender.com/",
            live: true,
        },
        {
            _id: 4,
            name: "Old portfolio",
            description: "My old portfolio built with react and tailwindcss",
            image: "/images/projects/portfolio.png",
            link: "https://karthik-bha.github.io/portfolio/",
            live: true,
        },
    ]
    const { ref, hasAnimated } = useInViewOnce(0.3);
    return (
        <section ref={ref}>
            <motion.h2 className="text-center md:text-left font-header text-section-header my-10"
                initial={{ opacity: 0, x: "-50px" }}
                animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                id="projects"
            >Projects</motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-6"
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
                {projects.map((items) => {
                    return (
                        <motion.div key={items._id} className="  p-2  flex flex-col gap-2"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <div className="w-full rounded-md">
                                <img src={items.image} alt={items.name} className="rounded-t-lg max-h-[30vh] object-cover w-full" />
                            </div>
                            <p className="text-sub-heading">{items.name}</p>
                            <p>{items.description}</p>
                            <div className="flex gap-2 ">
                                {items.live ?
                                    <a href={items.link} target="_blank" className="hover:text-white text-[#848484] cursor-pointer">Live Link</a> :
                                    <a href={items.link} target="_blank" className="hover:text-white text-[#848484] cursor-pointer">Github Link</a>}
                                <button className="text-[#848484] hover:text-white">See Details</button>
                            </div>
                        </motion.div>
                    )
                })}
          
              

            </motion.div>
            <div className="mx-auto flex  items-center justify-center my-6 ">
            <button className="rounded-md border-2 border-white px-4 py-1 hover:bg-white hover:text-black">View more &darr;</button>
            </div>
        </section>
    )
}

export default Projects