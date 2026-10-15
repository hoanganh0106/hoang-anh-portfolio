import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export function BrandIcon({ px }: { px: number }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f766e', borderRadius: px * 0.22 }}>
      <svg width={px * 0.78} height={px * 0.78} viewBox="0 0 32 32">
        <path d="M5 17h5l3-7 4 13 3-9 2 3h5" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function Icon() {
  return new ImageResponse(<BrandIcon px={size.width} />, { ...size })
}
