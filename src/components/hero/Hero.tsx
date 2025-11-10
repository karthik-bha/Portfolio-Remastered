"use client"
import Image from "next/image"
import { motion } from "framer-motion";
const Hero = () => {
    return (
        <header className="relative flex w-full h-[75vh] items-center justify-center overflow-hidden">
            {/* Background Image */}
            <Image
                src="/banner.jpg"
                alt="Hero background image showcasing portfolio"
                fill
                sizes="100vw"
                priority
                quality={85}
                className="object-cover brightness-75"
            />

            {/* subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 mx-auto flex flex-col items-center gap-6 text-center max-w-[70vw]"
            >
                <h1 className="font-header text-section-header font-semibold">
                    Hello! I am <span className="text-white">Karthik</span>
                </h1>
                <p className="text-gray-300">
                    I am a <span className="text-white/90 font-medium">Full Stack Developer</span> who likes building web applications.
                </p>

                <motion.button
                    type="button"
                    className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white 
                 backdrop-blur-md shadow-md hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => window.open("https://drive.google.com/file/d/1DCCeUaJFuhpzPTliAk69ov9zfXNphHn2/view", "_blank")}
                >
                    View my resume ↗
                </motion.button>

                {/* Social Icons */}
                <div className="flex gap-4 mt-2">
                    {[
                        { src: "/svgs/hero/linkedin.svg", link: "https://www.linkedin.com/in/karthik-bhat-pro" },
                        { src: "/svgs/hero/github.svg", link: "https://github.com/karthik-bha" },
                        { src: "/svgs/hero/mail.svg", link: "mailto:karthik.bhat.pro@gmail.com" },
                    ].map((icon, i) => (
                        <motion.img
                            key={i}
                            src={icon.src}
                            alt="social"
                            width={32}
                            whileHover={{ scale: 1.1, opacity: 0.9 }}
                            className="cursor-pointer"
                            onClick={() => window.open(icon.link, "_blank")}
                        />
                    ))}
                </div>
            </motion.div>
        </header>


    )
}

export default Hero