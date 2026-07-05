"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const ResumeButton = ({ className = "" }) => {
    const [progress, setProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const timerRef = useRef(null)

    useEffect(() => {
        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current)
        }
    }, [])

    const downloadResume = () => {
        if (isLoading) return

        setIsLoading(true)
        setProgress(0)

        timerRef.current = window.setInterval(() => {
            setProgress((current) => {
                const next = Math.min(current + 4, 100)

                if (next === 100) {
                    window.clearInterval(timerRef.current)
                    timerRef.current = null

                    window.setTimeout(() => {
                        const link = document.createElement("a")
                        link.href = "/resume.pdf"
                        link.download = "Aidil-Rozaidi-CV.pdf"
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        setIsLoading(false)
                        setProgress(0)
                    }, 180)
                }

                return next
            })
        }, 28)
    }

    return (
        <button
            type="button"
            onClick={downloadResume}
            className={`group relative inline-flex min-h-[3.6rem] items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white/10 px-7 py-4 font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white ${className}`}
            aria-label="Download CV"
        >
            <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-black"
                initial={false}
                animate={{ width: isLoading ? `${progress}%` : "0%" }}
                transition={{ duration: 0.12, ease: "easeOut" }}
            />
            {!isLoading && (
                <>
                    <span className="absolute inset-0 translate-x-full bg-black/90 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-white/35 blur-xl transition-transform duration-700 group-hover:translate-x-[340%]" />
                </>
            )}
            <span className="relative z-10 flex items-center gap-3">
                <span>{isLoading ? `Downloading ${progress}%` : "Download CV"}</span>
                <span className={`flex h-7 min-w-7 items-center justify-center rounded-full text-xs transition-colors ${isLoading ? "bg-white text-black" : "bg-white text-black group-hover:bg-white group-hover:text-black"}`}>
                    {isLoading ? "%" : "\u2193"}
                </span>
            </span>
        </button>
    )
}

export default ResumeButton
