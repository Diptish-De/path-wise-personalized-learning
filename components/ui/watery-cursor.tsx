"use client"

import { useEffect } from "react"

export default function WateryCursor() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      // update css vars on root for the effect
      document.documentElement.style.setProperty("--cursor-x", `${x}px`)
      document.documentElement.style.setProperty("--cursor-y", `${y}px`)
      document.documentElement.style.setProperty("--cursor-opacity", `1`)
    }

    const onLeave = () => {
      document.documentElement.style.setProperty("--cursor-opacity", `0`)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    window.addEventListener("blur", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("blur", onLeave)
    }
  }, [])

  // This component only provides global mouse tracking via CSS variables.
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <div className="cursor-water" />
    </div>
  )
}
