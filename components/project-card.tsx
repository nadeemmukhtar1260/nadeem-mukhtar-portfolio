import { NodeGraph } from "@/components/field-fx"
import { isPlaceholder, type Project } from "@/lib/data"

/** The card that carries the LLM-agents node graph in its top-right corner (desktop only). */
const GRAPH_SLUG = "ai-call-agent-platform"

function Row({ label, children, muted }: { label: string; children: string; muted?: boolean }) {
  return (
    <div className="flex flex-col gap-1 lg:grid lg:grid-cols-[84px_minmax(0,1fr)] lg:items-baseline lg:gap-3">
      <span className="label">{label}</span>
      <p className={`text-[15px] leading-[1.55] lg:text-[15.5px] ${muted ? "text-muted-foreground" : ""}`}>
        {children}
      </p>
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const inProgress = project.status === "In progress"
  const hasGraph = project.slug === GRAPH_SLUG

  return (
    <article className="card card-hover relative flex h-full flex-col gap-4 p-[22px] lg:gap-5 lg:p-8">
      {hasGraph && <NodeGraph className="hidden lg:block" />}
      {/* With the graph in the corner, the status tag sits beside the label on desktop. */}
      <div className={`flex items-center justify-between gap-3 ${hasGraph ? "lg:justify-start" : ""}`}>
        <span className="label">{project.category}</span>
        <span className={`tag ${inProgress ? "!border-accent !text-accent" : ""}`}>
          {project.status}
        </span>
      </div>
      <h3 className={`text-[21px] font-semibold leading-tight lg:text-2xl ${hasGraph ? "lg:pr-24" : ""}`}>
        {project.title}
      </h3>
      <div className="flex flex-col gap-3">
        {/* Unfilled [PLACEHOLDER] values in lib/data.ts are never shown. */}
        {!isPlaceholder(project.problem) && <Row label="Problem">{project.problem}</Row>}
        <Row label="Built">{project.built}</Row>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tech
          .filter((t) => !isPlaceholder(t))
          .map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
          ))}
      </div>
      <div className="mt-auto flex gap-6">
        {project.links
          .filter((l) => l.href)
          .map((l) => (
            <a key={l.label} className="link" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          ))}
      </div>
    </article>
  )
}
