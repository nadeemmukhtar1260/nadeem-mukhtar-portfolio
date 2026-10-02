"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { navLinks, profile } from "@/lib/data"
import { LogoMark } from "@/components/logo"

type Theme = "dark" | "light"

function ThemeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
    </svg>
  )
}

export function Header() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark")
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("light", next === "light")
    try {
      localStorage.setItem("theme", next)
    } catch {
      // storage unavailable: the choice still applies for this visit
    }
    setTheme(next)
  }

  const themeLabel = theme === "dark" ? "Light" : "Dark"

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-6 px-5 lg:h-[72px] lg:px-8"
      >
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="inline-flex min-h-11 items-center gap-2.5 lg:gap-3"
        >
          <LogoMark size={36} className="shrink-0 text-accent lg:h-10 lg:w-10" />
          <span className="flex flex-col gap-1 leading-none">
            <span className="text-[15px] font-semibold tracking-[-0.01em] lg:text-base">
              {profile.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground lg:text-[11px]">
              {profile.title}
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <Link key={item.href} className="navlink" href={item.href}>
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${themeLabel.toLowerCase()} theme`}
            suppressHydrationWarning
            className="btn btn-secondary ml-3 min-h-11 px-3.5 text-sm"
          >
            <ThemeIcon />
            <span suppressHydrationWarning>{themeLabel}</span>
          </button>
        </div>

        {/* Mobile */}
        <div className="flex gap-2 lg:hidden">
          <button
            type="button"
            className="iconbtn"
            onClick={toggleTheme}
            aria-label={`Switch to ${themeLabel.toLowerCase()} theme`}
            suppressHydrationWarning
          >
            <ThemeIcon />
          </button>
          <button
            type="button"
            className="iconbtn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="flex flex-col border-t border-border bg-background px-5 py-2 lg:hidden"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center border-b border-border text-base last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
