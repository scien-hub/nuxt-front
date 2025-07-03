<script setup lang="ts">
const testimonials = ref([
    {
        user: {
            name: "Raymi Gonzalez",
            description: "Ph.D. student at UCLA",
            avatar: {
                src: "https://avatars.githubusercontent.com/u/499550?v=4",
                alt: "Evan You",
            },
        },
        quote: "Nuxt on Cloudflare infra with minimal effort - this is huge!",
    },
    {
        user: {
            name: "Andres Alcaraz",
            description: "Amazon",
            avatar: {
                src: "https://avatars.githubusercontent.com/u/1769417?v=4",
                alt: "Israel Ortuño",
            },
        },
        quote: "I can't find an excuse to not go full-stack with Nuxt from now on. Ship fast the Nuxt way, zero config. Just plug & deploy.",
    },
    {
        user: {
            name: "Ming-ming Cheng",
            description: "Professor @Nankai University",
            avatar: {
                src: "https://avatars.githubusercontent.com/u/15716057?v=4",
                alt: "Fayaz Ahmed",
            },
        },
        quote: "Took me less than 90 seconds to deploy an app with DB, KV, File storage and Caching, all on the edge with just a single command.",
    },
    {
        user: {
            name: "Markus Oberlehner",
            description: "Web Developer",
            avatar: {
                src: "https://avatars.githubusercontent.com/u/6883314?v=4",
                alt: "Markus Oberlehner",
            },
        },
        quote: "Just deployed my first site to Cloudflare using NuxtHub. Very sleek experience!",
    },
    {
        user: {
            name: "Ajin Joy",
            description: "Postdoctoral Researcher at UCLA",
            avatar: {
                src: "https://avatars.githubusercontent.com/u/11247099?v=4",
                alt: "Anthony Fu",
            },
        },
        quote: "It's amazing to be able to run a single command and get existing Nuxt project deployed on edge within minutes! It felt like unlocking the missing infrastructure and UI for Cloudflare, enhancing the developer experience in such an extraordinary way.",
    },
])
</script>

<template>
    <UPageColumns>
        <UPageCard
            variant="solid"
            to="https://cloudflare.com"
            icon="i-logos-cloudflare-icon"
            title="Cloudflare's Workers LaunchPad"
            description="NuxtHub is part of the Cloudflare's Workers Launchpad Cohort to make sure you get a first-class experience on top of Cloudflare's network."
            :ui="{ leadingIcon: 'size-10' }"
        />

        <UPageCard
            v-for="(testimonial, index) in testimonials"
            :key="index"
            variant="subtle"
            :description="testimonial.quote"
            :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
        >
            <template #footer>
                <UUser v-bind="testimonial.user" size="xl" />
            </template>
        </UPageCard>
    </UPageColumns>
</template>
