const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

function getSiteUrl(value: string | undefined) {
  if (!value) return undefined

  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined
    if (url.username || url.password || url.search || url.hash || url.pathname !== '/' && url.pathname !== '') return undefined
    return url.origin
  } catch {
    return undefined
  }
}

export const siteConfig = {
  project: 'Edge AI for Health',
  name: 'Hoang Anh Nguyen',
  nameVi: 'Nguyễn Hoàng Anh',
  title: 'Edge AI for Health — community medical devices with on-device AI',
  description: 'A student-led, non-profit project building low-cost medical devices that run AI on the device itself, for clinics with few specialists and unreliable internet.',
  role: 'Electronics & Telecommunications Engineering',
  institution: 'Hanoi University of Science and Technology',
  year: 'Year 3',
  email: '',
  github: 'https://github.com/hoanganh0106',
}
export const siteUrl = getSiteUrl(configuredSiteUrl)
