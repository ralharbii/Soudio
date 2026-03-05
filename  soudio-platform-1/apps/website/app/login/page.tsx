'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, Container } from '@/components/ui'

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [showPass, setShowPass] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <circle cx="17.5" cy="17.5" r="3" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <span className="text-2xl font-black text-neutral-900">سعوديو</span>
          </Link>
          <p className="text-neutral-500 text-sm">يا هلا فيك 👋</p>
        </div>

        <Card padding="lg">
          {/* Tabs */}
          <div className="flex bg-neutral-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 text-sm font-semibold py-2.5 rounded-lg transition-all ${
                tab === 'login' ? 'bg-white text-primary-700 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 text-sm font-semibold py-2.5 rounded-lg transition-all ${
                tab === 'signup' ? 'bg-white text-primary-700 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              تسجيل جديد
            </button>
          </div>

          {tab === 'login' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">البريد الإلكتروني *</label>
                <input type="email" placeholder="example@example.com :مثال" className="input-field" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">كلمة المرور *</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" className="input-field pe-10" />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute top-1/2 -translate-y-1/2 end-3 text-neutral-400 hover:text-neutral-600"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
                      {showPass
                        ? <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        : <><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                      }
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-primary-600" />
                  <span className="text-neutral-600">تذكر</span>
                </label>
                <Link href="/forgot-password" className="text-primary-600 hover:underline font-medium">
                  نسيت كلمة المرور ؟
                </Link>
              </div>

              <button className="btn-primary w-full py-3.5 text-base mt-2">
                تسجيل الدخول
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">الاسم الأول *</label>
                  <input type="text" placeholder="مثال: محمد" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">اسم العائلة *</label>
                  <input type="text" placeholder="مثال: الأحمد" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">البريد الإلكتروني *</label>
                <input type="email" placeholder="example@example.com :مثال" className="input-field" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">رقم الجوال *</label>
                <div className="flex gap-2">
                  <div className="bg-neutral-100 border border-neutral-200 rounded-xl px-3 flex items-center text-sm font-medium text-neutral-600 shrink-0">
                    +966
                  </div>
                  <input type="tel" placeholder="5XXXXXXXX" className="input-field flex-1" dir="ltr" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">كلمة المرور *</label>
                <input type="password" placeholder="••••••••" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">تأكيد كلمة المرور *</label>
                <input type="password" placeholder="••••••••" className="input-field" />
              </div>
              <button className="btn-primary w-full py-3.5 text-base mt-2">
                إنشاء حساب جديد
              </button>
            </div>
          )}
        </Card>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-700">
            ← العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
