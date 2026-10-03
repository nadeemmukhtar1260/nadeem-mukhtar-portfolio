import type { ReactNode } from "react"

import { BrowserFx, DatabaseFx, RequestLine } from "@/components/field-fx"
import { skills } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"

/** Decorative animation beside a skill heading, by category. Database and browser are desktop only. */
const categoryFx: Record<string, ReactNode> = {
  Backend: <RequestLine />,
  "Data and cloud": <DatabaseFx className="hidden lg:block" />,
  "Frontend and tools": <BrowserFx className="hidden lg:block" />,
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading index="02" label="Skills" title="What I work with" />
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {skills.map((group) => (
          <div
            key={group.category}
            className={`flex flex-col gap-3 border-t-2 pt-4 lg:gap-4 lg:pt-5 ${
              group.primary ? "border-accent" : "border-border"
            }`}
          >
            <div className="relative">
              <h3 className="text-[17px] font-semibold lg:text-lg">{group.category}</h3>
              {categoryFx[group.category]}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
