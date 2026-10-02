import Image from "next/image"

import { callTrace, profile } from "@/lib/data"

const TRACE_MAX = 72

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="flex flex-col gap-10 pb-16 pt-12 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-[72px] lg:pb-28 lg:pt-[104px]"
    >
      <div className="flex flex-col gap-5 lg:gap-7">
        <span className="label !text-accent">{profile.role}</span>
        <h1 className="text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] lg:text-[68px] lg:leading-[1.04]">
          {profile.name}
        </h1>
        <p className="text-xl font-medium leading-[1.3] lg:text-[26px]">{profile.headline}</p>
        <p className="max-w-[520px] text-muted-foreground lg:text-lg">{profile.intro}</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-3.5">
          <a className="btn btn-primary" href="#projects">
            View projects
          </a>
          <a className="btn btn-secondary" href="#contact">
            Contact me
          </a>
        </div>
      </div>

      <figure className="m-0 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 lg:gap-5 lg:rounded-[20px] lg:p-5">
        <Image
          src={profile.portrait.src}
          alt={profile.portrait.alt}
          width={800}
          height={800}
          priority
          sizes="(min-width: 1024px) 420px, 100vw"
          className="block aspect-square w-full rounded-[10px] object-cover object-[center_20%] lg:rounded-xl"
        />
        <div className="flex items-center justify-between">
          <span className="label">call_trace</span>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-accent lg:text-[12.5px]">
            <span className="h-2 w-2 rounded-full bg-accent" />
            live
          </span>
        </div>
        <div aria-hidden="true" className="flex h-14 items-center justify-between lg:h-[72px]">
          {callTrace.map((height, i) => (
            <div
              key={i}
              className="w-[3px] rounded-sm bg-accent lg:w-1"
              style={{ height: `${(height / TRACE_MAX) * 100}%` }}
            />
          ))}
        </div>
      </figure>
    </section>
  )
}
