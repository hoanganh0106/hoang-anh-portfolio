import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/PageShell'
import Localized, { Tx } from '@/components/language/Localized'
import { siteConfig, siteUrl } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'About me',
  description: 'Hoang Anh Nguyen — Electronics & Telecommunications student at HUST building community medical devices with on-device AI.',
  alternates: { canonical: siteUrl ? `${siteUrl}/about/` : undefined },
}

const journey = [
  {
    label: { en: 'Systems', vi: 'Hệ thống' },
    body: {
      en: 'Linux, networking and Cisco labs taught me to read one layer lower before guessing.',
      vi: 'Linux, mạng máy tính và các bài lab Cisco dạy tôi thói quen đọc sâu xuống một lớp trước khi phỏng đoán.',
    },
  },
  {
    label: { en: 'AI meets hardware', vi: 'AI gặp phần cứng' },
    body: {
      en: 'A face recognition model driving an Arduino was my first taste of AI that acts in the physical world.',
      vi: 'Mô hình nhận diện khuôn mặt điều khiển Arduino là lần đầu tôi thấy AI tác động vào thế giới thật.',
    },
  },
  {
    label: { en: 'Research', vi: 'Nghiên cứu' },
    body: {
      en: 'Speech separation with SPMamba and MossFormer 2, presented at UEC ASEAN 2026, taught me to describe only what I actually observed.',
      vi: 'Tách giọng nói với SPMamba và MossFormer 2, trình bày tại UEC ASEAN 2026, dạy tôi chỉ mô tả đúng những gì thực sự quan sát được.',
    },
  },
  {
    label: { en: 'Medical edge AI', vi: 'Edge AI cho y tế' },
    body: {
      en: 'All of it came together in one question: how do we bring careful listening and screening to clinics without specialists or internet?',
      vi: 'Mọi thứ hội tụ lại ở một câu hỏi: làm sao đưa việc nghe khám cẩn thận và sàng lọc tới những phòng khám không có bác sĩ chuyên khoa và không có mạng?',
    },
  },
]

const skills = ['Signal processing', 'Source separation', 'TinyML', 'Embedded C', 'ESP32 / nRF52 / RP2040', 'Python · PyTorch', 'Linux', 'Networking']

const next = [
  { en: 'PCB design for the device enclosures and boards', vi: 'Thiết kế mạch in cho bo mạch và vỏ thiết bị' },
  { en: 'FPGA for faster, lower-power signal processing', vi: 'FPGA để xử lý tín hiệu nhanh hơn, ít điện hơn' },
  { en: 'IC design as the long-term direction', vi: 'Thiết kế vi mạch là định hướng dài hạn' },
]

export default function About() {
  return (
    <PageShell
      eyebrow={{ en: 'About me', vi: 'Về tôi' }}
      title={{ en: `${siteConfig.name}`, vi: `${siteConfig.nameVi}` }}
      intro={{
        en: 'Third-year Electronics & Telecommunications student at Hanoi University of Science and Technology, and the person behind Edge AI for Health.',
        vi: 'Sinh viên năm 3 ngành Điện tử – Viễn thông, Đại học Bách khoa Hà Nội, và là người đứng sau Edge AI for Health.',
      }}
    >
      <section className="track" aria-labelledby="journey-title">
        <h2 id="journey-title" className="track__title"><Localized en="How I got here" vi="Con đường dẫn tôi tới đây" /></h2>
        <ol className="journey">
          {journey.map(item => (
            <li key={item.label.en}>
              <h3><Tx t={item.label} /></h3>
              <p><Tx t={item.body} /></p>
            </li>
          ))}
        </ol>
      </section>

      <div className="split track">
        <section aria-labelledby="skills-title">
          <h2 id="skills-title" className="track__title"><Localized en="What I work with" vi="Kỹ năng" /></h2>
          <ul className="chips">{skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
        </section>
        <section aria-labelledby="next-title">
          <h2 id="next-title" className="track__title"><Localized en="What I’m learning next" vi="Tôi đang học tiếp" /></h2>
          <ul className="bullets">{next.map(item => <li key={item.en}><Tx t={item} /></li>)}</ul>
        </section>
      </div>

      <section className="track callout" aria-labelledby="contact-title">
        <h2 id="contact-title"><Localized en="Let’s talk" vi="Liên hệ" /></h2>
        <p><Localized
          en="If you work in a clinic, a school or a lab and this sounds useful, I would love to hear from you."
          vi="Nếu bạn làm ở phòng khám, trường học hay phòng thí nghiệm và thấy dự án này hữu ích, tôi rất muốn được nghe từ bạn."
        /></p>
        <div className="actions">
          {siteConfig.email && <a className="button button--primary" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
          <a className="button" href={siteConfig.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </section>
    </PageShell>
  )
}
