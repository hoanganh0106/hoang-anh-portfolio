import type { Metadata } from 'next'
import './globals.css'
import '../styles/detail.css'
import '../styles/map-interaction.css'
import '../styles/premium.css'
import Header from '@/components/navigation/Header'
import Footer from '@/components/footer/Footer'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import ThemeScript from '@/components/theme/ThemeScript'
import { siteConfig, siteUrl } from '@/lib/site-config'
export const metadata: Metadata = { metadataBase: siteUrl ? new URL(siteUrl) : undefined, title:{default:siteConfig.title,template:`%s | ${siteConfig.name}`}, description:siteConfig.description }
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth"><head><ThemeScript/></head><body><ThemeProvider><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></ThemeProvider></body></html>}
