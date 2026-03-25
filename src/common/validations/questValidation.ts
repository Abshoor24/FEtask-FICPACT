import { z } from 'zod';

export const createQuestSchema = z.object({
    name: z.string().min(3, { error: "Nama minimal 3 karakter" }),
    description: z.string(),
    folderId: z.string().min(1, "Folder harus diisi"),
    deadLineAt: z.string().refine((val) => {
        const date = new Date(val);
        return date > new Date();
    }, {
        message: "Deadline tidak boleh di masa lalu"
    }),
})

export type CreateQuestSchema = z.infer<typeof createQuestSchema>