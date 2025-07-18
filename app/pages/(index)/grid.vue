<script setup lang="ts">
const cards = ref([
    {
        title: "Icons",
        description: "Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.",
        icon: "i-lucide-smile",
    },
    {
        title: "Fonts",
        description: "Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.",
        icon: "i-lucide-a-large-small",
    },
    {
        title: "Color Mode",
        description: "Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.",
        icon: "i-lucide-sun-moon",
    },
])
</script>

<template>
    <UPageGrid>
        <UPageCard v-for="(card, index) in cards" :key="index" v-bind="card" />
    </UPageGrid>
</template>
