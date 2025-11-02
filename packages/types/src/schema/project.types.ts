import z from "zod";

export const createProjectScehma = z.object({
    slug: z.string(),
    prompt: z.string()
})

export type CreateProjectType = z.infer<typeof createProjectScehma>