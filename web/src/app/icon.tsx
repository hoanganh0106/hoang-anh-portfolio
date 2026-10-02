import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: '#111518',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#edf0ef',
          borderRadius: '50%',
          border: '1.5px solid #526a70',
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
