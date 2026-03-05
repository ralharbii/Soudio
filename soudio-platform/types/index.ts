/**
 * Soudio Platform — TypeScript Types
 * Phase 2: User System & Dashboard
 */
import { PlanType, SubscriptionStatus, TransactionType, TransactionStatus, ReferralStatus } from "@prisma/client";

// ─── User Types ───────────────────────────────────────────────────────────────
export interface SafeUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser extends SafeUser {
  subscription: SafeSubscription | null;
}

// ─── Subscription Types ───────────────────────────────────────────────────────
export interface SafeSubscription {
  id: string;
  planType: PlanType;
  imagesLimit: number;
  imagesUsed: number;
  extraCredits: number;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date | null;
  totalImages: number; // imagesLimit + extraCredits
  remainingImages: number; // total - imagesUsed
  usagePercent: number; // imagesUsed / total * 100
}

// ─── Image Types ──────────────────────────────────────────────────────────────
export interface SafeImage {
  id: string;
  studioId: string | null;
  patternName: string | null;
  imageUrl: string;
  thumbnailUrl: string | null;
  aspectRatio: string;
  createdAt: Date;
}

// ─── Transaction Types ────────────────────────────────────────────────────────
export interface SafeTransaction {
  id: string;
  referenceNumber: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  description: string | null;
  endDate: Date | null;
  createdAt: Date;
}

// ─── Referral Types ───────────────────────────────────────────────────────────
export interface SafeReferral {
  id: string;
  receiverEmail: string;
  status: ReferralStatus;
  rewardImages: number;
  createdAt: Date;
}

// ─── API Response Types ───────────────────────────────────────────────────────
export interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  errors?: Record<string, string[]>;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

// ─── Session Types ────────────────────────────────────────────────────────────
export interface SessionPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export interface DashboardStats {
  totalImages: number;
  imagesUsed: number;
  imagesRemaining: number;
  daysRemaining: number;
  usagePercent: number;
  planName: string;
  planType: PlanType;
  status: SubscriptionStatus;
  endDate: Date | null;
  studioUsage: Record<string, number>; // studioId -> count
}

// ─── Form Types ───────────────────────────────────────────────────────────────
export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface UpdateProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ─── Next.js Extended Types ───────────────────────────────────────────────────
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}

// ─── Plan Constants ───────────────────────────────────────────────────────────
export const PLAN_NAMES: Record<PlanType, string> = {
  TRIAL: "تجربة مجانية",
  STARTER: "باقة البداية",
  GROWTH: "باقة النمو",
  PARTNER: "باقة الشريك",
};

export const PLAN_LIMITS: Record<PlanType, number> = {
  TRIAL: 3,
  STARTER: 10,
  GROWTH: 30,
  PARTNER: 100,
};

export const PLAN_PRICES: Record<PlanType, number> = {
  TRIAL: 0,
  STARTER: 60,
  GROWTH: 115,
  PARTNER: 400,
};

export const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  TRIAL: "تجربة",
  ACTIVE: "فعّال",
  CANCELLED: "ملغى",
  EXPIRED: "منتهي",
  SUSPENDED: "موقوف",
};
