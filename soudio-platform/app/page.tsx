import Link from "next/link";
import {
  Camera, Zap, Star, ArrowLeft, ChevronDown,
  Shield, Clock, TrendingUp, Check, Sparkles,
  Package, Image as ImageIcon, Download
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { STUDIOS, PRICING_PLANS, FAQS } from "@/lib/constants";

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-accent-50/20 pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary-100/40 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-accent-100/30 blur-3xl" />
      </div>

      <Container>
        <div className="relative text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-semibold mb-6 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary-500" />
            أول استوديو سعودي ذكي متخصص
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 leading-[1.15] mb-6 animate-fade-up delay-100">
            سعوديو .. استوديو سعودي متخصص{" "}
            <br className="hidden md:block" />
            <span className="text-gradient">في تجهيز صور منتجاتك</span>
            <br />
            بالذكاء الاصطناعي
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
            منصة مبتكرة تجمع في مكان واحد تقنيات التصوير والمعالجة والإخراج الذكي
            لإنتاج صور منتجات احترافية — بسرعة وكفاءة.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 animate-fade-up delay-300">
            <Link href="/signup">
              <Button size="xl" variant="primary">
                جرّب الإبداع مجاناً
                <Sparkles className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="xl" variant="secondary">
                شاهد أعمالنا
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 animate-fade-up delay-400">
            {[
              { icon: Shield, text: "بدون بطاقة دفع" },
              { icon: Zap, text: "نتائج فورية" },
              { icon: Star, text: "جودة احترافية" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-primary-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-up delay-500">
          {[
            { value: "99%", label: "تقليل وقت الإنتاج", color: "text-primary-600" },
            { value: "200+", label: "متوسط الصور لكل متجر", color: "text-primary-600" },
            { value: "25K+", label: "ريال مبلغ التوفير السنوي", color: "text-accent-600" },
            { value: "30K+", label: "متجر إلكتروني سعودي", color: "text-primary-600" },
          ].map(({ value, label, color }) => (
            <div key={label} className="bg-white/80 backdrop-blur rounded-2xl p-5 text-center border border-neutral-100 shadow-card">
              <div className={`text-2xl md:text-3xl font-black ${color} mb-1`}>{value}</div>
              <div className="text-xs text-neutral-500 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Value Props ───────────────────────────────────────────────────────────────
function ValueProps() {
  const props = [
    { icon: Camera, title: "مدير تصوير يفهمك", desc: "استوديو ذكي يعمل بدلاً عنك ويفهم احتياجات سوقك" },
    { icon: Zap, title: "صور فورية لمتجرك", desc: "من رفع الصورة إلى تحميل النتيجة في ثوانٍ معدودة" },
    { icon: Shield, title: "ذكاء اصطناعي مُبسَّط", desc: "واجهة بسيطة لا تحتاج خبرة تقنية أو تصميمية" },
    { icon: TrendingUp, title: "مصمم للسوق السعودي", desc: "يفهم طبيعة المتاجر السعودية ويتكيف مع تطلعاتها" },
  ];

  return (
    <Section>
      <Container>
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-accent-50 text-accent-700 border border-accent-100 mb-3">
            تاجــر؟
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900">
            وش يقدّم لك سعوديو؟!
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group p-6 rounded-2xl bg-white border border-neutral-100 shadow-card card-hover text-center">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">{title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── Studios Section ───────────────────────────────────────────────────────────
function StudiosSection() {
  return (
    <Section alt>
      <Container>
        <SectionHeading
          badge="مبدعو سعوديو"
          title="استوديوهات ذكية متخصصة"
          subtitle="نعتمد على 8 استوديوهات ذكية — كل استوديو يمثل مهارات بصرية متخصصة تعمل كفريق تصوير وإخراج متكامل."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {STUDIOS.map((studio) => (
            <Link key={studio.id} href={`/studios/${studio.id}`}>
              <div className="group p-5 rounded-2xl bg-white border border-neutral-100 shadow-card card-hover text-center cursor-pointer">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl shadow-sm group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${studio.color}15` }}
                >
                  {studio.emoji}
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `${studio.color}20` }}>
                  <Camera className="w-4 h-4" style={{ color: studio.color }} />
                </div>
                <h3 className="font-black text-neutral-900 text-lg mb-0.5">{studio.name}</h3>
                <p className="text-xs font-semibold mb-2" style={{ color: studio.color }}>{studio.role}</p>
                <p className="text-xs text-neutral-400 leading-tight">{studio.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── How it Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: "1", icon: Package, title: "حدّد هدفك", desc: "اختر الاستوديو والنمط المطلوب لصورة منتجك" },
    { num: "2", icon: ImageIcon, title: "ارفع صورة المنتج", desc: "التقط صورة بالجوال أو استخدم صورة جاهزة" },
    { num: "3", icon: Sparkles, title: "دع الذكاء يبدع", desc: "ضبط الخلفيات والإضاءة والتكوين وإنشاء المقترحات تلقائياً" },
    { num: "4", icon: Download, title: "استلم صورتك جاهزة", desc: "بجودة عالية وخيارات متعددة، مناسبة لمتجرك" },
  ];

  return (
    <Section>
      <Container>
        <SectionHeading
          badge="كيف يعمل سعوديو؟"
          title="كمدير تصوير لمتجرك الإلكتروني!"
          subtitle="بساطة • ذكاء • فعالية"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="absolute top-10 right-[12.5%] w-[75%] h-0.5 bg-gradient-to-l from-transparent via-primary-200 to-transparent hidden lg:block" />
          {steps.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="relative text-center">
              <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="w-20 h-20 rounded-2xl bg-primary-600 shadow-primary flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <span className="absolute -top-2 -start-2 w-7 h-7 rounded-full bg-accent-500 text-white text-xs font-black flex items-center justify-center shadow-md">
                  {num}
                </span>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">{title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── Pricing Preview ───────────────────────────────────────────────────────────
function PricingPreview() {
  return (
    <Section alt>
      <Container>
        <SectionHeading
          badge="باقات الاشتراك"
          title="باقات مرنة تناسب الجميع"
          subtitle="لأن احتياجات المتاجر تختلف — من المتاجر الناشئة إلى العلامات الكبيرة."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-7 border-2 transition-all ${
                plan.popular
                  ? "border-primary-500 bg-white shadow-primary scale-105"
                  : "border-neutral-100 bg-white shadow-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-primary-600 text-white shadow-md whitespace-nowrap">
                    الباقة الأفضل لنموك معنا ✨
                  </span>
                </div>
              )}
              <div className="mb-4">
                <h3 className="font-black text-xl text-neutral-900">{plan.name}</h3>
                <p className="text-sm text-neutral-500 mt-0.5">{plan.subtitle}</p>
              </div>
              <div className="mb-5">
                <span className="text-4xl font-black text-neutral-900">{plan.price}</span>
                <span className="text-lg text-neutral-500 mr-1">ر.س</span>
                <span className="text-xs text-neutral-400 block mt-0.5">عدد ({plan.images}) صورة / شهرياً</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  تجربة مجانية عدد ({plan.trialImages} صور)
                </li>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-neutral-400 mt-6 flex items-center justify-center gap-1.5">
          <Shield className="w-4 h-4 text-primary-400" />
          لا حاجة لبطاقة دفع — يمكنك تجربة المنصة مجاناً
        </p>
      </Container>
    </Section>
  );
}

// ─── FAQ Preview ──────────────────────────────────────────────────────────────
function FAQPreview() {
  const faqs = FAQS[0].items.slice(0, 3);
  return (
    <Section>
      <Container size="md">
        <SectionHeading badge="الأسئلة الشائعة" title="كيف يمكننا مساعدتك؟" />
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group bg-white border border-neutral-100 rounded-2xl shadow-card overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-neutral-800 hover:text-primary-700 transition-colors">
                <span>{q}</span>
                <ChevronDown className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform flex-shrink-0 ms-3" />
              </summary>
              <div className="px-6 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-neutral-50 pt-3">
                {a}
              </div>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq">
            <Button variant="secondary" size="lg">
              عرض جميع الأسئلة
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}

// ─── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-16 md:py-20 bg-primary-700 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-primary-600/40 -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent-500/20 translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>
      <Container>
        <div className="text-center relative">
          <div className="text-4xl mb-4">🤍</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            سعوديو .. يعمل لأجلك، وبالذكاء الذي يفهمك!
          </h2>
          <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">
            فريقنا كله مدير لـ تصويرك .. وجاهز يبدع لك في كل ما تحتاجه .. بضغطة زر!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button size="xl" className="bg-white text-primary-700 hover:bg-primary-50 shadow-xl">
                اختر الاستوديو الذي يناسبك
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ValueProps />
        <StudiosSection />
        <HowItWorks />
        <PricingPreview />
        <FAQPreview />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
