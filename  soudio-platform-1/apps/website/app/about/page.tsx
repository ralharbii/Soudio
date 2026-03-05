import type { Metadata } from 'next'
import { Section, Container, SectionHeader, Card } from '@/components/ui'

export const metadata: Metadata = { title: 'قصتنا' }

const values = [
  { icon: '⚡', label: 'السرعة' },
  { icon: '✨', label: 'البساطة' },
  { icon: '🏆', label: 'الاحتراف' },
  { icon: '💡', label: 'الابتكار' },
  { icon: '🤝', label: 'التركيز على التاجر' },
  { icon: '🗺️', label: 'فهم السوق' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-28 pb-16">
        <Container size="md">
          <div className="text-center">
            <span className="section-tag mb-6 inline-block">بداية الفكرة</span>
            <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-8">
              قصة <span className="text-primary-600">&quot;سعوديو&quot;</span>
            </h1>
          </div>

          <Card padding="lg" className="mb-12">
            <p className="text-neutral-700 leading-loose mb-4">
              بدأت القصة من تجربة شخصية يعيشها آلاف التجار يومياً في السعودية!!
            </p>
            <p className="text-neutral-600 leading-loose mb-4">
              تاجر يريد عرض منتجاته بطريقة احترافية، لكنه يجد نفسه فجأة في أدوار متعددة:
              <strong className="text-neutral-800"> مصوّر، مصمّم، مخرج، ومنسّق.. في وقت واحد!!</strong>
            </p>
            <p className="text-neutral-600 leading-loose mb-4">
              التصوير صعب .. المعدات مكلفة .. الزمن طويل .. والنتائج غير ثابتة!
              كل صورة تحتاج معدات، وإضاءة، وخلفيات، ومصوّر، ومنتج.
              وتبدأ التكلفة من مئات الريالات للصورة الواحدة، دون ضمان جودة متناسقة.
            </p>
            <p className="text-neutral-600 leading-loose mb-6">
              هذه التجربة دفعتنا لطرح سؤال واحد:
            </p>
            <blockquote className="border-r-4 border-primary-500 pr-6 py-2 bg-primary-50 rounded-l-xl rounded-r-none">
              <p className="text-primary-700 font-bold text-lg leading-relaxed">
                &quot;لماذا لا يحصل التاجر على &apos;مدير تصوير ذكي&apos; .. سعودي .. يفهمه .. ويعمل بداله؟&quot;
              </p>
            </blockquote>
            <p className="text-primary-600 font-bold text-xl mt-6">ومن هنا وُلدت فكرة .. &quot;سعوديو&quot;</p>
          </Card>
        </Container>
      </section>

      {/* Brand birth */}
      <Section bg="subtle">
        <Container size="md">
          <div className="text-center mb-10">
            <span className="section-tag mb-4 inline-block">ولادة اسم</span>
            <h2 className="text-3xl font-black text-neutral-900 mb-4">ماهو &quot;سعوديو&quot;؟</h2>
          </div>

          <Card padding="lg" className="mb-8">
            <p className="text-neutral-600 leading-loose mb-4">
              <strong className="text-neutral-800">&quot;سعوديو&quot;</strong> نموذج ذكي وُلد من فكرة بسيطة ..{' '}
              <span className="text-primary-600 font-bold">استوديو يصنع الصورة .. وسعودي يصنع الهوية</span>
            </p>
            <p className="text-neutral-600 leading-loose mb-4">
              جمعنا كلمتي <strong>&quot;استوديو&quot;</strong> و <strong>&quot;سعودي&quot;</strong> في اسم واحد، لنمنحنا هوية تختزل رؤية كاملة:
              احترافية الاستوديو .. وأصالة الروح السعودية
            </p>
            <div className="bg-neutral-50 rounded-2xl p-6 mt-4">
              <p className="text-neutral-600 leading-loose">
                منصة صُممت لتفهم احتياجات السوق المحلي، وتقدم حلولاً بصرية ذكية تشبهه وتتكيف مع تطلعاته.
                استوديو افتراضي يعمل بالذكاء الاصطناعي، يلتقط المشهد ويهتم بالتفاصيل
                ليمنح كل متجر سعودي قوة عرض تليق بجودة منتجه.
              </p>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Vision & Mission */}
      <Section bg="white">
        <Container>
          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            <Card padding="lg">
              <div className="text-3xl mb-4">🔭</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">رؤيتنا</h3>
              <p className="text-neutral-600 leading-relaxed">
                أن نصنع الجيل الجديد من تصوير منتجات التجارة الإلكترونية في السعودية والخليج والعالم العربي.
              </p>
            </Card>
            <Card padding="lg">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">رسالتنا</h3>
              <p className="text-neutral-600 leading-relaxed">
                أن نحول عملية التصوير والتصميم والإخراج من عبء تشغيلي إلى تجربة ذكية سريعة في متناول أي تاجر.
              </p>
            </Card>
          </div>

          {/* Values */}
          <SectionHeader tag="قيمنا" title="ما يُحركنا" center />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {values.map(v => (
              <div key={v.label} className="text-center bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                <div className="text-2xl mb-2">{v.icon}</div>
                <p className="text-sm font-bold text-neutral-700">{v.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
