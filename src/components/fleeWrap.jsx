"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// Wraps a child and makes it flee from the cursor: the closer the pointer
// gets, the harder the element pushes away, springing back once the cursor
// moves out of range. Tracks the cursor globally (not just on hover) so the
// dodge kicks in before the pointer actually reaches the element.
const FleeWrap = ({ children, className = "", strength = 90, radius = 170 }) => {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 })
    const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 })

    useEffect(() => {
        const handlePointerMove = (event) => {
            const rect = ref.current?.getBoundingClientRect()
            if (!rect) return

            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const dx = centerX - event.clientX
            const dy = centerY - event.clientY
            const distance = Math.hypot(dx, dy)

            if (distance < radius && distance > 0.01) {
                const force = (1 - distance / radius) * strength
                x.set((dx / distance) * force)
                y.set((dy / distance) * force)
            } else {
                x.set(0)
                y.set(0)
            }
        }

        window.addEventListener("pointermove", handlePointerMove)
        return () => window.removeEventListener("pointermove", handlePointerMove)
    }, [radius, strength, x, y])

    return (
        <motion.div ref={ref} className={className} style={{ x: springX, y: springY }}>
            {children}
        </motion.div>
    )
}

export default FleeWrap
