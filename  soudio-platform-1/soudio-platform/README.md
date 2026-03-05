# سعوديو | Soudio Platform

أول استوديو سعودي متخصص في تجهيز صور منتجات المتاجر الإلكترونية بالذكاء الاصطناعي.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
soudio-platform/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage (marketing landing page)
│   ├── about/              # About / Our Story
│   ├── gallery/            # Work Gallery
│   ├── pricing/            # Subscription Plans
│   ├── faq/                # FAQ Page
│   ├── contact/            # Contact Form
│   ├── login/              # Auth (Sign In / Sign Up)
│   ├── layout.tsx          # Root RTL layout
│   └── globals.css         # Global styles + Cairo font
├── components/
│   ├── Navbar.tsx          # Sticky navigation with mobile menu
│   ├── Footer.tsx          # Footer with links + social
│   ├── PageLayout.tsx      # Page wrapper
│   └── ui/
│       ├── Button.tsx      # Button component (5 variants)
│       ├── Card.tsx        # Card component
│       ├── Container.tsx   # Responsive container
│       └── Section.tsx     # Section wrapper + headings
├── lib/
│   ├── constants.ts        # Studios, pricing, FAQs data
│   └── utils.ts            # cn() utility
└── public/                 # Static assets
```

## 🎨 Design System

### Colors
- **Primary**: Teal green `#1f9478` (brand color)  
- **Accent**: Amber `#c8763a` (highlights)
- **Neutral**: Gray scale for text/borders

### Typography
- **Font**: Cairo (Arabic) — weights 300–900
- **Direction**: RTL (Arabic first)

### Components
All components in `components/ui/` accept standard HTML props + custom variants.

## 🌐 Pages

| Route | Page |
|-------|------|
| `/` | Homepage with Hero, Studios, How It Works, Pricing, FAQ |
| `/about` | Our Story (قصتنا) |
| `/gallery` | Work Gallery (معرض الأعمال) |
| `/pricing` | Subscription Plans (باقات الاشتراك) |
| `/faq` | FAQ (الأسئلة الشائعة) |
| `/contact` | Contact (تواصل معنا) |
| `/login` | Sign In / Sign Up |

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **RTL**: Native HTML `dir="rtl"` on `<html>`

## ✅ Phase 1 Scope

This is the **marketing website foundation** only.

Not included in this phase:
- AI generation system
- Studio functionality  
- Subscription/payment system
- Backend APIs
- User dashboard

## 📦 Dependencies

```json
{
  "next": "15.1.0",
  "react": "^19",
  "lucide-react": "latest",
  "tailwindcss": "^3.4",
  "clsx": "^2",
  "tailwind-merge": "^2"
}
```

---

طُوِّر بـ ذكاء 🇸🇦 في السعودية
