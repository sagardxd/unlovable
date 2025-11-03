import z from "zod";

export const userScehma = z.object({
    email: z.email(),
    password: z.string()
})

export type userType = z.infer<typeof userScehma>