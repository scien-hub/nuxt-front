import { z } from "zod"

// user login session
export const UserSessionSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    userType: z.number(),
    uuid: z.string().uuid(),
    avatar: z.string().optional(),
})
export type UserSession = z.infer<typeof UserSessionSchema>
