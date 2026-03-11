import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: "Email tidak valid" }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export const registerSchema = loginSchema.extend({
    name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
    confirmPassword: z.string().min(6, { message: "Password minimal 6 karakter" }),
    terms: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password dan Confirm Password harus sama",
    path: ["confirmPassword"],
}).refine((data) => data.terms === true, {
    message: "Kamu harus menyetujui Syarat & Ketentuan",
    path: ["terms"],
});


export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Email tidak valid" }),
});

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
