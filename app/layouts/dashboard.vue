<template>
    <div class="flex min-h-screen flex-col">
        <Header />

        <!-- Main area grows -->
        <UMain class="flex flex-1 flex-col overflow-hidden">
            <slot />
        </UMain>
    </div>
</template>
