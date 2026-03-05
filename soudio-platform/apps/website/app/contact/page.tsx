'use client'

import { useState } from 'react'
import { Container, Section, Card } from '@/components/ui'

const subjects = [
  'استفسار عام',
  'مشكلة تقنية',
  'الباقات والفوترة',
  'اقتراح أو ملاحظة',
  'طلب شراكة',
  'أخرى',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <section className="bg-white pt-28 pb-12">
        <Container size="sm">
          <div className="text-center mb-10">
            <span className="section-tag mb-4 inline-block">لأننا معك على طول</span>
            <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-4">تواصل معنا</h1>
            <p className="text-neutral-500 text-lg">نسعد بتواصلك والإجابة على استفساراتك</p>
          </div>
        </Container>
      </section>

      <Section bg="subtle">
        <Container size="sm">
          {submitted ? (
            <Card padding="lg" className="text-center py-16">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">تم إرسال رسالتك بنجاح!</h2>
              <p className="text-neutral-500">سيتواصل معك فريق سعوديو قريباً.</p>
            </Card>
          ) : (
            <Card padding="lg">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    الاسم <span className="text-red-500">*</span>
                  </label>
                  <input type="text" placeholder="اكتب اسمك هنا ..." className="input-field" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input type="email" placeholder="example@example.com :مثال" className="input-field" dir="ltr" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    الموضوع <span className="text-red-500">*</span>
                  </label>
                  <select className="input-field appearance-none">
                    <option value="">اختر أحد المواضيع من القائمة ...</option>
                    {subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    الرسالة <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="اكتب سؤالك هنا ..."
                    className="input-field resize-none"
                  />
                </div>

                <button
                  onClick={() => setSubmitted(true)}
                  className="btn-primary w-full py-4 text-base"
                >
                  أرسل إلى فريق سعوديو
                </button>
              </div>
            </Card>
          )}

          {/* Contact info */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <Card padding="md" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-lg">✉️</span>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-0.5">البريد الإلكتروني</p>
                <a href="mailto:info@soudio.sa" className="text-sm font-semibold text-neutral-800 hover:text-primary-600 transition-colors">
                  info@soudio.sa
                </a>
              </div>
            </Card>
            <Card padding="md" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-lg">📞</span>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-0.5">الهاتف</p>
                <span className="text-sm font-semibold text-neutral-800" dir="ltr">+966 - 500XXXXXX</span>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
