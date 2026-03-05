"use client";
import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";

const TOPICS = ["استفسار عام", "دعم تقني", "مشكلة في الدفع", "اقتراح", "شكوى", "أخرى"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50/40 to-white">
          <Container>
            <div className="text-center max-w-xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-100 mb-4">لأننا معك على طول</span>
              <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">تواصل معنا</h1>
              <p className="text-neutral-500 text-lg">نسعد بتواصلك والإجابة على استفساراتك</p>
            </div>
          </Container>
        </section>

        <section className="pb-20">
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Info */}
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-3">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-1">البريد الإلكتروني</h3>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-primary-600 hover:underline">{CONTACT_EMAIL}</a>
                </div>
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-1">رقم الهاتف</h3>
                  <p className="text-sm text-neutral-600 dir-ltr text-left">{CONTACT_PHONE}</p>
                </div>
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-1">الموقع</h3>
                  <p className="text-sm text-neutral-600">المملكة العربية السعودية 🇸🇦</p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-card p-8">
                  {sent ? (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-4">✅</div>
                      <h2 className="text-2xl font-black text-neutral-900 mb-2">تم الإرسال بنجاح!</h2>
                      <p className="text-neutral-500">سنتواصل معك في أقرب وقت ممكن. شكراً لتواصلك معنا.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">الاسم <span className="text-red-400">*</span></label>
                          <input className="input-rtl" placeholder="اكتب اسمك هنا ..." value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">البريد الإلكتروني <span className="text-red-400">*</span></label>
                          <input className="input-rtl" type="email" placeholder="مثال: example@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">الموضوع <span className="text-red-400">*</span></label>
                        <select className="input-rtl" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} required>
                          <option value="">اختر أحد المواضيع من القائمة ...</option>
                          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">الرسالة <span className="text-red-400">*</span></label>
                        <textarea className="input-rtl resize-none" rows={6} placeholder="اكتب سؤالك هنا ..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                      </div>
                      <Button type="submit" size="lg" variant="primary" className="w-full">
                        أرسل إلى فريق سعوديو
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
