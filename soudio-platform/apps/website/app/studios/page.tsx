import type { Metadata } from 'next'
import Link from 'next/link'
import { Section, Container, SectionHeader, Card } from '@/components/ui'

export const metadata: Metadata = { title: 'مبدعو سعوديو' }

const studios = [
  {
    id: 'saud',
    name: 'سعود',
    title: 'استوديو سعود',
    role: 'محترف التصوير الذكي',
    description: 'مخرج صور منتجات نظيفة واحترافية بجودة استوديو.',
    style: 'استوديو أبيض، زوايا دقيقة، ظلال محسوبة، تفاصيل واضحة.',
    usage: 'العطور، الإلكترونيات، التجميل، الأغذية، المنتجات الصغيرة.',
    color: 'bg-sky-500',
    emoji: '📸',
    tag: '#استوديو_سعود',
    styles: ['ناعم', 'كلاسيك', 'إبداعي', 'واقعي', 'فاخر', 'تفاصيل'],
  },
  {
    id: 'khaled',
    name: 'خالد',
    title: 'استوديو خالد',
    role: 'مجدد الصور الخالدة',
    description: 'تحسين الصور القديمة، رفع الدقة، وإعادة وضوح الألوان.',
    style: 'محافظ، دقيق، يحترم هوية وأصل الصورة.',
    usage: 'الأرشيف، الصور القديمة، الوثائق، الذكريات.',
    color: 'bg-amber-500',
    emoji: '🖼️',
    tag: '#استوديو_خالد',
    styles: ['أصالة', 'أحادي', 'حياة', 'ترميم', 'ألوان', 'مشهد'],
  },
  {
    id: 'waleed',
    name: 'وليد',
    title: 'استوديو وليد',
    role: 'مولّد اللقطات الإبداعية',
    description: 'توليد مشاهد احترافية للمنتجات عبر وصف نصي موجّه للأفكار.',
    style: 'وصف مخصص، مشاهد واقعية، إخراج إبداعي.',
    usage: 'الحملات الإعلانية، صور التواصل الاجتماعي، والمحتوى البصري.',
    color: 'bg-violet-500',
    emoji: '✨',
    tag: '#استوديو_وليد',
    styles: ['نصي إلى صورة'],
  },
  {
    id: 'jood',
    name: 'جود',
    title: 'استوديو جود',
    role: 'مصممة البنرات الإعلانية',
    description: 'تصميم بنرات وإعلانات تسويقية احترافية بسرعة وجودة عالية.',
    style: 'إبداعي، ملفت، متناسق مع هوية المتجر.',
    usage: 'الحملات التسويقية، السوشيال ميديا، الإعلانات.',
    color: 'bg-rose-500',
    emoji: '🎨',
    tag: '#استوديو_جود',
    styles: ['بنر عرض', 'إعلان منتج', 'تصميم حملة'],
  },
  {
    id: 'zain',
    name: 'زين',
    title: 'استوديو زين',
    role: 'معرض الأزياء والزينة',
    description: 'تصوير منتجات الأزياء والزينة واكسسوارات الموضة بأسلوب احترافي.',
    style: 'أنيق، راقٍ، يعكس جماليات الموضة.',
    usage: 'الملابس، الأحذية، الإكسسوارات، الزينة.',
    color: 'bg-pink-500',
    emoji: '👗',
    tag: '#استوديو_زين',
    styles: ['موديل افتراضي', 'فلات لاي', 'هانج'],
  },
  {
    id: 'noor',
    name: 'نور',
    title: 'استوديو نور',
    role: 'مخرجة الطعام البصري',
    description: 'تنسيق وإخراج صور المأكولات والمشروبات بطريقة شهية.',
    style: 'دافئ، لذيذ، إبداعي، غني بالتفاصيل.',
    usage: 'المطاعم، المقاهي، الحلويات، المنتجات الغذائية.',
    color: 'bg-orange-500',
    emoji: '🍽️',
    tag: '#استوديو_نور',
    styles: ['ناعم', 'كلاسيك', 'شهي', 'فاخر', 'دافئ', 'طازج'],
  },
  {
    id: 'faisal',
    name: 'فيصل',
    title: 'استوديو فيصل',
    role: 'خبير فصل الخلفيات',
    description: 'قص المنتجات والخلفيات بدقة، وإنتاج ملفات PNG مثالية.',
    style: 'حواف دقيقة، مخرجات نظيفة، جودة عالية.',
    usage: 'المتاجر الإلكترونية، البنرات، التصاميم، العروض التسويقية.',
    color: 'bg-teal-500',
    emoji: '✂️',
    tag: '#استوديو_فيصل',
    styles: ['إزالة خلفية', 'إزالة + تحسين'],
  },
  {
    id: 'shahad',
    name: 'شهد',
    title: 'استوديو شهد',
    role: 'دمج المشهد الذكي',
    description: 'دمج واستبدال المنتجات داخل مشاهد وخلفيات تسويقية جاهزة.',
    style: 'إخراج واقعي متوازن، انسجام بصري دقيق، وضبط تلقائي للإضاءة.',
    usage: 'المتاجر الإلكترونية، البنرات والحملات الإعلانية، تسويق المنتجات.',
    color: 'bg-indigo-500',
    emoji: '🔮',
    tag: '#استوديو_شهد',
    styles: ['دمج مشهد'],
  },
]

export default function StudiosPage() {
  return (
    <>
      <section className="bg-white pt-28 pb-12">
        <Container>
          <div className="text-center mb-12">
            <span className="section-tag mb-4 inline-block">استوديوهات الشخصيات الذكية</span>
            <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-4">
              مبدعو سعوديو
            </h1>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
              نعتمد في "سعوديو" على استوديوهات ذكية — كل استوديو يمثل مهارات بصرية متخصصة
              تعمل كفريق تصوير وإخراج متكامل، يعمل بالذكاء الاصطناعي، ويفهم سوق التجارة الإلكترونية.
            </p>
          </div>
        </Container>
      </section>

      <Section bg="subtle">
        <Container>
          <div className="grid gap-8">
            {studios.map((studio, i) => (
              <Card key={studio.id} id={studio.id} padding="lg" className="overflow-hidden">
                <div className="grid sm:grid-cols-3 gap-6">
                  {/* Studio identity */}
                  <div className="sm:col-span-1">
                    {/* Smart card */}
                    <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 ${studio.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                          <span className="text-xl">{studio.emoji}</span>
                        </div>
                        <div>
                          <h3 className="font-black text-lg text-neutral-900">{studio.title}</h3>
                          <p className="text-primary-600 text-xs font-bold">{studio.role}</p>
                        </div>
                      </div>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full font-semibold">
                        {studio.tag}
                      </span>
                    </div>

                    <Link
                      href="/signup"
                      className="btn-primary w-full text-center block text-sm"
                    >
                      ابدأ رحلة الإبداع .. مع {studio.name}
                    </Link>
                  </div>

                  {/* Details */}
                  <div className="sm:col-span-2 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'الوظيفـة:', value: studio.description },
                        { label: 'الأسلـوب:', value: studio.style },
                        { label: 'الاستخـدام:', value: studio.usage },
                      ].map(item => (
                        <div key={item.label}>
                          <p className="text-xs font-bold text-neutral-400 mb-1">{item.label}</p>
                          <p className="text-sm text-neutral-600 leading-relaxed">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {studio.styles.length > 1 && (
                      <div>
                        <p className="text-xs font-bold text-neutral-400 mb-2">الأنماط المتاحة:</p>
                        <div className="flex flex-wrap gap-2">
                          {studio.styles.map(s => (
                            <span key={s} className="text-xs bg-white border border-neutral-200 text-neutral-600 px-3 py-1 rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
