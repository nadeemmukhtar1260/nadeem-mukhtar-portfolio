"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { MessageCircle, X } from "lucide-react"

import { chat } from "@/lib/data"
import { Button } from "@/components/ui/button"

const PANEL_ID = "chat-panel"

// The conversation UI and the AI SDK load only when a visitor opens the chat,
// so they are not part of any page's first load.
const loadPanel = () => import("@/components/chat-panel")
const ChatPanel = dynamic(() => loadPanel().then((m) => m.ChatPanel), { ssr: false })

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  // Once opened the panel stays mounted, so the conversation survives closing it.
  const [loaded, setLoaded] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    launcherRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  function toggle() {
    setLoaded(true)
    setOpen((o) => !o)
  }

  return (
    <>
      <div className="chat-launcher fixed bottom-6 right-6 z-40">
        <Button
          ref={launcherRef}
          type="button"
          size="icon"
          variant="accent"
          onClick={toggle}
          onPointerEnter={loadPanel}
          onFocus={loadPanel}
          aria-label={open ? chat.closeLabel : chat.openLabel}
          aria-expanded={open}
          aria-controls={PANEL_ID}
          className="h-14 w-14 rounded-full shadow-lg"
        >
          <span
            key={open ? "close" : "open"}
            className="chat-icon"
            style={{ "--chat-icon-from": open ? "-90deg" : "90deg" } as React.CSSProperties}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
        </Button>
      </div>

      {loaded && <ChatPanel id={PANEL_ID} open={open} />}
    </>
  )
}
