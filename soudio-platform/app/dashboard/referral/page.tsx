"use client";
import { useEffect, useState } from "react";
import { Send, Users, Gift, Check, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Referral {
  id: string;
  receiverEmail: string;
  status: "PENDING" | "JOINED" | "REWARDED";
  rewardImages: number;
  createdAt: string;
}

const STATUS_MAP = {
  PENDING: { label: "في الانتظار", color: "bg-amber-50 text-amber-700 border-amber-200" },
  JOINED: { label: "انضم", color: "bg-green-50 text-green-700 border-green-200" },
  REWARDED: { label: "تمت المكافأة", color: "bg-primary-50 text-primary-700 border-primary-200" },
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" });
}

export default function ReferralPage() {
  const [email, setEmail] = useState("");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchReferrals = () => {
    fetch("/api/user/referral")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setReferrals(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setAlert(null);
    try {
      const res = await fetch("/api/user/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setAlert({ type: "success", message: "تم إرسال الدعوة بنجاح! 🎉" });
        setEmail("");
        fetchReferrals();
      } else {
        setAlert({ type: "error", message: data.error || "حدث خطأ" });
      }
    } finally {
      setSending(false);
    }
  };

  const totalRewarded = referrals.filter((r) => r.status === "REWARDED").reduce(
    (acc, r) => acc + r.rewardImages,
    0
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Hero card */}
      <div className="relative bg-gradient-to-l from-primary-700 to-primary-600 rounded-2xl p-8 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-accent-400/20 blur-xl" />
        </div>
        <div className="relative">
          <div className="text-5xl mb-4">🤍</div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            دعوة واحدة .. وصور أكثر لك ولصديقك!!
          </h2>
          <p className="text-primary-200 text-base leading-relaxed max-w-xl mx-auto">
            ادعُ صديقك أو أي تاجر مهتم بتجهيز صور منتجاته باحترافية. بمجرد إرسال الدعوة وانضمام صديقك،
            تحصل أنت وهو على رصيد <strong className="text-white">5 صور إضافية</strong> تُضاف مباشرة إلى حساباتكم.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Send, value: referrals.length, label: "دعوات مرسلة", color: "text-primary-600", bg: "bg-primary-50" },
          { icon: Users, value: referrals.filter((r) => r.status !== "PENDING").length, label: "انضموا", color: "text-green-600", bg: "bg-green-50" },
          { icon: Gift, value: totalRewarded, label: "صور مكتسبة", color: "text-accent-600", bg: "bg-accent-50" },
        ].map(({ icon: Icon, value, label, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-neutral-100 shadow-card p-5 text-center">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2", bg)}>
              <Icon className={cn("w-5 h-5", color)} />
            </div>
            <p className="text-2xl font-black text-neutral-900">{value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Send invitation */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6 md:p-8">
        <h2 className="font-black text-xl text-neutral-900 mb-5">
          إرسال دعوة لصديق
        </h2>
        <p className="text-sm text-neutral-500 mb-5">
          فقط أدخل بريده الإلكتروني الآن ..
        </p>

        {alert && (
          <div
            className={cn(
              "flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium mb-5",
              alert.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            )}
          >
            {alert.type === "success" ? (
              <Check className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="email"
            className="input-rtl flex-1"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            dir="ltr"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={sending}
            icon={<Send className="w-4 h-4" />}
            className="flex-shrink-0 whitespace-nowrap"
          >
            أرسل الدعوة لصديقي
          </Button>
        </form>
      </div>

      {/* Referral history */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
        </div>
      ) : referrals.length > 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100">
            <h3 className="font-black text-neutral-900">سجل الدعوات</h3>
          </div>
          <div className="divide-y divide-neutral-50">
            {referrals.map((ref) => {
              const s = STATUS_MAP[ref.status];
              return (
                <div
                  key={ref.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800" dir="ltr">
                        {ref.receiverEmail}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {formatDate(ref.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {ref.status === "REWARDED" && (
                      <span className="text-xs font-bold text-accent-600">
                        +{ref.rewardImages} صور 🎁
                      </span>
                    )}
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", s.color)}>
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-12 text-center">
          <Send className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500">لم ترسل أي دعوات بعد.</p>
          <p className="text-sm text-neutral-400 mt-1">ابدأ بدعوة أصدقائك للحصول على صور مجانية!</p>
        </div>
      )}
    </div>
  );
}
