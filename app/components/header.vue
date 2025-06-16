<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from "@nuxt/ui"
import PHLogo from "~/components/phlogo.vue"

const route = useRoute()
const { isLoggedIn, session, logout } = useAuth()

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: "Templates",
        to: "/templates",
        active: route.path.startsWith("/templates"),
    },
    {
        label: "Docs",
        to: "/docs",
        active: route.path.startsWith("/docs"),
    },
    {
        label: "Pricing",
        to: "/pricing",
        active: route.path.startsWith("/pricing"),
    },
    {
        label: "ProductHunt",
        to: "https://www.producthunt.com/products/scienhub",
        target: "_blank",
    },
])

// dropdown menu items
const profileDropDownItems = ref<DropdownMenuItem[][]>([
    [
        {
            label: session.value?.username || "Guest",
            type: "label",
        },
    ],
    [
        {
            label: "Dashboard",
            icon: "i-lucide-user",
            to: `/${session.value?.username}`,
        },
        {
            label: "Billing",
            icon: "i-lucide-credit-card",
        },
        {
            label: "Settings",
            icon: "i-lucide-cog",
            kbds: [","],
        },
        {
            label: "Keyboard shortcuts",
            icon: "i-lucide-monitor",
        },
    ],
    [
        {
            label: "Team",
            icon: "i-lucide-users",
        },
        {
            label: "Invite users",
            icon: "i-lucide-user-plus",
            children: [
                [
                    {
                        label: "Email",
                        icon: "i-lucide-mail",
                    },
                    {
                        label: "Message",
                        icon: "i-lucide-message-square",
                    },
                ],
                [
                    {
                        label: "More",
                        icon: "i-lucide-circle-plus",
                    },
                ],
            ],
        },
        {
            label: "New team",
            icon: "i-lucide-plus",
            kbds: ["meta", "n"],
        },
    ],
    [
        {
            label: "GitHub",
            icon: "i-simple-icons-github",
            to: "https://github.com/nuxt/ui",
            target: "_blank",
        },
        {
            label: "Support",
            icon: "i-lucide-life-buoy",
            to: "/components/dropdown-menu",
        },
        {
            label: "API",
            icon: "i-lucide-cloud",
            disabled: true,
        },
    ],
    [
        {
            label: "Logout",
            icon: "i-lucide-log-out",
            kbds: ["shift", "meta", "q"],
            onSelect: () => {
                console.log("clicked logout")
                logout()
            },
        },
    ],
])
</script>

<template>
    <UHeader>
        <template #left>
            <NuxtLink to="/">
                <!-- <Icon name="icons:quill" /> -->
                <PHLogo />
            </NuxtLink>
        </template>

        <UNavigationMenu :items="items" variant="link" />

        <template #right>
            <template v-if="!isLoggedIn">
                <UButton icon="i-lucide-log-in" color="neutral" variant="ghost" to="/login" class="lg:hidden" />

                <UButton label="Sign in" color="neutral" variant="outline" to="/login" class="hidden lg:inline-flex" />

                <UButton
                    label="Sign up"
                    color="neutral"
                    trailing-icon="i-lucide-arrow-right"
                    class="hidden lg:inline-flex"
                    to="/signup"
                />
            </template>

            <template v-if="isLoggedIn">
                <UDropdownMenu
                    :items="profileDropDownItems"
                    :ui="{
                        content: 'w-48',
                    }"
                    class="hover:cursor-pointer"
                >
                    <UAvatar
                        size="2xs"
                        :src="
                            session?.avatar || 'https://cdn.scienhub.com/scienhub-logo/scienhub-logo-transparent128.png'
                        "
                    />
                </UDropdownMenu>
            </template>

            <UColorModeButton />
        </template>

        <template #body>
            <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />

            <USeparator class="my-6" />
            <template v-if="!isLoggedIn">
                <UButton label="Sign in" color="neutral" variant="subtle" to="/login" block class="mb-3" />
                <UButton label="Sign up" color="neutral" to="/signup" block />
            </template>
        </template>
    </UHeader>
</template>
