'use client'
import { useLanguage } from '@/components/language/LanguageProvider'

export default function Footer(){
  const {language}=useLanguage()
  return <footer className="mt-24 border-t border-rule"><div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8"><p className="label-mono">Hoang Anh Nguyen — {language==='vi'?'nhật ký kỹ thuật':'technical journal'}</p><p className="label-mono">Systems · Edge AI · Electronics · UAV Navigation · IC Design</p></div></footer>
}
