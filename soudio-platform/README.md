# سعوديو | Soudio Platform — Phase 2

أول استوديو سعودي متخصص في تجهيز صور منتجات المتاجر الإلكترونية بالذكاء الاصطناعي.

## Quick Start

```bash
npm install
cp .env.example .env.local   # Fill DATABASE_URL + JWT_SECRET
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Demo: demo@soudio.sa / soudio123

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | - | Create account |
| POST | /api/auth/login | - | Authenticate |
| POST | /api/auth/logout | ✓ | Sign out |
| GET/PUT | /api/user/profile | ✓ | Profile CRUD |
| POST | /api/user/change-password | ✓ | Password update |
| GET/POST | /api/user/referral | ✓ | Referrals |
| GET/DELETE | /api/images | ✓ | Image library |

## Dashboard Routes

- /dashboard — Overview & stats
- /dashboard/library — Image library
- /dashboard/subscription — Plan management
- /dashboard/settings — Account settings
- /dashboard/referral — Invite friends

طور بـ ذكاء في السعودية
