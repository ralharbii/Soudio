/**
 * Dashboard Layout — Root Server Component
 * Fetches user data server-side and passes to client layout
 */
"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/Header";
import { PLAN_NAMES } from "@/types";

// ─── Page title map ───────────────────────────────────────────────────────────
const PAGE_TITLES: Record<string, { title: string; subtitle?: string }> = {
  "/dashboard": {
    title: "لوحة المعلومات",
    subtitle: "نظرة عامة على حسابك وإحصائياتك",
  },
  "/dashboard/library": {
    title: "مكتبتي",
    subtitle: "جميع الصور التي أنشأتها",
  },
  "/dashboard/subscription": {
    title: "الاشتراك",
    subtitle: "إدارة باقتك وسجل الفواتير",
  },
  "/dashboard/settings": {
    title: "الإعدادات",
    subtitle: "تحديث بيانات حسابك وكلمة المرور",
  },
  "/dashboard/referral": {
    title: "دعوة صديق",
    subtitle: "ادعُ أصدقاءك واحصل على صور مجانية",
  },
};

// ─── User Data Hook ───────────────────────────────────────────────────────────
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const pathname = usePathname();
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setUser(res.data);
      })
      .catch(console.error);
  }, []);

  const pageInfo = PAGE_TITLES[pathname] || { title: "لوحة المعلومات" };
  const userName = user
    ? `${user.firstName} ${user.lastName}`
    : "...";
  const userInitials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : "...";
  const planName = user?.subscription
    ? PLAN_NAMES[user.subscription.planType as keyof typeof PLAN_NAMES] || user.subscription.planName
    : "تجربة مجانية";

  return (
    <div className="min-h-screen bg-neutral-50 flex" dir="rtl">
      {/* Sidebar */}
      <DashboardSidebar
        userName={userName}
        planName={planName}
        isMobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <DashboardHeader
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
          userName={userName}
          userInitials={userInitials}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
