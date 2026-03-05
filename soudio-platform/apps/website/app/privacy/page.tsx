import type { Metadata } from 'next'
import { Section, Container } from '@/components/ui'

export const metadata: Metadata = { title: 'سياسة الخصوصية' }

export default function PrivacyPage() {
  return (
    <Section bg="subtle">
      <Container size="md" className="pt-16">
        <h1 className="text-4xl font-black text-neutral-900 mb-8">سياسة الخصوصية</h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600 leading-loose">
          <p>تُولي منصة سعوديو أهمية قصوى لحماية خصوصية مستخدميها وبياناتهم الشخصية.</p>
          <h2 className="text-xl font-bold text-neutral-800">البيانات التي نجمعها</h2>
          <p>نجمع البيانات الضرورية فقط لتقديم خدماتنا، بما يشمل: الاسم، البريد الإلكتروني، رقم الجوال، والصور التي ترفعها للمعالجة.</p>
          <h2 className="text-xl font-bold text-neutral-800">كيفية استخدام البيانات</h2>
          <p>تُستخدم بياناتك فقط لتقديم خدمات المنصة وتحسين تجربتك. لا نبيع أي بيانات لأطراف ثالثة.</p>
          <h2 className="text-xl font-bold text-neutral-800">حماية الصور</h2>
          <p>صورك خاصة بك تماماً ولا تُستخدم لأي غرض آخر. يتم حذفها تلقائياً من خوادمنا بعد المعالجة.</p>
          <h2 className="text-xl font-bold text-neutral-800">التواصل</h2>
          <p>لأي استفسار يتعلق بسياسة الخصوصية، تواصل معنا على: info@soudio.sa</p>
        </div>
      </Container>
    </Section>
  )
}
