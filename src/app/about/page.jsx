"use client"

import { motion } from "framer-motion"
import {
    LuBrainCircuit,
    LuCloud,
    LuCode,
    LuHeadphones,
    LuPanelsTopLeft,
    LuWorkflow,
} from "react-icons/lu"
import TechnicalArsenal from "@/components/technicalArsenal"

const experiences = [
    {
        role: "Technical Support Trainee Associate",
        programme: "K-Youth Programme",
        period: "April 2026 - Present",
        company: "The Access Group",
        icon: LuHeadphones,
        current: true,
        summary: "Supporting Australian customers while learning how strong communication, accurate case handling, and coordinated follow-up keep software services dependable.",
        highlights: [
            <>Assist <strong>Australian customers</strong> through inbound calls and voicemail callback services with professional, timely communication.</>,
            <>Create and manage customer support cases in <strong>Intercom and Salesforce</strong>, maintaining accurate documentation of reported issues.</>,
            <>Gather and verify customer information to support <strong>clear case logging and accurate assignment</strong> to the appropriate support teams.</>,
            <>Collaborate with internal teams by routing and tracking cases to support <strong>timely follow-up and resolution</strong> of customer inquiries.</>,
        ],
        focus: ["Customer Support", "Intercom", "Salesforce", "Case Management"],
    },
    {
        role: "Analyst Programmer Intern",
        programme: "",
        period: "March 2025 - July 2025",
        company: "Al-Madinah International University",
        icon: LuCode,
        current: false,
        summary: "Contributed to a real university system, translating stakeholder needs into responsive features and improving the reliability of an Agent Portal used for registration workflows.",
        highlights: [
            <>Developed and maintained an <strong>Agent Portal system</strong> supporting student registration and international recruitment processes.</>,
            <>Designed and implemented <strong>responsive user interface components</strong> to improve system usability and user experience.</>,
            <>Collaborated with stakeholders and team members to <strong>gather requirements, develop features, and validate functionality</strong>.</>,
            <>Conducted <strong>system testing, debugging, and issue resolution</strong> to improve reliability and performance before deployment.</>,
        ],
        focus: ["Angular", "Responsive UI", "Git", "Testing & Debugging"],
    },
]

const biographyInterests = [
    { label: "Software", detail: "Build", icon: LuPanelsTopLeft, color: "#e11d48" },
    { label: "App Support", detail: "Understand", icon: LuHeadphones, color: "#2dd4bf" },
    { label: "Cloud", detail: "Scale", icon: LuCloud, color: "#0284c7" },
    { label: "DevOps", detail: "Deliver", icon: LuWorkflow, color: "#f59e0b" },
    { label: "AI & ML", detail: "Explore", icon: LuBrainCircuit, color: "#7c3aed" },
]

const careerPathNodes = [
    { label: "Internship", sub: "Build", color: "bg-cyan-300", glow: "rgba(103,232,249,0.14)" },
    { label: "Current role", sub: "Support", color: "bg-emerald-300", glow: "rgba(110,231,183,0.14)" },
    { label: "What's next", sub: "Grow", color: "bg-violet-300", glow: "rgba(196,181,253,0.14)" },
]

const biographyCards = [
    {
        title: "What I build",
        text: "Useful web and mobile experiences that turn requirements into clear, practical interfaces.",
        tags: ["UI", "Web apps", "Mobile"],
    },
    {
        title: "How I think",
        text: "I like understanding the user problem first, then testing, improving, and keeping the solution reliable.",
        tags: ["Problem solving", "Testing", "Support"],
    },
    {
        title: "Where I am growing",
        text: "I am focused on software engineering, application support, cloud engineering, DevOps, and exploring AI/ML.",
        tags: ["Cloud", "DevOps", "AI / ML"],
    },
]

const BiographyInterestFlow = () => (
    <div className="relative overflow-hidden border-y border-white/10 py-6">
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-rose-300">Direction of growth</p>
                <h2 className="mt-2 text-xl font-black">One mindset, connected disciplines.</h2>
            </div>
            <p className="text-sm font-semibold text-white/45">Build. Support. Scale. Explore.</p>
        </div>

        <div className="relative">
            <div className="absolute left-[10%] right-[10%] top-6 hidden h-px overflow-hidden bg-white/10 md:block" aria-hidden="true">
                <motion.span
                    className="block h-full origin-left bg-gradient-to-r from-teal-300 via-sky-400 to-rose-300"
                    animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.72, 1] }}
                />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-5">
                {biographyInterests.map((item, index) => {
                    const InterestIcon = item.icon

                    return (
                        <motion.div
                            className="group relative flex min-w-0 flex-col items-center text-center"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.45, delay: index * 0.08 }}
                            whileHover={{ y: -5 }}
                            key={item.label}
                        >
                            <motion.span
                                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-[#071A1F] shadow-[0_18px_42px_rgba(0,0,0,0.2)]"
                                animate={{ boxShadow: [`0 0 0 0 ${item.color}00`, `0 0 0 7px ${item.color}18`, `0 0 0 0 ${item.color}00`] }}
                                transition={{ duration: 2.8, delay: index * 0.35, repeat: Infinity, ease: "easeOut" }}
                                style={{ color: item.color }}
                            >
                                <InterestIcon className="h-5 w-5" aria-hidden="true" />
                            </motion.span>
                            <span className="mt-3 block text-sm font-black">{item.label}</span>
                            <span className="mt-1 block font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/35">{item.detail}</span>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    </div>
)

const AboutPage = ({ embedded = false }) => {
    return (
    
    <motion.div className={embedded ? "h-auto" : "min-h-full"}
    initial={{ opacity: 0, y: 18 }} 
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    >
     
        { /*CONTAINER*/ }
        <div className={embedded ? "relative overflow-visible" : "relative"}>
            { /*TEXT CONTAINER*/ }
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 p-4 sm:p-8 md:gap-16 md:p-10 lg:p-14 2xl:px-14 2xl:py-20">
                
                { /* BIOGRAPHY CONTAINER */ }
                <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#0B1117]/72 p-5 text-white shadow-[0_30px_100px_rgba(0,0,0,0.22)] ring-1 ring-white/5 md:p-8">
                    <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:54px_54px]" />
                    <div className="absolute right-6 top-4 text-8xl font-black leading-none text-white/[0.05] md:text-9xl">
                        01
                    </div>
                    <div className="relative flex flex-col gap-8">
                        <div>
                            <p className="font-semibold uppercase tracking-[0.35em] text-rose-300">Biography</p>
                            <h1 className="mt-4 max-w-3xl font-serif text-[2rem] leading-tight md:text-5xl">
                                I turn curiosity into software that makes everyday problems easier to solve.
                            </h1>
                        </div>

                        <div className="h-px w-full bg-white/10" />

                        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
                            <motion.div
                                className="rounded-lg border border-white/10 bg-white/[0.045] p-5 md:p-6"
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                            >
                                <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">Who I am</p>
                                <p className="mt-4 font-serif text-xl leading-8 text-white md:text-2xl md:leading-9">
                                    I like starting with the messy part of a problem: what users need, what the system is doing, and where the experience can become clearer.
                                </p>
                                <p className="mt-5 text-base leading-8 text-white/62">
                                    Software engineering interests me because it turns unclear ideas into working products. I enjoy the space where development, support, cloud, and practical user needs meet, because that is where software has to be reliable, understandable, and useful.
                                </p>
                            </motion.div>

                            <div className="grid gap-3">
                                {biographyCards.map((card, index) => (
                                    <motion.article
                                        className="group rounded-lg border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-300/[0.045]"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.45 }}
                                        transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
                                        key={card.title}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-xs font-black text-[#071A1F]">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <h3 className="text-base font-black text-white">{card.title}</h3>
                                                <p className="mt-2 text-sm leading-7 text-white/58">{card.text}</p>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {card.tags.map((tag) => (
                                                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/45 group-hover:text-cyan-100" key={tag}>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>

                        <BiographyInterestFlow />

                        <blockquote className="border-l-4 border-rose-300 pl-5 font-serif text-2xl italic leading-9 text-white/88">
                            Change is the end result of all true learning.
                            <span className="block pt-2 text-base not-italic text-white/45">- Leo Buscaglia</span>
                        </blockquote>
                    </div>
                </div>

                <TechnicalArsenal />
                
                { /* EXPERIENCE CONTAINER */ }
                <section id="experience" className="relative scroll-mt-[90px] py-4 text-white md:py-8">
                    <div className="grid gap-7 border-b border-white/12 pb-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                        <div>
                            <p className="font-mono text-xs font-black uppercase tracking-[0.35em] text-cyan-300">Career / Experience</p>
                            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-6xl">
                                Career log, <span className="italic">written through real work.</span>
                            </h2>
                        </div>
                        <p className="max-w-2xl text-base leading-7 text-white/62 md:text-lg md:leading-8">
                            My experience connects application development, user support, case handling, testing, and collaboration in real working environments.
                        </p>
                    </div>

                    <div className="relative mt-8 overflow-hidden rounded-lg border border-white/12 bg-[#061418]/88 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
                        <div className="pointer-events-none absolute -right-12 top-10 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-violet-400/10 blur-3xl" />

                        <div className="relative">
                            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/35 px-4 py-3 md:px-5">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                </div>
                                <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-white/35">aidil@career-log:~</p>
                            </div>

                            <div className="grid gap-4 p-4 md:p-5">
                                <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4 font-mono text-xs font-bold text-white/42">
                                    <span className="text-rose-300">$</span>
                                    <span>cat experience.log</span>
                                    <motion.span
                                        className="h-4 w-2 bg-cyan-200"
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        aria-hidden="true"
                                    />
                                </div>

                                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20 p-4 md:p-5">
                                    <div className="absolute left-[12%] right-[12%] top-[34px] hidden h-[2px] rounded-full bg-white/12 md:block" aria-hidden="true">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300/45 via-emerald-300/45 to-violet-300/45" />
                                        <motion.span
                                            className="absolute -top-[5px] left-0 h-3 w-3 rounded-full bg-white shadow-[0_0_20px_rgba(103,232,249,0.9)]"
                                            animate={{ left: ["0%", "50%", "100%"], opacity: [0, 1, 0.85, 1, 0] }}
                                            transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.12, 0.5, 0.86, 1] }}
                                        />
                                    </div>

                                    <div className="absolute bottom-[18%] left-[22px] top-[22px] w-[2px] rounded-full bg-gradient-to-b from-cyan-300/45 via-emerald-300/45 to-violet-300/45 md:hidden" aria-hidden="true">
                                        <motion.span
                                            className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-white shadow-[0_0_20px_rgba(103,232,249,0.9)]"
                                            animate={{ top: ["0%", "50%", "100%"], opacity: [0, 1, 0.85, 1, 0] }}
                                            transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.12, 0.5, 0.86, 1] }}
                                        />
                                    </div>

                                    <div className="relative grid gap-4 md:grid-cols-3">
                                        {careerPathNodes.map((node, nodeIndex) => (
                                            <motion.div
                                                className="relative flex items-center gap-3 rounded-md border border-white/10 bg-[#071A1F]/90 p-3 md:flex-col md:items-start"
                                                initial={{ opacity: 0, y: 12 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, amount: 0.6 }}
                                                transition={{ delay: nodeIndex * 0.1, duration: 0.35 }}
                                                key={node.label}
                                            >
                                                <motion.span
                                                    className={`relative z-10 h-3 w-3 shrink-0 rounded-full ${node.color}`}
                                                    animate={{ boxShadow: ["0 0 0 0 rgba(255,255,255,0)", `0 0 0 6px ${node.glow}`, "0 0 0 0 rgba(255,255,255,0)"] }}
                                                    transition={{ duration: 3.2, delay: nodeIndex * 0.55, repeat: Infinity, ease: "easeInOut" }}
                                                    aria-hidden="true"
                                                />
                                                <div>
                                                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/38">node_0{nodeIndex + 1}</p>
                                                    <p className="mt-1 text-sm font-black text-white">{node.label}</p>
                                                    {node.sub ? (
                                                        <p className="mt-1 text-xs font-semibold text-white/45">{node.sub}</p>
                                                    ) : null}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {experiences.map((item, index) => {
                                    const ExperienceIcon = item.icon
                                    const isCurrent = item.current

                                    return (
                                        <motion.article
                                            className={`group relative overflow-hidden rounded-lg border p-4 text-white transition-all duration-500 md:p-5 ${
                                                isCurrent
                                                    ? "border-emerald-300/24 bg-emerald-300/[0.06] shadow-[0_24px_80px_rgba(16,185,129,0.08)]"
                                                    : "border-cyan-300/20 bg-cyan-300/[0.045] shadow-[0_24px_80px_rgba(34,211,238,0.06)]"
                                            }`}
                                            initial={{ opacity: 0, x: -24 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.25 }}
                                            transition={{ delay: index * 0.12, duration: 0.58, ease: "easeOut" }}
                                            whileHover={{ y: -5 }}
                                            key={item.role}
                                        >
                                            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:42px_42px]" />
                                            <div className="relative">
                                                <div className="flex flex-col gap-4 border-b border-white/10 pb-4 md:flex-row md:items-start md:justify-between">
                                                    <div className="flex items-start gap-3">
                                                        <motion.span
                                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ring-1 ring-white/10 ${isCurrent ? "bg-emerald-300 text-[#071A1F]" : "bg-cyan-300 text-[#071A1F]"}`}
                                                            whileHover={{ rotate: -6, scale: 1.06 }}
                                                        >
                                                            <ExperienceIcon className="h-4 w-4" aria-hidden="true" />
                                                        </motion.span>
                                                        <div>
                                                            <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-white/38">
                                                                {isCurrent ? "status: active role" : "status: completed internship"}
                                                            </p>
                                                            <h3 className="mt-2 text-lg font-black leading-tight md:text-2xl">{item.role}</h3>
                                                            <p className={`mt-2 text-base font-bold ${isCurrent ? "text-emerald-200" : "text-cyan-200"}`}>{item.company}</p>
                                                            {item.programme ? (
                                                                <p className="mt-1 text-sm text-white/42">{item.programme}</p>
                                                            ) : null}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                                                        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white/48">{item.period}</p>
                                                        {isCurrent ? (
                                                            <span className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-emerald-200">
                                                                <motion.span
                                                                    className="h-2 w-2 rounded-full bg-emerald-300"
                                                                    animate={{ opacity: [1, 0.35, 1], scale: [1, 1.35, 1] }}
                                                                    transition={{ duration: 2, repeat: Infinity }}
                                                                />
                                                                Current role
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                <p className="mt-4 max-w-4xl text-sm leading-7 text-white/60">{item.summary}</p>

                                                <ul className="mt-5 grid gap-2.5">
                                                    {item.highlights.map((highlight, highlightIndex) => (
                                                        <motion.li
                                                            className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-7 text-white/70 [&_strong]:font-black [&_strong]:text-white"
                                                            initial={{ opacity: 0, x: 14 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true, amount: 0.7 }}
                                                            transition={{ delay: 0.12 + highlightIndex * 0.05, duration: 0.35 }}
                                                            key={`${item.role}-${highlightIndex}`}
                                                        >
                                                            <span className={`mt-1 font-mono text-xs font-black ${isCurrent ? "text-emerald-200" : "text-cyan-200"}`}>&gt;</span>
                                                            <span>{highlight}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>

                                                <div className="mt-5 flex flex-wrap gap-2">
                                                    {item.focus.map((focus, focusIndex) => (
                                                        <motion.span
                                                            className={`rounded-full border bg-white/7 px-3 py-1.5 font-mono text-[11px] font-bold ${
                                                                isCurrent
                                                                    ? "border-emerald-300/35 text-emerald-100"
                                                                    : focusIndex % 2 === 0
                                                                    ? "border-rose-300/45 text-rose-200"
                                                                    : "border-cyan-300/45 text-cyan-200"
                                                            }`}
                                                            whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.14)" }}
                                                            key={focus}
                                                        >
                                                            {focus}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.article>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </div>       
        
  


    </motion.div>
    
    )
}

export default AboutPage
