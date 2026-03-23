import { z } from "zod";

// export const createPunishmentSchema = z.object({
//   name: z
//     .string()
//     .min(3, "Nama hukuman minimal 3 karakter"),

// deadline: z
//   .string()
//   .min(1, "Deadline wajib diisi"),

//   questId: z
//     .string()
//     .uuid("Quest ID harus berupa UUID yang valid"),
// });

export const createPunishmentSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  deadline: z.string().min(1, "Deadline wajib diisi"),
});

export type CreatePunishmentSchema = z.infer<typeof createPunishmentSchema>;