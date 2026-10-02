'use client'

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react'

export type Language = 'en' | 'vi'
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; toggleLanguage: () => void }

const LanguageContext = createContext<LanguageContextValue | null>(null)

const readLanguage = (): Language => {
  if (typeof document === 'undefined') return 'en'
  return document.documentElement.dataset.lang === 'vi' ? 'vi' : 'en'
}

const subscribe = (listener: () => void) => {
  if (typeof window === 'undefined') return () => undefined
  const onChange = () => listener()
  const onStorage = (event: StorageEvent) => { if (event.key === 'portfolio-language') listener() }
  window.addEventListener('portfolio-language-change', onChange)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener('portfolio-language-change', onChange)
    window.removeEventListener('storage', onStorage)
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore<Language>(subscribe, readLanguage, () => 'en')

  const setLanguage = (next: Language) => {
    document.documentElement.dataset.lang = next
    document.documentElement.lang = next
    try { window.localStorage.setItem('portfolio-language', next) } catch { /* storage may be denied */ }
    window.dispatchEvent(new Event('portfolio-language-change'))
  }

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage: () => setLanguage(language === 'en' ? 'vi' : 'en') }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
