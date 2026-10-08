'use client'
import Link from 'next/link'
import { useLanguage } from '@/components/language/LanguageProvider'

const footerLinks = [
  ['/', 'Home', 'Trang chủ'],
  ['/projects', 'Projects', 'Dự án'],
  ['/research', 'Research', 'Nghiên cứu'],
  ['/about', 'About', 'Giới thiệu'],
] as const

export default function Footer() {
  const { language } = useLanguage()
  const vi = language === 'vi'

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__signature">
            <p className="label-mono">Hoang Anh Nguyen</p>
            <p className="site-footer__tagline">
              {vi ? 'Tiếp tục đi sâu qua từng lớp của hệ thống.' : 'Keep tracing the system, layer by layer.'}
            </p>
          </div>
          <nav className="site-footer__nav" aria-label={vi ? 'Điều hướng cuối trang' : 'Footer navigation'}>
            {footerLinks.map(([href, en, viLabel]) => (
              <Link key={href} href={href}>
                {vi ? viLabel : en}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="site-footer__bottom">
          <p className="label-mono">{vi ? 'Nhật ký kỹ thuật' : 'Technical journal'}</p>
          <Link className="site-footer__back" href="#main">
            {vi ? 'Về nội dung' : 'Back to content'} <span aria-hidden="true">↑</span>
          </Link>
          <p className="label-mono">Systems · Edge AI · Electronics · UAV Navigation · IC Design</p>
        </div>
      </div>
    </footer>
  )
}
