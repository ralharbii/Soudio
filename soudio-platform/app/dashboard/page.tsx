"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ImageIcon,
  CreditCard,
  Clock,
  TrendingUp,
  Camera,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { StatCard, UsageBar } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/Button";
import { STUDIOS } from "@/lib/constants";
import { PLAN_NAMES } from "@/types";
import { cn } from "@/lib/utils";

interface DashboardData {
  firstName: string;
  lastName: string;
  subscription: {
    planType: string;
    planName: string;
    imagesUsed: number;
    totalImages: number;
    remainingImages: number;
    usagePercent: number;
    status: string;
    startDate: string;
    endDate: string | null;
    extraCredits: number;
    transactions: Array<{
      id: string;
      referenceNumber: string;
      type: string;
      amount: number;
      currency: string;
      status: string;
      description: string | null;
      endDate: string | null;
      createdAt: string;
    }>;
  } | null;
  recentImages: Array<{
    id: string;
    studioId: string | null;
    patternName: string | null;
    imageUrl: string;
    thumbnailUrl: string | null;
    aspectRatio: string;
    createdAt: string;
  }>;
}

function getDaysRemaining(endDate: string | null): number {
  if (!endDate) return 0;
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center animate-pulse">
            <Camera className="w-6 h-6 text-primary-600" />
          </div>
          <p className="text-sm text-neutral-500">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const sub = data?.subscription;
  const daysRemaining = getDaysRemaining(sub?.endDate ?? null);
  const isTrialPlan = sub?.planType === "TRIAL";

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome banner */}
      <div className="relative bg-gradient-to-l from-primary-700 to-primary-600 rounded-2xl p-6 md:p-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/30 blur-2xl" />
          <div className="absolute -bottom-8 -right-4 w-32 h-32 rounded-full bg-accent-400/40 blur-xl" />
        </div>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-primary-200 text-sm font-medium mb-1">مرحباً بك في</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              {data ? `${data.firstName} ${data.lastName}` : "..."}
              <span className="text-primary-300 mr-2">👋</span>
            </h2>
            <p className="text-primary-200 text-sm">
              {sub
                ? `باقتك الحالية: ${PLAN_NAMES[sub.planType as keyof typeof PLAN_NAMES] || sub.planName}`
                : "لا توجد باقة نشطة"}
            </p>
          </div>
          {isTrialPlan && (
            <Link href="/pricing">
              <Button
                size="md"
                className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg whitespace-nowrap flex-shrink-0"
              >
                ترقية الباقة
                <Sparkles className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="إجمالي رصيد الصور"
          value={sub?.totalImages ?? 0}
          subtitle="صورة في باقتك"
          icon={ImageIcon}
          iconColor="text-primary-600"
          iconBg="bg-primary-50"
        />
        <StatCard
          title="الصور المستخدمة"
          value={sub?.imagesUsed ?? 0}
          subtitle={`من أصل ${sub?.totalImages ?? 0} صورة`}
          icon={TrendingUp}
          iconColor="text-accent-600"
          iconBg="bg-accent-50"
        />
        <StatCard
          title="الصور المتبقية"
          value={sub?.remainingImages ?? 0}
          subtitle="صورة متاحة للاستخدام"
          icon={Camera}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="الأيام المتبقية"
          value={sub?.endDate ? daysRemaining : "—"}
          subtitle={
            sub?.endDate
              ? `تنتهي ${formatDate(sub.endDate)}`
              : "تجربة مجانية"
          }
          icon={Clock}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
      </div>

      {/* Main content row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscription card */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-neutral-900">الاشتراك الحالي</h3>
            <Link
              href="/dashboard/subscription"
              className="text-xs text-primary-600 hover:underline flex items-center gap-1"
            >
              إدارة <ChevronLeft className="w-3 h-3" />
            </Link>
          </div>

          {sub ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-xl text-neutral-900">
                    {PLAN_NAMES[sub.planType as keyof typeof PLAN_NAMES] || sub.planName}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    تاريخ الاشتراك: {formatDate(sub.startDate)}
                  </p>
                </div>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    sub.status === "ACTIVE"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : sub.status === "TRIAL"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-neutral-100 text-neutral-600"
                  )}
                >
                  {sub.status === "ACTIVE" ? "فعّال" : sub.status === "TRIAL" ? "تجربة" : sub.status}
                </span>
              </div>

              <UsageBar
                used={sub.imagesUsed}
                total={sub.totalImages}
                label="نسبة استخدام الباقة"
              />

              {sub.endDate && (
                <div className="flex items-center justify-between text-sm pt-2 border-t border-neutral-50">
                  <span className="text-neutral-500">المدة المتبقية</span>
                  <span className="font-bold text-neutral-800">
                    {daysRemaining} يوم
                  </span>
                </div>
              )}

              {sub.extraCredits > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">رصيد إضافي</span>
                  <span className="font-bold text-accent-600">
                    +{sub.extraCredits} صورة
                  </span>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <Link href="/dashboard/subscription" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    إدارة الاشتراك
                  </Button>
                </Link>
                {isTrialPlan && (
                  <Link href="/pricing" className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      ترقية
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <CreditCard className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-400 mb-4">لا توجد باقة نشطة</p>
              <Link href="/pricing">
                <Button size="sm">اشترك الآن</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Studio usage chart */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-neutral-900">استخدام الاستوديوهات</h3>
          </div>
          <div className="space-y-3">
            {STUDIOS.slice(0, 5).map((studio) => {
              const count = Math.floor(Math.random() * 8); // placeholder until real data
              const max = 10;
              return (
                <div key={studio.id} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ backgroundColor: `${studio.color}15` }}
                  >
                    {studio.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-neutral-700 truncate">
                        {studio.name}
                      </span>
                      <span className="text-xs text-neutral-400 flex-shrink-0 mr-2">
                        {count}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(count / max) * 100}%`,
                          backgroundColor: studio.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent images */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-neutral-900">آخر الصور</h3>
            <Link
              href="/dashboard/library"
              className="text-xs text-primary-600 hover:underline flex items-center gap-1"
            >
              عرض الكل <ChevronLeft className="w-3 h-3" />
            </Link>
          </div>

          {data?.recentImages && data.recentImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {data.recentImages.slice(0, 6).map((img, i) => (
                <div
                  key={img.id}
                  className="aspect-square rounded-xl bg-neutral-100 overflow-hidden flex items-center justify-center text-2xl"
                  style={{
                    backgroundColor: `${STUDIOS.find((s) => s.id === img.studioId)?.color || "#e4e4e7"}15`,
                  }}
                >
                  {STUDIOS.find((s) => s.id === img.studioId)?.emoji || "🖼️"}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mb-3">
                <ImageIcon className="w-7 h-7 text-neutral-400" />
              </div>
              <p className="text-sm text-neutral-500 mb-3">لا توجد صور بعد</p>
              <Link href="/">
                <Button variant="secondary" size="sm">
                  ابدأ الإنشاء
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
