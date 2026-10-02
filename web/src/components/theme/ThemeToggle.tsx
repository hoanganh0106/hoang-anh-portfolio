'use client'
import { useTheme } from './ThemeProvider'
import { useLanguage } from '@/components/language/LanguageProvider'

export default function ThemeToggle(){
  const {theme,toggleTheme}=useTheme()
  const {language}=useLanguage()
  return <button type="button" className="label-mono border border-border px-2 py-1" aria-label="Toggle color theme" onClick={toggleTheme}>{language==='vi'?(theme==='dark'?'TỐI':'SÁNG'):(theme==='dark'?'DARK':'LIGHT')}</button>
}
