import type { ReactNode } from 'react'
import { Tx } from '@/components/language/Localized'
import type { Text } from '@/lib/types'

type PageShellProps = {
  eyebrow: Text
  title: Text
  intro: Text
  children: ReactNode
}

export function PageShell({ eyebrow, title, intro, children }: PageShellProps) {
  return (
    <div className="page">
      <header className="page-header container">
        <p className="eyebrow"><Tx t={eyebrow} /></p>
        <h1 id="page-title"><Tx t={title} /></h1>
        <p className="page-intro"><Tx t={intro} /></p>
      </header>
      <div className="container">{children}</div>
    </div>
  )
}
