export function SectionHeading({
  index,
  label,
  title,
  className = "mb-7 lg:mb-12",
}: {
  index: string
  label: string
  title: string
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 lg:gap-3 ${className}`}>
      <span className="label !text-accent">
        {index} / {label}
      </span>
      <h2 className="section-title">{title}</h2>
    </div>
  )
}
