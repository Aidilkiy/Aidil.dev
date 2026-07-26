"use client";

import { useEffect, useRef, useState } from "react";
import NetworkBackground from "./networkBackground";

// Boot script for a software-engineer/cloud-focused build, not a metaphor --
// each line reads like a real deploy pipeline would actually log.
const bootSteps = [
  { text: "connecting to build server...", ok: false },
  { text: "installing dependencies (366 packages)...", ok: false },
  { text: "running test suite & lint checks...", ok: false },
  { text: "building with Next.js & Tailwind...", ok: false },
  { text: "provisioning AWS infrastructure...", ok: false },
  { text: "deploying to production...", ok: false },
  { text: "system status: healthy ✓", ok: true },
];

const STEP_MS = 550;
const FINAL_DELAY_MS = 500;
const FINAL_HOLD_MS = 2200;
// Kept in sync with the `duration-[600ms]` Tailwind class on the overlay's
// opacity/visibility transition below -- this extra 100ms just gives that
// transition time to finish before the element is removed from the DOM.
const REMOVE_DELAY_MS = 700;

// ---------------------------------------------------------------------------
// Sound design -- all synthesized via Web Audio, no audio file needed. There
// is no click gesture to hang this off of (the loader auto-plays on mount),
// so browsers that require a prior user interaction will just leave the
// context suspended -- every playX() call below is a silent no-op then.
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

const IntroLoader = () => {
  const [lines, setLines] = useState([]);
  const [percent, setPercent] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  // `hiding` flips a CSS opacity/visibility transition (see className below);
  // `removed` unmounts the loader once that transition has had time to run.
  // Both are plain timed state changes, not tied to any animation-completion
  // callback -- the logic can never get stuck waiting on a frame that never
  // composites.
  const [hiding, setHiding] = useState(false);
  const [removed, setRemoved] = useState(false);
  const audioCtxRef = useRef(null);
  const dismissedRef = useRef(false);

  const dismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    const ctx = audioCtxRef.current;
    if (ctx) {
      ctx.resume().catch(() => {});
      playClosingSound(ctx);
    }
    // IntroLoader itself never unmounts (see `if (removed) return null` below),
    // so an effect cleanup would never run this -- restore scroll explicitly.
    document.body.style.overflow = "";
    setHiding(true);
    window.setTimeout(() => setRemoved(true), REMOVE_DELAY_MS);
  };

  // lock scroll while booting
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
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

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setPercent(100);
      dismiss();
      return undefined;
    }

    let index = 0;
    let timer = null;

    const showNext = () => {
      if (index >= bootSteps.length) {
        timer = window.setTimeout(() => {
          setShowFinal(true);
          timer = window.setTimeout(dismiss, FINAL_HOLD_MS);
        }, FINAL_DELAY_MS);
        return;
      }

      const step = bootSteps[index];
      setLines((prev) => [...prev, step]);
      setPercent(Math.round(((index + 1) / bootSteps.length) * 100));

      const ctx = audioCtxRef.current;
      if (ctx) {
        ctx.resume().catch(() => {});
        if (step.ok) playSuccessChime(ctx);
        else playTick(ctx);
      }

      index += 1;
      timer = window.setTimeout(showNext, STEP_MS);
    };

    timer = window.setTimeout(showNext, 250);

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  // close the audio context when the whole loader unmounts
  useEffect(() => {
    return () => {
      audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`intro-loader-overlay fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#06191d] px-5 text-white transition-[opacity,visibility] duration-[600ms] ease-out ${
        hiding ? "invisible pointer-events-none opacity-0" : "visible opacity-100"
      }`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="absolute inset-0 opacity-70">
        <NetworkBackground />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06191d]/40 via-transparent to-[#06191d]/70" />

      <div className="relative w-full max-w-xl font-mono text-[0.92rem] text-white/72">
        <div className="flex items-center gap-2 border-b border-white/15 pb-3.5 text-xs tracking-wide text-white/45">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="mr-2 h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span>aidil@build:~$</span>
        </div>

        <div className="mt-5 space-y-2">
          {lines.map((line, index) => (
            <div className="intro-loader-line flex items-center gap-2.5" key={`${index}-${line.text}`}>
              <span className={line.ok ? "text-teal-300" : "text-teal-300/70"}>{line.ok ? "●" : "›"}</span>
              <span className={line.ok ? "text-teal-200" : "text-white/72"}>{line.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-300 to-cyan-300 transition-[width] duration-300 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div
          className={`mt-6 font-sans text-xl font-bold text-white transition-opacity duration-500 sm:text-2xl ${
            showFinal ? "opacity-100" : "opacity-0"
          }`}
        >
          Welcome &mdash; I&apos;m <span className="text-teal-300">Aidil Rozaidi</span>, Software Engineer.
        </div>
      </div>

      <button
        type="button"
        onClick={dismiss}
        className="absolute bottom-5 right-5 z-10 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:border-teal-300/40 hover:text-white sm:bottom-8 sm:right-8"
      >
        Skip &#8677;
      </button>
    </div>
  );
};

export default IntroLoader;
