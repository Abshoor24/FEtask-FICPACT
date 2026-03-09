import { z } from 'zod';

export const createQuestSchema = z.object({
    name: z.string().min(3, { error: "Nama minimal 3 karakter" }),
    description: z.string(),
    folderId: z.string(),
    deadLineAt: z.string(),
})

export type CreateQuestSchema = z.infer<typeof createQuestSchema>