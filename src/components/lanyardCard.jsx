"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FleeWrap from "./fleeWrap";

const LanyardCard = () => {
  return (
    <motion.div
      className="absolute inset-x-0 top-8 mx-auto h-[66%] w-[68%] max-w-[350px] sm:top-12 sm:w-[64%]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { delay: 0.15, duration: 0.7, ease: "easeOut" },
        y: { delay: 0.15, duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <FleeWrap strength={110} radius={190} className="h-full w-full">
        <motion.div
          className="group relative h-full w-full overflow-hidden rounded-xl border-[3px] border-black bg-white shadow-2xl"
          initial={{ rotate: -8 }}
          animate={{ rotate: [-6, -9, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute right-5 top-0 z-10 h-4 w-7 rounded-b-sm bg-black" aria-hidden="true" />

          <div className="relative flex h-full w-full">
            <div className="flex w-8 flex-shrink-0 flex-col items-center justify-center gap-2 border-r border-black/10 bg-white sm:w-9">
              <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-[11px] font-black uppercase tracking-[0.15em] text-black">
                Aidil Rozaidi
              </span>
              <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.2em] text-black/45">
                Software Eng.
              </span>
            </div>

            <div className="relative flex-1">
              <Image
                src="/graduation-photo.jpg"
                alt="Aidil professional portrait"
                fill
                priority
                draggable={false}
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 45vw, 350px"
                className="object-cover"
                style={{ objectPosition: "50% 28%" }}
              />
              <span
                className="absolute bottom-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.9)]"
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.div>
      </FleeWrap>
    </motion.div>
  );
};

export default LanyardCard;
