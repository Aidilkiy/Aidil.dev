"use client"

import Link from 'next/link'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from './navLink';
import { motion } from "framer-motion";


const links = [
    {url: "/#about", title: "About", section: "about"},
    {url: "/#experience", title: "Experience", section: "experience"},
    {url: "/#work", title: "Projects", section: "work"},
    {url: "/#certifications", title: "Certifications", section: "certifications"},
    {url: "/#contact", title: "Contact", section: "contact"},
];

const Navbar = () => {
    const[open,setOpen] = useState (false)
    const [activeSection, setActiveSection] = useState("home")
    const pathName = usePathname()

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (!section) return false

        const navbarOffset = 78
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarOffset

        window.history.replaceState(null, "", `#${sectionId}`)
        window.scrollTo({ top: Math.max(0, sectionTop), behavior: "smooth" })
        setActiveSection(sectionId)

        return true
    }

    const handleNavigation = (event, link) => {
        setOpen(false)

        event.preventDefault()

        if (pathName !== "/") {
            window.location.assign(`/#${link.section}`)
            return
        }

        scrollToSection(link.section)
    }

    useEffect(() => {
        if (pathName !== "/") {
            setActiveSection(pathName.slice(1) || "home")
            return
        }

        const sections = links
            .map((link) => document.getElementById(link.section))
            .filter(Boolean)
            .sort((firstSection, secondSection) => firstSection.offsetTop - secondSection.offsetTop)

        if (sections.length === 0) return

        const updateActiveSection = () => {
            const marker = window.scrollY + window.innerHeight * 0.32
            const currentSection = sections.reduce((active, section) =>
                section.offsetTop <= marker ? section : active
            , sections[0])

            if (currentSection?.id) setActiveSection(currentSection.id)
        }

        updateActiveSection()
        window.addEventListener("scroll", updateActiveSection, { passive: true })
        return () => window.removeEventListener("scroll", updateActiveSection)
    }, [pathName])

    const topVariants = {
        closed: { 
            rotate: 0,
        },
        opened: {
            rotate: 45, 
            backgroundColor: "rgb(255,255,255)" 
        },
    };

    const centerVariants = {
        closed: { 
            opacity: 1,
        },
        opened: {
            opacity: 0,
        },
    };

    const bottomVariants = {
        closed: { 
            rotate: 0,
        },
        opened: {
            rotate: -45,
            backgroundColor: "rgb(255,255,255)"
        },
    };

    const listVariants = {
        closed: {
            opacity: 0,
            y: -18,
            scale: 0.98,
        },
        opened: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.08,
                duration: 0.28,
                ease: "easeOut",
            },         
        },
    };

    const listItemVariants = {
        closed: {
            y: 12,
            opacity: 0,         
        },
        opened: {
            y: 0,
            opacity: 1,        
        },
    };


    return (
        <header className="relative flex h-[78px] items-center bg-[#071A1F] px-6 text-xl sm:px-8">
        <div className="relative mx-auto flex h-full w-full max-w-[1420px] items-center justify-between">
        
        {/* LINKS */}
        <nav className="absolute left-1/2 hidden max-w-[calc(100%-330px)] -translate-x-1/2 md:flex" aria-label="Main navigation">
            <div className="flex items-center gap-8 overflow-x-auto [scrollbar-width:none] lg:gap-9 xl:gap-10 [&::-webkit-scrollbar]:hidden">
            {links.map((link) => (
                <NavLink link={link} isActive={activeSection === link.section} onNavigate={handleNavigation} key={link.title} />
            ))}
            </div>
        </nav>


        {/* LOGO */}
        <div className="flex select-none items-center gap-2.5 font-mono text-[1.05rem] font-black tracking-[0.015em] text-white md:absolute md:left-0">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2DD4BF] shadow-[0_0_16px_rgba(45,212,191,0.48)]" />
            <span>Aidil <span className="font-black text-[#6F858A]">.dev</span></span>
        </div>


        {/* RESPONSIVE MENU*/}
        <div className ="flex items-center gap-3 md:absolute md:right-0">
        <Link
            href="/Aidil-Rozaidi-CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center rounded-[8px] border border-[#17343A] bg-transparent px-5 font-mono text-[13px] font-black tracking-[0.02em] text-white/88 transition-colors hover:border-[#2DD4BF]/70 hover:text-white md:inline-flex"
        >
            CV
        </Link>
        <div className ="md:hidden">
        
        {/* MENU BUTTON*/}
        <button className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/14 bg-[#0B1117]/64 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_35px_rgba(0,0,0,0.18)]" aria-label="Toggle navigation menu"
         onClick ={() => setOpen ((prev) => !prev)}>

             <motion.div 
             variants={topVariants}
             animate={open ? "opened" : "closed"}
             className ="h-0.5 w-5 rounded bg-white"
             ></motion.div>

             <motion.div  
             variants={centerVariants} 
             animate={open ? "opened" : "closed"}
             className ="h-0.5 w-5 rounded bg-white"
             ></motion.div>
             
             <motion.div 
             variants={bottomVariants} 
             animate={open ? "opened" : "closed"}
             className ="h-0.5 w-5 rounded bg-white"
             ></motion.div>
        
        </button> 
        
        {/* MENU LIST*/}
        {open && (
        <motion.div 
        variants={listVariants}
         initial="closed" 
         animate="opened"
        className ="absolute left-4 right-4 top-20 z-40 rounded-3xl border border-[#2DD4BF]/20 bg-[#071A1F] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_70px_rgba(0,0,0,0.42)]">

            {links.map((link) => {
                const isActiveMobileLink = activeSection === link.section

                return (
                <motion.div variants={listItemVariants} className="" key={link.title}>
                <Link
                    href={link.url}
                    className={`flex items-center justify-between rounded-full px-5 py-4 text-lg font-bold transition-all duration-300 ${
                        isActiveMobileLink
                            ? "bg-[#2DD4BF] text-[#071A1F] shadow-[0_10px_30px_rgba(45,212,191,0.18)]"
                            : "bg-white/[0.035] text-white/82 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={(event) => handleNavigation(event, link)}
                >
                    {link.title}
                    <span className={`text-sm ${isActiveMobileLink ? "text-[#071A1F]" : "text-[#2DD4BF]"}`}>-&gt;</span>
                </Link>
                </motion.div>
                )
            })}
            </motion.div> 
            )}     
        </div>
        </div>
        </div>
        </header>
    );
};

export default Navbar
