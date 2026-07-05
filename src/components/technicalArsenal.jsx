"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FaAws } from "react-icons/fa"
import {
    LuDatabase,
    LuPalette,
    LuPanelsTopLeft,
    LuServerCog,
    LuSmartphone,
} from "react-icons/lu"
import {
    SiAngular,
    SiCanva,
    SiDart,
    SiFigma,
    SiFirebase,
    SiFlutter,
    SiFramer,
    SiGit,
    SiJavascript,
    SiKotlin,
    SiMysql,
    SiOpenapiinitiative,
    SiOpenjdk,
    SiPhp,
    SiReact,
    SiSharp,
    SiSqlite,
    SiTailwindcss,
    SiTypescript,
    SiUnity,
} from "react-icons/si"

const skills = [
    { name: "Java", icon: SiOpenjdk, color: "#e11d48", note: "Object-oriented programming and backend fundamentals." },
    { name: "Dart", icon: SiDart, color: "#38bdf8", note: "Flutter app logic and smooth mobile interfaces." },
    { name: "C#", icon: SiSharp, color: "#a855f7", note: "Strong typed programming and Unity workflows." },
    { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", note: "Interactive frontend behavior and web app logic." },
    { name: "TypeScript", icon: SiTypescript, color: "#3178c6", note: "Safer React components and scalable code." },
    { name: "PHP", icon: SiPhp, color: "#777bb4", note: "Server-side web development and form handling." },
    { name: "Angular", icon: SiAngular, color: "#dd0031", note: "Structured frontend applications and components." },
    { name: "React", icon: SiReact, color: "#61dafb", note: "Component-based interfaces and portfolio UI." },
    { name: "Flutter", icon: SiFlutter, color: "#54c5f8", note: "Cross-platform mobile application development." },
    { name: "Kotlin", icon: SiKotlin, color: "#a97bff", note: "Android development and modern mobile patterns." },
    { name: "Firebase", icon: SiFirebase, color: "#ffca28", note: "Authentication, realtime data, and app backends." },
    { name: "AWS", icon: FaAws, color: "#ff9900", note: "Cloud hosting, deployment, and platform basics." },
    { name: "SQLite", icon: SiSqlite, color: "#44a2d2", note: "Lightweight local storage for apps." },
    { name: "Unity", icon: SiUnity, color: "#ffffff", note: "AR experiments, scenes, and interactive prototypes." },
    { name: "RESTful APIs", icon: SiOpenapiinitiative, color: "#6ba539", note: "Connecting frontend, backend, and data services." },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8", note: "Responsive interfaces with a consistent visual system." },
    { name: "Git", icon: SiGit, color: "#f05032", note: "Version control, feature branches, and team collaboration." },
    { name: "Framer Motion", icon: SiFramer, color: "#d946ef", note: "Smooth interface transitions and interaction animation." },
    { name: "MySQL", icon: SiMysql, color: "#4479a1", note: "Relational data modelling, queries, and backend storage." },
    { name: "Figma", icon: SiFigma, color: "#f24e1e", note: "Interface design, prototyping, and collaborative design systems." },
    { name: "Canva", icon: SiCanva, color: "#00c4cc", note: "Visual communication, presentation, and social media design." },
]

const skillGroups = [
    {
        title: "Frontend / Creative Development",
        shortTitle: "Frontend",
        icon: LuPanelsTopLeft,
        summary: "Building responsive interfaces, reusable components, and clear digital experiences.",
        items: ["JavaScript", "TypeScript", "React", "Angular", "Tailwind CSS", "Framer Motion"],
    },
    {
        title: "Backend / Core Logic",
        shortTitle: "Backend",
        icon: LuServerCog,
        summary: "Writing typed application logic and connecting interfaces to dependable services.",
        items: ["Java", "C#", "PHP", "RESTful APIs"],
    },
    {
        title: "Databases & Cloud",
        shortTitle: "Data",
        icon: LuDatabase,
        summary: "Structuring data, cloud-backed features, authentication, and application storage.",
        items: ["MySQL", "Firebase", "SQLite", "AWS"],
    },
    {
        title: "Mobile, AR & Tools",
        shortTitle: "Mobile",
        icon: LuSmartphone,
        summary: "Creating cross-platform apps, AR prototypes, and collaborative development workflows.",
        items: ["Flutter", "Dart", "Kotlin", "Unity", "Git"],
    },
    {
        title: "Design & UI/UX",
        shortTitle: "Design",
        icon: LuPalette,
        summary: "Planning intuitive interfaces, prototyping user flows, and creating polished visual communication.",
        items: ["Figma", "Canva"],
    },
]

const TechnicalArsenal = ({ className = "" }) => {
    const [activeSkillGroup, setActiveSkillGroup] = useState(0)
    const [skillPopupOpen, setSkillPopupOpen] = useState(false)
    const selectedSkillGroup = skillGroups[activeSkillGroup]
    const selectedSkills = selectedSkillGroup.items
        .map((skillName) => skills.find((item) => item.name === skillName))
        .filter(Boolean)

    return (
        <section id="skills" className={`relative scroll-mt-[90px] overflow-visible rounded-lg bg-black p-5 text-white shadow-xl md:p-8 lg:overflow-hidden ${className}`}>
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="relative">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.34em] text-rose-300">Skills / Technical Arsenal</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight md:text-6xl">Technical Arsenal</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/62 md:text-lg md:leading-8">
                    The languages, frameworks, platforms, and tools behind the projects below.
                </p>

                <div className="mt-10 grid gap-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-stretch">
                    <div className="grid gap-3">
                        {skillGroups.map((group, index) => {
                            const isActive = activeSkillGroup === index
                            const CategoryIcon = group.icon

                            return (
                                <motion.button
                                    type="button"
                                    className={`group grid min-h-[116px] w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg px-4 py-4 text-left transition-colors duration-300 md:px-5 ${
                                        isActive
                                            ? "bg-cyan-300/12 text-white shadow-[0_20px_55px_rgba(34,211,238,0.1)] ring-1 ring-cyan-300/35"
                                            : "bg-white/[0.04] text-white ring-1 ring-white/10 hover:bg-white/[0.08]"
                                    }`}
                                    onMouseEnter={() => setActiveSkillGroup(index)}
                                    onFocus={() => setActiveSkillGroup(index)}
                                    onClick={() => {
                                        setActiveSkillGroup(index)
                                        setSkillPopupOpen(true)
                                    }}
                                    whileHover={{ x: 3 }}
                                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                                    aria-pressed={isActive}
                                    key={group.title}
                                >
                                    <span className={`flex h-11 w-11 items-center justify-center rounded-md font-mono text-xs font-black ${isActive ? "bg-cyan-300 text-[#071A1F]" : "bg-white/10 text-cyan-100 ring-1 ring-white/10"}`}>
                                        <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block text-base font-black md:text-lg">{group.title}</span>
                                        <span className={`mt-1.5 block min-h-[48px] text-sm leading-6 transition-opacity duration-200 ${isActive ? "text-white/58 opacity-100" : "text-white/35 opacity-60"}`}>
                                            {group.summary}
                                        </span>
                                    </span>
                                    <span className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition-transform duration-300 ${isActive ? "translate-x-1 bg-cyan-300 text-[#071A1F]" : "bg-white/10 text-white group-hover:translate-x-1"}`}>
                                        -&gt;
                                    </span>
                                </motion.button>
                            )
                        })}
                    </div>

                    <div className="relative hidden min-h-[410px] overflow-hidden rounded-lg bg-white/[0.055] p-5 ring-1 ring-white/10 md:p-7 lg:block">
                        <div className="absolute right-5 top-4 font-mono text-6xl font-black text-white/[0.035]">
                            0{activeSkillGroup + 1}
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                className="relative flex h-full flex-col"
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.28, ease: "easeOut" }}
                                key={selectedSkillGroup.title}
                            >
                                <div>
                                    <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-rose-300">Active category</p>
                                    <h3 className="mt-3 text-2xl font-black">{selectedSkillGroup.shortTitle}</h3>
                                </div>

                                <div className="mt-7 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
                                    {selectedSkillGroup.items.map((skillName, index) => {
                                        const skill = skills.find((item) => item.name === skillName)
                                        const SkillIcon = skill?.icon

                                        return (
                                            <motion.div
                                                className="group/skill flex min-h-[122px] flex-col items-center justify-center rounded-lg bg-black/35 p-3 text-center ring-1 ring-white/10 transition-colors hover:bg-white hover:text-black"
                                                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{ delay: index * 0.055, duration: 0.3 }}
                                                whileHover={{ y: -5 }}
                                                key={skillName}
                                            >
                                                <span className="flex h-14 w-14 items-center justify-center rounded-md bg-white/[0.055] shadow-lg ring-1 ring-white/10 transition-transform duration-300 group-hover/skill:scale-110 group-hover/skill:bg-black">
                                                    {SkillIcon ? (
                                                        <SkillIcon
                                                            className="h-8 w-8"
                                                            style={{ color: skill.color }}
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <span className="font-mono text-sm font-black">{skillName.slice(0, 2)}</span>
                                                    )}
                                                </span>
                                                <span className="mt-3 text-sm font-bold">{skillName}</span>
                                                <span className="mt-1 line-clamp-2 text-xs leading-5 text-white/45 group-hover/skill:text-black/55">
                                                    {skill?.note}
                                                </span>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {skillPopupOpen ? (
                    <motion.div
                        className="fixed inset-0 z-[90] flex items-end bg-black/70 px-4 pb-4 pt-20 backdrop-blur-md lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedSkillGroup.title} skills`}
                        onClick={() => setSkillPopupOpen(false)}
                    >
                        <motion.div
                            className="max-h-[82vh] w-full overflow-y-auto rounded-2xl border border-white/12 bg-[#071A1F] p-5 text-white shadow-[0_28px_90px_rgba(0,0,0,0.45)]"
                            initial={{ opacity: 0, y: 34, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                                <div>
                                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">Active category</p>
                                    <h3 className="mt-2 text-2xl font-black">{selectedSkillGroup.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-white/55">{selectedSkillGroup.summary}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSkillPopupOpen(false)}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg font-black text-black"
                                    aria-label="Close skills popup"
                                >
                                    x
                                </button>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                                {selectedSkills.map((skill, index) => {
                                    const SkillIcon = skill.icon

                                    return (
                                        <motion.div
                                            className="flex min-h-[116px] flex-col items-center justify-center rounded-lg bg-black/35 p-3 text-center ring-1 ring-white/10"
                                            initial={{ opacity: 0, y: 12, scale: 0.94 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ delay: index * 0.04, duration: 0.22 }}
                                            key={skill.name}
                                        >
                                            <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white/[0.055] ring-1 ring-white/10">
                                                <SkillIcon className="h-7 w-7" style={{ color: skill.color }} aria-hidden="true" />
                                            </span>
                                            <span className="mt-3 text-sm font-bold">{skill.name}</span>
                                            <span className="mt-1 line-clamp-2 text-xs leading-5 text-white/45">{skill.note}</span>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </section>
    )
}

export default TechnicalArsenal
