<script setup lang="ts">
import type { BreadcrumbItem, TreeItem } from "@nuxt/ui"
import { formatItems } from "./filetree"
import CMEditor from "./cm.vue"
import PDFViewer from "./pdf.vue"
const colorMode = useColorMode()

definePageMeta({
    layout: "editor",
})

const route = useRoute()
const user = route.params.user as string
const project = route.params.project as string

const dummy: TreeItem[] = [
    {
        label: "app/",
        defaultExpanded: true,
        children: [
            {
                label: "source/",
                value: "app/source/",
                children: [
                    {
                        label: "main.tex",
                    },
                    {
                        label: "code/",
                        children: [
                            {
                                label: "file1.tex",
                            },
                            {
                                label: "file2.tex",
                            },
                        ],
                    },
                ],
            },
            {
                label: "figures/",
                defaultExpanded: true,
                children: [
                    {
                        label: "card.png",
                    },
                    {
                        label: "fig.eps",
                    },
                ],
            },
        ],
    },
    {
        label: "main.tex",
    },
    {
        label: "eg.pdf",
    },
    {
        label: "eg.ppt",
    },
    {
        label: "eg.doc",
    },
    {
        label: "eg.docx",
    },
    {
        label: "eg.xls",
    },
    {
        label: "README.md",
    },
    {
        label: "readme.txt",
    },
    {
        label: "readme.example",
    },
]

const filetree = computed(() => formatItems(dummy, "/", colorMode.value))

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: user,
        to: `/${user}`,
    },
    {
        label: project,
        to: `/${user}/${project}`,
    },
    {
        label: "editor",
        to: `/${user}/${project}/editor`,
    },
]

let ws: WebSocket

onMounted(() => {
    ws = new WebSocket("/api/ws") // this does not work
    // ws = new WebSocket("wss://dev.scienhub.com/api/ws") // this works
    ws.onopen = () => {
        console.log("WebSocket connected")
        ws?.send(JSON.stringify({ type: "greeting", message: "hello server" }))
    }

    ws.onmessage = (event) => {
        console.log("Received from server:", event.data)
    }

    ws.onerror = (err) => {
        console.error("WebSocket error:", err)
    }

    ws.onclose = () => {
        console.warn("WebSocket closed")
    }
})

onBeforeUnmount(() => {
    ws.close()
})
</script>

<template>
    <div class="flex h-screen flex-col">
        <header class="border-b border-red-300">
            <UBreadcrumb :items="breadcrumbItems">
                <template #separator>
                    <span class="text-muted mx-0">/</span>
                </template>
            </UBreadcrumb>
            <UColorModeButton />
        </header>
        <div id="ide" class="flex flex-1 overflow-auto border border-gray-300">
            <UTree class="max-w-[20vw]" :items="filetree" />
            <ClientOnly>
                <CMEditor class="flex-1" />
            </ClientOnly>
            <div class="flex-1">
                <ClientOnly>
                    <PDFViewer />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>
