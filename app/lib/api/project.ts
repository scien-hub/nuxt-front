import { POST } from "./fetch"

type CreateBlankProjectPayload = {
    name: string
}

type CreateProjectResponse = {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

export async function createBlank(name: string) {
    return await POST<CreateBlankProjectPayload, CreateProjectResponse>("/api/project/blank", {
        name,
    })
}
