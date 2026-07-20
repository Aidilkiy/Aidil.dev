"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const pipelineSteps = [
  "extracting profile data...",
  "validating software engineering stack...",
  "indexing projects and certificates...",
  "assembling cloud and support signals...",
  "rendering portfolio interface...",
  "launch sequence complete",
];

const gateChecks = ["checking environment... ok", "loading assets... ok", "awaiting input"];

// The pipeline animation itself finishes around ~4.35s (progress bar) / ~3.6s (last log line).
// This gives it a moment to land on "launch sequence complete" before auto-dismissing.
const AUTO_DISMISS_MS = 4800;

// Same stagger the pipeline lines use (see the .map below): delay = STEP_BASE_DELAY + index * STEP_STAGGER.
const STEP_BASE_DELAY = 0.82;
const STEP_STAGGER = 0.48;

// ---------------------------------------------------------------------------
// Sound design -- all synthesized via Web Audio, no audio file needed. Every
// call here happens either directly inside the gate's click/keydown handler
// (a genuine user gesture, so browsers allow sound immediately) or on a timer
// scheduled after that gesture -- so unlike a loader that plays on page load
// with no prior interaction, this one is guaranteed to be audible.
// ---------------------------------------------------------------------------

function playTick(ctx) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(1400 + Math.random() * 500, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.05, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.05);
}

function playTypingBurst(ctx) {
  const clicks = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < clicks; i += 1) {
    window.setTimeout(() => playTick(ctx), i * 45 + Math.random() * 20);
  }
}

// Rising two-tone "power on" -- played the instant the gate is activated.
function playPowerOn(ctx) {
  const now = ctx.currentTime;
  [
    { freq: 180, start: 0, dur: 0.16 },
    { freq: 540, start: 0.09, dur: 0.22 },
  ].forEach(({ freq, start, dur }) => {
    const t = now + start;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 2.1, t + dur);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  });
}

// Soft rising whoosh -- for the terminal panel's own entrance.
function playPanelAppear(ctx) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(720, now + 0.22);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.3);
}

// Two-note ascending chime -- for "launch sequence complete".
function playSuccessChime(ctx) {
  const now = ctx.currentTime;
  [
    { freq: 880, start: 0 },
    { freq: 1318.5, start: 0.11 },
  ].forEach(({ freq, start }) => {
    const t = now + start;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.34);
  });
}

// Short descending tone -- played as the loader auto-dismisses.
function playClosingSound(ctx) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(760, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.32);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.07, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.4);
}

// ---------------------------------------------------------------------------

const GRID_BACKDROP = (
  <>
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
  </>
);

const GateScreen = ({ onEnter }) => (
  <motion.button
    type="button"
    onClick={onEnter}
    className="group relative z-10 flex w-full max-w-md flex-col items-center gap-7 overflow-hidden rounded-lg border border-white/12 bg-black/40 px-8 py-14 font-mono text-white backdrop-blur-xl transition-colors hover:border-teal-300/40 focus-visible:border-teal-300/60 focus-visible:outline-none"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    aria-label="Click or press any key to start loading the portfolio"
  >
    {/* continuous scanning beam -- keeps the gate visibly alive while it waits */}
    <motion.span
      className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-teal-300/12 to-transparent"
      initial={{ top: "-15%" }}
      animate={{ top: "115%" }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />

    <motion.span
      className="relative flex h-20 w-20 items-center justify-center"
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="absolute inset-0 rounded-full bg-[#2DD4BF]/20 blur-2xl transition-opacity group-hover:bg-[#2DD4BF]/35" />
      <span className="relative h-4 w-4 rounded-full bg-[#2DD4BF] shadow-[0_0_24px_rgba(45,212,191,0.65)]" />
    </motion.span>

    <div className="flex flex-col items-center gap-1.5">
      <span className="text-2xl font-black tracking-tight">
        Aidil <span className="font-black text-[#6F858A]">.dev</span>
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/38">
        software engineer
      </span>
    </div>

    <div className="w-full space-y-1.5 text-left text-[11px] text-white/45 sm:text-xs">
      {gateChecks.map((line, index) => (
        <motion.div
          key={line}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 + index * 0.35, duration: 0.3, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <span className="text-teal-300/70">&gt;</span>
          <span>{line}</span>
          {index === gateChecks.length - 1 ? (
            <motion.span
              className="inline-block h-3.5 w-1.5 bg-white/70"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.51, 1] }}
              aria-hidden="true"
            />
          ) : null}
        </motion.div>
      ))}
    </div>

    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/32 transition-colors group-hover:text-white/60">
      click or press any key to start
    </span>
  </motion.button>
);

const PipelineScreen = () => (
  <motion.div
    className="rounded-lg border border-white/12 bg-black/58 p-5 font-mono shadow-[0_32px_120px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-7"
    initial={{ opacity: 0, y: 18, scale: 0.98, boxShadow: "0 0 0 rgba(45,212,191,0)" }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
      boxShadow: [
        "0 0 0 rgba(45,212,191,0)",
        "0 0 46px rgba(45,212,191,0.35)",
        "0 32px 120px rgba(0,0,0,0.48)",
      ],
    }}
    transition={{ duration: 0.55, ease: "easeOut" }}
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
        const delay = STEP_BASE_DELAY + index * STEP_STAGGER;

        return (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.35, ease: "easeOut" }}
            key={step}
          >
            <motion.span
              className={isFinal ? "text-emerald-300" : "text-rose-300"}
              animate={{ textShadow: ["0 0 12px currentColor", "0 0 0px currentColor"] }}
              transition={{ delay, duration: 0.5, ease: "easeOut" }}
            >
              {isFinal ? "ok" : ">"}
            </motion.span>
            <motion.span
              className={isFinal ? "text-emerald-200" : "text-white/68"}
              animate={isFinal ? { textShadow: ["0 0 16px rgba(52,211,153,0.9)", "0 0 0px rgba(52,211,153,0)"] } : undefined}
              transition={{ delay, duration: 0.6, ease: "easeOut" }}
            >
              {step}
            </motion.span>
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
);

const IntroLoader = () => {
  const [stage, setStage] = useState("gate"); // "gate" | "pipeline" | "done"
  const [flashKey, setFlashKey] = useState(0);
  // True only once the gate has fully exited and the pipeline panel is
  // actually on screen (see onExitComplete below) -- sound is scheduled off
  // of this, not off `stage`, so it can never drift ahead of what's visible.
  const [pipelineMounted, setPipelineMounted] = useState(false);
  const audioCtxRef = useRef(null);

  const startPipeline = () => {
    if (stage !== "gate") return;

    // Created directly inside this gesture handler, so the browser treats it
    // as user-initiated and allows sound immediately (unlike a context
    // created on page load with no prior interaction).
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      try {
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;
        ctx.resume().catch(() => {});
        playPowerOn(ctx);
      } catch {
        audioCtxRef.current = null;
      }
    }
    setFlashKey((n) => n + 1);
    setStage("pipeline");
  };

  const dismiss = () => {
    const ctx = audioCtxRef.current;
    if (ctx) {
      ctx.resume().catch(() => {});
      playClosingSound(ctx);
    }
    setStage("done");
  };

  // gate: any keypress also starts the pipeline, not just a click
  useEffect(() => {
    if (stage !== "gate") return undefined;
    const onKeyDown = () => startPipeline();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [stage]);

  // pipeline: auto-dismiss + schedule the panel-appear whoosh and per-line
  // typing/success sounds, anchored to the moment the panel is actually
  // visible (pipelineMounted), not to the React state flip -- with
  // mode="wait" below, the panel doesn't mount until the gate's own exit
  // animation finishes, so anchoring to `stage` instead would fire every
  // sound before its matching visual had appeared.
  useEffect(() => {
    if (!pipelineMounted) return undefined;
    const ctx = audioCtxRef.current;

    const dismissTimer = window.setTimeout(dismiss, AUTO_DISMISS_MS);
    const soundTimers = ctx
      ? [
          window.setTimeout(() => {
            ctx.resume().catch(() => {});
            playPanelAppear(ctx);
          }, 20),
          ...pipelineSteps.map((_, index) => {
            const isFinal = index === pipelineSteps.length - 1;
            return window.setTimeout(
              () => {
                ctx.resume().catch(() => {});
                if (isFinal) {
                  playSuccessChime(ctx);
                } else {
                  playTypingBurst(ctx);
                }
              },
              (STEP_BASE_DELAY + index * STEP_STAGGER) * 1000
            );
          }),
        ]
      : [];

    return () => {
      window.clearTimeout(dismissTimer);
      soundTimers.forEach(window.clearTimeout);
    };
  }, [pipelineMounted]);

  // close the audio context when the whole loader unmounts
  useEffect(() => {
    return () => {
      audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  return (
    <AnimatePresence>
      {stage !== "done" ? (
        <motion.div
          className="intro-loader-overlay fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#06191d] px-5 text-white"
          role="status"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {GRID_BACKDROP}

          {flashKey > 0 ? (
            <motion.div
              key={`flash-${flashKey}`}
              className="pointer-events-none absolute inset-0 bg-teal-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              aria-hidden="true"
            />
          ) : null}

          <div className="relative w-full max-w-3xl">
            <AnimatePresence mode="wait" onExitComplete={() => setPipelineMounted(stage === "pipeline")}>
              {stage === "gate" ? (
                <motion.div
                  className="flex justify-center"
                  key="gate"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <GateScreen onEnter={startPipeline} />
                </motion.div>
              ) : (
                <motion.div
                  key="pipeline"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <PipelineScreen />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroLoader;
