<script setup lang="ts">
import { h, resolveComponent } from "vue"
import type { TableColumn } from "@nuxt/ui"
import type { ProjectList } from "~/lib/schemas"

const props = defineProps<{
    type: "own" | "shared" | "all"
}>()

const route = useRoute()
const username = computed(() => route.params.user)

const {
    data: projects,
    error,
    // status,
    pending,
} = useGet<ProjectList>("/api/project/list/", {
    username: username.value,
    type: props.type,
})

const page = ref(1) // start at page 1
const pageSize = 8

// Compute sliced data for the current page
const pagedData = computed(() => {
    if (!projects.value) return []
    const start = (page.value - 1) * pageSize
    const end = start + pageSize
    return projects.value.slice(start, end)
})

// Format data for the table based on paged data
const tabData = computed(() => {
    return pagedData.value.map((project) => ({
        name: `${project.owner.username}/${project.name}`,
        UUID: project.uuid,
        status: project.private ? "private" : "public",
        updatedAt: project.updatedAt,
    }))
})

const UBadge = resolveComponent("UBadge")
const ULink = resolveComponent("ULink")

const columns: TableColumn<{
    name: string
    UUID: string
    status: string
    updatedAt: string
}>[] = [
    {
        accessorKey: "name",
        header: "Project Name",
        cell: ({ row }) => {
            const name = row.getValue("name") as string
            return h(ULink, { to: `${name}/editor` }, () => `${name}/editor`)
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const color = {
                private: "warning" as const,
                public: "success" as const,
            }[row.getValue("status") as string]

            return h(
                UBadge,
                {
                    class: "capitalize",
                    variant: "subtle",
                    color,
                },
                () => row.getValue("status")
            )
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
            return new Date(row.getValue("updatedAt")).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
        },
    },
]
</script>

<template>
    <div class="flex h-[100%] w-full flex-col">
        <Loader v-if="pending" />
        <div v-else-if="error" class="flex flex-1 items-center justify-center">
Error: {{ error.message }}
</div>
        <div v-else class="flex flex-1 flex-col overflow-y-scroll">
            <UTable :data="tabData" :columns="columns" />
            <UPagination
                v-model:page="page"
                :items-per-page="pageSize"
                :total="projects?.length || 0"
                class="mx-auto h-12 flex-shrink-0"
            />
        </div>
    </div>
</template>
