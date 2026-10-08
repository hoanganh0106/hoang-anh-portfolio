'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/theme/ThemeToggle'
import LanguageToggle from '@/components/language/LanguageToggle'
import { useLanguage } from '@/components/language/LanguageProvider'

const links = [
  ['/', 'HOME', 'TRANG CHỦ'],
  ['/projects', 'PROJECTS', 'DỰ ÁN'],
  ['/research', 'RESEARCH', 'NGHIÊN CỨU'],
  ['/about', 'ABOUT', 'GIỚI THIỆU'],
]

export default function Header() {
  const { language } = useLanguage()
  const path = usePathname().replace(/\/$/, '') || '/'
  const headerRef = useRef<HTMLElement>(null)
  const [cinematic, setCinematic] = useState(false)

  useEffect(() => {
    if (path !== '/') return

    const header = headerRef.current
    const section = document.querySelector<HTMLElement>('.cinematic-path')
    if (!header || !section) return

    let frame = 0
    let lastValue = false

    const update = () => {
      frame = 0
      const sectionRect = section.getBoundingClientRect()
      const headerRect = header.getBoundingClientRect()
      const nextValue = sectionRect.top <= headerRect.bottom && sectionRect.bottom > headerRect.bottom

      if (nextValue !== lastValue) {
        lastValue = nextValue
        setCinematic(nextValue)
      }
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [path])

  const cinematicActive = path === '/' && cinematic
  const active = (href: string) => href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`)
  const navigation = (mobile = false) => (
    <nav aria-label={mobile ? (language === 'vi' ? 'Điều hướng di động' : 'Mobile primary navigation') : 'Primary navigation'} className={mobile ? 'home-mobile-nav' : 'home-desktop-nav'}>
      {links.map(([href, en, vi]) => <Link key={href} href={href} aria-current={active(href) ? 'page' : undefined} className={`label-mono home-nav-link ${active(href) ? 'home-nav-active' : ''}`}>{language === 'vi' ? vi : en}</Link>)}
    </nav>
  )
  return <header ref={headerRef} className={`site-header ${cinematicActive ? 'site-header--cinematic' : ''}`} data-visual-context={cinematicActive ? 'cinematic' : 'page'}><div className="site-header-inner"><Link href="/" className="site-brand" aria-label={language === 'vi' ? 'Về trang chủ Hoàng Anh Nguyễn' : 'Hoang Anh Nguyen home'}><span className="site-mark" aria-hidden="true">HN</span><span><strong>Hoang Anh Nguyen</strong><small>{language === 'vi' ? 'Kỹ thuật Điện tử & Viễn thông' : 'Electronics & Telecom Eng.'}</small></span></Link><div className="site-header-tools" role="group" aria-label={language === 'vi' ? 'Điều khiển trang' : 'Site controls'}>{navigation()}<LanguageToggle/><ThemeToggle /></div></div>{navigation(true)}</header>
}

