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

export const siteConfig = { name:'Hoang Anh Nguyen', shortName:'HN', title:'Hoang Anh Nguyen — Technical Portfolio', description:'Exploring systems, intelligence, and hardware.', tagline:'Exploring systems, intelligence, and hardware.', role:'Electronics & Telecommunications Engineering', institution:'Hanoi University of Science and Technology', year:'Year 3', email:'', linkedin:'', github:'https://github.com/hoanganh0106' }
export const siteUrl = getSiteUrl(configuredSiteUrl)
