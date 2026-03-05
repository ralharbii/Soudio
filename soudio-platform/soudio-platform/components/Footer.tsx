import Link from "next/link";
import { Camera, Mail, Phone, Twitter, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL, CONTACT_PHONE, NAV_LINKS } from "@/lib/constants";

const SOCIAL_LINKS = [
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <Container>
        <div className="py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-black text-white">سعوديو</div>
                <div className="text-[9px] text-primary-400 tracking-widest uppercase">SOUDIO</div>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5">
              أول استوديو سعودي متخصص في تجهيز صور منتجات المتاجر الإلكترونية بالذكاء الاصطناعي.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-900/60 text-primary-400 border border-primary-800">
                #مدير_تصوير
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-900/60 text-primary-400 border border-primary-800">
                #سعودي_ويفهمك
              </span>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">عن المنصة</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">الدعم والمساعدة</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/contact" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                  تواصل معنا
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                  باقات الاشتراك
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  dir="ltr"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">قنوات التواصل الاجتماعي</h4>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-primary-700 border border-neutral-700 hover:border-primary-600 flex items-center justify-center transition-all"
                >
                  <Icon className="w-4 h-4 text-neutral-400 hover:text-white" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-neutral-500">طُوِّر بـ ذكاء 🇸🇦 في السعودية</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <span>جميع الحقوق محفوظة © 2026 سعوديو | Soudio</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">شروط الاستخدام</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
