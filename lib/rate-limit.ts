/**
 * Minimal in-memory rate limiter for the Edge runtime.
 *
 * Two fixed windows are checked for every chat message: one per visitor
 * session (cookie) and one per IP address, so clearing the cookie does not
 * reset the allowance. The Map lives for the lifetime of a single Edge
 * function instance: good enough to stop casual abuse on a portfolio site,
 * but not durable or shared across instances/regions. For a hard guarantee,
 * swap this for an Upstash Redis-backed limiter and set a spend limit in the
 * Groq console.
 */

export const SESSION_LIMIT = 20
const IP_LIMIT = 60
const WINDOW_MS = 1000 * 60 * 60 * 6 // 6 hours
const MAX_BUCKETS = 5000

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

function prune(now: number) {
  if (buckets.size < MAX_BUCKETS) return
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt < now) buckets.delete(key)
  })
  // Still full of live buckets: drop the oldest entries.
  const keys = Array.from(buckets.keys())
  for (let i = 0; buckets.size >= MAX_BUCKETS && i < keys.length; i++) {
    buckets.delete(keys[i])
  }
}

function peek(key: string, limit: number, now: number): number {
  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt < now) return limit
  return Math.max(0, limit - bucket.count)
}

function hit(key: string, now: number) {
  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
  } else {
    bucket.count += 1
  }
}

export function checkRateLimit(
  sessionId: string,
  ip: string
): {
  allowed: boolean
  remaining: number
  limit: number
} {
  const now = Date.now()
  prune(now)

  const sessionKey = `s:${sessionId}`
  const ipKey = `ip:${ip}`
  const remaining = Math.min(peek(sessionKey, SESSION_LIMIT, now), peek(ipKey, IP_LIMIT, now))

  if (remaining <= 0) {
    return { allowed: false, remaining: 0, limit: SESSION_LIMIT }
  }

  hit(sessionKey, now)
  hit(ipKey, now)
  return { allowed: true, remaining: remaining - 1, limit: SESSION_LIMIT }
}
