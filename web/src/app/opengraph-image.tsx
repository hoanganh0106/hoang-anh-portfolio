import { ImageResponse } from 'next/og'
import { BrandIcon } from './icon'

export const dynamic = 'force-static'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: '#f7f5f0', color: '#17262b', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ width: 88, height: 88, display: 'flex' }}><BrandIcon px={88} /></div>
        <div style={{ fontSize: 44, fontWeight: 700 }}>Edge AI for Health</div>
      </div>
      <div style={{ fontSize: 68, fontWeight: 700, marginTop: 48, lineHeight: 1.1 }}>Medical devices with on-device AI</div>
      <div style={{ fontSize: 34, marginTop: 24, color: '#0f766e' }}>For clinics without specialists or internet · Non-profit · Community</div>
    </div>,
    size,
  )
}
