import Link from 'next/link'

const footerLinks = {
  platform: [
    { href: '/about',   label: 'مبدعو سعوديو' },
    { href: '/pricing', label: 'باقات الاشتراك' },
    { href: '/gallery', label: 'معرض الأعمال' },
  ],
  support: [
    { href: '/contact', label: 'تواصل معنا' },
    { href: '/faq',     label: 'الأسئلة الشائعة' },
  ],
  legal: [
    { href: '/privacy', label: 'سياسة الخصوصية' },
    { href: '/terms',   label: 'شروط الاستخدام' },
  ],
}

const socialLinks = [
  { label: 'تويتر / X',    href: '#', icon: 'X' },
  { label: 'إنستغرام',     href: '#', icon: 'IG' },
  { label: 'لينكدإن',      href: '#', icon: 'LI' },
  { label: 'يوتيوب',       href: '#', icon: 'YT' },
  { label: 'تيك توك',      href: '#', icon: 'TT' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <circle cx="17.5" cy="17.5" r="3" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">سعوديو</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mb-6">
              أول استوديو سعودي متخصص في تجهيز صور منتجات المتاجر الإلكترونية بالذكاء الاصطناعي.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-primary-900/60 text-primary-300 px-2.5 py-1 rounded-full font-medium">#مدير_تصوير</span>
              <span className="text-xs bg-primary-900/60 text-primary-300 px-2.5 py-1 rounded-full font-medium">#سعودي_ويفهمك</span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(s => (
                <a
                  key={s.icon}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 bg-neutral-800 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-xs font-bold text-neutral-300">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* عن المنصة */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">عن المنصة</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-400 hover:text-primary-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* الدعم */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">الدعم والمساعدة</h3>
            <ul className="space-y-3">
              {footerLinks.support.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-400 hover:text-primary-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <a href="mailto:info@soudio.sa" className="flex items-center gap-2 text-neutral-400 hover:text-primary-400 text-sm transition-colors">
                <span>✉</span>
                <span>info@soudio.sa</span>
              </a>
              <span className="flex items-center gap-2 text-neutral-400 text-sm">
                <span>📞</span>
                <span dir="ltr">+966 - 500XXXXXX</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-xs">
              جميع الحقوق محفوظة © 2026 سعوديو | Soudio — طُوِّر بـ ذكاء 🇸🇦 في السعودية
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.legal.map(link => (
                <Link key={link.href} href={link.href} className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
