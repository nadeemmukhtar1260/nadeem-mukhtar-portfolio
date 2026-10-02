# Nadeem Mukhtar · Portfolio

Next.js 14 (App Router), TypeScript and Tailwind. All site copy lives in `lib/data.ts`.

## Run locally

```bash
npm install
cp .env.local.example .env.local   # then add your Groq key
npm run dev
```

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `GROQ_API_KEY` | For the chat assistant | Groq API key. Without it the chat shows a "not set up" message. |
| `GROQ_MODEL` | No | Overrides the default model (`openai/gpt-oss-20b`). |
| `NEXT_PUBLIC_SITE_URL` | In production | Public address, e.g. `https://example.com`. Used for canonical URLs, the sitemap, robots.txt, share cards and JSON-LD. On Vercel it falls back to the project's production domain. |

Never commit `.env.local`. Set the same variables in the hosting dashboard.

## Deploy

1. Push the repository and import it in Vercel (or any Node host: `npm run build`, then `npm run start`).
2. Add the environment variables above.
3. After the first deploy, check `/sitemap.xml`, `/robots.txt` and a share preview of the home page.

## Where things are

- `lib/data.ts`: every line of copy, the projects, services, and SEO text. Values in `[SQUARE BRACKETS]` are unfilled and are hidden on the site.
- `lib/site.ts`, `lib/structured-data.ts`, `app/sitemap.ts`, `app/robots.ts`: SEO.
- `public/og.png`: the 1200x630 share image. Regenerate it if the name, headline or portrait changes.
- `app/api/chat/route.ts`, `lib/system-prompt.ts`, `lib/rate-limit.ts`: the chat assistant.
