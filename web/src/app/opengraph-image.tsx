import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: '#111', color: '#fff', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: 28, letterSpacing: 4 }}>HN</div>
      <div style={{ fontSize: 76, fontWeight: 700, marginTop: 28 }}>Technical Journal</div>
      <div style={{ fontSize: 34, marginTop: 20 }}>Systems · Edge AI · Electronics · IC Design</div>
    </div>,
    size,
  )
}
