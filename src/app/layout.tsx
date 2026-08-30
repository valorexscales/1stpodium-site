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
    default: '1stPodium — Desenvolvimento de Software Sob Medida',
    template: '%s | 1stPodium',
  },
  description: 'Criamos aplicações web, aplicativos mobile, software para computador, SaaS, backends, APIs, automações e sistemas personalizados. Engenharia de software do primeiro código à produção.',
  keywords: [
    'desenvolvimento de software',
    'software sob medida',
    'aplicação web',
    'aplicativo mobile',
    'SaaS',
    'backend',
    'API',
    'automação',
    'segurança de software',
    'arquitetura de sistemas',
  ],
  authors: [{ name: '1stPodium' }],
  creator: '1stPodium',
  publisher: '1stPodium',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://1stpodium-site.vercel.app',
    siteName: '1stPodium',
    title: '1stPodium — Desenvolvimento de Software Sob Medida',
    description: 'Criamos aplicações web, mobile, desktop, SaaS, backends, APIs e sistemas personalizados. Engenharia de software completa.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '1stPodium — Desenvolvimento de Software Sob Medida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1stPodium — Desenvolvimento de Software Sob Medida',
    description: 'Criamos aplicações web, mobile, desktop, SaaS, backends, APIs e sistemas personalizados.',
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
    description: 'Engenharia de software sob medida. Aplicações web, mobile, desktop, SaaS, backends e sistemas personalizados.',
  }
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
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