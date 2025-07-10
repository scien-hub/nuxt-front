import { z } from "zod"

export const ProjectOwnerSchema = z.object({
    uuid: z.string(),
    username: z.string(),
    email: z.string().email(),
})

export const ProjectListSchema = z.array(
    z.object({
        uuid: z.string(),
        name: z.string(),
        private: z.boolean(),
        description: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        ownerId: z.string(),
        ownerName: z.string(),
        ownerEmail: z.string().email(),
        ownerType: z.number(),
        owner: ProjectOwnerSchema,
    })
)
export type ProjectList = z.infer<typeof ProjectListSchema>
