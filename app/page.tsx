import { Header } from "@/components/header"
import { ClientStrip } from "@/components/client-strip"
import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { Education } from "@/components/sections/education"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"

export default function Home() {
  return (
    <>
      <Header />
      <ClientStrip />
      <main id="top" tabIndex={-1} className="mx-auto max-w-[1120px] px-5 focus:outline-none lg:px-8">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
