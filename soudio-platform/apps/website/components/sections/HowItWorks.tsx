import { Section, Container, SectionHeader } from '@/components/ui'

const steps = [
  {
    number: '١',
    title: 'حدد هدفك',
    description: 'اختر الاستوديو والنمط المطلوب لصورة منتجك.',
    icon: '🎯',
  },
  {
    number: '٢',
    title: 'ارفع صورة المنتج',
    description: 'التقط صورة بالجوال أو استخدم صورة جاهزة.',
    icon: '📱',
  },
  {
    number: '٣',
    title: 'دع الذكاء يبدع',
    description: 'ضبط الخلفيات، الإضاءة، التكوين، وإنشاء المقترحات.',
    icon: '🤖',
  },
  {
    number: '٤',
    title: 'استلم صورتك جاهزة',
    description: 'بجودة عالية، وخيارات متعددة، مناسبة لمتجرك.',
    icon: '✅',
  },
]

export default function HowItWorks() {
  return (
    <Section bg="white">
      <Container>
        <SectionHeader
          tag="بساطة .. ذكاء .. فعالية"
          title="كيف يعمل سعوديو؟"
          description="كمدير تصوير لمتجرك الإلكتروني — في 4 خطوات بسيطة!"
        />

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 right-16 left-16 h-0.5 bg-gradient-to-l from-primary-200 via-primary-400 to-primary-200" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                {/* Number circle */}
                <div className="relative z-10 w-20 h-20 bg-white border-2 border-primary-200 rounded-full flex flex-col items-center justify-center mx-auto mb-5 shadow-sm">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="text-xs font-black text-primary-600 -mt-1">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-bold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
