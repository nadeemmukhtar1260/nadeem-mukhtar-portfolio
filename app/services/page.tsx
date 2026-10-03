import type { Metadata } from "next"
import Link from "next/link"

import { faq, faqSection, process, profile, services, servicesPage } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectionHeading } from "@/components/section-heading"
import { Contact } from "@/components/sections/contact"
import { ChatWidget } from "@/components/chat-widget"
import { pageMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "Services",
  ...pageMetadata({
    title: `Services · ${profile.name}`,
    description: servicesPage.description,
    path: "/services",
  }),
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="top" tabIndex={-1} className="mx-auto max-w-[1120px] px-5 focus:outline-none lg:px-8">
        <section
          aria-label="Introduction"
          className="load-seq flex flex-col gap-5 pb-16 pt-12 lg:gap-7 lg:pb-28 lg:pt-[104px]"
        >
          <span className="label !text-accent">{servicesPage.label}</span>
          <h1
            className="max-w-[820px] text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] lg:text-[68px] lg:leading-[1.04]"
            style={{ textWrap: "balance" }}
          >
            {servicesPage.heading}
          </h1>
          <p className="max-w-[640px] text-xl font-medium leading-[1.3] lg:text-[26px]">
            {servicesPage.headline}
          </p>
          <p className="max-w-[560px] text-muted-foreground lg:text-lg">{servicesPage.intro}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-3.5">
            <a className="btn btn-primary" href="#contact">
              Start a project
            </a>
            <Link className="btn btn-secondary" href="/#projects">
              View projects
            </Link>
          </div>
        </section>

        <section id="services" className="section">
          <SectionHeading index="01" label="Services" title="Services" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {services.map((service) => (
              <article
                key={service.slug}
                className="card card-hover relative flex h-full flex-col gap-4 p-[22px] lg:gap-5 lg:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="label">{service.category}</span>
                  {service.primary && <span className="tag !border-accent !text-accent">Main focus</span>}
                </div>
                <h3 className="text-[21px] font-semibold leading-tight lg:text-2xl">
                  {/* The link's ::after covers the card, so the whole card is clickable. */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="text-[15px] leading-[1.55] lg:text-[15.5px]">{service.summary}</p>
                <ul className="flex list-none flex-col gap-2.5">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-[1.55] text-muted-foreground lg:text-[15.5px]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                {service.proof && (
                  <div className="mt-auto flex flex-col gap-1 border-t border-border pt-4 lg:flex-row lg:items-baseline lg:gap-3">
                    <span className="label">Seen in</span>
                    <span className="text-[15px] font-medium">{service.proof}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section">
          <SectionHeading index="02" label="Process" title="How a project runs" />
          <ol className="grid list-none grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map((step, i) => (
              <li
                key={step.title}
                className={`flex flex-col gap-2 border-t-2 pt-4 lg:gap-3 lg:pt-5 ${
                  i === 0 ? "border-accent" : "border-border"
                }`}
              >
                <span className="label">Step {i + 1}</span>
                <h3 className="text-[17px] font-semibold lg:text-lg">{step.title}</h3>
                <p className="text-[15px] text-muted-foreground lg:text-base">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="faq"
          className="section lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12"
        >
          <SectionHeading
            index="03"
            label={faqSection.label}
            title={faqSection.title}
            className="mb-7 lg:mb-0"
          />
          <dl className="flex flex-col border-t border-border">
            {faq.map((item) => (
              <div
                key={item.question}
                className="flex flex-col gap-1.5 border-b border-border py-4 lg:gap-2 lg:py-[18px]"
              >
                <dt className="text-[17px] font-semibold lg:text-lg">{item.question}</dt>
                <dd className="text-[15px] text-muted-foreground lg:text-base">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }).replace(/</g, "\\u003c"),
          }}
        />

        <Contact index="04" />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
