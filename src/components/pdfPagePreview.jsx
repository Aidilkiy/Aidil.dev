"use client"

import { useEffect, useRef, useState } from "react"

// Renders a PDF's first page onto a canvas client-side, so every certificate
// (PDF or image) displays the same flat, full-size way in the preview modal
// -- no native browser PDF-viewer chrome, toolbars, or internal scrollbars.
const PdfPagePreview = ({ src, title }) => {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const [status, setStatus] = useState("loading") // "loading" | "ready" | "error"

    useEffect(() => {
        let cancelled = false
        let renderTask = null

        const render = async () => {
            try {
                const pdfjsLib = await import("pdfjs-dist")
                pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs"

                const pdf = await pdfjsLib.getDocument({ url: src }).promise
                if (cancelled) return
                const page = await pdf.getPage(1)
                if (cancelled) return

                const containerWidth = containerRef.current?.clientWidth || 800
                const baseViewport = page.getViewport({ scale: 1 })
                const scale = (containerWidth / baseViewport.width) * (window.devicePixelRatio || 1)
                const viewport = page.getViewport({ scale })

                const canvas = canvasRef.current
                if (!canvas) return
                canvas.width = viewport.width
                canvas.height = viewport.height
                canvas.style.width = `${containerWidth}px`
                canvas.style.height = `${(viewport.height / viewport.width) * containerWidth}px`

                const context = canvas.getContext("2d")
                renderTask = page.render({ canvasContext: context, viewport })
                await renderTask.promise
                if (!cancelled) setStatus("ready")
            } catch (err) {
                if (!cancelled) {
                    // eslint-disable-next-line no-console
                    console.error("[PdfPagePreview]", err)
                    setStatus("error")
                }
            }
        }

        render()

        return () => {
            cancelled = true
            renderTask?.cancel()
        }
    }, [src])

    return (
        <div ref={containerRef} className="relative flex h-full w-full items-center justify-center overflow-auto">
            {status === "error" ? (
                <p className="p-6 text-center text-sm font-semibold text-black/50">
                    Preview unavailable -- use &quot;Open original&quot; below.
                </p>
            ) : (
                <canvas
                    ref={canvasRef}
                    className={`max-w-full transition-opacity duration-300 ${status === "ready" ? "opacity-100" : "opacity-0"}`}
                    aria-label={title}
                />
            )}
            {status === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black/50" />
                </div>
            )}
        </div>
    )
}

export default PdfPagePreview
