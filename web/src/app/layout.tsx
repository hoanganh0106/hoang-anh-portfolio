import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import '../styles/art.css'
import Header from '@/components/navigation/Header'
import Footer from '@/components/footer/Footer'
import MotionEnhancer from '@/components/layout/MotionEnhancer'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import ThemeScript from '@/components/theme/ThemeScript'
import { LanguageProvider } from '@/components/language/LanguageProvider'
import LanguageScript from '@/components/language/LanguageScript'
import { siteConfig, siteUrl } from '@/lib/site-config'

const sans = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: siteConfig.title, template: `%s | ${siteConfig.project}` },
  description: siteConfig.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <ThemeScript />
        <LanguageScript />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <a className="skip-link" href="#main">Skip to content</a>
            <MotionEnhancer />
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
