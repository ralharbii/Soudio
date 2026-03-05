import { Section, Container, SectionHeader, Card } from '@/components/ui'

const features = [
  {
    icon: '🎯',
    title: 'مدير تصوير يفهمك',
    description: 'استوديو ذكي يقوم بدور مدير التصوير الذي يفهم متجرك ويخدم أهدافك — بدون أي خبرة مسبقة.',
  },
  {
    icon: '⚡',
    title: 'صور فورية لمتجرك',
    description: 'من رفع الصورة إلى استلام النتيجة الاحترافية — في ثوانٍ معدودة وبضغطة زر واحدة.',
  },
  {
    icon: '🤖',
    title: 'ذكاء اصطناعي مُبسَّط',
    description: 'تقنيات التصوير والمعالجة والإخراج الذكي متاحة لأي تاجر — بواجهة سهلة وبسيطة.',
  },
  {
    icon: '🇸🇦',
    title: 'مُصمَّم للسوق السعودي',
    description: 'منصة تفهم احتياجات السوق المحلي وتقدم حلولاً بصرية ذكية تشبهه وتتكيف مع تطلعاته.',
  },
  {
    icon: '💰',
    title: 'تكلفة أقل بجودة أعلى',
    description: 'وفّر آلاف الريالات سنوياً مقارنةً بالتصوير التقليدي — مع الحفاظ على جودة استوديو احترافي.',
  },
  {
    icon: '🔒',
    title: 'خصوصية وأمان تام',
    description: 'صورك خاصة ولا تُستخدم لأي غرض آخر. يتم حذف الصور تلقائياً بمجرد تدريب النموذج.',
  },
]

export default function Features() {
  return (
    <Section bg="white">
      <Container>
        <SectionHeader
          tag="وش يقدم لك سعوديو؟!"
          title="تاجـــر .. إليك ما يقدمه سعوديو"
          description="منصة سعوديو توفر لك كل ما تحتاجه لتقديم منتجاتك بأفضل صورة ممكنة — بدون مجهود."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} hover padding="lg">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{feature.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
