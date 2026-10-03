"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * The experience list. When it scrolls into view the line draws itself from
 * top to bottom and each dot fills as the line reaches it (once). Without
 * JavaScript, or under prefers-reduced-motion, it simply shows the finished state.
 */
export function Timeline({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    el.classList.add("tl-wait")
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.replace("tl-wait", "tl-in")
        observer.disconnect()
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      el.classList.remove("tl-wait", "tl-in")
    }
  }, [])

  return (
    <ol ref={ref} className={`tl ${className}`}>
      {children}
    </ol>
  )
}
