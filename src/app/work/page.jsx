"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { LuArrowUpRight, LuCode, LuGithub, LuSmartphone, LuTerminal } from "react-icons/lu"

const projects = [
    {
        title: "Agent Client Portal",
        type: "Agent management portal",
        status: "Internship project",
        description:
            "An Angular portal built during internship to help university agents search applicants, review profile details, compare programme fees, export reports, and work across English and Arabic layouts.",
        stack: ["Angular", "TypeScript", "Angular Material", "GitHub"],
        cover: "/work/agent-applicants-english.png",
        alt: "Agent Client Portal applicant management dashboard",
        number: "01",
        context: "Internship / MEDIU",
        visualLabel: "Bilingual agent workflow",
        highlights: ["English and Arabic UI", "PDF and Excel exports", "Team pull-request workflow"],
        visualStats: [{ value: "04", label: "Core modules" }, { value: "02", label: "Languages" }],
        categories: ["all", "web"],
    },
    {
        title: "MIITGuide",
        type: "Augmented reality navigation",
        status: "Final year project",
        description:
            "A Flutter and Unity final year project developed as an AR-based campus navigation prototype for UniKL MIIT, with mobile walkthroughs, indoor route design, Firebase-backed content, and admin-managed campus information.",
        stack: ["Flutter", "Unity", "C#", "AR", "Firebase"],
        cover: "/work/miitguide/unity-ar-design.png",
        alt: "MIITGuide Unity augmented reality indoor navigation environment",
        number: "02",
        context: "Final Year Project / UniKL MIIT",
        visualLabel: "Unity navigation environment",
        highlights: ["AR indoor wayfinding", "User and admin journeys", "Firebase-backed content"],
        visualStats: [{ value: "03", label: "Core flows" }, { value: "02", label: "User roles" }],
        categories: ["all", "mobile"],
    },
    {
        title: "RepoChat",
        type: "AI codebase Q&A tool",
        status: "Personal project",
        description:
            "A RAG-based tool that indexes any public GitHub repo and answers natural-language questions about the actual code, citing the exact files and lines it used instead of guessing.",
        stack: ["React", "TypeScript", "Node.js", "Gemini API", "SQLite"],
        cover: "",
        alt: "RepoChat AI codebase question answering tool",
        number: "03",
        context: "Personal Project / Open Source",
        visualLabel: "Codebase Q&A via RAG",
        highlights: ["GitHub repo ingestion", "Cited, grounded answers", "Gemini-powered RAG pipeline"],
        visualStats: [{ value: "3", label: "Pipeline stages" }, { value: "1", label: "Click to index" }],
        categories: ["all", "web"],
    },
]

const projectFilters = [
    { label: "All", value: "all" },
    { label: "Web App", value: "web" },
    { label: "Mobile / AR", value: "mobile" },
]

const caseStudyBlocks = [
    {
        label: "Problem",
        value:
            "Agents needed a faster way to search applicants, review profile details, understand program fees, and produce export-ready records.",
    },
    {
        label: "My Role",
        value:
            "I worked on Angular frontend features including data models, Material tables, dialogs, search flows, exports, bilingual UI behavior, and Git collaboration.",
    },
    {
        label: "Outcome",
        value:
            "The project became a clearer, table-driven portal experience with English and Arabic views, profile details, PDF/Excel exports, and a real team workflow.",
    },
]

const featuredProjectTools = [
    "Angular",
    "TypeScript",
    "Angular Material",
    "ngx-translate",
    "jsPDF",
    "XLSX",
    "GitHub",
    "VS Code",
]

const miitGuideTools = [
    "Flutter",
    "Unity",
    "C#",
    "Augmented Reality",
    "Firebase",
    "Cloud Firestore",
    "Mobile UX",
    "Rapid Application Development",
]

const miitGuideHighlights = [
    {
        value: "AR",
        label: "Indoor navigation",
        text: "Built around mobile camera guidance so users can understand directions inside the real campus environment.",
    },
    {
        value: "2",
        label: "User roles",
        text: "Student and visitor features are supported by an administrator workflow for managing campus content.",
    },
    {
        value: "RAD",
        label: "Methodology",
        text: "Rapid Application Development supported iterative prototyping, user feedback, and practical implementation.",
    },
]

const miitGuideContributions = [
    "Developed the mobile application prototype using Flutter with user-facing campus information and navigation flows.",
    "Designed the Level 18 indoor environment in Unity and used C# to support the AR navigation prototype logic.",
    "Connected Firebase and Cloud Firestore concepts for authentication, content storage, and admin-managed updates.",
    "Prepared the academic research poster, evaluation findings, system architecture, and project demonstration materials.",
]

const miitGuideMedia = {
    poster: {
        title: "Academic research poster",
        label: "Final year project",
        src: "/work/miitguide/academic-poster.png",
        alt: "MIITGuide final year project academic poster covering objectives, methodology, prototype, architecture, findings, and recommendations",
    },
    design: {
        title: "Unity AR environment",
        label: "Navigation design",
        src: "/work/miitguide/unity-ar-design.png",
        alt: "Unity editor showing the MIIT campus indoor navigation environment and AR navigation design",
    },
}

const storySections = [
    {
        eyebrow: "01 / Applicant Management",
        title: "A cleaner way to search and review student applications.",
        text:
            "The applicant table supports search, clear status badges, pagination, export actions, and bilingual layouts so agents can move through records without fighting the interface.",
        images: [
            {
                title: "English dashboard",
                label: "LTR interface",
                src: "/work/agent-applicants-english.png",
                alt: "Agent Applicants table in English with search, export buttons, status badges, and pagination",
            },
            {
                title: "Arabic dashboard",
                label: "RTL interface",
                src: "/work/agent-applicants-arabic.png",
                alt: "Agent Applicants table in Arabic with right-to-left layout, search, export buttons, status badges, and pagination",
            },
        ],
    },
    {
        eyebrow: "02 / Profile Flow",
        title: "From a table row to a focused applicant details view.",
        text:
            "Clicking an applicant opens a compact detail dialog with reference number, name, email, course, learning mode, and status. This makes the table feel less crowded while keeping details one click away.",
        images: [
            {
                title: "Applicant details dialog",
                label: "Focused profile view",
                src: "/work/agent-applicant-details-dialog.png",
                alt: "Applicant Details dialog showing reference number, name, email, course, learning mode, and verified status",
            },
        ],
    },
    {
        eyebrow: "03 / Program Fees",
        title: "Complex fee data shaped into a browsable table.",
        text:
            "The program fees feature uses tabbed categories, multi-level fee headers, search, pagination, and clear breakdowns for on-campus, online, international, local, full-time, and part-time values.",
        images: [
            {
                title: "Updated program fees table",
                label: "Programme fees",
                src: "/work/program-fees-new.png",
                alt: "New Program Fees table showing tabbed program categories, search, pagination, and fee breakdown columns",
            },
        ],
    },
    {
        eyebrow: "04 / Reporting and Collaboration",
        title: "Export-ready records for operational reporting.",
        text:
            "Applicant records can be exported to PDF and Excel so staff can reuse filtered data outside the portal for reporting, review, and documentation.",
        images: [
            {
                title: "Excel export",
                label: "Spreadsheet output",
                src: "/work/agent-applicants-excel-export.png",
                alt: "Excel export of the Agent Applicants table showing Arabic headers and applicant rows",
            },
            {
                title: "PDF export",
                label: "Report output",
                src: "/work/agent-applicants-pdf-export.png",
                alt: "PDF export of the Agent Applicants table with ref number, name, learning mode, and status columns",
            },
        ],
    },
]

const repoChatTools = [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "Gemini API",
    "SQLite",
    "Docker",
    "GitHub Actions",
]

const repoChatCaseStudyBlocks = [
    {
        label: "Problem",
        value:
            "Getting oriented in an unfamiliar codebase usually means grepping around for \"where is X handled?\" with no guarantee the answer reflects what the code actually does.",
    },
    {
        label: "My Approach",
        value:
            "I built a RAG (Retrieval-Augmented Generation) pipeline: pull a public repo's source via the GitHub API, split it into chunks, embed each chunk with Gemini, and store the vectors in SQLite for fast similarity search. Later split into independent ingest and query services as a step toward a proper microservices architecture.",
    },
    {
        label: "Outcome",
        value:
            "A working tool that indexes any public repo in seconds and answers questions with real file and line citations, verified end-to-end on open-source repos and my own MIITGuide codebase.",
    },
]

const repoChatHighlights = [
    {
        value: "01",
        label: "Ingest",
        text: "Fetches a repo's source files via the GitHub API and splits them into overlapping chunks.",
    },
    {
        value: "02",
        label: "Embed",
        text: "Each chunk is embedded with Gemini and stored in SQLite for fast retrieval.",
    },
    {
        value: "03",
        label: "Answer",
        text: "Questions are matched against stored chunks by similarity, then answered by Gemini using only the retrieved code.",
    },
]

const repoChatTranscript = {
    prompt: "index --repo github.com/Aidilkiy/miitguide",
    indexed: "Indexed 31 files (67 chunks).",
    question: "How does the AR navigation work?",
    answer:
        "The AR navigation works by combining QR code-based localization with NavMesh pathfinding. QrCodeRecenter continuously scans the camera feed for QR codes to recalibrate the XROrigin to a known position [1]. SetNavigationTarget then uses Unity's NavMesh.CalculatePath to compute a route to the chosen target and renders it with a LineRenderer [2].",
    sources: [
        "unity_ar/Assets/Scripts/QrCodeRecenter.cs:1-60",
        "unity_ar/Assets/Scripts/SetNavigationTarget.cs:1-60",
    ],
}

const repoChatEngineeringChallenge = [
    {
        value: "429",
        label: "Found",
        text: "Tested against a real 38MB public repo (1,000+ code chunks) and immediately hit Gemini's free-tier rate limit — the app crashed outright with no retry logic.",
    },
    {
        value: "2x",
        label: "Root cause",
        text: "Diagnosed two real bottlenecks: no backoff on rate-limited requests, and GitHub file downloads running one at a time instead of in parallel.",
    },
    {
        value: "150",
        label: "Fixed",
        text: "Added exponential backoff, parallelized downloads, and a hard chunk cap so oversized repos fail fast with a clear message instead of hanging for up to an hour.",
    },
]

const repoChatArchitectureEvolution = [
    {
        value: "2",
        label: "Split",
        text: "Broke the single Express app into independent ingest-service and query-service processes, each with its own Dockerfile and health check, as a step toward running this on Kubernetes.",
    },
    {
        value: "CDN",
        label: "Found",
        text: "Repeated stress-testing hit a long, unpredictable rate-limit cooldown on raw.githubusercontent.com's CDN. A plain curl request with zero concurrency still failed, confirming it wasn't a code bug.",
    },
    {
        value: "API",
        label: "Fixed",
        text: "Switched file fetching to GitHub's authenticated Contents API, sharing the same large, predictable rate limit as the rest of the app instead of a separate, unpredictable CDN throttle.",
    },
]

const FeaturePill = ({ children }) => (
    <span className="rounded-full bg-white/10 px-3 py-2 text-sm font-bold text-white/80 ring-1 ring-white/10">
        {children}
    </span>
)

const ProjectShowcase = ({ project, index, isSelected, onOpen }) => {
    const isAgentPortal = project.title === "Agent Client Portal"
    const isMiitGuide = project.title === "MIITGuide"
    const ProjectIcon = isAgentPortal ? LuCode : isMiitGuide ? LuSmartphone : LuTerminal
    const isFeatured = isAgentPortal
    const iconTone = isAgentPortal
        ? "bg-rose-300/10 text-rose-200"
        : isMiitGuide
            ? "bg-teal-300/10 text-teal-200"
            : "bg-violet-300/10 text-violet-200"

    return (
        <motion.article
            className={`group/project flex min-h-[360px] flex-col overflow-hidden rounded-lg border bg-white/[0.045] text-white shadow-[0_18px_45px_rgba(167,139,250,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(167,139,250,0.14)] ${
                isSelected ? "border-cyan-300/70 bg-cyan-300/[0.055]" : "border-white/10 hover:border-violet-300/55 hover:bg-violet-300/[0.045]"
            }`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
        >
            <button
                type="button"
                onClick={() => onOpen(project.title)}
                className="flex h-full flex-1 flex-col p-5 text-left md:p-6"
                aria-label={`Open ${project.title} case study`}
            >
                <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-lg ${iconTone}`}>
                        <ProjectIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {isFeatured ? (
                        <span className="rounded-full border border-amber-300/35 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.12)]">
                            Featured
                        </span>
                    ) : (
                        <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/35">
                            Case Study
                        </span>
                    )}
                </div>

                <h2 className="mt-5 text-xl font-semibold leading-tight text-white md:text-[1.18rem]">
                    {project.title}
                </h2>
                <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-200/70">
                    {project.context}
                </p>
                <p className="mt-4 flex-1 text-sm leading-7 text-white/58">
                    {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item, stackIndex) => (
                        <span
                            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] ${
                                stackIndex === 0
                                    ? "border-violet-300/60 bg-violet-300/10 text-violet-200"
                                    : stackIndex === 1
                                        ? "border-cyan-300/55 bg-cyan-300/10 text-cyan-200"
                                        : "border-white/10 bg-white/[0.035] text-white/48"
                            }`}
                            key={item}
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/38">
                        {isSelected ? "Opened" : "View project"}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white/55 transition-all duration-300 group-hover/project:border-cyan-300/50 group-hover/project:text-cyan-200">
                        <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                </div>
            </button>
        </motion.article>
    )
}

const ImageCard = ({ image, index, large = false, onOpen, tone = "light" }) => (
    <motion.figure
        className={`group overflow-hidden rounded-lg p-2 shadow-[0_24px_70px_rgba(15,23,42,0.22)] ring-1 ${
            tone === "dark"
                ? "bg-[#071A1F] text-white ring-white/12"
                : "bg-white text-black ring-white/60"
        }`}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
    >
        <button
            type="button"
            onClick={() => onOpen(image)}
            className={`relative block w-full overflow-hidden rounded-md text-left ring-1 ${
                tone === "dark" ? "bg-black ring-white/10" : "bg-slate-100 ring-black/10"
            } ${large ? "aspect-[16/8.5]" : "aspect-[16/9]"}`}
            aria-label={`View ${image.title} screenshot larger`}
        >
            <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={large ? "(min-width: 1024px) 48vw, 92vw" : "(min-width: 1024px) 24vw, 92vw"}
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
            />
            <span className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full bg-black/72 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-white opacity-0 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                View larger
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">+</span>
            </span>
        </button>
        <figcaption className="flex items-center justify-between gap-4 px-2 py-3">
            <span className="text-sm font-black">{image.title}</span>
            <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                tone === "dark" ? "bg-white/8 text-white/55" : "bg-black/5 text-black/60"
            }`}>{image.label}</span>
        </figcaption>
    </motion.figure>
)

const VideoShowcase = ({ title, label, description, src, poster, tone = "light" }) => (
    <motion.article
        className={`overflow-hidden rounded-lg border p-3 shadow-[0_24px_70px_rgba(15,23,42,0.12)] ${
            tone === "dark"
                ? "border-white/12 bg-[#061418]/88 text-white"
                : "border-white/70 bg-white/55 text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl"
        }`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
    >
        <div className="overflow-hidden rounded-md bg-black ring-1 ring-black/10">
            <video
                className="aspect-video w-full bg-black object-contain"
                controls
                playsInline
                preload="metadata"
                poster={poster}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support this project video.
            </video>
        </div>
        <div className="px-2 py-4">
            <div>
                <p className={`font-mono text-xs font-bold uppercase tracking-[0.24em] ${tone === "dark" ? "text-teal-200" : "text-rose-500"}`}>{label}</p>
                <h3 className="mt-2 text-xl font-black">{title}</h3>
                <p className={`mt-2 max-w-2xl leading-7 ${tone === "dark" ? "text-white/62" : "text-black/65"}`}>{description}</p>
            </div>
        </div>
    </motion.article>
)

const WorkPage = ({ embedded = false }) => {
    const [selectedProject, setSelectedProject] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [activeFilter, setActiveFilter] = useState("all")
    const detailRef = useRef(null)

    useEffect(() => {
        if (!previewImage) return

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setPreviewImage(null)
            }
        }

        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", closeOnEscape)

        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", closeOnEscape)
        }
    }, [previewImage])

    const openProject = (projectTitle) => {
        setSelectedProject(projectTitle)

        window.setTimeout(() => {
            detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 80)
    }

    const isAgentSelected = selectedProject === "Agent Client Portal"
    const isMiitGuideSelected = selectedProject === "MIITGuide"
    const isRepoChatSelected = selectedProject === "RepoChat"
    const filteredProjects = projects.filter((project) => project.categories.includes(activeFilter))

    return (
        <motion.div
            className={embedded ? "h-auto" : "h-full"}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="overflow-x-clip">
                <section className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-28 text-white sm:px-8 md:px-10 md:pb-20 md:pt-32 lg:px-14 2xl:px-14">
                    <div>
                        <div className="mb-10 grid gap-7 border-b border-white/12 pb-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                            <div>
                                <p className="font-mono text-xs font-black uppercase tracking-[0.35em] text-cyan-300">Project / Selected Work</p>
                                <h1 className="mt-4 font-serif text-3xl leading-tight md:text-6xl">
                                    Project log, <span className="italic">built from real problems.</span>
                                </h1>
                            </div>
                            <div>
                                <p className="max-w-2xl text-base leading-7 text-white/62 md:text-lg md:leading-8">
                                    A focused record of interfaces, workflows, and prototypes I built to solve practical problems across web, mobile, and augmented-reality experiences.
                                </p>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#061418]/88 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
                            <div className="relative">
                                <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/35 px-4 py-3 md:px-5">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                    </div>
                                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-white/35">aidil@project-log:~</p>
                                </div>

                                <div className="grid gap-5 p-4 md:p-5">
                                    <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4 font-mono text-xs font-bold text-white/42">
                                        <span className="text-rose-300">$</span>
                                        <span>open selected-work.json</span>
                                        <motion.span
                                            className="h-4 w-2 bg-cyan-200"
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div className="flex flex-wrap gap-2.5">
                                        {projectFilters.map((filter) => {
                                            const isActive = activeFilter === filter.value

                                            return (
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveFilter(filter.value)}
                                                    className={`h-10 rounded-full border px-4 font-mono text-xs font-bold transition-all duration-300 ${
                                                        isActive
                                                            ? "border-violet-300 bg-violet-300 text-[#0f0524]"
                                                            : "border-white/10 bg-white/[0.035] text-white/55 hover:border-violet-300/60 hover:text-white"
                                                    }`}
                                                    key={filter.value}
                                                >
                                                    {filter.label}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                        {filteredProjects.map((project, index) => (
                                            <ProjectShowcase
                                                project={project}
                                                index={index}
                                                isSelected={selectedProject === project.title}
                                                onOpen={openProject}
                                                key={project.title}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={detailRef} className="mx-auto mt-12 max-w-6xl scroll-mt-8 px-4 pb-12 sm:px-8 md:px-10 lg:px-14 2xl:px-14">
                    {isAgentSelected ? (
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            key="agent-client-portal-detail"
                        >
                            <section className="relative overflow-hidden rounded-lg bg-black px-5 py-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.25)] md:px-8 md:py-10">
                                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
                                <div className="relative grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
                                    <div>
                                        <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-rose-300">Internship Project / Project Opened</p>
                                        <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">Agent Client Portal</h2>
                                        <p className="mt-3 max-w-3xl text-xl font-bold text-white/90 md:text-2xl">
                                            A bilingual portal for student applicant and academic programme management
                                        </p>
                                        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">
                                            An Angular web application built during my internship to help agents review applicants, inspect profiles, compare programme fees, export reports, and work across English and Arabic interfaces.
                                        </p>
                                        <div className="mt-7 flex flex-wrap gap-2">
                                            {featuredProjectTools.map((tool) => (
                                                <FeaturePill key={tool}>{tool}</FeaturePill>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10">
                                            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/45">Project type</p>
                                            <p className="mt-2 text-xl font-black">Web application</p>
                                        </div>
                                        <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10">
                                            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/45">Organization</p>
                                            <p className="mt-2 text-xl font-black">MEDIU</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(null)}
                                            className="col-span-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
                                        >
                                            Close project
                                        </button>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-8">
                                <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
                                    <div className="lg:sticky lg:top-8">
                                        <div className="rounded-lg bg-black p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.2)]">
                                            <p className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-rose-300">Case Study</p>
                                            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">Agent Client Portal</h2>
                                            <p className="mt-3 font-mono text-sm font-bold uppercase tracking-[0.22em] text-white/40">
                                                Web application / Al-Madinah International University
                                            </p>
                                            <p className="mt-5 text-lg leading-8 text-white/72">
                                                A portal interface for agents to manage student applications, applicant profiles,
                                                academic program fees, bilingual views, exports, and team-based feature delivery.
                                            </p>

                                            <div className="mt-7 grid gap-3">
                                                {caseStudyBlocks.map((block) => (
                                                    <motion.div
                                                        className="rounded-lg bg-white/8 p-4 ring-1 ring-white/10"
                                                        initial={{ opacity: 0, x: -18 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true, amount: 0.4 }}
                                                        transition={{ duration: 0.45 }}
                                                        key={block.label}
                                                    >
                                                        <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-rose-300">{block.label}</p>
                                                        <p className="mt-2 leading-7 text-white/72">{block.value}</p>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <div className="mt-6 flex flex-wrap gap-2">
                                                {featuredProjectTools.map((tool) => (
                                                    <FeaturePill key={tool}>{tool}</FeaturePill>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-8">
                                        {storySections.map((section, sectionIndex) => (
                                            <motion.article
                                                className="rounded-lg border border-white/12 bg-[#061418]/88 p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-6"
                                                initial={{ opacity: 0, y: 34 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, amount: 0.18 }}
                                                transition={{ duration: 0.55, ease: "easeOut" }}
                                                key={section.title}
                                            >
                                                <div className="grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
                                                    <div>
                                                        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-rose-300">{section.eyebrow}</p>
                                                        <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">{section.title}</h3>
                                                        <p className="mt-4 leading-7 text-white/62">{section.text}</p>
                                                    </div>
                                                    <div className="grid gap-4 md:grid-cols-2">
                                                        {section.images.map((image, imageIndex) => (
                                                            <div className={section.images.length === 1 || (section.images.length > 2 && imageIndex > 1) ? "md:col-span-2" : ""} key={image.src}>
                                                                <ImageCard
                                                                    image={image}
                                                                    index={imageIndex + sectionIndex}
                                                                    large={section.images.length > 2 && imageIndex > 1}
                                                                    onOpen={setPreviewImage}
                                                                    tone="dark"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.article>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    ) : isMiitGuideSelected ? (
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            key="miitguide-detail"
                        >
                            <section className="relative overflow-hidden rounded-lg bg-black px-5 py-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.25)] md:px-8 md:py-10">
                                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
                                <div className="relative grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
                                    <div>
                                        <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-teal-200">Final Year Project / Project Opened</p>
                                        <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">MIITGuide</h2>
                                        <p className="mt-3 max-w-3xl text-xl font-bold text-white/90 md:text-2xl">
                                            Augmented Reality Navigation for the UniKL MIIT Campus
                                        </p>
                                        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">
                                            A mobile campus-navigation experience that combines Flutter, Unity, AR, and Firebase to help students and visitors locate buildings, facilities, classrooms, and points of interest.
                                        </p>
                                        <div className="mt-7 flex flex-wrap gap-2">
                                            {miitGuideTools.map((tool) => (
                                                <FeaturePill key={tool}>{tool}</FeaturePill>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10">
                                            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/45">Project type</p>
                                            <p className="mt-2 text-xl font-black">Mobile AR</p>
                                        </div>
                                        <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10">
                                            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/45">Institution</p>
                                            <p className="mt-2 text-xl font-black">UniKL MIIT</p>
                                        </div>
                                        <a
                                            href="https://github.com/Aidilkiy/miitguide"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="col-span-2 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
                                        >
                                            <LuGithub className="h-4 w-4" aria-hidden="true" />
                                            View on GitHub
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(null)}
                                            className="col-span-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
                                        >
                                            Close project
                                        </button>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-8 grid gap-4 md:grid-cols-3">
                                {miitGuideHighlights.map((item, index) => (
                                    <motion.article
                                        className="relative overflow-hidden rounded-lg border border-white/12 bg-[#061418]/88 p-5 text-white shadow-[0_20px_55px_rgba(0,0,0,0.18)]"
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.35 }}
                                        transition={{ delay: index * 0.08, duration: 0.45 }}
                                        key={item.label}
                                    >
                                        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:40px_40px]" />
                                        <div className="relative">
                                            <p className="font-serif text-4xl text-cyan-200">{item.value}</p>
                                            <h3 className="mt-2 text-lg font-black">{item.label}</h3>
                                            <p className="mt-3 leading-7 text-white/62">{item.text}</p>
                                        </div>
                                    </motion.article>
                                ))}
                            </section>

                            <section className="mt-8 grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
                                <div className="lg:sticky lg:top-8">
                                    <div className="rounded-lg bg-black p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.2)]">
                                        <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-teal-200">The challenge</p>
                                        <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">Campus navigation should feel immediate.</h2>
                                        <p className="mt-5 leading-8 text-white/70">
                                            Students and visitors can lose time locating specific buildings, facilities, and classrooms. Traditional maps may be outdated or difficult to relate to the user&apos;s physical surroundings.
                                        </p>
                                        <div className="mt-6 border-t border-white/10 pt-6">
                                            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-teal-200">My solution</p>
                                            <p className="mt-3 leading-8 text-white/70">
                                                MIITGuide combines a campus information application with real-time AR guidance, directory access, facility information, academic content, news, events, and administrator-managed updates.
                                            </p>
                                        </div>
                                        <div className="mt-6 border-t border-white/10 pt-6">
                                            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-teal-200">My contribution</p>
                                            <ul className="mt-4 grid gap-3">
                                                {miitGuideContributions.map((item) => (
                                                    <li className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-7 text-white/70" key={item}>
                                                        <span className="font-mono text-cyan-200">&gt;</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-6">
                                    <VideoShowcase
                                        title="Application walkthrough"
                                        label="01 / Application video"
                                        description="A guided demonstration of the MIITGuide mobile application, its campus information features, navigation flow, and user experience."
                                        src="/work/miitguide/application-demo.mp4"
                                        poster="/work/miitguide/unity-ar-design.png"
                                        tone="dark"
                                    />
                                    <VideoShowcase
                                        title="Level 18 floor design in Unity"
                                        label="02 / Unity and C# environment"
                                        description="A development view of the Level 18 building floor created in Unity, showing the indoor environment used for route planning and augmented-reality navigation logic with C#."
                                        src="/work/miitguide/unity-level-18-design.silent.mp4"
                                        poster="/work/miitguide/unity-ar-design.png"
                                        tone="dark"
                                    />
                                </div>
                            </section>

                            <section className="mt-8 grid gap-6 lg:grid-cols-[0.7fr_0.3fr] lg:items-start">
                                <motion.article
                                    className="relative overflow-hidden rounded-lg border border-white/12 bg-[#061418]/88 p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.2)] md:p-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                >
                                    <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:44px_44px]" />
                                    <div className="relative">
                                    <div className="mb-5">
                                        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-teal-200">03 / Research overview</p>
                                        <h3 className="mt-3 text-2xl font-black md:text-3xl">The complete academic poster.</h3>
                                        <p className="mt-3 max-w-3xl leading-7 text-white/62">
                                            The poster documents the problem, objectives, RAD methodology, literature review, prototype, architecture, evaluation findings, and recommendations.
                                        </p>
                                    </div>
                                    <ImageCard image={miitGuideMedia.poster} index={0} large onOpen={setPreviewImage} tone="dark" />
                                    </div>
                                </motion.article>

                                <motion.article
                                    className="rounded-lg border border-white/12 bg-black/70 p-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.2)]"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                >
                                    <p className="px-2 pt-2 font-mono text-xs font-bold uppercase tracking-[0.28em] text-teal-200">04 / AR design</p>
                                    <h3 className="px-2 pt-3 text-2xl font-black">Built and tested in Unity.</h3>
                                    <p className="px-2 py-4 leading-7 text-white/65">
                                        The Unity scene models the indoor environment used to plan routes, obstacles, surfaces, and AR navigation behavior.
                                    </p>
                                    <ImageCard image={miitGuideMedia.design} index={0} onOpen={setPreviewImage} tone="dark" />
                                </motion.article>
                            </section>
                        </motion.div>
                    ) : isRepoChatSelected ? (
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            key="repochat-detail"
                        >
                            <section className="relative overflow-hidden rounded-lg bg-black px-5 py-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.25)] md:px-8 md:py-10">
                                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
                                <div className="relative grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
                                    <div>
                                        <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-violet-300">Personal Project / Project Opened</p>
                                        <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">RepoChat</h2>
                                        <p className="mt-3 max-w-3xl text-xl font-bold text-white/90 md:text-2xl">
                                            Ask questions about any GitHub repo, answered from the real code
                                        </p>
                                        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/68">
                                            A RAG (Retrieval-Augmented Generation) tool that indexes a public repo&apos;s source, retrieves the relevant code for a question, and answers using only that retrieved context, citing the exact file and lines used.
                                        </p>
                                        <div className="mt-7 flex flex-wrap gap-2">
                                            {repoChatTools.map((tool) => (
                                                <FeaturePill key={tool}>{tool}</FeaturePill>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10">
                                            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/45">Project type</p>
                                            <p className="mt-2 text-xl font-black">AI / RAG Tool</p>
                                        </div>
                                        <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/10">
                                            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/45">Type</p>
                                            <p className="mt-2 text-xl font-black">Personal / Open Source</p>
                                        </div>
                                        <a
                                            href="https://repo-chat-ydtv.onrender.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="col-span-2 flex items-center justify-center gap-2 rounded-full bg-violet-300 px-4 py-3 text-sm font-bold text-[#0f0524] transition-all hover:-translate-y-0.5 hover:bg-violet-200"
                                        >
                                            <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                            Try the live demo
                                        </a>
                                        <a
                                            href="https://github.com/Aidilkiy/repo-chat"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="col-span-2 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
                                        >
                                            <LuGithub className="h-4 w-4" aria-hidden="true" />
                                            View on GitHub
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(null)}
                                            className="col-span-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
                                        >
                                            Close project
                                        </button>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-8 grid gap-4 md:grid-cols-3">
                                {repoChatHighlights.map((item, index) => (
                                    <motion.article
                                        className="relative overflow-hidden rounded-lg border border-white/12 bg-[#061418]/88 p-5 text-white shadow-[0_20px_55px_rgba(0,0,0,0.18)]"
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.35 }}
                                        transition={{ delay: index * 0.08, duration: 0.45 }}
                                        key={item.label}
                                    >
                                        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:40px_40px]" />
                                        <div className="relative">
                                            <p className="font-serif text-4xl text-violet-200">{item.value}</p>
                                            <h3 className="mt-2 text-lg font-black">{item.label}</h3>
                                            <p className="mt-3 leading-7 text-white/62">{item.text}</p>
                                        </div>
                                    </motion.article>
                                ))}
                            </section>

                            <section className="mt-8 grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
                                <div className="lg:sticky lg:top-8">
                                    <div className="rounded-lg bg-black p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.2)]">
                                        <p className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-violet-300">Case Study</p>
                                        <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">RepoChat</h2>
                                        <p className="mt-3 font-mono text-sm font-bold uppercase tracking-[0.22em] text-white/40">
                                            AI Tool / Personal Project
                                        </p>
                                        <div className="mt-7 grid gap-3">
                                            {repoChatCaseStudyBlocks.map((block) => (
                                                <motion.div
                                                    className="rounded-lg bg-white/8 p-4 ring-1 ring-white/10"
                                                    initial={{ opacity: 0, x: -18 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, amount: 0.4 }}
                                                    transition={{ duration: 0.45 }}
                                                    key={block.label}
                                                >
                                                    <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-violet-300">{block.label}</p>
                                                    <p className="mt-2 leading-7 text-white/72">{block.value}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    className="overflow-hidden rounded-lg border border-white/12 bg-[#061418]/88 shadow-[0_24px_70px_rgba(0,0,0,0.2)]"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                >
                                    <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/35 px-4 py-3 md:px-5">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                        </div>
                                        <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-white/35">repochat — real, verified output</p>
                                    </div>
                                    <div className="grid gap-4 p-4 font-mono text-sm md:p-6">
                                        <p className="text-white/70">
                                            <span className="text-emerald-300">$</span> {repoChatTranscript.prompt}
                                        </p>
                                        <p className="text-emerald-300/90">{repoChatTranscript.indexed}</p>
                                        <div className="mt-2 border-t border-white/10 pt-4">
                                            <p className="text-cyan-200">? {repoChatTranscript.question}</p>
                                            <p className="mt-3 whitespace-pre-wrap font-sans leading-7 text-white/75">{repoChatTranscript.answer}</p>
                                            <div className="mt-4 grid gap-1.5">
                                                {repoChatTranscript.sources.map((source, index) => (
                                                    <p className="text-xs text-white/40" key={source}>[{index + 1}] {source}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </section>

                            <section className="mt-8 rounded-lg border border-white/12 bg-[#061418]/88 p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.2)] md:p-8">
                                <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-violet-300">Engineering Challenge</p>
                                <h2 className="mt-4 font-serif text-2xl leading-tight md:text-4xl">What happens when a repo is bigger than expected?</h2>
                                <p className="mt-4 max-w-3xl leading-8 text-white/68">
                                    Real repos aren&apos;t all the size of a class project. Stress-testing RepoChat against a much larger public repo surfaced two real bugs that a small demo repo never would have — here&apos;s the actual debugging trail.
                                </p>

                                <div className="mt-7 grid gap-4 md:grid-cols-3">
                                    {repoChatEngineeringChallenge.map((item, index) => (
                                        <motion.div
                                            className="relative overflow-hidden rounded-lg border border-white/12 bg-black/35 p-5"
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.35 }}
                                            transition={{ delay: index * 0.08, duration: 0.45 }}
                                            key={item.label}
                                        >
                                            <p className="font-serif text-3xl text-violet-200">{item.value}</p>
                                            <h3 className="mt-2 text-base font-black">{item.label}</h3>
                                            <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-7 text-white/55">
                                    Verified live: the same oversized repo now fails in seconds with an actionable message instead of hanging indefinitely, while normal-sized repos still index and answer correctly (regression-tested against the MIITGuide repo above).
                                </p>
                            </section>

                            <section className="mt-8 rounded-lg border border-white/12 bg-[#061418]/88 p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.2)] md:p-8">
                                <p className="font-mono text-xs font-bold uppercase tracking-[0.32em] text-violet-300">From Monolith to Microservices</p>
                                <h2 className="mt-4 font-serif text-2xl leading-tight md:text-4xl">Splitting the app, and a CDN surprise along the way.</h2>
                                <p className="mt-4 max-w-3xl leading-8 text-white/68">
                                    Wanted real hands-on practice with Kubernetes, so I split RepoChat's single Express server into two independent services first — the kind of refactor that also surfaces bugs a monolith hides.
                                </p>

                                <div className="mt-7 grid gap-4 md:grid-cols-3">
                                    {repoChatArchitectureEvolution.map((item, index) => (
                                        <motion.div
                                            className="relative overflow-hidden rounded-lg border border-white/12 bg-black/35 p-5"
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.35 }}
                                            transition={{ delay: index * 0.08, duration: 0.45 }}
                                            key={item.label}
                                        >
                                            <p className="font-serif text-3xl text-violet-200">{item.value}</p>
                                            <h3 className="mt-2 text-base font-black">{item.label}</h3>
                                            <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-7 text-white/55">
                                    Verified end-to-end after the fix: indexing a real repo through the split services correctly returned the exact same file/chunk counts as before, and a real question got a correct, cited answer through the new architecture.
                                </p>
                            </section>
                        </motion.div>
                    ) : null}
                </section>
            </div>

            {previewImage ? (
                <motion.div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/78 px-4 py-6 backdrop-blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${previewImage.title} screenshot preview`}
                    onClick={() => setPreviewImage(null)}
                >
                    <motion.div
                        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white p-3 text-black shadow-[0_34px_120px_rgba(0,0,0,0.48)]"
                        initial={{ opacity: 0, scale: 0.94, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between gap-4 border-b border-black/10 px-2 pb-3">
                            <div className="min-w-0">
                                <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-rose-500">{previewImage.label}</p>
                                <h2 className="truncate text-lg font-black md:text-2xl">{previewImage.title}</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreviewImage(null)}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-xl font-black text-white transition-transform duration-300 hover:rotate-90 hover:scale-105"
                                aria-label="Close screenshot preview"
                            >
                                x
                            </button>
                        </div>
                        <div className="relative mt-3 min-h-[260px] flex-1 overflow-hidden rounded-md bg-slate-100 ring-1 ring-black/10 md:min-h-[560px]">
                            <Image
                                src={previewImage.src}
                                alt={previewImage.alt}
                                fill
                                sizes="(min-width: 1280px) 1100px, 94vw"
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </motion.div>
    )
}

export default WorkPage
