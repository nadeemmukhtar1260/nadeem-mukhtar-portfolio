import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { profile, projects, serviceDetailPage as copy, services } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectionHeading } from "@/components/section-heading"
import { ProjectCard } from "@/components/project-card"
import { Contact } from "@/components/sections/contact"
import { ChatWidget } from "@/components/chat-widget"
import { pageMetadata } from "@/lib/site"

type Params = { params: { slug: string } }

// One static page per service in lib/data.ts; any other slug is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return {}
  return {
    title: service.title,
    ...pageMetadata({
      title: `${service.title} · ${profile.name}`,
      description: service.summary,
      path: `/services/${service.slug}`,
    }),
  }
}

const index = (n: number) => String(n).padStart(2, "0")

export default function ServicePage({ params }: Params) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  const related = service.projects
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p))
  const others = services.filter((s) => s.slug !== service.slug)
  const showWork = related.length > 0 || Boolean(service.proof)

  let n = 0

  return (
    <>
      <Header />
      <main id="top" tabIndex={-1} className="mx-auto max-w-[1120px] px-5 focus:outline-none lg:px-8">
        <section
          aria-label="Introduction"
          className="flex flex-col gap-5 pb-16 pt-12 lg:gap-7 lg:pb-28 lg:pt-[104px]"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="label !text-accent">{service.category}</span>
            {service.primary && (
              <span className="tag !border-accent !text-accent">{copy.primaryTag}</span>
            )}
          </div>
          <h1
            className="max-w-[820px] text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] lg:text-[68px] lg:leading-[1.04]"
            style={{ textWrap: "balance" }}
          >
            {service.title}
          </h1>
          <p className="max-w-[640px] text-xl font-medium leading-[1.3] lg:text-[26px]">
            {service.summary}
          </p>
          <p className="max-w-[560px] text-muted-foreground lg:text-lg">{service.overview}</p>
          <div className="flex flex-wrap gap-2">
            {service.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-3.5">
            <a className="btn btn-primary" href="#contact">
              {copy.startCta}
            </a>
            <Link className="btn btn-secondary" href="/services">
              {copy.backCta}
            </Link>
          </div>
        </section>

        <section id="details" className="section">
          <SectionHeading index={index(++n)} label={copy.details.label} title={copy.details.title} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {service.details.map((detail) => (
              <div
                key={detail.title}
                className="card flex h-full flex-col gap-2 p-[22px] lg:gap-3 lg:p-8"
              >
                <h3 className="text-[21px] font-semibold leading-tight lg:text-2xl">
                  {detail.title}
                </h3>
                <p className="text-[15px] leading-[1.55] text-muted-foreground lg:text-[15.5px]">
                  {detail.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="fit"
          className="section lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12"
        >
          <SectionHeading
            index={index(++n)}
            label={copy.fit.label}
            title={copy.fit.title}
            className="mb-7 lg:mb-0"
          />
          <ul className="flex list-none flex-col border-t border-border">
            {service.fit.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-border py-4 lg:py-[18px] lg:text-lg"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {showWork && (
          <section id="work" className="section">
            <SectionHeading index={index(++n)} label={copy.work.label} title={copy.work.title} />
            {related.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
                {related.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              <div className="card flex flex-col gap-1 p-[22px] lg:flex-row lg:items-baseline lg:gap-3 lg:p-8">
                <span className="label">{copy.proofLabel}</span>
                <span className="text-[15px] font-medium">{service.proof}</span>
              </div>
            )}
          </section>
        )}

        <section id="other-services" className="section">
          <SectionHeading index={index(++n)} label={copy.other.label} title={copy.other.title} />
          <ul className="flex list-none flex-col border-t border-border">
            {others.map((other) => (
              <li key={other.slug} className="border-b border-border">
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex min-h-12 flex-col gap-0.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 lg:py-[18px]"
                >
                  <span className="font-medium transition-colors group-hover:text-accent">
                    {other.title}
                  </span>
                  <span className="label">{other.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Contact index={index(++n)} />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
