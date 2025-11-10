"use client"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);

    function handleClick() {
        setOpen(!isOpen);
    }

    const navLinks = [
        { href: "/#top", text: "About" },
        { href: "/#experience", text: "Experience" },
        { href: "/#skills", text: "Skills" },
        { href: "/#projects", text: "Projects" },
        { href: "/guestbook", text: "Guest Book" },
        { href: "/contact", text: "Contact Me" }
    ];

    return (
        <nav className=" p-7  bg-[#0a0a0a] max-w-[1200px] mx-auto"
            role="header"
            aria-label="Main Navigation"
            aria-expanded={isOpen}
            aria-controls="navigation"
        >
            <div className="mx-2 text-center flex justify-between items-center rounded-md font-content" role="navigation" >
                <Link href="/#top" className="    bg-clip-text font-header  text-nav-header animate-fade-right">
                    <h1>Karthik Bhat</h1>
                </Link>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden">
                    {isOpen ?
                        <img className="animate-fade-right" src="/svgs/navbar/cross.svg" alt="close/cross" width={30} onClick={handleClick} />
                        :
                        <img className="animate-fade-right" src="/svgs/navbar/hamburger.svg" alt="hamburger" width={30} onClick={handleClick} />
                    }
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-4 text-[#848484] animate-fade-left">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="hover:text-white">
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Navigation (Dropdown with Smooth Animation) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            className="absolute top-16 z-50 bg-[#0a0a0a] left-0 w-full p-6 md:hidden flex flex-col 
                            items-center gap-4 text-[#848484] "
                            initial={{ opacity: 0, y: -20 }} // Initial state: Hidden and positioned slightly above
                            animate={{ opacity: 1, y: 0 }}   // Final state: Fully visible and in place
                            exit={{ opacity: 0, y: -20 }}    // Exit animation: Fade out and slide up
                            transition={{ duration: 0.3 }}    // Duration of the animation
                        >
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-white">
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar;
