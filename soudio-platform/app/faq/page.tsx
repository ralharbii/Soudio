"use client";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FAQS } from "@/lib/constants";
import Link from "next/link";

export default function FAQPage() {
  const [active, setActive] = useState<string | null>(null);
  const [cat, setCat] = useState<string>("all");

  const categories = [{ id: "all", label: "الكل" }, ...FAQS.map((f) => ({ id: f.category, label: f.category }))];
  const filtered = cat === "all" ? FAQS : FAQS.filter((f) => f.category === cat);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50/40 to-white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-100 mb-4">كل تساؤلاتك تهمنا</span>
              <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">كيف يمكننا مساعدتك في الإبداع؟</h1>
              <p className="text-neutral-500 text-lg">إليك كل ما تحتاج معرفته عن خدماتنا!</p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-56 flex-shrink-0">
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-4 sticky top-24">
                  <p className="text-xs text-neutral-400 mb-3 font-semibold uppercase tracking-wide">ابحث بحسب القسم</p>
                  <div className="space-y-1">
                    {categories.map((c) => (
                      <button key={c.id} onClick={() => setCat(c.id)}
                        className={`w-full text-right px-3 py-2 rounded-lg text-sm font-semibold transition-all ${cat === c.id ? "bg-primary-600 text-white" : "text-neutral-600 hover:bg-neutral-50"}`}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-8">
                {filtered.map((group) => (
                  <div key={group.category}>
                    <h2 className="font-black text-xl text-neutral-800 mb-4 pb-2 border-b border-neutral-100">{group.category}</h2>
                    <div className="space-y-2">
                      {group.items.map(({ q, a }) => {
                        const id = q;
                        const isOpen = active === id;
                        return (
                          <div key={q} className="bg-white border border-neutral-100 rounded-2xl shadow-card overflow-hidden">
                            <button onClick={() => setActive(isOpen ? null : id)} className="w-full flex items-center justify-between px-6 py-4 text-right font-semibold text-neutral-800 hover:text-primary-700 transition-colors">
                              <span>{q}</span>
                              <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform flex-shrink-0 ms-3 ${isOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isOpen && (
                              <div className="px-6 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-neutral-50 pt-3">{a}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <section className="py-14 bg-primary-700">
          <Container>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">هل مازال عندك سؤال؟</h2>
              <p className="text-primary-200 mb-6">فريق الدعم عندنا متاح على مدار الساعة طوال أيام الأسبوع.</p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                  <MessageCircle className="w-5 h-5" />
                  تواصل مع فريقنا
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
