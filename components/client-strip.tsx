import fs from "node:fs"
import path from "node:path"

import { clients, type Client } from "@/lib/data"

/**
 * Returns the public URL of a logo for this client if a file exists in
 * /public/logos (svg, png or webp, named after the slug); otherwise null and
 * the name is shown as text.
 */
function findLogo(slug: string): string | null {
  for (const ext of ["svg", "png", "webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "logos", `${slug}.${ext}`))) {
      return `/logos/${slug}.${ext}`
    }
  }
  return null
}

function Item({ client, hidden }: { client: Client; hidden?: boolean }) {
  const logo = findLogo(client.slug)
  return (
    <li aria-hidden={hidden} className="flex shrink-0 items-center gap-8 pr-8 lg:gap-10 lg:pr-10">
      <span className="flex items-center gap-2.5">
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" className="h-6 w-auto max-w-[120px] object-contain" />
        )}
        <span className="flex flex-col leading-tight">
          <span className="whitespace-nowrap text-[15px] font-medium">{client.name}</span>
          {client.company && (
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              {client.company}
            </span>
          )}
        </span>
      </span>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
    </li>
  )
}

export function ClientStrip() {
  return (
    <section aria-label="Companies and products I have built for" className="border-b border-border">
      <div className="mx-auto flex max-w-[1120px] items-center gap-5 px-5 lg:gap-8 lg:px-8">
        <span className="label shrink-0 py-5 !text-accent">Built for</span>
        <div
          className="marquee min-w-0 flex-1"
          tabIndex={0}
          role="group"
          aria-label="Scrolling list, pauses while focused"
        >
          <ul className="marquee-track list-none items-center py-3">
            {clients.map((c) => (
              <Item key={c.slug} client={c} />
            ))}
            {clients.map((c) => (
              <Item key={`${c.slug}-repeat`} client={c} hidden />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
