import type { Metadata } from 'next'
import { Section, Container } from '@/components/ui'

export const metadata: Metadata = { title: 'شروط الاستخدام' }

export default function TermsPage() {
  return (
    <Section bg="subtle">
      <Container size="md" className="pt-16">
        <h1 className="text-4xl font-black text-neutral-900 mb-8">شروط الاستخدام</h1>
        <div className="space-y-6 text-neutral-600 leading-loose">
          <p>باستخدامك لمنصة سعوديو، فإنك توافق على الشروط والأحكام التالية.</p>
          <h2 className="text-xl font-bold text-neutral-800">استخدام المنصة</h2>
          <p>يُقر المستخدم بأنه سيستخدم المنصة للأغراض المشروعة فقط، وسيلتزم بجميع القوانين المعمول بها في المملكة العربية السعودية.</p>
          <h2 className="text-xl font-bold text-neutral-800">حقوق الملكية</h2>
          <p>الصور المُولَّدة عبر المنصة هي ملكية المستخدم الحصرية. محتوى المنصة وتقنياتها محمية بحقوق الملكية الفكرية لشركة سعوديو.</p>
          <h2 className="text-xl font-bold text-neutral-800">الباقات والفوترة</h2>
          <p>يلتزم المستخدم بسياسات الدفع المعلنة. يمكن إلغاء الاشتراك في أي وقت وفقاً للسياسات المحددة.</p>
          <h2 className="text-xl font-bold text-neutral-800">المسؤولية</h2>
          <p>تقدم سعوديو خدماتها بأفضل مستوى ممكن، لكنها غير مسؤولة عن أي خسائر ناتجة عن استخدام المنصة.</p>
        </div>
      </Container>
    </Section>
  )
}
