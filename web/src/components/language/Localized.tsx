'use client'

import type { ReactNode } from 'react'
import { useLanguage } from './LanguageProvider'

export default function Localized({ en, vi }: { en: ReactNode; vi: ReactNode }) {
  const { language } = useLanguage()
  return <>{language === 'vi' ? vi : en}</>
}
