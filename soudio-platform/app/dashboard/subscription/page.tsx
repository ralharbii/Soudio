"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, CreditCard, Plus, Loader2, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { UsageBar } from "@/components/dashboard/StatCard";
import { PRICING_PLANS } from "@/lib/constants";
import { PLAN_NAMES } from "@/types";
import { cn } from "@/lib/utils";

interface SubscriptionData {
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
}

const EXTRA_CREDITS = [
  { images: 10, price: 60, label: "رصيد إضافي" },
  { images: 20, price: 115, label: "الأكثر طلباً", highlight: true },
  { images: 30, price: 170, label: "الأفضل قيمة" },
];

const TYPE_LABELS: Record<string, string> = {
  SUBSCRIPTION: "اشتراك",
  EXTRA_CREDITS: "رصيد صور إضافي",
  REFERRAL_REWARD: "مكافأة إحالة",
};

const STATUS_LABELS: Record<string, string> = {
  COMPLETED: "مكتمل",
  PENDING: "قيد المعالجة",
  FAILED: "فشل",
  REFUNDED: "مُسترجع",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function SubscriptionPage() {
  const [sub, setSub] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setSub(res.data.subscription);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      </div>
    );
  }

  const currentPlanId =
    sub?.planType === "TRIAL"
      ? null
      : sub?.planType === "STARTER"
      ? "starter"
      : sub?.planType === "GROWTH"
      ? "growth"
      : "partner";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Current subscription card */}
      {sub && (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6 md:p-8">
          <h2 className="font-black text-xl text-neutral-900 mb-5 pb-4 border-b border-neutral-100">
            الاشتراك الحالي
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-2xl text-neutral-900">
                    {PLAN_NAMES[sub.planType as keyof typeof PLAN_NAMES] || sub.planName}
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">
                    تاريخ الاشتراك: {formatDate(sub.startDate)}
                  </p>
                </div>
                <span
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold",
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

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "الباقة", value: sub.totalImages, unit: "صورة" },
                  { label: "المستخدم", value: sub.imagesUsed, unit: "صورة" },
                  { label: "الرصيد الإضافي", value: sub.extraCredits, unit: "صورة" },
                ].map(({ label, value, unit }) => (
                  <div
                    key={label}
                    className="bg-neutral-50 rounded-xl p-3 text-center"
                  >
                    <p className="text-lg font-black text-neutral-900">{value}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
                    <p className="text-[10px] text-neutral-400">{unit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <UsageBar
                used={sub.imagesUsed}
                total={sub.totalImages}
                label="نسبة الاستخدام الحالي"
              />
              {sub.endDate && (
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                  <span className="text-sm text-neutral-600">تاريخ الانتهاء</span>
                  <span className="text-sm font-bold text-neutral-800">
                    {formatDate(sub.endDate)}
                  </span>
                </div>
              )}
              <div className="flex gap-3">
                <Link href="/pricing" className="flex-1">
                  <Button variant="primary" size="md" className="w-full">
                    <ArrowUp className="w-4 h-4" />
                    ترقية الباقة
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="md"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => {
                    if (confirm("هل أنت متأكد من إلغاء الاشتراك؟"))
                      setCancelling(true);
                  }}
                  loading={cancelling}
                >
                  إلغاء الاشتراك
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plans comparison */}
      <div>
        <h2 className="font-black text-xl text-neutral-900 mb-4">باقات الاشتراك</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRICING_PLANS.map((plan) => {
            const isCurrent = currentPlanId === plan.id;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl p-6 border-2 transition-all",
                  isCurrent
                    ? "border-primary-500 bg-primary-50/30"
                    : "border-neutral-100 bg-white shadow-card"
                )}
              >
                {isCurrent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-primary-600 text-white">
                    باقتك الحالية
                  </span>
                )}
                <h3 className="font-black text-lg text-neutral-900">{plan.name}</h3>
                <p className="text-sm text-neutral-500 mb-3">{plan.subtitle}</p>
                <div className="mb-4">
                  <span className="text-3xl font-black text-neutral-900">
                    {plan.price}
                  </span>
                  <span className="text-neutral-500 mr-1">ر.س</span>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {plan.images} صورة / شهرياً
                  </p>
                </div>
                <ul className="space-y-2 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {!isCurrent && (
                  <Link href="/pricing">
                    <Button variant="outline" size="sm" className="w-full">
                      الانتقال لهذه الباقة
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Extra credits */}
      <div>
        <h2 className="font-black text-xl text-neutral-900 mb-4">رصيد الصور الإضافي</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EXTRA_CREDITS.map(({ images, price, label, highlight }) => (
            <div
              key={images}
              className={cn(
                "rounded-2xl p-5 border-2 text-center",
                highlight
                  ? "border-accent-300 bg-accent-50"
                  : "border-neutral-100 bg-white shadow-card"
              )}
            >
              {highlight && (
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-accent-500 text-white mb-2">
                  الأكثر طلباً
                </span>
              )}
              <p className="text-xs text-neutral-500 mb-1">{label}</p>
              <p className="text-2xl font-black text-neutral-900">{images} صورة</p>
              <p className="text-lg font-bold text-primary-600 mb-3">{price} ر.س</p>
              <Button
                variant={highlight ? "accent" : "outline"}
                size="sm"
                className="w-full"
                icon={<Plus className="w-3.5 h-3.5" />}
              >
                إضافة رصيد
              </Button>
              <p className="text-xs text-neutral-400 mt-2">دفعة واحدة • بدون اشتراك</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      {sub?.transactions && sub.transactions.length > 0 && (
        <div>
          <h2 className="font-black text-xl text-neutral-900 mb-4">سجل الشراء</h2>
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  {["تاريخ الاشتراك", "الرقم المرجعي", "النوع", "السعر", "الحالة", "تاريخ الانتهاء"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-xs font-bold text-neutral-500 text-right"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {sub.transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-neutral-600">
                      {formatDate(tx.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-neutral-700">
                      {tx.referenceNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600">
                      {TYPE_LABELS[tx.type] || tx.type}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-neutral-800">
                      {tx.amount} {tx.currency}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-semibold",
                          tx.status === "COMPLETED"
                            ? "bg-green-50 text-green-700"
                            : tx.status === "PENDING"
                            ? "bg-amber-50 text-amber-700"
                            : tx.status === "FAILED"
                            ? "bg-red-50 text-red-700"
                            : "bg-neutral-100 text-neutral-600"
                        )}
                      >
                        {STATUS_LABELS[tx.status] || tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-500">
                      {tx.endDate ? formatDate(tx.endDate) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
