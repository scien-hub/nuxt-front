<script setup lang="ts">
const route = useRoute()
const user = route.params.user as string
</script>

<template>
    {{ user }}
</template>
