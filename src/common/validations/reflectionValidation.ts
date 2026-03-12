import z from "zod";

export const createUserReflectionSchema = z.object({
    questId: z.string(),
    questLevel: z.enum(["HIGH", "NORMAL", "LOW"]), //["HIGH", "NORMAL", "LOW"] as const,
    questStatus: z.boolean(),
    reasons: z.array(z.string()).min(1, { message: "Alasan harus diisi" }),
});


export const userFailedReflection = z.object({
    reasons: z.array(z.string()).min(1, { message: "Alasan harus diisi" }),
    add0ns: z.string().optional(),
});

export type CreateUserReflectionSchema = z.infer<typeof createUserReflectionSchema>;
export type UserFailedReflectionSchema = z.infer<typeof userFailedReflection>;