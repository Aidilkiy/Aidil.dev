"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LuHeartHandshake, LuTrophy, LuUsers } from "react-icons/lu"

const leadershipRoles = [
    {
        role: "Resident Council Representative",
        organisation: "Kolej Profesional Mara Seri Iskandar",
        logo: "/logos/rc-kpmsi-logo.jpg",
        period: "Feb 2020 - Feb 2021",
        category: "leadership",
        icon: LuUsers,
        highlights: [
            "Represented the student body by addressing concerns and coordinating initiatives to improve campus living conditions.",
            "Organised and managed student activities and events, enhancing engagement and community participation.",
        ],
        tags: ["Student Advocacy", "Event Coordination", "Community Building"],
    },
    {
        role: "Committee Member, College Sports Council",
        organisation: "Kolej Profesional Mara Seri Iskandar",
        logo: "/logos/kpm-logo.png",
        period: "Feb 2020 - Feb 2021",
        category: "leadership",
        icon: LuTrophy,
        highlights: [
            "Coordinated college-wide sports competitions and hostel events, fostering teamwork and collaboration among students and administration.",
            "Supported event planning and logistics, ensuring smooth execution of large-scale activities.",
        ],
        tags: ["Event Planning", "Teamwork", "Logistics"],
    },
    {
        role: "Volunteer, Rakan Muda Day Out 2.0",
        organisation: "Sekretariat Rakan Muda UniKL MIIT",
        logo: "/logos/rakan-muda-logo.png",
        period: "Nov 2022 (1 month)",
        category: "volunteering",
        icon: LuHeartHandshake,
        highlights: [
            "Participated in Rakan Muda Day Out 2.0 at Pantai Morib, Banting, alongside students from UniKL MIIT, Universiti Putra Malaysia, and Politeknik METrO Kuala Lumpur.",
            "Contributed to Corporate Social Responsibility (CSR) efforts through a beach clean-up initiative supporting environmental cleanliness and public awareness.",
            "Collaborated with participants and organisers on team-building and community engagement activities that strengthened networking across institutions.",
        ],
        tags: ["Social Services", "CSR", "Team Building"],
        photos: [
            { src: "/leadership/rakan-muda-day-out-1.jpg", alt: "Rakan Muda Day Out 2.0 group photo at Pantai Morib" },
            { src: "/leadership/rakan-muda-day-out-2.jpg", alt: "Rakan Muda Day Out 2.0 beach clean-up activity" },
        ],
    },
]

const categoryTheme = {
    leadership: {
        eyebrow: "text-violet-300",
        badgeBg: "bg-violet-300",
        badgeGlow: { rest: "rgba(196,181,253,0)", peak: "rgba(196,181,253,0.18)" },
        cardBorder: "border-violet-300/20",
        cardBg: "bg-violet-300/[0.045]",
        cardShadow: "shadow-[0_24px_80px_rgba(139,92,246,0.06)]",
        orgText: "text-violet-200",
        arrow: "text-violet-200",
        tagBorder: "border-violet-300/35",
        tagText: "text-violet-100",
        label: "Campus leadership",
    },
    volunteering: {
        eyebrow: "text-emerald-300",
        badgeBg: "bg-emerald-300",
        badgeGlow: { rest: "rgba(110,231,183,0)", peak: "rgba(110,231,183,0.2)" },
        cardBorder: "border-emerald-300/20",
        cardBg: "bg-emerald-300/[0.045]",
        cardShadow: "shadow-[0_24px_80px_rgba(16,185,129,0.08)]",
        orgText: "text-emerald-200",
        arrow: "text-emerald-200",
        tagBorder: "border-emerald-300/35",
        tagText: "text-emerald-100",
        label: "Volunteering",
    },
}

const LeadershipSection = () => {
    const [previewPhoto, setPreviewPhoto] = useState(null)

    useEffect(() => {
        if (!previewPhoto) return undefined

        const closeOnEscape = (event) => {
            if (event.key === "Escape") setPreviewPhoto(null)
        }

        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", closeOnEscape)

        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", closeOnEscape)
        }
    }, [previewPhoto])

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 p-4 sm:p-8 md:gap-16 md:p-10 lg:p-14 2xl:px-14 2xl:py-20">
            <section id="leadership" className="relative scroll-mt-[90px] py-4 text-white md:py-8">
                <motion.div
                    className="mb-9 grid gap-7 border-b border-white/12 pb-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                >
                    <div>
                        <p className="font-mono text-xs font-black uppercase tracking-[0.35em] text-violet-300">Leadership / Community</p>
                        <h2 className="mt-4 font-serif text-3xl leading-tight md:text-6xl">
                            Beyond the classroom, <span className="italic">leading with purpose.</span>
                        </h2>
                    </div>
                    <p className="max-w-2xl text-base leading-7 text-white/62 md:text-lg md:leading-8">
                        Representing peers, organising events, and coordinating teams outside the lecture hall -- experience that shaped how I communicate and collaborate today.
                    </p>
                </motion.div>

                <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#061418]/88 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
                    <div className="pointer-events-none absolute -right-12 top-10 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-rose-400/10 blur-3xl" />

                    <div className="relative">
                        <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/35 px-4 py-3 md:px-5">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            </div>
                            <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-white/35">aidil@leadership:~</p>
                        </div>

                        <div className="grid gap-5 p-4 md:p-5">
                            <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4 font-mono text-xs font-bold text-white/42">
                                <span className="text-rose-300">$</span>
                                <span>cat leadership.log</span>
                                <motion.span
                                    className="h-4 w-2 bg-violet-200"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    aria-hidden="true"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {leadershipRoles.map((item, index) => {
                                    const RoleIcon = item.icon
                                    const theme = categoryTheme[item.category]

                                    return (
                                        <motion.article
                                            className={`group relative overflow-hidden rounded-lg border p-4 text-white transition-all duration-500 md:p-5 md:[&:last-child]:col-span-2 xl:[&:last-child]:col-span-1 ${theme.cardBorder} ${theme.cardBg} ${theme.cardShadow}`}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                                            whileHover={{ y: -5 }}
                                            key={item.role}
                                        >
                                            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:42px_42px]" />
                                            <div className="relative">
                                                <div className="flex items-start gap-3 border-b border-white/10 pb-4">
                                                    <motion.span
                                                        className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-md text-[#071A1F] ring-1 ring-white/10 ${theme.badgeBg}`}
                                                        animate={{
                                                            boxShadow: [
                                                                `0 0 0 0 ${theme.badgeGlow.rest}`,
                                                                `0 0 0 8px ${theme.badgeGlow.peak}`,
                                                                `0 0 0 0 ${theme.badgeGlow.rest}`,
                                                            ],
                                                        }}
                                                        transition={{ duration: 2.6, delay: index * 0.3, repeat: Infinity, ease: "easeOut" }}
                                                        whileHover={{ rotate: -6, scale: 1.06 }}
                                                    >
                                                        <RoleIcon className="h-6 w-6" aria-hidden="true" />
                                                    </motion.span>
                                                    <div className="min-w-0">
                                                        <p className={`font-mono text-[10px] font-black uppercase tracking-[0.24em] ${theme.eyebrow}`}>
                                                            {theme.label}
                                                        </p>
                                                        <h3 className="mt-2 text-lg font-black leading-tight">{item.role}</h3>
                                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                                            <span className="flex h-7 items-center rounded-md bg-white p-1 shadow-sm">
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img src={item.logo} alt={item.organisation} className="h-full w-auto object-contain" />
                                                            </span>
                                                            <p className={`text-sm font-bold ${theme.orgText}`}>{item.organisation}</p>
                                                        </div>
                                                        <p className="mt-1 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white/42">{item.period}</p>
                                                    </div>
                                                </div>

                                                <ul className="mt-4 grid gap-2.5">
                                                    {item.highlights.map((highlight, highlightIndex) => (
                                                        <motion.li
                                                            className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-7 text-white/70"
                                                            initial={{ opacity: 0, x: 14 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true, amount: 0.7 }}
                                                            transition={{ delay: 0.12 + highlightIndex * 0.05, duration: 0.35 }}
                                                            key={`${item.role}-${highlightIndex}`}
                                                        >
                                                            <span className={`mt-1 font-mono text-xs font-black ${theme.arrow}`}>&gt;</span>
                                                            <span>{highlight}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>

                                                {item.photos ? (
                                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                                        {item.photos.map((photo) => (
                                                            <button
                                                                type="button"
                                                                key={photo.src}
                                                                onClick={() => setPreviewPhoto(photo)}
                                                                className="group/photo relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-white/10"
                                                            >
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img
                                                                    src={photo.src}
                                                                    alt={photo.alt}
                                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover/photo:scale-110"
                                                                />
                                                                <span className="absolute inset-0 flex items-center justify-center bg-black/0 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-white opacity-0 transition-all duration-300 group-hover/photo:bg-black/45 group-hover/photo:opacity-100">
                                                                    View
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : null}

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {item.tags.map((tag) => (
                                                        <motion.span
                                                            className={`rounded-full border bg-white/7 px-3 py-1.5 font-mono text-[11px] font-bold ${theme.tagBorder} ${theme.tagText}`}
                                                            whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.14)" }}
                                                            key={tag}
                                                        >
                                                            {tag}
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
                </div>
            </section>

            <AnimatePresence>
                {previewPhoto ? (
                    <motion.div
                        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/78 px-4 py-6 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={previewPhoto.alt}
                        onClick={() => setPreviewPhoto(null)}
                    >
                        <motion.div
                            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-lg bg-black"
                            initial={{ opacity: 0, scale: 0.94, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={previewPhoto.src} alt={previewPhoto.alt} className="max-h-[90vh] w-full object-contain" />
                            <button
                                type="button"
                                onClick={() => setPreviewPhoto(null)}
                                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-lg font-black text-white transition-transform duration-300 hover:rotate-90 hover:scale-105"
                                aria-label="Close photo preview"
                            >
                                x
                            </button>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    )
}

export default LeadershipSection
