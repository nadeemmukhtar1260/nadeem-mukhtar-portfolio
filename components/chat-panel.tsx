"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Send, Sparkles } from "lucide-react"

import { chat } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/** Loaded on demand by ChatWidget the first time the chat is opened. */
export function ChatPanel({ id, open }: { id: string; open: boolean }) {
  const [input, setInput] = useState("")
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: async (err) => {
      // The route returns a JSON { error } body for limits and bad requests;
      // surface that message specifically.
      try {
        const parsed = JSON.parse(err.message)
        if (parsed?.error) {
          setRateLimitMessage(parsed.error)
          return
        }
      } catch {
        // not a JSON payload: fall through to the generic error UI
      }
    },
  })

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, status])

  // Move keyboard focus into the panel when it opens.
  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true })
  }, [open])

  const isBusy = status === "streaming" || status === "submitted"

  function handleSend(text: string) {
    const value = text.trim()
    if (!value || isBusy) return
    setRateLimitMessage(null)
    sendMessage({ text: value })
    setInput("")
  }

  return (
    <div
      id={id}
      role="dialog"
      aria-label={chat.title}
      data-open={open}
      className="chat-panel fixed bottom-24 right-6 z-40 flex h-[32rem] max-h-[calc(100dvh-7.5rem)] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl sm:w-96"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium">{chat.title}</p>
          <p className="text-xs text-muted-foreground">{chat.subtitle}</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{chat.greeting}</p>
            <div className="flex flex-col gap-2">
              {chat.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSend(s)}
                  className="relative rounded-md border border-border px-3 py-2 text-left text-xs text-foreground/80 transition-colors after:absolute after:inset-x-0 after:-inset-y-[5px] after:content-[''] hover:border-accent hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-relaxed",
              message.role === "user"
                ? "ml-auto bg-accent text-accent-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            {message.parts.map((part, i) =>
              part.type === "text" ? <span key={i}>{part.text}</span> : null
            )}
          </div>
        ))}

        {status === "submitted" && (
          <div
            aria-hidden="true"
            className="flex w-fit items-center gap-1 rounded-lg bg-secondary px-3 py-2"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="chat-dot h-1.5 w-1.5 rounded-full bg-muted-foreground"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}

        {rateLimitMessage && (
          <p
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
          >
            {rateLimitMessage}
          </p>
        )}

        {error && !rateLimitMessage && (
          <p
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
          >
            {chat.error}
          </p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSend(input)
        }}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={chat.inputPlaceholder}
          aria-label={chat.inputLabel}
          maxLength={500}
          disabled={isBusy || !!rateLimitMessage}
          className="h-9"
        />
        <Button
          type="submit"
          size="icon"
          variant="accent"
          disabled={isBusy || !input.trim() || !!rateLimitMessage}
          className="relative h-9 w-9 shrink-0 after:absolute after:-inset-1 after:content-['']"
          aria-label={chat.sendLabel}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>
    </div>
  )
}
