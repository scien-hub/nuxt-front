<script setup>
const slug = useRoute().params.slug

const { data: post } = await useAsyncData(`legal-${slug}`, () => {
    return queryCollection("legal").path(`/legal/${slug}`).first()
})
</script>

<template>
    <div class="mx-auto max-w-2xl">
        <ContentRenderer class="prose prose-h1:text-center prose-h1:font-semibold dark:prose-invert" :value="post" />
        <p class="mt-6">
            <ULink to="/legal">
<UIcon name="lucide:arrow-up-left" />Back to Legal.
</ULink>
        </p>
    </div>
</template>
