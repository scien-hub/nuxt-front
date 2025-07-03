<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"
import Projects from "./components/projects.vue"

// const { session, isLoggedIn } = useAuth()

const route = useRoute()
const user = route.params.user as string

// 通过路由元信息来控制是否显示头部和底部

const panelTab = useState("panelTab", () => "projects")
const items = computed<NavigationMenuItem[][]>(() => {
    const enhance = (item: NavigationMenuItem): NavigationMenuItem => {
        return {
            ...item,
            onSelect: item.id
                ? (_e: Event) => {
                    panelTab.value = item.id
                    console.log(`Tab switched to ${item.label} (tab="${item.id}").`)
                }
                : undefined,
            active: item.id ? !!panelTab.value && item.id === panelTab.value : false,
            children: item.children?.map(enhance),
        }
    }

    const topItems = [
        {
            label: "Home",
            id: "home",
            icon: "i-lucide-house",
            to: "/",
        },
        {
            label: "Projects",
            icon: "lucide:book",
            defaultOpen: true,
            onSelect: (_e: Event) => {
                panelTab.value = "projects"
            },
            active: panelTab.value === "projects",
            children: [
                {
                    label: "Own Projects",
                    id: "projects/own",
                    icon: "lucide:person-standing",
                },
                {
                    label: "Shared Projects",
                    id: "projects/shared",
                    icon: "lucide:share-2",
                },
                {
                    label: "Public Projects",
                    id: "projects/public",
                    icon: "lucide:globe",
                },
            ],
        },
        {
            label: "Inbox",
            id: "inbox",
            icon: "i-lucide-inbox",
            badge: "4",
            onSelect: (_e: Event) => {
                panelTab.value = "inbox"
                console.log("inbox selected")
            },
            active: panelTab.value === "inbox",
        },
        {
            label: "Contacts",
            id: "contacts",
            icon: "i-lucide-users",
        },

        {
            label: "Settings",
            icon: "i-lucide-settings",
            defaultOpen: false,
            children: [
                {
                    label: "Profile",
                    id: "settings/profile",
                    icon: "i-lucide-user",
                },
                {
                    label: "Security",
                    id: "settings/security",
                    icon: "i-lucide-shield-check",
                },
                {
                    label: "Notifications",
                    id: "settings/notifications",
                    icon: "i-lucide-bell",
                },
                {
                    label: "Billing",
                    id: "settings/billing",
                    icon: "i-lucide-credit-card",
                },
            ],
        },
    ]

    const bottomItems = [
        {
            label: "Feedback",
            icon: "i-lucide-message-circle",
            to: "https://github.com/orgs/scien-hub/discussions",
            target: "_blank",
        },
        {
            label: "Help & Support",
            icon: "i-lucide-info",
            to: "https://github.com/orgs/scien-hub/discussions/",
            target: "_blank",
        },
    ]
    return [topItems.map(enhance), bottomItems]
})
</script>

<template>
    <UDashboardGroup class="static h-[calc(100vh-var(--ui-header-height))]">
        <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' }">
            <template #default="{ collapsed }">
                <UNavigationMenu :collapsed="collapsed" :items="items[0]" orientation="vertical" />

                <UNavigationMenu :collapsed="collapsed" :items="items[1]" orientation="vertical" class="mt-auto" />
            </template>

            <template #footer="{ collapsed }">
                <UButton
                    :avatar="{
                        src: 'https://github.com/benjamincanac.png',
                    }"
                    :label="collapsed ? undefined : user"
                    color="neutral"
                    variant="ghost"
                    class="w-full"
                    :block="collapsed"
                />
            </template>
        </UDashboardSidebar>
        <Projects type="all" />
    </UDashboardGroup>
</template>
