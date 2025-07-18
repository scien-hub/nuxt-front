<script setup lang="ts">
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
const route = useRoute()

const showHeader = computed(() => (route.meta.hideHeader !== undefined ? !route.meta.hideHeader : true))
const showFooter = computed(() => (route.meta.hideFooter !== undefined ? !route.meta.hideFooter : true))
</script>

<template>
    <Header v-if="showHeader" />
    <UMain>
        <slot />
    </UMain>
    <Footer v-if="showFooter" />
</template>
