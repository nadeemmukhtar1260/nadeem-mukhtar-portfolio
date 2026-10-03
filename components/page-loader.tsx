"use client"

import { useEffect, useRef, useState } from "react"

/** Shortest and longest time the intro stays up, in ms. */
const MIN_MS = 900
const MAX_MS = 3000
/** Must match the exit transition in app/globals.css (.page-loader.is-leaving). */
const EXIT_MS = 700

/**
 * Landing-page intro. A full-screen cover with the NM mark: the mark draws
 * itself and a counter runs to 100 as the page really becomes ready (fonts
 * loaded, then the window load event), then the cover lifts and the hero
 * animates in.
 *
 * Shown once per browser tab session. It is skipped (see the inline script in
 * app/layout.tsx) on later visits in the same session and under
 * prefers-reduced-motion. If JavaScript never runs, CSS removes the cover by
 * itself, so the page can never stay hidden.
 */
export function PageLoader() {
  const [gone, setGone] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const mark = useRef<SVGPathElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const html = document.documentElement
    if (html.classList.contains("loader-skip")) {
      setGone(true)
      return
    }

    // Real readiness: 0.2 once this code runs, 0.6 with fonts, 1 on window load.
    let ready = 0.2
    let cancelled = false
    document.fonts?.ready.then(() => {
      ready = Math.max(ready, 0.6)
    })
    const onLoad = () => {
      ready = 1
    }
    if (document.readyState === "complete") onLoad()
    else window.addEventListener("load", onLoad, { once: true })

    html.style.overflow = "hidden"
    const start = performance.now()
    let shown = 0
    let frame = 0
    let exitTimer = 0

    const paint = (p: number) => {
      if (mark.current) mark.current.style.strokeDashoffset = String(1 - p)
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      if (count.current) count.current.textContent = String(Math.round(p * 100)).padStart(3, "0")
    }

    const finish = () => {
      paint(1)
      html.style.overflow = ""
      html.classList.add("loader-done")
      try {
        sessionStorage.setItem("intro-seen", "1")
      } catch {}
      root.current?.classList.add("is-leaving")
      exitTimer = window.setTimeout(() => {
        // Later in-app visits to the home page must not replay the intro.
        html.classList.add("loader-skip")
        setGone(true)
      }, EXIT_MS + 50)
    }

    const tick = (now: number) => {
      if (cancelled) return
      const elapsed = now - start
      const timedOut = elapsed >= MAX_MS
      // Never run ahead of what has really loaded, never finish before MIN_MS.
      const target = timedOut ? 1 : Math.min(ready, elapsed / MIN_MS)
      shown += (target - shown) * 0.16
      if (target === 1 && shown > 0.995) {
        finish()
        return
      }
      paint(shown)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.clearTimeout(exitTimer)
      window.removeEventListener("load", onLoad)
      html.style.overflow = ""
    }
  }, [])

  if (gone) return null

  return (
    <div ref={root} className="page-loader" aria-hidden="true">
      <noscript>
        <style>{".page-loader{display:none}"}</style>
      </noscript>
      <div className="page-loader-inner">
        <svg width="72" height="72" viewBox="0 0 64 64" fill="none" focusable="false">
          <path className="page-loader-track" d="M14 44V20L28 52V12L39 34L50 20V44" />
          <path
            ref={mark}
            className="page-loader-mark"
            pathLength={1}
            d="M14 44V20L28 52V12L39 34L50 20V44"
          />
        </svg>
        <span className="page-loader-bar">
          <span ref={bar} />
        </span>
        <span ref={count} className="page-loader-count">
          000
        </span>
      </div>
    </div>
  )
}
