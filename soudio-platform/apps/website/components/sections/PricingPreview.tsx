import Link from 'next/link'
import { Section, Container, SectionHeader, Card } from '@/components/ui'

const plans = [
  {
    name: 'باقة البداية',
    subtitle: 'مناسبة للمشاريع الصغيرة',
    price: '60',
    images: '10',
    trial: '3',
    popular: false,
    features: ['استوديوهات محدودة', 'أنماط محدودة', 'دعم فني'],
    cta: 'اشترك الآن',
  },
  {
    name: 'باقة النمو',
    subtitle: 'مناسبة للمتاجر المتوسطة',
    price: '115',
    images: '30',
    trial: '4',
    popular: true,
    features: ['جميع الاستوديوهات متاحة', 'أنماط محدودة', 'دعم فني'],
    cta: 'اشترك الآن',
  },
  {
    name: 'باقة الشريك',
    subtitle: 'مناسبة للعلامات الكبيرة',
    price: '400',
    images: '100',
    trial: '5',
    popular: false,
    features: ['جميع الاستوديوهات متاحة', 'جميع الأنماط متاحة', 'دعم فني متقدم'],
    cta: 'اشترك الآن',
  },
]

export default function PricingPreview() {
  return (
    <Section bg="subtle">
      <Container>
        <SectionHeader
          tag="باقات الإشتراك"
          title="باقات مرنة تناسب الجميع"
          description="لأن احتياجات المتاجر تختلف، صممنا باقات تك معك وتدعم نموك. لا حاجة لبطاقة دفع — يمكنك تجربة المنصة مجاناً."
        />

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              padding="lg"
              className={`relative flex flex-col ${plan.popular ? 'ring-2 ring-primary-500 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-0 left-0 flex justify-center">
                  <span className="bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    الباقة الأفضل لنموك معنا
                  </span>
                </div>
              )}

              <div className="mb-6 mt-2">
                <h3 className="font-black text-xl text-neutral-900">{plan.name}</h3>
                <p className="text-neutral-400 text-sm mt-1">{plan.subtitle}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-neutral-900">{plan.price}</span>
                  <span className="text-neutral-400 text-sm">ر.س / شهر</span>
                </div>
                <p className="text-sm text-neutral-500 mt-1">عدد ({plan.images}) صور/شهرياً</p>
                <p className="text-xs text-primary-600 font-medium mt-1">تجربة مجانية عدد ({plan.trial} صور)</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={plan.popular ? 'btn-primary text-center' : 'btn-secondary text-center'}
              >
                {plan.cta}
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/pricing" className="text-primary-600 hover:text-primary-700 font-semibold text-sm inline-flex items-center gap-1">
            عرض جميع تفاصيل الباقات
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 rotate-180">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
