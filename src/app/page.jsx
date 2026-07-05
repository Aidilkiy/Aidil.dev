"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import ResumeButton from "@/components/resumeButton";
import AboutPage from "./about/page";
import WorkPage from "./work/page";
import ContactPage from "./contact/page";
import CertificationsSection from "@/components/certificationsSection";

const highlights = ["Software engineering", "Application support", "Cloud & DevOps"];
const stats = [
  { value: "AWS", label: "Cloud certified" },
  { value: "2", label: "Professional roles" },
  { value: "2", label: "Featured projects" },
];

const codeLines = [
  "const idea = userProblem;",
  "build(solution);",
  "test(flow);",
  "ship(portfolio);",
];

const formulas = ["UX + Code", "APIs -> UI", "x = useful", "AR + Mobile"];
const socialLinks = [
  { label: "GitHub", href: "https://github.com/AidilKiy", icon: LuGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aidil-rozaidi", icon: LuLinkedin },
  { label: "Email", href: "mailto:aidilkiy21@gmail.com", icon: LuMail },
];

const HomeHero = () => {
  return (
    <div className="min-h-[calc(100vh-78px)] overflow-x-clip px-4 py-7 sm:px-8 md:px-10 lg:px-12 lg:py-0 xl:px-16 2xl:px-28">
      <div className="mx-auto grid min-h-[calc(100vh-78px)] max-w-[1500px] items-center gap-8 lg:grid-cols-[1fr_0.92fr] lg:gap-10 2xl:gap-16">
        <div className="flex flex-col gap-4 lg:order-first 2xl:gap-7">
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            {highlights.map((item) => (
              <span className="rounded border border-white/10 bg-white/[0.07] px-2.5 py-1.5 text-xs font-semibold text-white/72 shadow-sm" key={item}>
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="space-y-4 2xl:space-y-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.65 }}
          >
            <p className="font-semibold uppercase tracking-wide text-teal-200">Software Engineering Graduate</p>
            <h1 className="max-w-3xl text-[2.55rem] font-black leading-[1.04] sm:text-5xl lg:text-5xl 2xl:text-6xl">
              I build practical software for real users.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/68 md:text-xl">
              Hi, I&apos;m Aidil. I work across development and application support, with a growing focus on cloud and DevOps.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-3 sm:flex sm:flex-wrap sm:gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65 }}
          >
            <Link href="#work" className="group relative flex justify-center overflow-hidden rounded-full border border-white/70 bg-black px-6 py-4 font-bold text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex">
              <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/35 blur-xl transition-transform duration-700 group-hover:translate-x-[340%]" />
              <span className="relative">View My Work</span>
            </Link>
            <ResumeButton className="px-6" />
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-2.5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.6 }}
          >
            <span className="mr-1 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/35">Connect</span>
            {socialLinks.map((item) => {
              const SocialIcon = item.icon;

              return (
                <Link
                  href={item.href}
                  target={item.label === "Email" ? undefined : "_blank"}
                  className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 text-xs font-bold text-white/55 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-white/10 hover:text-white"
                  key={item.label}
                >
                  <SocialIcon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </motion.div>

          <motion.div
            className="grid max-w-lg grid-cols-3 rounded-lg border border-white/10 bg-white/[0.055] p-2 shadow-[0_16px_52px_rgba(0,0,0,0.14)] sm:p-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.65 }}
          >
            {stats.map((item) => (
              <div className="min-w-0 border-r border-white/10 px-2 last:border-r-0 sm:px-3" key={item.label}>
                <p className="text-lg font-black sm:text-xl 2xl:text-2xl">{item.value}</p>
                <p className="mt-1 text-[11px] font-semibold leading-4 text-white/48 sm:text-xs">{item.label}</p>
              </div>
            ))}
          </motion.div>

        </div>

        <div className="relative min-h-[390px] overflow-hidden sm:min-h-[500px] lg:min-h-[540px] xl:min-h-[620px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 640" fill="none" aria-hidden="true">
            <motion.path
              d="M62 454 C178 252 328 558 493 182"
              stroke="rgba(255,255,255,0.62)"
              strokeWidth="2"
              strokeDasharray="8 12"
              initial={{ pathLength: 0, opacity: 0.18 }}
              animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.16, 0.42, 0.16] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M94 138 C214 240 338 80 492 304"
              stroke="#e11d48"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            />
            {[94, 232, 374, 492].map((cx, index) => (
              <motion.circle
                cx={cx}
                cy={[138, 218, 116, 304][index]}
                r="7"
                fill={index % 2 === 0 ? "#67e8f9" : "#fb7185"}
                animate={{ scale: [1, 1.7, 1], opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35 }}
                key={cx}
              />
            ))}
          </svg>

          <motion.div
            className="absolute inset-x-0 top-8 mx-auto h-[66%] w-[68%] max-w-[350px] overflow-hidden rounded-lg bg-white shadow-2xl ring-2 ring-black group sm:top-12 sm:w-[64%]"
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: [0, -6, 0], rotate: [-1, -1.8, -1] }}
            transition={{
              opacity: { delay: 0.15, duration: 0.7, ease: "easeOut" },
              y: { delay: 0.15, duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotate: { delay: 0.15, duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div className="relative h-full w-full">
              <Image
                src="/passport-photo.png"
                alt="Aidil professional portrait"
                fill
                priority
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 45vw, 350px"
                className="object-cover"
                style={{ objectPosition: "50% 42%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Professional profile</p>
                <p className="mt-2 text-2xl font-black">Software Engineering graduate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute left-0 top-4 hidden w-[245px] rounded-lg bg-black p-4 font-mono text-xs text-white shadow-xl ring-1 ring-white/20 sm:block"
            initial={{ opacity: 0, x: -24, y: 16 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0], rotate: [-2, -1.2, -2] }}
            transition={{
              opacity: { delay: 0.5, duration: 0.4 },
              x: { delay: 0.5, duration: 0.4 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div className="mb-3 flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
            </div>
            {codeLines.map((line, index) => (
              <motion.p
                className="whitespace-nowrap text-white/85"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.18 }}
                key={line}
              >
                <span className="text-sky-300">{">"}</span> {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            className="absolute bottom-2 right-0 hidden w-[210px] rounded-lg bg-white p-3 shadow-xl ring-1 ring-black/10 sm:block"
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0], rotate: [1.5, 2.4, 1.5] }}
            transition={{
              opacity: { delay: 0.7, duration: 0.4 },
              x: { delay: 0.7, duration: 0.4 },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <p className="text-xs font-bold uppercase tracking-wide text-teal-600">logic board</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {formulas.map((item) => (
                <div className="rounded bg-black px-3 py-2 text-center text-xs font-bold text-white" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="absolute right-0 top-4 w-[195px] rounded-lg bg-teal-500 px-3 py-2.5 text-center text-xs font-bold leading-5 text-[#071A1F] shadow-lg sm:top-5 sm:w-[220px] sm:px-4 sm:py-3 sm:text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0], rotate: [1.5, 0.7, 1.5] }}
            transition={{
              opacity: { delay: 0.95, duration: 0.45 },
              scale: { delay: 0.95, duration: 0.45 },
              y: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            Open to Software, Cloud & Support Roles
          </motion.div>

          <Link
            href="#about"
            aria-label="Go to about page"
            className="absolute bottom-2 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-black text-2xl font-black text-white shadow-lg ring-1 ring-black transition-colors hover:bg-white hover:text-black"
          >
            <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
              <span className="block rotate-90">{">"}</span>
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  return (
    <div className="overflow-x-clip">
      <section id="home" className="scroll-mt-[78px]">
        <HomeHero />
      </section>
      <section id="about" className="scroll-mt-[78px] border-t border-white/10">
        <AboutPage embedded />
      </section>
      <section id="work" className="scroll-mt-[78px] border-t border-white/10">
        <WorkPage embedded />
      </section>
      <section className="scroll-mt-[78px] border-t border-white/10">
        <CertificationsSection />
      </section>
      <section id="contact" className="min-h-[calc(100vh-78px)] scroll-mt-[78px] border-t border-white/10">
        <ContactPage embedded />
      </section>
    </div>
  );
};

export default PortfolioPage;
