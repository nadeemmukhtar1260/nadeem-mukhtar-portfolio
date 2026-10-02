import { education, languages } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"

export function Education() {
  return (
    <section id="education" className="section">
      <SectionHeading index="04" label="Education" title="Education and languages" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        {education.map((item) => (
          <div key={item.title} className="card flex flex-col gap-1 p-[22px] lg:gap-1.5 lg:p-7">
            <span className="label">{item.period}</span>
            <h3 className="text-lg font-semibold lg:text-xl">{item.title}</h3>
            <p className="text-[15px] text-muted-foreground lg:text-base">{item.school}</p>
            {item.note && (
              <span className="tag mt-2 self-start !whitespace-normal !border-accent !text-accent">
                {item.note}
              </span>
            )}
          </div>
        ))}
        <div className="col-span-full flex flex-col border-t border-border">
          {languages.map((language) => (
            <div
              key={language.name}
              className="flex flex-col gap-0.5 border-b border-border py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 lg:py-[18px]"
            >
              <span className="font-medium">{language.name}</span>
              <span className="label">{language.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
