"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowUpRight, LuGithub, LuLinkedin, LuMail, LuPhone } from "react-icons/lu";
import ResumeButton from "@/components/resumeButton";

const contactLinks = [
  {
    label: "Email",
    value: "aidilkiy21@gmail.com",
    href: "mailto:aidilkiy21@gmail.com",
    icon: LuMail,
    group: "direct",
  },
  {
    label: "Phone",
    value: "+60 11-3196 4189",
    href: "tel:+601131964189",
    icon: LuPhone,
    group: "direct",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/aidil-rozaidi",
    href: "https://www.linkedin.com/in/aidil-rozaidi",
    icon: LuLinkedin,
    group: "profile",
  },
  {
    label: "GitHub",
    value: "github.com/AidilKiy",
    href: "https://github.com/AidilKiy",
    icon: LuGithub,
    group: "profile",
  },
];

const statusRows = [
  { label: "role focus", value: "Software Engineering" },
  { label: "location", value: "Petaling Jaya, Selangor" },
  { label: "relocation", value: "Open to relocate" },
  { label: "languages", value: "EN / MALAY" },
  { label: "availability", value: "Open to opportunities", online: true },
];

const currentYear = new Date().getFullYear();

const contactGroups = [
  { title: "Direct contact", type: "direct" },
  { title: "Professional links", type: "profile" },
];

const ContactPage = () => {
  return (
    <motion.main
      className="relative overflow-x-clip"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute left-[8%] top-[16%] h-16 w-px bg-white/12"
          animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[13%] right-[9%] h-px w-24 bg-rose-300/35"
          animate={{ scaleX: [0.25, 1, 0.25], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative flex min-h-full items-center px-4 py-10 sm:px-8 md:px-10 lg:px-12 lg:py-0 xl:px-16 2xl:px-28">
        <div className="mx-auto grid w-full max-w-[1320px] gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 2xl:gap-20">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.08, duration: 0.65, ease: "easeOut" }}
          >
            <p className="font-mono text-xs font-black uppercase tracking-[0.34em] text-rose-300">Get in touch</p>
            <h1 className="mt-4 max-w-3xl font-serif text-[2.2rem] font-black leading-[1.08] sm:text-5xl lg:text-5xl 2xl:mt-5 2xl:text-6xl">
              Let&apos;s build something <span className="italic text-cyan-300">useful.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/62 2xl:mt-6 2xl:text-lg 2xl:leading-8">
              I&apos;m open to roles or projects where I can contribute through software development, application support, cloud, or DevOps work.
            </p>

            <div className="mt-6 grid gap-5 2xl:mt-8">
              {contactGroups.map((group, groupIndex) => (
                <div key={group.type}>
                  <p className="mb-2 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
                    {group.title}
                  </p>
                  <div className="grid gap-2.5">
                    {contactLinks
                      .filter((item) => item.group === group.type)
                      .map((item, index) => {
                        const ContactIcon = item.icon;

                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.75 }}
                            transition={{ delay: 0.08 + groupIndex * 0.08 + index * 0.07, duration: 0.4 }}
                            key={item.label}
                          >
                            <Link
                              href={item.href}
                              target={item.label === "Email" || item.label === "Phone" ? undefined : "_blank"}
                              rel={item.label === "Email" || item.label === "Phone" ? undefined : "noreferrer"}
                              className="group grid min-h-[58px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-white/12 bg-white/[0.065] px-3 py-2 shadow-sm transition-all duration-300 hover:translate-x-1 hover:border-cyan-300/60 hover:bg-white/[0.12] sm:gap-4 sm:px-4"
                            >
                              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-black text-white transition-colors group-hover:bg-cyan-300 group-hover:text-[#071A1F]">
                                <ContactIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                              <span className="min-w-0">
                                <span className="block font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/38 group-hover:text-cyan-200">{item.label}</span>
                                <span className="mt-1 block truncate text-sm font-bold text-white/75 group-hover:text-white sm:text-base">{item.value}</span>
                              </span>
                              <LuArrowUpRight className="h-5 w-5 text-white/32 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200" aria-hidden="true" />
                            </Link>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <ResumeButton className="w-full justify-center border-white/20 bg-white/10 text-white sm:w-auto" />
            </div>
          </motion.section>

          <motion.aside
            className="relative overflow-hidden rounded-lg bg-[#0B1117] p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] ring-1 ring-white/10 sm:p-6"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.18, duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="relative">
              <div className="flex items-center border-b border-white/12 pb-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">
                <span className="mr-2 h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="mr-2 h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="mr-4 h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                availability.config
              </div>

              <div className="mt-3 font-mono text-xs sm:text-sm">
                {statusRows.map((row, index) => (
                  <motion.div
                    className="grid gap-1.5 border-b border-white/10 py-3.5 last:border-b-0 sm:grid-cols-[0.42fr_0.58fr] sm:items-center sm:gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.75 }}
                    transition={{ delay: 0.18 + index * 0.1, duration: 0.38 }}
                    key={row.label}
                  >
                    <span className="text-white/35">{row.label}</span>
                    <span className={`font-bold sm:justify-self-end sm:text-right ${row.online ? "flex items-center gap-2 text-emerald-300" : "text-white/78"}`}>
                      {row.online ? (
                        <motion.span
                          className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.55, 1, 0.55] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                          aria-hidden="true"
                        />
                      ) : null}
                      {row.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 border-t border-white/12 pt-4 font-mono text-xs text-white/45">
                <span className="mr-2 text-rose-400">$</span>
                connect --with aidil
                <motion.span
                  className="ml-2 inline-block h-3.5 w-2 bg-white align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <footer className="relative border-t border-white/10 px-4 py-5 text-center font-mono text-xs text-white/42 sm:px-8">
        &copy; {currentYear} <span className="font-black text-white/72">Aidil Rozaidi</span> &middot; Built with curiosity, purpose, and a few late-night commits.
      </footer>
    </motion.main>
  );
};

export default ContactPage;
