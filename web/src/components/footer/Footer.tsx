'use client'
import Link from 'next/link'
import { useLanguage } from '@/components/language/LanguageProvider'
import { BrandMark } from '@/components/navigation/Header'
import { siteConfig } from '@/lib/site-config'

const footerLinks = [
  ['/', 'Home', 'Trang chủ'],
  ['/projects', 'Devices', 'Thiết bị'],
  ['/research', 'Research', 'Nghiên cứu'],
  ['/about', 'About me', 'Về tôi'],
] as const

export default function Footer() {
  const { language } = useLanguage()
  const vi = language === 'vi'

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <p className="brand"><BrandMark /><strong>{siteConfig.project}</strong></p>
          <p>{vi
            ? 'Dự án cộng đồng, phi lợi nhuận: thiết bị y tế giá rẻ, AI chạy ngay trên máy, cho tuyến y tế cơ sở.'
            : 'A non-profit community project: low-cost medical devices with on-device AI for primary care.'}</p>
        </div>
        <nav className="site-footer__nav" aria-label={vi ? 'Điều hướng cuối trang' : 'Footer navigation'}>
          {footerLinks.map(([href, en, viLabel]) => <Link key={href} href={href}>{vi ? viLabel : en}</Link>)}
          <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </div>
      <div className="container site-footer__bottom">
        <p>{vi
          ? 'Các thiết bị là nguyên mẫu nghiên cứu, chưa được kiểm định lâm sàng và không thay thế chẩn đoán của bác sĩ.'
          : 'All devices are research prototypes, not clinically validated, and do not replace a clinician’s diagnosis.'}</p>
        <p>© 2026 {vi ? siteConfig.nameVi : siteConfig.name} · {vi ? 'Hà Nội' : 'Hanoi'}</p>
      </div>
    </footer>
  )
}
