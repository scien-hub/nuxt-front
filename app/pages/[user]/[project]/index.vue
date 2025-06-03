<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui"

const route = useRoute()
const user = route.params.user as string
const project = route.params.project as string

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: user,
        to: `/${user}`,
    },
    {
        label: project,
        to: `/${user}/${project}`,
    },
]
</script>

<template>
    <div>
        <UBreadcrumb :items="breadcrumbItems">
            <template #separator>
                <span class="text-muted mx-0">/</span>
            </template>
        </UBreadcrumb>
    </div>
</template>
