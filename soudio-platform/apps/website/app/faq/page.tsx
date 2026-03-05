'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Container, Section } from '@/components/ui'

const categories = [
  {
    id: 'platform',
    label: 'عن منصة سعوديو',
    faqs: [
      { q: 'ما هي منصة سعوديو؟ وكيف تساعد متجري الإلكتروني؟', a: 'سعوديو هي استوديو تصوير ذكي يعمل بالذكاء الاصطناعي، يوفر للتجار إمكانية إنتاج صور احترافية للمنتجات دون الحاجة لاستوديو تصوير فعلي أو خبرة تصميم. تساعدك المنصة على تحسين مظهر متجرك وزيادة جاذبية المنتجات ورفع المبيعات بسرعة.' },
      { q: 'هل المنصة مخصصة للتجار السعوديين فقط؟', a: 'المنصة صُممت أساساً لتلبية احتياجات السوق السعودي والخليجي، لكنها متاحة لجميع التجار في العالم العربي.' },
      { q: 'هل أحتاج تسجيل دخول لإنشاء الصور؟', a: 'يمكنك تجربة بعض الاستوديوهات مجاناً. لكن للحصول على الاستفادة الكاملة والحفظ في المكتبة، تحتاج إلى إنشاء حساب.' },
    ],
  },
  {
    id: 'studios',
    label: 'الاستوديوهات',
    faqs: [
      { q: 'متى أستخدم استوديو سعود؟ ومتى أستخدم استوديو وليد؟', a: 'استوديو سعود مثالي لإنتاج صور منتجات نظيفة واحترافية بجودة استوديو. استوديو وليد مناسب عندما تريد توليد مشاهد إبداعية من وصف نصي بدون رفع صورة.' },
      { q: 'هل يمكن إزالة الخلفية الأصلية للمنتج؟', a: 'نعم، استوديو فيصل متخصص في فصل الخلفيات بدقة عالية وإنتاج ملفات PNG مثالية.' },
      { q: 'هل يمكن عمل بنرات وإعلانات فورية؟', a: 'نعم، استوديو جود مصممة البنرات الإعلانية تتيح لك إنشاء بنرات تسويقية احترافية بسرعة.' },
      { q: 'هل أستطيع تصوير منتجات المأكولات والمشروبات باحترافية؟', a: 'نعم، استوديو نور متخصص في إخراج صور المأكولات والمشروبات بطريقة شهية واحترافية.' },
    ],
  },
  {
    id: 'technical',
    label: 'المواصفات التقنية',
    faqs: [
      { q: 'ما هي أفضل مواصفات للصورة قبل رفعها؟', a: 'يُفضل استخدام صور بجودة عالية (لا تقل عن 800×800 بكسل)، بخلفية سادة وإضاءة واضحة تُظهر تفاصيل المنتج. الصيغ المدعومة: JPEG وPNG بحجم أقل من 50 ميغابايت.' },
      { q: 'هل يمكن توليد خلفيات جاهزة تلقائياً؟', a: 'نعم، معظم الاستوديوهات تُولّد خلفيات احترافية تلقائياً حسب النمط المختار.' },
      { q: 'هل المنصة تدعم إنشاء عدة لقطات لنفس المنتج؟', a: 'نعم، يمكنك اختيار أكثر من نمط (حتى 4 أنماط) في نفس الجلسة للحصول على عدة لقطات مختلفة للمنتج.' },
      { q: 'هل يمكن حفظ وحذف الصور داخل مكتبة خاصة؟', a: 'نعم، يتم حفظ الصور تلقائياً في مكتبتك الخاصة. يمكنك تنزيلها أو حذفها في أي وقت.' },
    ],
  },
  {
    id: 'billing',
    label: 'الاشتراكات والفوترة',
    faqs: [
      { q: 'هل استخدام سعوديو مجاني؟', a: 'نعم، يمكنك البدء بتجربة مجانية لكل باقة (من 3 إلى 5 صور) دون الحاجة لبطاقة دفع.' },
      { q: 'هل يمكن إلغاء الباقة أو ترقيتها في أي وقت؟', a: 'نعم، يمكنك ترقية باقتك أو إلغاء الاشتراك الحالي في أي وقت من لوحة الإعدادات.' },
      { q: 'كيف يتم استخدام رصيد الصور الإضافي؟', a: 'رصيد الصور الإضافي يُضاف فوراً إلى باقتك الحالية ويُستخدم تلقائياً عند نفاد الرصيد الأساسي.' },
    ],
  },
  {
    id: 'policy',
    label: 'السياسات والحقوق',
    faqs: [
      { q: 'هل هناك سياسة لخصوصية حسابي؟', a: 'نعم، نلتزم بحماية خصوصيتك الكاملة. بياناتك الشخصية محمية ولا تُشارك مع أي طرف ثالث.' },
      { q: 'هل تحفظ المنصة حقوق الصور الخاصة بي؟', a: 'نعم، جميع الصور التي تُولّدها هي ملكيتك الحصرية. لا تُستخدم لأي غرض آخر، ويتم حذفها تلقائياً من خوادمنا بعد المعالجة.' },
    ],
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
        <span className="font-semibold text-neutral-800 text-sm leading-relaxed">{q}</span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 text-primary-500 shrink-0 ms-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-neutral-500 leading-loose border-t border-neutral-100 pt-4 bg-neutral-50/50">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <section className="bg-white pt-28 pb-12">
        <Container size="md">
          <div className="text-center mb-10">
            <span className="section-tag mb-4 inline-block">كل تساؤلاتك تهمنا</span>
            <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-4">
              كيف يمكننا مساعدتك في الإبداع؟
            </h1>
            <p className="text-neutral-500 text-lg">إليك كل ما تحتاج معرفته عن خدماتنا!</p>
          </div>

          {/* Search bar placeholder */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="ابحث بحسب القسم ..."
              className="input-field ps-12"
              readOnly
            />
            <svg className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </Container>
      </section>

      <Section bg="subtle">
        <Container size="lg">
          <div className="grid lg:grid-cols-4 gap-8">

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-2">
                {categories.map(cat => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="block text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2.5 rounded-xl transition-all"
                  >
                    {cat.label}
                  </a>
                ))}
              </div>
            </aside>

            {/* FAQ Content */}
            <div className="lg:col-span-3 space-y-12">
              {categories.map(cat => (
                <div key={cat.id} id={cat.id}>
                  <h2 className="text-xl font-bold text-neutral-900 mb-5 pb-3 border-b border-neutral-200">{cat.label}</h2>
                  <div className="space-y-3">
                    {cat.faqs.map(faq => (
                      <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Still have questions */}
          <div className="mt-20 bg-primary-700 rounded-3xl p-10 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">هل مازال عندك سؤال ؟</h3>
            <p className="text-primary-200 mb-6">فريق الدعم عندنا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك في الحصول على أقصى استفادة من تجربة المنصة.</p>
            <Link href="/contact" className="bg-white text-primary-700 hover:bg-primary-50 font-bold px-8 py-3.5 rounded-xl transition-all inline-block">
              تواصل مع فريقنا
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
