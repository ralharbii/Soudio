'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Section, Container, SectionHeader } from '@/components/ui'

const faqs = [
  {
    q: 'ما هي منصة سعوديو؟ وكيف تساعد متجري الإلكتروني؟',
    a: 'سعوديو هي استوديو تصوير ذكي يعمل بالذكاء الاصطناعي، يوفر للتجار إمكانية إنتاج صور احترافية للمنتجات دون الحاجة لاستوديو تصوير فعلي أو خبرة تصميم. تساعدك المنصة على تحسين مظهر متجرك وزيادة جاذبية المنتجات ورفع المبيعات بسرعة.',
  },
  {
    q: 'هل المنصة مخصصة للتجار السعوديين فقط؟',
    a: 'المنصة صُممت أساساً لتلبية احتياجات السوق السعودي والخليجي، لكنها متاحة لجميع التجار في العالم العربي.',
  },
  {
    q: 'هل أحتاج تسجيل دخول لإنشاء الصور؟',
    a: 'يمكنك تجربة المنصة مجاناً بدون بطاقة دفع. بعض الاستوديوهات تتطلب إنشاء حساب للوصول إلى كامل الميزات.',
  },
  {
    q: 'هل استخدام سعوديو مجاني؟',
    a: 'نعم، يمكنك البدء بتجربة مجانية لكل باقة. بعد ذلك تختار الباقة المناسبة لاحتياجاتك دون أي التزام.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-neutral-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-right hover:bg-neutral-50 transition-colors"
      >
        <span className="font-semibold text-neutral-800 text-sm">{q}</span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 text-primary-500 shrink-0 ms-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-neutral-100 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

export function FAQPreview() {
  return (
    <Section bg="white">
      <Container size="md">
        <SectionHeader
          tag="الأسئلة الشائعة"
          title="كيف يمكننا مساعدتك في الإبداع؟"
          description="إليك كل ما تحتاج معرفته عن خدماتنا!"
        />

        <div className="space-y-3 mb-10">
          {faqs.map(faq => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/faq" className="btn-secondary inline-flex">
            للمزيد من الأسئلة ...
          </Link>
        </div>
      </Container>
    </Section>
  )
}

export function CTA() {
  return (
    <section className="bg-primary-700 py-20">
      <Container>
        <div className="text-center text-white">
          <p className="text-primary-200 font-semibold mb-3">فريقنا كله مدير لـ تصويرك</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            سعوديو .. يعمل لأجلك، وبالذكاء الذي يفهمك !
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            وجاهز يبدع لك في كل اللي تحتاجه .. بضغطة زر !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-primary-700 hover:bg-primary-50 font-bold px-8 py-4 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              ابدأ رحلة الإبداع مجاناً
            </Link>
            <Link
              href="/studios"
              className="border-2 border-primary-400 text-white hover:bg-primary-600 font-semibold px-8 py-4 rounded-2xl transition-all"
            >
              اختر الاستوديو الذي يناسبك
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
