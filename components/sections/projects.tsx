import { projects } from "@/lib/data"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"

export function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading index="01" label="Projects" title="Featured projects" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
