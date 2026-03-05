import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">

      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft radial gradient */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-60 translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-50 rounded-full blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(#1d9485 1px, transparent 1px), linear-gradient(90deg, #1d9485 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Text Content ── */}
          <div className="order-2 lg:order-1 animate-fade-up">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-sm font-bold px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-slow" />
              أول استوديو سعودي ذكي
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 leading-tight mb-6">
              سعوديو ..{' '}
              <span className="relative">
                <span className="text-primary-600">استوديو سعودي</span>
                <svg className="absolute -bottom-2 right-0 left-0 w-full" viewBox="0 0 300 8" fill="none">
                  <path d="M0 4 Q75 0 150 4 Q225 8 300 4" stroke="#1d9485" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                </svg>
              </span>
              {' '}متخصص
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed mb-4">
              في تجهيز صور منتجات المتاجر الإلكترونية
            </p>
            <p className="text-2xl font-bold text-primary-600 mb-8">
              بالذكاء الاصطناعي **
            </p>

            <p className="text-neutral-500 leading-relaxed mb-10 max-w-lg">
              منصة مبتكرة صُممت لتسهيل حياة التاجر والارتقاء بجودة المتاجر الإلكترونية،
              تجمع في مكان واحد تقنيات التصوير، المعالجة، والإخراج الذكي لإنتاج صور
              منتجات احترافية — بسرعة وكفاءة.
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-10 text-sm">
              {['بدون استوديو تصوير', 'بدون معدات ثقيلة', 'بدون خبرة تصميم', 'بدون أي جهد'].map(item => (
                <span key={item} className="flex items-center gap-1.5 bg-white border border-neutral-200 text-neutral-600 px-3 py-1.5 rounded-full">
                  <span className="text-primary-500 font-bold">✓</span>
                  {item}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="btn-primary text-base px-8 py-4 rounded-2xl"
              >
                جرب الإبداع مجاناً
              </Link>
              <Link
                href="/studios"
                className="btn-secondary text-base px-8 py-4 rounded-2xl"
              >
                تعرف على المبدعين
              </Link>
            </div>
          </div>

          {/* ── Visual ── */}
          <div className="order-1 lg:order-2 animate-fade-up animate-delay-200">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 relative z-10">
                {/* Before / After */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 bg-neutral-100 rounded-2xl aspect-square flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-neutral-200 rounded-xl mx-auto mb-2" />
                      <span className="text-xs text-neutral-400 font-medium">قبل</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 bg-primary-50 rounded-2xl aspect-square flex items-center justify-center border-2 border-primary-200">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-primary-400 rounded-xl mx-auto mb-2 shadow-md" />
                      <span className="text-xs text-primary-600 font-semibold">بعد</span>
                    </div>
                  </div>
                </div>

                {/* Studio label */}
                <div className="flex items-center justify-between bg-neutral-50 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <circle cx="17.5" cy="17.5" r="3" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-800">استوديو سعود</p>
                      <p className="text-xs text-neutral-400">محترف التصوير الذكي</p>
                    </div>
                  </div>
                  <span className="text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full font-semibold">نمط ناعم</span>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl border border-neutral-200 shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">99%</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-800">تقليل وقت الإنتاج</p>
                  <p className="text-xs text-neutral-400">مقارنةً بالتصوير التقليدي</p>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-white rounded-2xl border border-neutral-200 shadow-lg px-4 py-3">
                <p className="text-xs text-neutral-400 mb-0.5">توفير سنوي للتاجر</p>
                <p className="text-lg font-black text-primary-600">+30K ريال</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
