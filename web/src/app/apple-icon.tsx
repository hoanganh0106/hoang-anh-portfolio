import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: '#111518',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#edf0ef',
          borderRadius: '36px',
          border: '4px solid #526a70',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '-0.08em',
        }}
      >
        HN
      </div>
    ),
    { ...size }
  )
}
