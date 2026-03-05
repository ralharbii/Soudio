import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: {
    template: '%s | سعوديو',
    default: 'سعوديو — أول استوديو سعودي ذكي لتصوير منتجات المتاجر الإلكترونية',
  },
  description:
    'سعوديو منصة ذكاء اصطناعي متخصصة في تجهيز صور منتجات المتاجر الإلكترونية باحترافية وسرعة. مدير تصوير ذكي يفهم سوقك.',
  keywords: ['تصوير منتجات', 'ذكاء اصطناعي', 'متجر إلكتروني', 'سعوديو', 'soudio'],
  authors: [{ name: 'Soudio' }],
  creator: 'Soudio',
  metadataBase: new URL('https://soudio.sa'),
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://soudio.sa',
    siteName: 'سعوديو',
    title: 'سعوديو — مدير تصوير ذكي لمتجرك',
    description: 'أول استوديو سعودي متخصص في تجهيز صور منتجات المتاجر الإلكترونية بالذكاء الاصطناعي.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سعوديو',
    description: 'أول استوديو سعودي ذكي لتصوير المنتجات.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
