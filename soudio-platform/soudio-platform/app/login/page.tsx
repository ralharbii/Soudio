"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/40 via-white to-accent-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-md group-hover:shadow-primary transition-all">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-neutral-900">سعوديو</div>
            <div className="text-[9px] text-primary-500 tracking-widest uppercase">SOUDIO</div>
          </div>
        </Link>

        <div className="bg-white rounded-3xl border border-neutral-100 shadow-card p-8">
          <h1 className="text-2xl font-black text-neutral-900 text-center mb-6">يا هلا فيك 👋</h1>

          {/* Tabs */}
          <div className="flex bg-neutral-100 rounded-xl p-1 mb-7">
            {(["login", "signup"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === t ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"}`}>
                {t === "login" ? "تسجيل الدخول" : "تسجيل جديد"}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">البريد الإلكتروني <span className="text-red-400">*</span></label>
                <input className="input-rtl" type="email" placeholder="مثال: example@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-neutral-700">كلمة المرور <span className="text-red-400">*</span></label>
                  <Link href="/forgot-password" className="text-xs text-primary-600 hover:underline">نسيت كلمة المرور؟</Link>
                </div>
                <div className="relative">
                  <input className="input-rtl pe-10" type={showPass ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded" />
                <label htmlFor="remember" className="text-sm text-neutral-600">تذكرني</label>
              </div>
              <Button type="submit" size="lg" className="w-full mt-2">تسجيل الدخول</Button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">الاسم الأول <span className="text-red-400">*</span></label>
                  <input className="input-rtl" placeholder="مثال: محمد" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">اسم العائلة <span className="text-red-400">*</span></label>
                  <input className="input-rtl" placeholder="مثال: الأحمد" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">البريد الإلكتروني <span className="text-red-400">*</span></label>
                <input className="input-rtl" type="email" placeholder="مثال: example@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">رقم الجوال <span className="text-red-400">*</span></label>
                <input className="input-rtl" type="tel" placeholder="+966 5XXXXXXXX" dir="ltr" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">كلمة المرور <span className="text-red-400">*</span></label>
                <input className="input-rtl" type="password" placeholder="••••••••" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">تأكيد كلمة المرور <span className="text-red-400">*</span></label>
                <input className="input-rtl" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" size="lg" className="w-full mt-2">إنشاء حساب جديد</Button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-neutral-400 mt-5">
          <Link href="/" className="text-primary-600 hover:underline">الرئيسية</Link>
          {" · "}
          <Link href="/contact" className="text-primary-600 hover:underline">تواصل معنا</Link>
        </p>
      </div>
    </div>
  );
}
