import { Section, Container } from '@/components/ui'

const stats = [
  { value: '30K+',  label: 'ريال مبلغ التوفير السنوي',       color: 'text-primary-600' },
  { value: '25K+',  label: 'متوسط عدد الصور / متجر',          color: 'text-primary-600' },
  { value: '200+',  label: 'متجر إلكتروني سعودي',             color: 'text-primary-600' },
  { value: '99%',   label: 'تقليل وقت الإنتاج',               color: 'text-accent-500' },
]

export default function Stats() {
  return (
    <Section bg="subtle" className="py-16">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-4xl lg:text-5xl font-black mb-2 ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-neutral-500 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-neutral-400 text-sm mt-10">
          نعمل في سوق يعيش النمو — ونبني منصة تخدم احتياجاً حقيقياً لدى آلاف التجار.
        </p>
      </Container>
    </Section>
  )
}
