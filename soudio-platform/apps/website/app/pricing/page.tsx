import type { Metadata } from 'next'
import Link from 'next/link'
import { Section, Container, SectionHeader, Card } from '@/components/ui'
import { FAQPreview } from '@/components/sections/FAQAndCTA'

export const metadata: Metadata = { title: 'باقات الاشتراك' }

const plans = [
  {
    name: 'باقة البداية',
    subtitle: 'مناسبة للمشاريع الصغيرة',
    price: '60',
    images: '10',
    trial: '3',
    popular: false,
    features: [
      'تجربة مجانية عدد (3 صور)',
      'عدد (10) صور/شهرياً',
      'استوديوهات محدودة',
      'أنماط محدودة',
      'دعم فني',
    ],
  },
  {
    name: 'باقة النمو',
    subtitle: 'مناسبة للمتاجر المتوسطة',
    price: '115',
    images: '30',
    trial: '4',
    popular: true,
    badge: 'الباقة الأفضل لنموك معنا',
    features: [
      'تجربة مجانية عدد (4 صور)',
      'عدد (30) صور/شهرياً',
      'جميع الاستوديوهات متاحة',
      'أنماط محدودة',
      'دعم فني',
    ],
  },
  {
    name: 'باقة الشريك',
    subtitle: 'مناسبة للعلامات الكبيرة',
    price: '400',
    images: '100',
    trial: '5',
    popular: false,
    badge: 'الباقة الأوفر',
    features: [
      'تجربة مجانية عدد (5 صور)',
      'عدد (100) صور/شهرياً',
      'جميع الاستوديوهات متاحة',
      'جميع الأنماط متاحة',
      'دعم فني متقدم',
    ],
  },
]

const addons = [
  { photos: '10', price: '60',  label: 'رصيد إضافي' },
  { photos: '20', price: '115', label: 'الأكثر طلباً' },
  { photos: '30', price: '170', label: 'الأفضل قيمة' },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-28 pb-16">
        <Container>
          <div className="text-center mb-4">
            <span className="text-xs text-neutral-500 bg-neutral-100 px-4 py-1.5 rounded-full inline-block mb-6">
              لا حاجة لبطاقة دفع — يمكنك تجربة المنصة مجاناً
            </span>
          </div>
          <SectionHeader
            tag="باقات الإشتراك"
            title="باقات مرنة تناسب الجميع"
            description={`لأن احتياجات المتاجر تختلف، صممت "سعوديو" باقات من المتاجر الناشئة إلى العلامات الكبيرة.`}
          />

          <div className="grid sm:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                padding="lg"
                className={`relative flex flex-col ${plan.popular ? 'ring-2 ring-primary-500 shadow-xl' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 right-0 left-0 flex justify-center">
                    <span className={`text-xs font-bold px-4 py-1.5 rounded-full shadow-sm ${
                      plan.popular ? 'bg-primary-600 text-white' : 'bg-accent-400 text-white'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6 mt-4">
                  <h3 className="font-black text-2xl text-neutral-900">{plan.name}</h3>
                  <p className="text-neutral-400 text-sm mt-1">{plan.subtitle}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-neutral-900">{plan.price}</span>
                    <span className="text-neutral-400 text-sm">ر.س / شهر</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">عدد ({plan.images}) صور/شهرياً</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-600">
                      <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`text-center font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md'
                      : 'bg-white hover:bg-neutral-50 text-primary-700 border border-primary-200'
                  }`}
                >
                  اشترك الآن
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Addons */}
      <Section bg="subtle">
        <Container>
          <SectionHeader
            tag="رصيد الصور الإضافي"
            title="رصيد صور إضافي"
            description="رصيد صور إضافي يضمن لك الاستمرار دون توقف، يُضاف فوراً إلى باقتك الحالية ويُستخدم تلقائياً عند نفاد الرصيد، بدون أي التزام أو تغيير على اشتراكك."
          />

          <div className="grid sm:grid-cols-3 gap-6">
            {addons.map((addon) => (
              <Card key={addon.price} padding="lg" className="text-center">
                {addon.label !== 'رصيد إضافي' && (
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${
                    addon.label === 'الأكثر طلباً' ? 'bg-amber-100 text-amber-700' : 'bg-primary-100 text-primary-700'
                  }`}>
                    {addon.label}
                  </span>
                )}
                <p className="text-3xl font-black text-neutral-900 mb-1">{addon.photos} صورة</p>
                <p className="text-neutral-400 text-sm mb-4">إضافة رصيد صور</p>
                <p className="text-2xl font-bold text-primary-600 mb-4">{addon.price} ر.س</p>
                <p className="text-xs text-neutral-400 mb-6">دفعة واحدة • بدون اشتراك</p>
                <Link href="/signup" className="btn-primary w-full text-center block">
                  شراء صور إضافية
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <FAQPreview />
    </>
  )
}
