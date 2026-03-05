import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-primary-600",
  iconBg = "bg-primary-50",
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-neutral-100 shadow-card p-6",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center",
            iconBg
          )}
        >
          <Icon className={cn("w-5 h-5", iconColor)} strokeWidth={2} />
        </div>
        {trend && (
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-bold",
              trend.positive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            )}
          >
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-sm text-neutral-500 mb-1">{title}</p>
      <p className="text-3xl font-black text-neutral-900">{value}</p>
      {subtitle && (
        <p className="text-xs text-neutral-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Usage Progress Bar ───────────────────────────────────────────────────────
interface UsageBarProps {
  used: number;
  total: number;
  label?: string;
  className?: string;
}

export function UsageBar({ used, total, label, className }: UsageBarProps) {
  const percent = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;
  const isWarning = percent >= 80;
  const isDanger = percent >= 95;

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500">{label}</span>
          <span
            className={cn(
              "font-bold",
              isDanger
                ? "text-red-600"
                : isWarning
                ? "text-amber-600"
                : "text-primary-600"
            )}
          >
            {used} / {total}
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isDanger
              ? "bg-red-500"
              : isWarning
              ? "bg-amber-500"
              : "bg-primary-500"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-neutral-400">{percent}% مستخدم</p>
    </div>
  );
}
