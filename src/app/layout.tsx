import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CustomCursor } from '@/components/CustomCursor'
import { PageTransition } from '@/components/PageTransition'
import { Preloader } from '@/components/Preloader'

export const metadata: Metadata = {
  metadataBase: new URL('https://1stpodium-site.vercel.app'),
  title: {
    default: '1stPodium — Software Engineered to Perform',
    template: '%s | 1stPodium',
  },
  description: 'Custom software engineering company. Web applications, mobile apps, desktop software, backend systems, authentication, SaaS products, and custom digital products built from architecture to deployment.',
  keywords: [
    'software engineering',
    'custom software development',
    'web applications',
    'mobile applications',
    'desktop software',
    'backend development',
    'SaaS development',
    'authentication systems',
    'system architecture',
    'digital product development',
  ],
  authors: [{ name: '1stPodium' }],
  creator: '1stPodium',
  publisher: '1stPodium',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://1stpodium.com',
    siteName: '1stPodium',
    title: '1stPodium — Software Engineered to Perform',
    description: 'Custom software engineered from architecture to deployment. Web, mobile, desktop, backend, and systems.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '1stPodium — Software Engineered to Perform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1stPodium — Software Engineered to Perform',
    description: 'Custom software engineered from architecture to deployment.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '1stPodium',
    url: 'https://1stpodium-site.vercel.app',
    logo: 'https://1stpodium-site.vercel.app/1STPodium.png',
    description: 'Software engineering company. Custom software engineered from architecture to deployment.',
  }
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        <Providers>
          <Preloader />
          <PageTransition>
            <CustomCursor />
            <Header />
            <main id="main-content" className="relative z-10">
              {children}
            </main>
            <Footer />
          </PageTransition>
        </Providers>
      </body>
    </html>
  )
}