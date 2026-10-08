'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/language/LanguageProvider'

export default function EditorialHero() {
  const { language } = useLanguage()
  const vi = language === 'vi'
  return (
    <section className="home-hero home-hero--premium" aria-labelledby="home-title">
      <div className="home-hero-copy">
        <div className="hero-kicker-row">
          <p className="home-eyebrow">Hoang Anh Nguyen · {vi ? 'Năm 3' : 'Year 3'}</p>
          <span className="hero-status"><span aria-hidden="true" /> {vi ? 'Học và ghi chép công khai' : 'Documenting the work as I learn'}</span>
        </div>
        <h1 id="home-title" className="hero-title">
          {vi ? (
            <>
              <span>Kỹ thuật Điện tử &amp;</span>
              <span>Viễn thông,</span>
              <span>đi sâu dần</span>
              <span>qua từng lớp</span>
              <span>của hệ thống.</span>
            </>
          ) : (
            <>
              <span>Electronics &amp;</span>
              <span>Telecommunications</span>
              <span>Engineering,</span>
              <span>building downward</span>
              <span>through the stack.</span>
            </>
          )}
        </h1>
        <p className="home-lede">{vi ? 'Xây dựng và ghi chép các hệ thống nối software, signal và physical hardware — từ edge AI prototype tới nghiên cứu speech separation.' : 'Building and documenting systems that connect software, signals, and physical hardware — from edge AI prototypes to speech-separation research.'}</p>
        <div className="hero-meta-grid" aria-label={vi ? 'Hướng kỹ thuật hiện tại' : 'Current engineering path'}>
          <div><span>{vi ? 'Hiện tại' : 'Current'}</span><strong>Edge AI + Speech</strong></div>
          <div><span>{vi ? 'Phương pháp' : 'Method'}</span><strong>Build → Measure → Learn</strong></div>
          <div><span>{vi ? 'Định hướng' : 'Direction'}</span><strong>Electronics → IC Design</strong></div>
        </div>
        <p className="home-institution">Hanoi University of Science and Technology</p>
        <div className="home-actions">
          <Link className="home-button home-button-primary" href="/projects">{vi ? 'Xem project tiêu biểu' : 'View selected work'} <span aria-hidden="true">↗</span></Link>
          <Link className="home-button" href="/about">{vi ? 'Khám phá hành trình' : 'Explore the path'} <span aria-hidden="true">→</span></Link>
        </div>
      </div>

      <div className="signal-board signal-board--hero" aria-label={vi ? 'Sơ đồ xử lý tín hiệu khái niệm: acoustic waveform đi qua edge processing path' : 'Abstract signal processing board showing an acoustic waveform moving through an edge processing path'} role="img">
        <div className="signal-board-topbar"><span>Signal path / HN-01</span><span>Software → Physical</span></div>
        <svg viewBox="0 0 640 520" aria-hidden="true" focusable="false">
          <rect x="24" y="24" width="592" height="472" rx="8" className="signal-board-frame" />
          <path d="M76 126H564M76 260H564M76 394H564M184 70V450M320 70V450M456 70V450" className="signal-grid" />
          <path d="M76 260 C112 260 112 176 148 176 S184 344 220 344 S256 214 292 214 S328 306 364 306 S400 142 436 142 S472 280 508 280 S544 232 564 232" className="signal-wave" />
          <path d="M76 260H148M220 344H292M364 306H436M508 280H564" className="signal-trace" />
          <path d="M76 326 C124 326 124 300 172 300 S220 352 268 352 S316 320 364 320 S412 350 460 350 S508 316 564 316" className="signal-wave signal-wave--ghost" />
          <circle cx="148" cy="176" r="7" className="signal-node" /><circle cx="292" cy="214" r="7" className="signal-node" /><circle cx="436" cy="142" r="7" className="signal-node" />
          <rect x="98" y="92" width="72" height="24" rx="2" className="signal-chip" /><rect x="470" y="368" width="88" height="24" rx="2" className="signal-chip" />
          <text x="108" y="109" className="signal-label">SIGNAL / 01</text><text x="480" y="385" className="signal-label">EDGE / 02</text>
          <text x="76" y="474" className="signal-caption">QUIET SIGNAL · HN</text><text x="500" y="474" className="signal-caption">2026 / R&amp;D</text>
        </svg>
        <div className="signal-board-footer" aria-hidden="true"><span><i /> Acoustic</span><span><i /> Inference</span><span><i /> Hardware</span></div>
      </div>

      <p className="hero-scroll-note" aria-hidden="true"><span>{vi ? 'Scroll để theo dõi hệ thống' : 'Scroll to trace the system'}</span><b>↓</b></p>
    </section>
  )
}
