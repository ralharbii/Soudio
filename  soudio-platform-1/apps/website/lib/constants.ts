// ─── Site Config ──────────────────────────────────────────────────────────

export const SITE_CONFIG = {
  name:        'سعوديو',
  nameEn:      'Soudio',
  tagline:     'أول استوديو سعودي ذكي لتصوير منتجات المتاجر الإلكترونية',
  url:         'https://soudio.sa',
  email:       'info@soudio.sa',
  phone:       '+966 - 500XXXXXX',
  twitter:     '#',
  instagram:   '#',
  linkedin:    '#',
  youtube:     '#',
  tiktok:      '#',
} as const

// ─── Nav Links ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { href: '/',        label: 'الرئيسية' },
  { href: '/about',   label: 'قصتنا' },
  { href: '/studios', label: 'مبدعو سعوديو' },
  { href: '/gallery', label: 'معرض الأعمال' },
  { href: '/pricing', label: 'باقات الاشتراك' },
  { href: '/faq',     label: 'الأسئلة الشائعة' },
  { href: '/contact', label: 'تواصل معنا' },
] as const

// ─── Plans ─────────────────────────────────────────────────────────────────

export const PLANS = [
  {
    id:       'starter',
    name:     'باقة البداية',
    subtitle: 'مناسبة للمشاريع الصغيرة',
    price:    60,
    images:   10,
    trial:    3,
    popular:  false,
  },
  {
    id:       'growth',
    name:     'باقة النمو',
    subtitle: 'مناسبة للمتاجر المتوسطة',
    price:    115,
    images:   30,
    trial:    4,
    popular:  true,
  },
  {
    id:       'partner',
    name:     'باقة الشريك',
    subtitle: 'مناسبة للعلامات الكبيرة',
    price:    400,
    images:   100,
    trial:    5,
    popular:  false,
  },
] as const
