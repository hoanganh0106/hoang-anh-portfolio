'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/theme/ThemeToggle'
import LanguageToggle from '@/components/language/LanguageToggle'
import { useLanguage } from '@/components/language/LanguageProvider'
import { siteConfig } from '@/lib/site-config'

const links = [
  ['/projects', 'Devices', 'Thiết bị'],
  ['/research', 'Research', 'Nghiên cứu'],
  ['/about', 'About me', 'Về tôi'],
] as const

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32"><path d="M5 17h5l3-7 4 13 3-9 2 3h5" /></svg>
    </span>
  )
}

export default function Header() {
  const { language } = useLanguage()
  const vi = language === 'vi'
  const path = usePathname().replace(/\/$/, '') || '/'
  const active = (href: string) => path === href || path.startsWith(`${href}/`)
  const navigation = (mobile = false) => (
    <nav aria-label={mobile ? (vi ? 'Điều hướng di động' : 'Mobile navigation') : (vi ? 'Điều hướng chính' : 'Primary navigation')} className={mobile ? 'nav nav--mobile' : 'nav nav--desktop'}>
      {links.map(([href, en, viLabel]) => (
        <Link key={href} href={href} aria-current={active(href) ? 'page' : undefined} className="nav-link">{vi ? viLabel : en}</Link>
      ))}
      <Link href="/#join" className="nav-cta">{vi ? 'Tham gia' : 'Get involved'}</Link>
    </nav>
  )

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link href="/" className="brand" aria-label={vi ? `${siteConfig.project} — trang chủ` : `${siteConfig.project} home`}>
          <BrandMark />
          <span><strong>{siteConfig.project}</strong><small>{vi ? `bởi ${siteConfig.nameVi}` : `by ${siteConfig.name}`}</small></span>
        </Link>
        <div className="site-header__tools">
          {navigation()}
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
      {navigation(true)}
    </header>
  )
}
