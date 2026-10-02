'use client'

import { useLanguage } from './LanguageProvider'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  return (
    <div className="language-toggle" role="group" aria-label="Language">
      <button type="button" className={language === 'en' ? 'is-active' : ''} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" className={language === 'vi' ? 'is-active' : ''} aria-pressed={language === 'vi'} onClick={() => setLanguage('vi')}>VI</button>
    </div>
  )
}
