'use client'

import type { ReactNode } from 'react'
import type { Text } from '@/lib/types'
import { useLanguage } from './LanguageProvider'

export default function Localized({ en, vi }: { en: ReactNode; vi: ReactNode }) {
  const { language } = useLanguage()
  return <>{language === 'vi' ? vi : en}</>
}

/** Renders a bilingual `Text` value from the content data. */
export function Tx({ t }: { t: Text }) {
  const { language } = useLanguage()
  return <>{t[language]}</>
}
