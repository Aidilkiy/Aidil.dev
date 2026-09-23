"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowUpRight, LuCheck, LuCopy, LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import ResumeButton from "@/components/resumeButton";

const contactLinks = [
  {
    label: "Email",
    value: "aidilkiy21@gmail.com",
    href: "mailto:aidilkiy21@gmail.com",
    icon: LuMail,
    group: "direct",
    tone: "cyan",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/aidil-rozaidi",
    href: "https://www.linkedin.com/in/aidil-rozaidi",
    icon: LuLinkedin,
    group: "profile",
    tone: "sky",
  },
  {
    label: "GitHub",
    value: "github.com/AidilKiy",
    href: "https://github.com/AidilKiy",
    icon: LuGithub,
    group: "profile",
    tone: "violet",
  },
];

const toneGlow = {
  cyan: { rest: "rgba(34,211,238,0)", peak: "rgba(34,211,238,0.35)" },
  sky: { rest: "rgba(56,189,248,0)", peak: "rgba(56,189,248,0.35)" },
  violet: { rest: "rgba(167,139,250,0)", peak: "rgba(167,139,250,0.35)" },
};

// Email should copy the raw address; LinkedIn/GitHub copy the full URL so
// it's directly pasteable, not just the shortened text shown on the card.
const getCopyValue = (item) => (item.href.startsWith("mailto:") ? item.value : item.href);

const statusRows = [
  { label: "role focus", value: "Software Engineering & QA" },
  { label: "location", value: "Jitra, Kedah" },
  { label: "relocation", value: "Open to relocate" },
  { label: "languages", value: "EN / MALAY" },
  { label: "availability", value: "Open to opportunities", online: true },
];

const currentYear = new Date().getFullYear();

const contactGroups = [
  { title: "Direct contact", type: "direct" },
  { title: "Professional links", type: "profile" },
];

// Types `text` out one character at a time once `active` is true, then
// reports back via `onDone`. Driven by setTimeout (not rAF) and reads the
// latest onDone through a ref so a parent re-rendering for unrelated
// reasons (e.g. the live clock ticking) never restarts an in-flight line.
const TypewriterText = ({ text, active, onDone, speed = 26 }) => {
  const [display, setDisplay] = useState("");
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (!active) return undefined;

    let index = 0;
    let timeoutId;

    const step = () => {
      index += 1;
      setDisplay(text.slice(0, index));
      if (index < text.length) {
        timeoutId = setTimeout(step, speed);
      } else if (!doneRef.current) {
        doneRef.current = true;
        onDoneRef.current?.();
      }
    };

    timeoutId = setTimeout(step, speed);
    return () => clearTimeout(timeoutId);
  }, [active, text, speed]);

  return <>{display}</>;
};

// Isolated so its once-a-second re-render doesn't ripple through the whole
// page -- only this small clock re-renders on each tick.
const LiveClock = () => {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  return <span className="normal-case tracking-normal text-white/45">{formatted} MYT</span>;
};

const ContactPage = () => {
  const [copiedLabel, setCopiedLabel] = useState(null);
  const [activeRowIndex, setActiveRowIndex] = useState(-1);
  const startedTypingRef = useRef(false);

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(getCopyValue(item));
      setCopiedLabel(item.label);
      setTimeout(() => {
        setCopiedLabel((current) => (current === item.label ? null : current));
      }, 1500);
    } catch {
      // Clipboard access denied or unsupported -- the row link still works.
    }
  };

  const handleTerminalViewportEnter = () => {
    if (startedTypingRef.current) return;
    startedTypingRef.current = true;
    setActiveRowIndex(0);
  };

  const advanceRow = (index) => {
    setActiveRowIndex((current) => (current === index ? index + 1 : current));
  };

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
              I&apos;m open to roles or projects where I can contribute through software development, full-stack engineering, quality assurance, or application engineering work.
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
                        const glow = toneGlow[item.tone];
                        const isCopied = copiedLabel === item.label;

                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.75 }}
                            transition={{ delay: 0.08 + groupIndex * 0.08 + index * 0.07, duration: 0.4 }}
                            key={item.label}
                            className="group relative grid min-h-[58px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-white/12 bg-white/[0.065] px-3 py-2 shadow-sm transition-all duration-300 hover:translate-x-1 hover:border-cyan-300/60 hover:bg-white/[0.12] sm:gap-4 sm:px-4"
                          >
                            <Link
                              href={item.href}
                              target={item.label === "Email" ? undefined : "_blank"}
                              rel={item.label === "Email" ? undefined : "noreferrer"}
                              className="absolute inset-0 z-0 rounded-lg"
                              aria-label={`Open ${item.label}`}
                            />

                            <motion.span
                              className="pointer-events-none relative z-[1] flex h-10 w-10 items-center justify-center rounded-md bg-black text-white transition-colors group-hover:bg-cyan-300 group-hover:text-[#071A1F]"
                              animate={{ boxShadow: [`0 0 0 0 ${glow.rest}`, `0 0 0 7px ${glow.peak}`, `0 0 0 0 ${glow.rest}`] }}
                              transition={{ duration: 2.6, delay: index * 0.3, repeat: Infinity, ease: "easeOut" }}
                            >
                              <ContactIcon className="h-5 w-5" aria-hidden="true" />
                            </motion.span>

                            <span className="pointer-events-none relative z-[1] min-w-0">
                              <span className="block font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/38 group-hover:text-cyan-200">
                                {isCopied ? "Copied!" : item.label}
                              </span>
                              <span className="mt-1 block truncate text-sm font-bold text-white/75 group-hover:text-white sm:text-base">
                                {item.value}
                              </span>
                            </span>

                            <span className="pointer-events-none relative z-[2] flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  handleCopy(item);
                                }}
                                aria-label={`Copy ${item.label}`}
                                className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-cyan-200"
                              >
                                <AnimatePresence mode="wait" initial={false}>
                                  {isCopied ? (
                                    <motion.span
                                      key="check"
                                      initial={{ opacity: 0, scale: 0.6 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.6 }}
                                      transition={{ duration: 0.18 }}
                                      className="flex text-emerald-300"
                                    >
                                      <LuCheck className="h-4 w-4" aria-hidden="true" />
                                    </motion.span>
                                  ) : (
                                    <motion.span
                                      key="copy"
                                      initial={{ opacity: 0, scale: 0.6 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.6 }}
                                      transition={{ duration: 0.18 }}
                                      className="flex"
                                    >
                                      <LuCopy className="h-4 w-4" aria-hidden="true" />
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </button>
                              <LuArrowUpRight className="h-4 w-4 text-white/32 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200" aria-hidden="true" />
                            </span>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            <span role="status" aria-live="polite" className="sr-only">
              {copiedLabel ? `${copiedLabel} value copied to clipboard` : ""}
            </span>

            <div className="mt-4">
              <ResumeButton className="w-full justify-center border-white/20 bg-white/10 text-white sm:w-auto" />
            </div>
          </motion.section>

          <motion.aside
            className="relative overflow-hidden rounded-lg bg-[#0B1117] p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] ring-1 ring-white/10 sm:p-6"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            onViewportEnter={handleTerminalViewportEnter}
            transition={{ delay: 0.18, duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/12 pb-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">
                <div className="flex items-center">
                  <span className="mr-2 h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="mr-2 h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="mr-4 h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  availability.config
                </div>
                <LiveClock />
              </div>

              <div className="mt-3 font-mono text-xs sm:text-sm">
                {statusRows.map((row, index) => (
                  <div
                    className="grid gap-1.5 border-b border-white/10 py-3.5 last:border-b-0 sm:grid-cols-[0.42fr_0.58fr] sm:items-center sm:gap-4"
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
                      {index <= activeRowIndex ? (
                        <TypewriterText text={row.value} active={index === activeRowIndex} onDone={() => advanceRow(index)} />
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-white/12 pt-4 font-mono text-xs text-white/45">
                <span className="mr-2 text-rose-400">$</span>
                {activeRowIndex >= statusRows.length ? (
                  <TypewriterText
                    text="connect --with aidil"
                    active={activeRowIndex === statusRows.length}
                    onDone={() => advanceRow(statusRows.length)}
                  />
                ) : null}
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
