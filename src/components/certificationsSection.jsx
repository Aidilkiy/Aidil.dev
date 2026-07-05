"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FaAws, FaAward } from "react-icons/fa"
import { LuArrowUpRight, LuBrainCircuit, LuClipboardCheck } from "react-icons/lu"

const certifications = [
    {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        href: "/certificates/aws-cloud-practitioner-certificate.pdf",
        icon: FaAws,
        tone: "cyan",
    },
    {
        title: "Google Project Management",
        issuer: "Google / Coursera",
        href: "/certificates/google-project-management-certificate.jpeg",
        icon: LuClipboardCheck,
        tone: "gold",
    },
    {
        title: "Ready4AI & Security Certificate",
        issuer: "Learning certificate",
        href: "/certificates/ready4ai-security-certificate.pdf",
        icon: LuBrainCircuit,
        tone: "rose",
    },
    {
        title: "Internship Certificate",
        issuer: "Al-Madinah International University",
        href: "/certificates/internship-certificate.pdf",
        icon: FaAward,
        tone: "emerald",
    },
]

const toneClasses = {
    cyan: "bg-cyan-300/10 text-cyan-200 group-hover/cert:border-cyan-300/50 group-hover/cert:text-cyan-100",
    gold: "bg-amber-300/10 text-amber-200 group-hover/cert:border-amber-300/50 group-hover/cert:text-amber-100",
    rose: "bg-rose-300/10 text-rose-200 group-hover/cert:border-rose-300/50 group-hover/cert:text-rose-100",
    emerald: "bg-emerald-300/10 text-emerald-200 group-hover/cert:border-emerald-300/50 group-hover/cert:text-emerald-100",
}

const CertificationsSection = () => (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 p-4 sm:p-8 md:gap-16 md:p-10 lg:p-14 2xl:px-14 2xl:py-20">
        <section id="certifications" className="relative scroll-mt-[90px] py-4 text-white md:py-8">
            <motion.div
                className="mb-9 grid gap-7 border-b border-white/12 pb-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
            >
                <div>
                    <p className="font-mono text-xs font-black uppercase tracking-[0.35em] text-cyan-300">Credentials / Proof</p>
                    <h2 className="mt-4 font-serif text-3xl leading-tight md:text-6xl">
                        Credential log, <span className="italic">verified learning.</span>
                    </h2>
                </div>
                <div>
                    <p className="max-w-2xl text-base leading-7 text-white/62 md:text-lg md:leading-8">
                        A compact proof layer for the skills I am building: cloud foundations, delivery mindset, AI/security awareness, and real workplace exposure.
                    </p>
                </div>
            </motion.div>

            <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#061418]/88 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
                <div className="relative">
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/35 px-4 py-3 md:px-5">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-white/35">aidil@credentials:~</p>
                    </div>

                    <div className="grid gap-5 p-4 md:p-5">
                        <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4 font-mono text-xs font-bold text-white/42">
                            <span className="text-rose-300">$</span>
                            <span>verify certificates.list</span>
                            <motion.span
                                className="h-4 w-2 bg-cyan-200"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                aria-hidden="true"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {certifications.map((certificate, index) => {
                                const CertificateIcon = certificate.icon

                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.35 }}
                                        transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
                                        key={certificate.title}
                                    >
                                        <Link
                                            href={certificate.href}
                                            target="_blank"
                                            className="group/cert relative flex min-h-[132px] items-center gap-4 overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-5 text-white no-underline shadow-[0_18px_55px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.055]"
                                        >
                                            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 text-xl transition-colors duration-300 ${toneClasses[certificate.tone]}`}>
                                                <CertificateIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>

                                            <span className="min-w-0 flex-1">
                                                <span className="block text-sm font-black leading-6 text-white">
                                                    {certificate.title}
                                                </span>
                                                <span className="mt-1 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-white/42">
                                                    {certificate.issuer}
                                                </span>
                                            </span>

                                            <LuArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-white/30 transition-all duration-300 group-hover/cert:-translate-y-0.5 group-hover/cert:translate-x-0.5 group-hover/cert:text-cyan-200" aria-hidden="true" />
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

export default CertificationsSection
