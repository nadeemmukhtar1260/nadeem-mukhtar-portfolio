import { SignalArcs } from "@/components/field-fx"
import { profile } from "@/lib/data"

export function Contact({ index = "05" }: { index?: string }) {
  const { linkedin, github } = profile.socials

  return (
    <section
      id="contact"
      className="flex flex-col items-stretch gap-[18px] border-t border-border py-16 sm:items-start lg:gap-6 lg:py-28"
    >
      <span className="label !text-accent">{index} / Contact</span>
      <h2
        className="max-w-[760px] text-[34px] font-semibold leading-[1.12] tracking-[-0.02em] lg:text-[52px] lg:leading-[1.1] lg:tracking-[-0.025em]"
        style={{ textWrap: "balance" }}
      >
        {profile.contact.heading}
      </h2>
      <p className="max-w-[520px] text-muted-foreground lg:text-lg">{profile.contact.note}</p>

      <div className="mt-2 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-3.5">
        <a className="btn btn-primary col-span-2" href={`mailto:${profile.email}`}>
          <span className="relative inline-flex">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <SignalArcs />
          </span>
          <span>Email me</span>
        </a>
        <a
          className={`btn btn-secondary ${github ? "" : "col-span-2"}`}
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
        {/* Shown once profile.socials.github is filled in. */}
        {github && (
          <a className="btn btn-secondary" href={github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        )}
      </div>

      <div className="flex flex-col font-mono text-[13px] text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6 lg:text-sm">
        <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center">
          {profile.email}
        </a>
        <a href={profile.phone.href} className="inline-flex min-h-11 items-center">
          {profile.phone.display}
        </a>
      </div>
    </section>
  )
}
