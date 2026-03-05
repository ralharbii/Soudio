"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  CreditCard,
  Settings,
  UserPlus,
  Camera,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userName: string;
  planName: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "لوحة المعلومات",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/library",
    label: "مكتبتي",
    icon: ImageIcon,
    exact: false,
  },
  {
    href: "/dashboard/subscription",
    label: "الاشتراك",
    icon: CreditCard,
    exact: false,
  },
  {
    href: "/dashboard/settings",
    label: "الإعدادات",
    icon: Settings,
    exact: false,
  },
  {
    href: "/dashboard/referral",
    label: "دعوة صديق",
    icon: UserPlus,
    exact: false,
  },
];

export function DashboardSidebar({
  userName,
  planName,
  isMobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-neutral-800">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-md">
            <Camera className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div className="leading-none">
            <div className="text-lg font-black text-white">سعوديو</div>
            <div className="text-[9px] text-primary-400 tracking-widest uppercase">SOUDIO</div>
          </div>
        </Link>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* User badge */}
      <div className="mx-4 mt-4 px-4 py-3 rounded-xl bg-neutral-800/60 border border-neutral-700/50">
        <p className="text-sm font-semibold text-white truncate">{userName}</p>
        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-700/60 text-primary-300 border border-primary-700/40">
          {planName}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group",
                active
                  ? "bg-primary-600 text-white shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0 transition-transform",
                  active ? "text-white" : "text-neutral-500 group-hover:text-white",
                  !active && "group-hover:scale-110"
                )}
                strokeWidth={active ? 2.5 : 2}
              />
              {label}
              {active && (
                <span className="mr-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-neutral-800 space-y-1">
        <Link
          href="/"
          onClick={onMobileClose}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-neutral-500 hover:text-white hover:bg-neutral-800 transition-all"
        >
          <Camera className="w-4 h-4" />
          الموقع الرئيسي
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-neutral-500 hover:text-red-400 hover:bg-red-950/30 transition-all"
        >
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-neutral-900 border-l border-neutral-800 h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <aside className="relative w-72 bg-neutral-900 border-l border-neutral-800 h-full flex flex-col mr-auto">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
