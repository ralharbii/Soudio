"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Camera, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        router.push(redirect);
        router.refresh();
      } else {
        if (data.errors) {
          const flat: Record<string, string> = {};
          Object.entries(data.errors).forEach(([k, v]) => { flat[k] = Array.isArray(v) ? v[0] : String(v); });
          setErrors(flat);
        } else {
          setErrors({ global: data.error || "حدث خطأ في تسجيل الدخول" });
        }
      }
    } catch {
      setErrors({ global: "تعذر الاتصال بالخادم." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.global && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />{errors.global}
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">البريد الإلكتروني <span className="text-red-400">*</span></label>
        <input className={`input-rtl ${errors.email ? "border-red-400" : ""}`} type="email" placeholder="مثال: example@example.com" dir="ltr" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required autoComplete="email" />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-semibold text-neutral-700">كلمة المرور <span className="text-red-400">*</span></label>
          <Link href="/forgot-password" className="text-xs text-primary-600 hover:underline">نسيت كلمة المرور؟</Link>
        </div>
        <div className="relative">
          <input className={`input-rtl pe-10 ${errors.password ? "border-red-400" : ""}`} type={showPass ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required autoComplete="current-password" />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors">
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="remember" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 w-4 h-4" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} />
        <label htmlFor="remember" className="text-sm text-neutral-600 cursor-pointer">تذكرني</label>
      </div>
      <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>تسجيل الدخول</Button>
      <div className="bg-primary-50 border border-primary-100 rounded-xl p-3 text-xs text-primary-700 text-center">
        <strong>حساب تجريبي:</strong> demo@soudio.sa / soudio123
      </div>
    </form>
  );
}

function RegisterForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => { router.push("/dashboard"); router.refresh(); }, 1500);
      } else {
        if (data.errors) {
          const flat: Record<string, string> = {};
          Object.entries(data.errors).forEach(([k, v]) => { flat[k] = Array.isArray(v) ? v[0] : String(v); });
          setErrors(flat);
        } else {
          setErrors({ global: data.error || "حدث خطأ" });
        }
      }
    } catch {
      setErrors({ global: "تعذر الاتصال بالخادم." });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4"><Check className="w-7 h-7 text-green-600" /></div>
        <h3 className="font-black text-xl text-neutral-900 mb-2">تم إنشاء حسابك!</h3>
        <p className="text-neutral-500 text-sm">جاري تحويلك إلى لوحة التحكم...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.global && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />{errors.global}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        {[{ key: "firstName" as const, label: "الاسم الأول", ph: "مثال: محمد" }, { key: "lastName" as const, label: "اسم العائلة", ph: "مثال: الأحمد" }].map(({ key, label, ph }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">{label} <span className="text-red-400">*</span></label>
            <input className={`input-rtl ${errors[key] ? "border-red-400" : ""}`} placeholder={ph} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required />
            {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">البريد الإلكتروني <span className="text-red-400">*</span></label>
        <input className={`input-rtl ${errors.email ? "border-red-400" : ""}`} type="email" placeholder="مثال: example@example.com" dir="ltr" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required autoComplete="email" />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">رقم الجوال</label>
        <input className="input-rtl" type="tel" placeholder="+966 5XXXXXXXX" dir="ltr" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">كلمة المرور <span className="text-red-400">*</span></label>
        <div className="relative">
          <input className={`input-rtl pe-10 ${errors.password ? "border-red-400" : ""}`} type={showPass ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required autoComplete="new-password" />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute start-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors">
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        <p className="text-xs text-neutral-400 mt-1">8 أحرف على الأقل، تحتوي على حرف كبير ورقم</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">تأكيد كلمة المرور <span className="text-red-400">*</span></label>
        <input className={`input-rtl ${errors.confirmPassword ? "border-red-400" : ""}`} type="password" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required autoComplete="new-password" />
        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
      </div>
      <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>إنشاء حساب جديد</Button>
    </form>
  );
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "signup" ? "signup" : "login";
  const [tab, setTab] = useState<"login" | "signup">(defaultTab as "login" | "signup");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/40 via-white to-accent-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="w-11 h-11 rounded-xl bg-primary-600 flex items-center justify-center shadow-md group-hover:shadow-primary transition-all group-hover:scale-105">
            <Camera className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-neutral-900">سعوديو</div>
            <div className="text-[9px] text-primary-500 tracking-widest uppercase">SOUDIO</div>
          </div>
        </Link>

        <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] p-8">
          <h1 className="text-2xl font-black text-neutral-900 text-center mb-6">
            {tab === "login" ? "يا هلا فيك 👋" : "أهلاً بك في سعوديو 🌟"}
          </h1>
          <div className="flex bg-neutral-100 rounded-xl p-1 mb-7">
            {(["login", "signup"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === t ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}>
                {t === "login" ? "تسجيل الدخول" : "تسجيل جديد"}
              </button>
            ))}
          </div>
          {tab === "login" ? <LoginForm /> : <RegisterForm />}
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginPageContent />
    </Suspense>
  );
}
