<script setup lang="ts">
const { data: posts } = await useAsyncData("blog", () => queryCollection("legal").all())
</script>

<template>
    <main class="mx-auto max-w-xl flex-1 px-4">
        <h1 class="my-10 text-center text-3xl font-semibold">
Terms of Service
</h1>
        <ul v-if="posts">
            <li v-for="post in posts" :key="post.id">
                <ULink class="text-lg" :to="post.path">
                    {{ post.title }}
                </ULink>
            </li>
        </ul>
    </main>
</template>
