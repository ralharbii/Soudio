'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/',        label: 'الرئيسية' },
  { href: '/about',   label: 'قصتنا' },
  { href: '/studios', label: 'مبدعو سعوديو' },
  { href: '/gallery', label: 'معرض الأعمال' },
  { href: '/pricing', label: 'باقات الاشتراك' },
  { href: '/faq',     label: 'الأسئلة الشائعة' },
  { href: '/contact', label: 'تواصل معنا' },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <circle cx="17.5" cy="17.5" r="3" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <span className="text-xl font-bold text-neutral-900 tracking-tight">سعوديو</span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-50 transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── CTA Buttons ── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-neutral-700 hover:text-primary-600 transition-colors px-3 py-2">
              تسجيل الدخول
            </Link>
            <Link href="/signup" className="btn-primary text-sm">
              ابدأ مجاناً
            </Link>
          </div>

          {/* ── Mobile Menu Button ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="القائمة"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-neutral-700 rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-neutral-700 rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-neutral-700 rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-xl transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-neutral-100">
            <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-secondary text-center text-sm">
              تسجيل الدخول
            </Link>
            <Link href="/signup" onClick={() => setMenuOpen(false)} className="btn-primary text-center text-sm">
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
