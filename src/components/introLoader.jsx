"use client";

import { motion } from "framer-motion";

const pipelineSteps = [
  "extracting profile data...",
  "validating software engineering stack...",
  "indexing projects and certificates...",
  "assembling cloud and support signals...",
  "rendering portfolio interface...",
  "launch sequence complete",
];

const IntroLoader = () => {
  return (
    <div
      className="intro-loader-overlay fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#06191d] px-5 text-white"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:42px_42px]" />

      <motion.div
        className="absolute left-[12%] top-[18%] h-44 w-44 rounded-full bg-teal-400/15 blur-3xl"
        animate={{ scale: [0.9, 1.22, 0.9], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[18%] right-[14%] h-56 w-56 rounded-full bg-rose-400/12 blur-3xl"
        animate={{ scale: [1.05, 0.86, 1.05], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl">
        <motion.div
          className="rounded-lg border border-white/12 bg-black/58 p-5 font-mono shadow-[0_32px_120px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-7"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="flex items-center border-b border-white/15 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/42 sm:text-xs">
            <span className="mr-2 h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="mr-2 h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="mr-4 h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="truncate">aidil@portfolio: ~/pipeline</span>
          </div>

          <motion.p
            className="pt-6 font-mono text-[10px] font-black uppercase tracking-[0.38em] text-teal-200/80"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            pipeline status
          </motion.p>

          <motion.h1
            className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.48, ease: "easeOut" }}
          >
            Loading Aidil.dev
          </motion.h1>

          <div className="mt-6 min-h-[218px] space-y-3 text-xs sm:text-sm">
            {pipelineSteps.map((step, index) => {
              const isFinal = index === pipelineSteps.length - 1;

              return (
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.82 + index * 0.48, duration: 0.35, ease: "easeOut" }}
                  key={step}
                >
                  <span className={isFinal ? "text-emerald-300" : "text-rose-300"}>
                    {isFinal ? "ok" : ">"}
                  </span>
                  <span className={isFinal ? "text-emerald-200" : "text-white/68"}>{step}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-2">
            <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-white/38">
              <span>build progress</span>
              <motion.span
                className="tabular-nums text-teal-200"
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                compiling
              </motion.span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-rose-300"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>

      </div>

      <button
        type="button"
        className="absolute bottom-5 right-5 flex min-h-10 items-center border-b border-white/30 px-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 transition-colors hover:border-white hover:text-white sm:bottom-8 sm:right-8"
        onClick={(event) => {
          event.currentTarget.closest(".intro-loader-overlay")?.remove();
        }}
      >
        Skip intro
      </button>
    </div>
  );
};

export default IntroLoader;
