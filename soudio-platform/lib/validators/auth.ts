/**
 * Soudio Platform — Validation Schemas (Zod)
 */
import { z } from "zod";

// ─── Auth Schemas ──────────────────────────────────────────────────────────────
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "الاسم الأول يجب أن يكون حرفين على الأقل")
      .max(50, "الاسم الأول طويل جداً"),
    lastName: z
      .string()
      .min(2, "اسم العائلة يجب أن يكون حرفين على الأقل")
      .max(50, "اسم العائلة طويل جداً"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    phone: z
      .string()
      .regex(/^(\+966|0)?5\d{8}$/, "رقم الجوال غير صحيح (مثال: 05XXXXXXXX)")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير")
      .regex(/[0-9]/, "يجب أن تحتوي على رقم"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور وتأكيدها غير متطابقتين",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
  remember: z.boolean().optional().default(false),
});

// ─── Profile Schemas ──────────────────────────────────────────────────────────
export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, "الاسم الأول يجب أن يكون حرفين على الأقل")
    .max(50),
  lastName: z
    .string()
    .min(2, "اسم العائلة يجب أن يكون حرفين على الأقل")
    .max(50),
  phone: z
    .string()
    .regex(/^(\+966|0)?5\d{8}$/, "رقم الجوال غير صحيح")
    .optional()
    .or(z.literal("")),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    newPassword: z
      .string()
      .min(8, "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل")
      .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير")
      .regex(/[0-9]/, "يجب أن تحتوي على رقم"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمة المرور الجديدة وتأكيدها غير متطابقتين",
    path: ["confirmPassword"],
  });

// ─── Referral Schema ──────────────────────────────────────────────────────────
export const referralSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
});

// ─── Type Exports ──────────────────────────────────────────────────────────────
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ReferralInput = z.infer<typeof referralSchema>;
