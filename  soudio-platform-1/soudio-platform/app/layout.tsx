import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سعوديو | Soudio — أول استوديو سعودي ذكي لتصوير المنتجات",
  description:
    "سعوديو هو أول استوديو سعودي متخصص في تجهيز صور منتجات المتاجر الإلكترونية بالذكاء الاصطناعي. صور احترافية بضغطة زر.",
  keywords: "تصوير منتجات، ذكاء اصطناعي، متاجر إلكترونية، سعوديو، استوديو",
  openGraph: {
    title: "سعوديو — مدير تصوير ذكي لمتجرك",
    description: "صور منتجات احترافية بالذكاء الاصطناعي",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic antialiased">{children}</body>
    </html>
  );
}
