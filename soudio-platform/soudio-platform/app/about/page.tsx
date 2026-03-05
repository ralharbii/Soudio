import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Zap } from "lucide-react";

const VALUES = [
  { title: "السرعة", icon: "⚡" },
  { title: "البساطة", icon: "✦" },
  { title: "الاحتراف", icon: "🏆" },
  { title: "الابتكار", icon: "💡" },
  { title: "التركيز على التاجر", icon: "🤝" },
  { title: "فهم السوق", icon: "🎯" },
];

export const metadata = { title: "قصتنا | سعوديو", description: "تعرف على قصة سعوديو ورؤيتنا في تغيير تصوير منتجات التجارة الإلكترونية." };

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50/50 to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-100/30 translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-100 mb-4">بداية الفكرة</span>
              <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">قصة <span className="text-gradient">"سعوديو"</span></h1>
            </div>
          </Container>
        </section>

        <Section>
          <Container size="md">
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-card p-8 md:p-12 mb-12">
              <p className="text-lg text-neutral-700 leading-loose mb-5">بدأت القصة من تجربة شخصية يعيشها آلاف التجار يومياً في السعودية!!</p>
              <p className="text-neutral-600 leading-loose mb-4">تاجر يريد عرض منتجاته بطريقة احترافية، لكنه يجد نفسه فجأة في أدوار متعددة: <strong>مصوّر، مصمّم، مخرج، ومنسّق</strong> .. في وقت واحد!!</p>
              <p className="text-neutral-600 leading-loose mb-6">التصوير صعب.. المعدات مكلفة.. الزمن طويل.. والنتائج غير ثابتة! وتبدأ التكلفة من مئات الريالات للصورة الواحدة، دون ضمان جودة متناسقة.</p>
              <blockquote className="border-r-4 border-primary-500 pr-6 py-3 bg-primary-50/50 rounded-l-xl text-primary-800 font-semibold text-lg italic">"لماذا لا يحصل التاجر على مدير تصوير ذكي .. سعودي .. يفهمه .. ويعمل بدلاً عنه؟"</blockquote>
              <p className="text-primary-700 font-black text-xl mt-6">ومن هنا وُلدت فكرة .. "سعوديو" 🤍</p>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-8 mb-12">
              <h2 className="text-2xl font-black text-neutral-900 mb-5 text-center">ماهو "سعوديو"؟</h2>
              <p className="text-neutral-600 leading-loose mb-3">"سعوديو" نموذج ذكي وُلد من فكرة بسيطة .. <strong className="text-primary-700">استوديو يصنع الصورة .. وسعودي يصنع الهوية</strong></p>
              <p className="text-neutral-600 leading-loose">جمعنا كلمتي "استوديو" و"سعودي" في اسم واحد، ليمنحنا هوية تختزل رؤية كاملة: احترافية الاستوديو .. وأصالة الروح السعودية. "سعوديو" هو الاستوديو الذي يعمل لأجلك، وبالذكاء الذي يفهمك.</p>
            </div>
          </Container>
        </Section>

        <Section alt>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { label: "رؤيتنا", text: "أن نصنع الجيل الجديد من تصوير منتجات التجارة الإلكترونية في السعودية والخليج والعالم العربي.", color: "primary" },
                { label: "رسالتنا", text: "أن نحول عملية التصوير والتصميم والإخراج من عبء تشغيلي إلى تجربة ذكية سريعة في متناول أي تاجر.", color: "accent" },
              ].map(({ label, text, color }) => (
                <div key={label} className={`p-8 rounded-2xl border-2 ${color === "primary" ? "border-primary-200 bg-primary-50/50" : "border-accent-200 bg-accent-50/50"}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className={`w-5 h-5 ${color === "primary" ? "text-primary-600" : "text-accent-600"}`} />
                    <h3 className={`font-black text-xl ${color === "primary" ? "text-primary-800" : "text-accent-800"}`}>{label}</h3>
                  </div>
                  <p className={`leading-relaxed ${color === "primary" ? "text-primary-700" : "text-accent-700"}`}>{text}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading badge="قيمنا" title="ما الذي يجعلنا مختلفين؟" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {VALUES.map(({ title, icon }) => (
                <div key={title} className="text-center p-5 rounded-2xl bg-white border border-neutral-100 shadow-card card-hover">
                  <div className="text-3xl mb-2">{icon}</div>
                  <p className="text-sm font-bold text-neutral-700">{title}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
