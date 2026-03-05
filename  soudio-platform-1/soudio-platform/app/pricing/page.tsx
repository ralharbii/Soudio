import Link from "next/link";
import { Check, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PRICING_PLANS, FAQS } from "@/lib/constants";
import { ChevronDown } from "lucide-react";

export const metadata = { title: "باقات الاشتراك | سعوديو" };

const EXTRA_CREDITS = [
  { images: 10, price: 60, label: "رصيد إضافي" },
  { images: 20, price: 115, label: "الأكثر طلباً", highlight: true },
  { images: 30, price: 170, label: "الأفضل قيمة" },
];

export default function PricingPage() {
  const billingFaqs = FAQS.find((f) => f.category === "الاشتراكات والفوترة");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50/40 to-white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-100 mb-4">لا حاجة لبطاقة دفع — يمكنك تجربة المنصة مجاناً</span>
              <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">باقات الإشتراك</h1>
              <p className="text-neutral-500 text-lg leading-relaxed">باقات مرنة تناسب الجميع؛ من المتاجر الناشئة إلى العلامات الكبيرة.</p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {PRICING_PLANS.map((plan) => (
                <div key={plan.id} className={`relative rounded-3xl p-8 border-2 transition-all ${plan.popular ? "border-primary-500 bg-white shadow-primary scale-105" : "border-neutral-100 bg-white shadow-card"}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-2 rounded-full text-xs font-bold bg-primary-600 text-white shadow-md whitespace-nowrap">الباقة الأفضل لنموك معنا ✨</span>
                    </div>
                  )}
                  <h3 className="font-black text-xl text-neutral-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-neutral-500 mb-5">{plan.subtitle}</p>
                  <div className="mb-5 pb-5 border-b border-neutral-100">
                    <span className="text-5xl font-black text-neutral-900">{plan.price}</span>
                    <span className="text-xl text-neutral-500 mr-1">ر.س</span>
                    <p className="text-xs text-neutral-400 mt-1">عدد ({plan.images}) صورة / شهرياً</p>
                  </div>
                  <ul className="space-y-3 mb-7">
                    <li className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      تجربة مجانية عدد ({plan.trialImages} صور)
                    </li>
                    <li className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      عدد ({plan.images}) صورة / شهرياً
                    </li>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                        <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button variant={plan.popular ? "primary" : "outline"} size="lg" className="w-full">{plan.cta}</Button>
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-neutral-400 mt-8 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-primary-400" />
              لا حاجة لبطاقة دفع — يمكنك تجربة المنصة مجاناً
            </p>
          </Container>
        </Section>

        {/* Extra credits */}
        <Section alt>
          <Container>
            <SectionHeading badge="رصيد الصور الإضافي" title="صور إضافية بدون التزام" subtitle="رصيد صور إضافي يضمن لك الاستمرار دون توقف، يُضاف فوراً إلى باقتك الحالية." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {EXTRA_CREDITS.map(({ images, price, label, highlight }) => (
                <div key={images} className={`rounded-2xl p-6 border-2 text-center ${highlight ? "border-accent-300 bg-accent-50" : "border-neutral-100 bg-white shadow-card"}`}>
                  {highlight && <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-accent-500 text-white mb-3">الأكثر طلباً</span>}
                  <p className="text-xs text-neutral-500 mb-2">{label} — إضافة رصيد صور</p>
                  <div className="text-3xl font-black text-neutral-900 mb-1">{images} صورة</div>
                  <div className="text-2xl font-bold text-primary-600 mb-4">{price} ر.س</div>
                  <Link href="/signup">
                    <Button variant={highlight ? "accent" : "outline"} size="md" className="w-full">شراء صور إضافية</Button>
                  </Link>
                  <p className="text-xs text-neutral-400 mt-2">دفعة واحدة • بدون اشتراك</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        {billingFaqs && (
          <Section>
            <Container size="md">
              <SectionHeading badge="الأسئلة الشائعة" title="أسئلة حول الاشتراك" />
              <div className="space-y-3">
                {billingFaqs.items.map(({ q, a }) => (
                  <details key={q} className="group bg-white border border-neutral-100 rounded-2xl shadow-card overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-neutral-800 hover:text-primary-700 transition-colors">
                      <span>{q}</span>
                      <ChevronDown className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform flex-shrink-0 ms-3" />
                    </summary>
                    <div className="px-6 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-neutral-50 pt-3">{a}</div>
                  </details>
                ))}
              </div>
            </Container>
          </Section>
        )}
      </main>
      <Footer />
    </div>
  );
}
