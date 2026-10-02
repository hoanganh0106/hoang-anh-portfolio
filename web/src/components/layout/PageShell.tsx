import type { ReactNode } from 'react'

type PageShellProps = {
  index: string
  title: string
  intro: string
  children: ReactNode
}

export function PageShell({ index, title, intro, children }: PageShellProps) {
  return (
    <section className="page-shell">
      <header className="page-shell__header">
        <div className="page-shell__identity">
          <p className="label-mono">{index}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-shell__intro-wrap">
          <span className="page-shell__rule" aria-hidden="true" />
          <p className="page-shell__intro">{intro}</p>
        </div>
      </header>
      <div className="page-shell__content">{children}</div>
    </section>
  )
}
