"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector = [
    "a",
    "button",
    "input",
    "textarea",
    "select",
    "[role='button']",
    "[data-cursor='interactive']",
].join(",");

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isInteractive, setIsInteractive] = useState(false);
    const [isDesktopPointer, setIsDesktopPointer] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const smoothX = useSpring(cursorX, { stiffness: 420, damping: 34, mass: 0.4 });
    const smoothY = useSpring(cursorY, { stiffness: 420, damping: 34, mass: 0.4 });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
        const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        const updatePointerMode = () => {
            setIsDesktopPointer(mediaQuery.matches && !reducedMotionQuery.matches);
        };

        updatePointerMode();

        mediaQuery.addEventListener("change", updatePointerMode);
        reducedMotionQuery.addEventListener("change", updatePointerMode);

        return () => {
            mediaQuery.removeEventListener("change", updatePointerMode);
            reducedMotionQuery.removeEventListener("change", updatePointerMode);
        };
    }, []);

    useEffect(() => {
        if (!isDesktopPointer) return;

        const handleMove = (event) => {
            cursorX.set(event.clientX);
            cursorY.set(event.clientY);
            setIsVisible(true);
        };

        const handleOver = (event) => {
            setIsInteractive(Boolean(event.target?.closest?.(interactiveSelector)));
        };

        const handleOut = () => {
            setIsVisible(false);
            setIsInteractive(false);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseover", handleOver);
        window.addEventListener("mouseleave", handleOut);
        window.addEventListener("blur", handleOut);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseover", handleOver);
            window.removeEventListener("mouseleave", handleOut);
            window.removeEventListener("blur", handleOut);
        };
    }, [cursorX, cursorY, isDesktopPointer]);

    if (!isDesktopPointer) return null;

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-0 w-0 md:block"
            style={{ x: smoothX, y: smoothY }}
            aria-hidden="true"
        >
            <motion.span
                className="absolute rounded-full border border-cyan-200/70 bg-cyan-300/5 shadow-[0_0_28px_rgba(45,212,191,0.32)] backdrop-blur-[1px]"
                animate={{
                    x: isInteractive ? -22 : -14,
                    y: isInteractive ? -22 : -14,
                    width: isInteractive ? 44 : 28,
                    height: isInteractive ? 44 : 28,
                    opacity: isVisible ? 1 : 0,
                    scale: isInteractive ? 1.08 : 1,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
            />
            <motion.span
                className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.9)]"
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isInteractive ? 0.68 : 1,
                }}
                transition={{ duration: 0.14, ease: "easeOut" }}
            />
            <motion.span
                className="absolute h-1.5 w-1.5 rounded-full bg-rose-300/90 shadow-[0_0_14px_rgba(251,113,133,0.72)]"
                animate={{
                    x: isInteractive ? 16 : 10,
                    y: isInteractive ? -18 : -12,
                    opacity: isVisible ? 1 : 0,
                    scale: isInteractive ? 1.15 : 0.8,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />
        </motion.div>
    );
};

export default CustomCursor;
