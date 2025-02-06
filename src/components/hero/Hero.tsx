"use client"
import Image from "next/image"
import { motion } from "framer-motion";
const Hero = () => {
    return (
        <header className="flex relative w-full h-[75vh] items-center" id="#about">
            {/* Background Image */}
            <Image
                src="/banner.jpg"
                alt="banner-image"
                fill
                className="animate animate-fade "
            />

            {/* Content with Higher Z-Index */}
            <div className="relative z-10 mx-auto flex items-center flex-col gap-6 text-center max-w-[70vw]">
                <h2 className="font-header text-section-header animate animate-fade-left font-semibold">
                    Hello! I am Karthik
                </h2>
                <p className="text-[#848484] animate animate-fade-right">
                    I'm a Full Stack Developer who likes creating web applications and working on data analytics.
                </p>
                <motion.button
                    type="button"
                    className="bg-[#121212] px-6 py-3 text-[1rem] font-semibold rounded-md text-white shadow-sm animate-fade-up"
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
                        transition: { duration: 0.3 },
                    }}
                    whileTap={{
                        scale: 0.95,
                        transition: { duration: 0.1 },
                    }}
                    onClick={() => window.open("https://drive.google.com/file/d/1DCCeUaJFuhpzPTliAk69ov9zfXNphHn2/view", "_blank")}
                >
                    View my resume
                </motion.button>
                <div className="flex gap-2 animate-fade animate-once">
                    <img src="/svgs/hero/linkedin.svg" alt="linkedin" className="hover:cursor-pointer hover:scale-105" width={40}
                        onClick={() => window.open("https://www.linkedin.com/in/karthik-bhat-pro", "_blank")} />
                    <img src="/svgs/hero/github.svg" alt="github" className="hover:cursor-pointer hover:scale-105" width={30}
                        onClick={() => window.open("https://github.com/karthik-bha", "_blank")} />
                    <img src="/svgs/hero/mail.svg" alt="mail" className="hover:cursor-pointer hover:scale-105" width={50}
                        onClick={() => window.open("mailto:karthik.bhat.pro@gmail.com", "_blank")} />
                </div>
            </div>
        </header>

    )
}

export default Hero