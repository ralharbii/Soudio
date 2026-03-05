"use client";
import { useState } from "react";
import { Menu, Bell, ExternalLink } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
  userName: string;
  userInitials: string;
}

export function DashboardHeader({
  title,
  subtitle,
  onMenuClick,
  userName,
  userInitials,
}: DashboardHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-100 px-4 md:px-6 h-16 flex items-center gap-4">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 transition-colors"
        aria-label="فتح القائمة"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="font-black text-lg text-neutral-900 truncate">{title}</h1>
        {subtitle && (
          <p className="text-xs text-neutral-500 hidden sm:block truncate">{subtitle}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Studios quick link */}
        <Link
          href="/"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-100 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          الاستوديوهات
        </Link>

        {/* Notifications placeholder */}
        <button className="relative p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-primary-500 ring-2 ring-white" />
        </button>

        {/* User avatar */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-9 h-9 rounded-xl bg-primary-100 border-2 border-primary-200 flex items-center justify-center text-sm font-black text-primary-700 hover:border-primary-400 transition-all"
          >
            {userInitials}
          </button>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute start-0 top-full mt-2 w-48 bg-white rounded-xl border border-neutral-100 shadow-card-hover z-50 py-1.5 overflow-hidden">
                <div className="px-4 py-2 border-b border-neutral-50">
                  <p className="text-xs font-bold text-neutral-800 truncate">{userName}</p>
                </div>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                >
                  الإعدادات
                </Link>
                <Link
                  href="/dashboard/subscription"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                >
                  الاشتراك
                </Link>
                <div className="border-t border-neutral-50 mt-1">
                  <button
                    onClick={async () => {
                      setShowDropdown(false);
                      await fetch("/api/auth/logout", { method: "POST" });
                      window.location.href = "/login";
                    }}
                    className="w-full flex items-center px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
