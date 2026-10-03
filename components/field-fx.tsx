import { fieldFx } from "@/lib/data"

/**
 * Small decorative animations, one per field. All of them are aria-hidden,
 * not focusable and ignore the pointer. The motion is CSS only (see
 * "Field animations" in app/globals.css) and stops on a static frame under
 * prefers-reduced-motion.
 */

/** 1. Voice AI: a dot runs along the call stages; each label lights as it passes. 6s loop. */
export function CallTrace() {
  return (
    <div className="fx trace" aria-hidden="true">
      <div className="trace-rail">
        {fieldFx.traceSteps.map((step) => (
          <span key={step} className="trace-tick" />
        ))}
        <span className="trace-run">
          <span className="trace-dot" />
        </span>
      </div>
      <div className="trace-labels">
        {fieldFx.traceSteps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    </div>
  )
}

/** 2. LLM agents: a pulse goes from the centre node to one tool node at a time and back. 5s loop. */
export function NodeGraph({ className = "" }: { className?: string }) {
  return (
    <span className={`fx fx-graph ${className}`} aria-hidden="true">
      <svg width="72" height="72" viewBox="0 0 72 72" focusable="false">
        <path className="fx-ln" d="M36 38V12M36 38L59 56M36 38L13 56" />
        <circle className="fx-pulse fx-p1" cx="36" cy="38" r="2.5" />
        <circle className="fx-pulse fx-p2" cx="36" cy="38" r="2.5" />
        <circle className="fx-pulse fx-p3" cx="36" cy="38" r="2.5" />
        <circle className="fx-node fx-n1" cx="36" cy="12" r="4.5" />
        <circle className="fx-node fx-n2" cx="59" cy="56" r="4.5" />
        <circle className="fx-node fx-n3" cx="13" cy="56" r="4.5" />
        <circle className="fx-hub" cx="36" cy="38" r="5.5" />
      </svg>
    </span>
  )
}

/** 3. Backend: a request line types itself, then the response appears. 7s loop. */
export function RequestLine({ className = "" }: { className?: string }) {
  return (
    <span className={`fx fx-side fx-req ${className}`} aria-hidden="true">
      <span className="fx-req-txt">
        <span className="fx-req-type">{fieldFx.request}</span>
        <span className="fx-req-res">
          <svg className="fx-arrow" viewBox="0 0 12 10" focusable="false">
            <path d="M1 5H11M7.5 1.5L11 5L7.5 8.5" />
          </svg>{" "}
          <span className="fx-req-ok">{fieldFx.response}</span>
        </span>
      </span>
      <span className="fx-caret" />
    </span>
  )
}

/** 4. Data and cloud: three database layers fill from the bottom up, hold, fade. 6s loop. */
export function DatabaseFx({ className = "" }: { className?: string }) {
  return (
    <span className={`fx fx-side ${className}`} aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 40 40" focusable="false">
        <path className="fx-fill fx-s1" d="M7 24A13 4.5 0 0 0 33 24V32A13 4.5 0 0 1 7 32Z" />
        <path className="fx-fill fx-s2" d="M7 16A13 4.5 0 0 0 33 16V24A13 4.5 0 0 1 7 24Z" />
        <path className="fx-fill fx-s3" d="M7 8A13 4.5 0 0 0 33 8V16A13 4.5 0 0 1 7 16Z" />
        <ellipse className="fx-ln" cx="20" cy="8" rx="13" ry="4.5" />
        <path
          className="fx-ln"
          d="M7 8V32A13 4.5 0 0 0 33 32V8M7 16A13 4.5 0 0 0 33 16M7 24A13 4.5 0 0 0 33 24"
        />
      </svg>
    </span>
  )
}

/** 5. Frontend: three blocks load into a browser window one after another. 6s loop. */
export function BrowserFx({ className = "" }: { className?: string }) {
  return (
    <span className={`fx fx-side ${className}`} aria-hidden="true">
      <svg width="48" height="38" viewBox="0 0 48 38" focusable="false">
        <rect className="fx-fill fx-s1" x="6" y="15" width="36" height="6" rx="1.5" />
        <rect className="fx-fill fx-s2" x="6" y="25" width="16" height="7" rx="1.5" />
        <rect className="fx-fill fx-s3" x="26" y="25" width="16" height="7" rx="1.5" />
        <rect className="fx-ln" x="1" y="1" width="46" height="36" rx="5" />
        <path className="fx-ln" d="M1 10H47M6 5.5H6.01M10.5 5.5H10.51" />
      </svg>
    </span>
  )
}

/** 7. Contact: two faint arcs expand from an 18px icon. Wrap the icon in a relative box. 4s loop. */
export function SignalArcs() {
  return (
    <svg className="fx fx-ring" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M-3 6A7 7 0 0 1 4 -1" />
      <path d="M-7 6A11 11 0 0 1 4 -5" />
    </svg>
  )
}
