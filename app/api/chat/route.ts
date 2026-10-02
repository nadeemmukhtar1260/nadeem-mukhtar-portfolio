import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { groq } from "@ai-sdk/groq"

import { buildSystemPrompt } from "@/lib/system-prompt"
import { checkRateLimit } from "@/lib/rate-limit"

export const runtime = "edge"

const SESSION_COOKIE = "chat_session_id"
const SESSION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
// Keep each request small: the assistant only answers short portfolio questions.
const MAX_HISTORY = 12
const MAX_MESSAGE_CHARS = 500
const MAX_BODY_CHARS = 32_000
const MODEL_ID = process.env.GROQ_MODEL ?? "openai/gpt-oss-20b"

function json(error: string, status: number) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  })
}

/**
 * Keeps only what the model should see: user and assistant turns, plain text,
 * one trimmed part per message. Anything else a client sends (system messages,
 * tool or file parts, oversized text) is dropped.
 */
function sanitize(input: unknown): UIMessage[] {
  if (!Array.isArray(input)) return []
  const clean: UIMessage[] = []
  for (const raw of input.slice(-MAX_HISTORY)) {
    if (!raw || typeof raw !== "object") continue
    const { id, role, parts } = raw as { id?: unknown; role?: unknown; parts?: unknown }
    if (role !== "user" && role !== "assistant") continue
    if (!Array.isArray(parts)) continue
    const text = parts
      .filter(
        (part): part is { type: "text"; text: string } =>
          !!part && part.type === "text" && typeof part.text === "string"
      )
      .map((part) => part.text)
      .join("\n")
      .trim()
      .slice(0, MAX_MESSAGE_CHARS)
    if (!text) continue
    clean.push({
      id: typeof id === "string" ? id.slice(0, 64) : crypto.randomUUID(),
      role,
      parts: [{ type: "text", text }],
    })
  }
  return clean
}

export async function POST(req: Request) {
  // Only this site's own pages may call the assistant.
  const origin = req.headers.get("origin")
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host")
  if (origin && host) {
    let originHost = ""
    try {
      originHost = new URL(origin).host
    } catch {
      // malformed Origin header: treated as a mismatch below
    }
    if (originHost !== host) return json("This assistant only works on this website.", 403)
  }

  // Without a key every request fails; say so plainly instead of a generic error.
  if (!process.env.GROQ_API_KEY) {
    console.error("[chat] GROQ_API_KEY is not set. Add it to .env.local and restart the server.")
    return json(
      "The assistant isn't set up yet. Please use the contact details on this page instead.",
      503
    )
  }

  const rawBody = await req.text().catch(() => "")
  if (rawBody.length > MAX_BODY_CHARS) {
    return json("That message is too long. Please ask a shorter question.", 413)
  }

  let body: { messages?: unknown } | null = null
  try {
    body = JSON.parse(rawBody)
  } catch {
    body = null
  }

  const messages = sanitize(body?.messages)
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return json("Please type a question.", 400)
  }

  // --- session identification (cookie-based, no auth) ---
  const cookieValue = (req.headers.get("cookie") ?? "")
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`))
    ?.split("=")[1]
  const existingSessionId = cookieValue && SESSION_ID_PATTERN.test(cookieValue) ? cookieValue : null
  const sessionId = existingSessionId ?? crypto.randomUUID()

  // --- rate limit check (per session and per IP address) ---
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown"
  const { allowed, remaining, limit } = checkRateLimit(sessionId, ip)

  if (!allowed) {
    return json(
      `You've hit the limit of ${limit} messages for this session. Please reach out directly instead.`,
      429
    )
  }

  // --- build system prompt from /lib/data.ts and stream the response ---
  try {
    const result = streamText({
      model: groq(MODEL_ID),
      system: buildSystemPrompt(),
      temperature: 0.3,
      maxOutputTokens: 400,
      messages: await convertToModelMessages(messages),
    })

    const response = result.toUIMessageStreamResponse({
      sendReasoning: false,
      onError: (error) => {
        console.error("[chat] model request failed:", error)
        return "The assistant couldn't answer just now."
      },
      headers: {
        "Cache-Control": "no-store",
        "X-RateLimit-Remaining": String(remaining),
        "X-RateLimit-Limit": String(limit),
      },
    })

    if (!existingSessionId) {
      const secure = process.env.NODE_ENV === "production" ? "; Secure" : ""
      response.headers.append(
        "Set-Cookie",
        `${SESSION_COOKIE}=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 6}${secure}`
      )
    }

    return response
  } catch (error) {
    console.error("[chat] request could not be processed:", error)
    return json("The assistant couldn't answer just now. Please try again.", 500)
  }
}
