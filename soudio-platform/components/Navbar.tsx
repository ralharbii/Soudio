"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100/80">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-md group-hover:shadow-primary transition-all group-hover:scale-105">
              <Camera className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-neutral-900 tracking-tight">سعوديو</span>
              <span className="text-[9px] font-medium text-primary-500 tracking-widest uppercase">SOUDIO</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                  pathname === link.href
                    ? "text-primary-600 bg-primary-50"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">تسجيل الدخول</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">ابدأ مجاناً</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="القائمة"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-neutral-100 bg-white shadow-lg">
          <Container>
            <div className="py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                    pathname === link.href
                      ? "text-primary-600 bg-primary-50"
                      : "text-neutral-600 hover:bg-neutral-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-3 border-t border-neutral-100 mt-2">
                <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">تسجيل الدخول</Button>
                </Link>
                <Link href="/signup" className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">ابدأ مجاناً</Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
