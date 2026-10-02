import type { ReactNode } from 'react'
import Localized from '@/components/language/Localized'

type PageShellProps = {
  index: string
  title: string
  intro: string
  indexVi?: string
  titleVi?: string
  introVi?: string
  children: ReactNode
}

export function PageShell({ index, title, intro, indexVi, titleVi, introVi, children }: PageShellProps) {
  return (
    <section className="page-shell">
      <header className="page-shell__header">
        <div className="page-shell__identity">
          <p className="label-mono"><Localized en={index} vi={indexVi ?? index} /></p>
          <h1><Localized en={title} vi={titleVi ?? title} /></h1>
        </div>
        <div className="page-shell__intro-wrap">
          <span className="page-shell__rule" aria-hidden="true" />
          <p className="page-shell__intro"><Localized en={intro} vi={introVi ?? intro} /></p>
        </div>
      </header>
      <div className="page-shell__content">{children}</div>
    </section>
  )
}
