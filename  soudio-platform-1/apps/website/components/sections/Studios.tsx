import Link from 'next/link'
import { Section, Container, SectionHeader, Card } from '@/components/ui'

const studios = [
  { id: 'saud',   name: 'سعود',  role: 'محترف التصوير الذكي',      color: 'bg-sky-500',     emoji: '📸' },
  { id: 'khaled', name: 'خالد',  role: 'مجدد الصور الخالدة',        color: 'bg-amber-500',   emoji: '🖼️' },
  { id: 'waleed', name: 'وليد',  role: 'مولّد اللقطات الإبداعية',   color: 'bg-violet-500',  emoji: '✨' },
  { id: 'jood',   name: 'جود',   role: 'مصممة البنرات الإعلانية',   color: 'bg-rose-500',    emoji: '🎨' },
  { id: 'zain',   name: 'زين',   role: 'معرض الأزياء والزينة',       color: 'bg-pink-500',    emoji: '👗' },
  { id: 'noor',   name: 'نور',   role: 'مخرجة الطعام البصري',        color: 'bg-orange-500',  emoji: '🍽️' },
  { id: 'faisal', name: 'فيصل', role: 'خبير فصل الخلفيات',          color: 'bg-teal-500',    emoji: '✂️' },
  { id: 'shahad', name: 'شهد',  role: 'دمج المشهد الذكي',           color: 'bg-indigo-500',  emoji: '🔮' },
]

export default function Studios() {
  return (
    <Section bg="subtle">
      <Container>
        <SectionHeader
          tag="استوديوهات الشخصيات الذكية"
          title="مبدعو سعوديو"
          description={`نعتمد في "سعوديو" على استوديوهات ذكية — كل استوديو يمثل مهارات بصرية متخصصة تعمل كفريق تصوير وإخراج متكامل.`}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {studios.map((studio) => (
            <Link
              key={studio.id}
              href={`/studios#${studio.id}`}
              className="group"
            >
              <Card hover padding="md" className="text-center cursor-pointer group-hover:border-primary-200">
                <div className={`w-12 h-12 ${studio.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-xl">{studio.emoji}</span>
                </div>
                <p className="font-bold text-neutral-900 text-sm">استوديو {studio.name}</p>
                <p className="text-xs text-neutral-500 mt-1 leading-snug">{studio.role}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/studios" className="btn-primary inline-flex">
            تعرف على كل المبدعين
          </Link>
        </div>
      </Container>
    </Section>
  )
}
