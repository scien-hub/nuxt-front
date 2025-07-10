<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"

const items: NavigationMenuItem[] = [
    {
        label: "Terms",
        to: "/legal/terms",
    },
    {
        label: "Privacy",
        to: "/legal/privacy",
    },
    {
        label: "Contact",
        to: "/contact",
    },
    {
        label: "Discussions",
        to: "https://github.com/orgs/scien-hub/discussions",
        target: "_blank",
    },
]
</script>

<template>
    <UFooter>
        <template #left>
            <p class="text-muted text-sm">
                Copyright ©
                {{ new Date().getFullYear() }} ScienHub
            </p>
        </template>

        <UNavigationMenu :items="items" variant="link" />

        <template #right>
            <UButton
                icon="i-simple-icons-github"
                color="neutral"
                variant="ghost"
                to="https://github.com/scien-hub"
                target="_blank"
                aria-label="GitHub"
            />
            <UButton
                icon="i-simple-icons-x"
                color="neutral"
                variant="ghost"
                to="https://x.com/scienhub"
                target="_blank"
                aria-label="X"
            />
            <UButton
                icon="i-simple-icons-discord"
                color="neutral"
                variant="ghost"
                to="https://discord.gg/vHhvpDSy9s"
                target="_blank"
                aria-label="Discord"
            />
            <UButton
                icon="i-simple-icons-wechat"
                size="xl"
                color="neutral"
                variant="ghost"
                to="https://cdn.scienhub.com/wechat-qr.jpg"
                target="_blank"
                aria-label="Wechat"
            />
        </template>
    </UFooter>
</template>
