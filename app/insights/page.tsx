import type { Metadata } from "next"
import Link from "next/link"

import { insights, insightsPage, profile } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectionHeading } from "@/components/section-heading"
import { Contact } from "@/components/sections/contact"
import { ChatWidget } from "@/components/chat-widget"
import { pageMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "Insights",
  ...pageMetadata({
    title: `Insights · ${profile.name}`,
    description: insightsPage.intro,
    path: "/insights",
  }),
}

export default function InsightsPage() {
  return (
    <>
      <Header />
      <main id="top" tabIndex={-1} className="mx-auto max-w-[1120px] px-5 focus:outline-none lg:px-8">
        <section
          aria-label="Introduction"
          className="load-seq flex flex-col gap-5 pb-16 pt-12 lg:gap-7 lg:pb-28 lg:pt-[104px]"
        >
          <span className="label !text-accent">{insightsPage.label}</span>
          <h1
            className="max-w-[820px] text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] lg:text-[68px] lg:leading-[1.04]"
            style={{ textWrap: "balance" }}
          >
            {insightsPage.heading}
          </h1>
          <p className="max-w-[560px] text-muted-foreground lg:text-lg">{insightsPage.intro}</p>
        </section>

        <section id="insights" className="section">
          <SectionHeading index="01" label="Insights" title="Articles" />
          {insights.length === 0 ? (
            <div className="card flex flex-col items-start gap-3 p-[22px] lg:gap-4 lg:p-8">
              <span className="tag !border-accent !text-accent">In progress</span>
              <h3 className="text-[21px] font-semibold leading-tight lg:text-2xl">
                {insightsPage.empty.title}
              </h3>
              <p className="max-w-[560px] text-[15px] leading-[1.55] text-muted-foreground lg:text-base">
                {insightsPage.empty.body}
              </p>
              <Link className="link" href="/#projects">
                View work ↗
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              {insights.map((post) => (
                <article
                  key={post.slug}
                  className="card card-hover flex h-full flex-col gap-4 p-[22px] lg:gap-5 lg:p-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="label">{post.topic}</span>
                    <span className="tag">{post.date}</span>
                  </div>
                  <h3 className="text-[21px] font-semibold leading-tight lg:text-2xl">
                    {post.title}
                  </h3>
                  <p className="text-[15px] leading-[1.55] text-muted-foreground lg:text-[15.5px]">
                    {post.summary}
                  </p>
                  {post.href && (
                    <a
                      className="link mt-auto"
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read article ↗
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        <Contact index="02" />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
