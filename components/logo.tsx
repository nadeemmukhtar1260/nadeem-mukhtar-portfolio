import type { SVGProps } from "react"

/**
 * NM monogram drawn as a voice waveform. Uses currentColor, so wrap it in
 * `text-accent` (teal on dark, deep teal on light) or any one-colour context.
 */
export function LogoMark({ size = 32, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <path
        d="M14 44V20L28 52V12L39 34L50 20V44"
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
