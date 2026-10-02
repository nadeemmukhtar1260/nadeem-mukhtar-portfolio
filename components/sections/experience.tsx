import { experience, withoutPlaceholder } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"

export function Experience() {
  return (
    <section
      id="experience"
      className="section lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12"
    >
      <SectionHeading index="03" label="Experience" title="Experience" className="mb-7 lg:mb-0" />
      <ol className="ml-1.5 flex list-none flex-col gap-8 border-l border-border lg:ml-0 lg:gap-10">
        {experience.map((entry) => (
          <li
            key={`${entry.company}-${entry.role}`}
            className="relative flex flex-col gap-1 pl-6 lg:gap-1.5 lg:pl-8"
          >
            <span
              aria-hidden="true"
              className="absolute -left-1.5 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-accent bg-background lg:top-2"
            />
            <span className="label">{withoutPlaceholder(entry.period)}</span>
            <h3 className="flex flex-col text-lg font-semibold leading-[1.3] lg:block lg:text-xl">
              {entry.role}
              <span className="text-[15px] font-normal text-muted-foreground lg:text-xl">
                <span className="hidden lg:inline"> · </span>
                {entry.company}
              </span>
            </h3>
            <p className="text-[15px] text-muted-foreground lg:text-base">{entry.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
