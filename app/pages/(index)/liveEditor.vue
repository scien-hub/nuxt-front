<script setup>
// Simple reactive refs for each text line
const text1 = ref("This paper presents a comprehensive approach.")
const text2 = ref("We propose an innovative methodology.")

const users = ref([
    {
        id: 1,
        name: "Alice",
        color: "#D5451B",
        isActive: false,
    },
    {
        id: 2,
        name: "Bob",
        color: "#4E71FF",
        isActive: false,
    },
])

// Simple typing function
const typeText = async (textRef, originalText, additionalText, speed = 200) => {
    textRef.value = originalText

    for (let i = 0; i < additionalText.length; i++) {
        textRef.value = originalText + additionalText.slice(0, i + 1)
        // Base delay with small random variation
        let delay = speed + Math.random() * 100 - 50 // ±50ms
        // Occasionally insert a longer pause (e.g. 1 out of every ~7 chars)
        if (Math.random() < 0.6) {
            delay += Math.random() * 500
        }

        await new Promise((resolve) => setTimeout(resolve, delay))
    }
}

// Computed properties for preview
const previewText1 = computed(() => text1.value)
const previewText2 = computed(() => text2.value)

// Simple animation
const startAnimation = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    while (true) {
        // Reset texts
        text1.value = "This paper presents a comprehensive approach."
        text2.value = "We propose an innovative methodology."

        // Start both users
        users.value[0].isActive = true
        users.value[1].isActive = true

        // Both type simultaneously
        const alicePromise = typeText(text1, "", "This paper presents a comprehensive approach. Amazing!")
        const bobPromise = typeText(text2, "", "We propose an innovative methodology. Excellent!")

        await Promise.all([alicePromise, bobPromise])

        // Hide cursors
        users.value[0].isActive = false
        users.value[1].isActive = false

        // Pause before reset
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
}

onMounted(() => {
    startAnimation()
})
</script>

<template>
    <div class="mx-auto max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800">
        <!-- Editor Header -->
        <header class="flex items-center justify-between bg-gray-900 px-6 py-1 dark:bg-gray-950">
            <ul class="flex space-x-2">
                <li class="h-3 w-3 rounded-full bg-red-500" />
                <li class="h-3 w-3 rounded-full bg-yellow-500" />
                <li class="h-3 w-3 rounded-full bg-green-500" />
            </ul>
            <ul class="flex items-center space-x-4">
                <li v-for="user in users" :key="user.name" class="flex items-center space-x-2">
                    <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: user.color }" />
                    <span class="text-sm text-gray-300 dark:text-gray-200">{{ user.name }}</span>
                </li>
            </ul>
        </header>

        <!-- Editor Content -->
        <div class="grid h-80 grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
            <!-- LaTeX Source -->
            <div class="relative overflow-hidden bg-gray-50 dark:bg-gray-900">
                <div class="relative h-full overflow-y-auto p-3 font-mono text-sm leading-6">
                    <pre class="whitespace-pre-wrap text-gray-800 dark:text-gray-200">\documentclass{article}
\begin{document}
\title{Awesome Paper}
\author{Alice Chen \and Bob Smith}
\section{Introduction}
{{ text1 }}<span v-if="users[0].isActive" class="cursor-alice" :style="{ backgroundColor: users[0].color }"><span class="cursor-label" :style="{ backgroundColor: users[0].color }">{{ users[0].name }}</span></span>

{{ text2 }}<span v-if="users[1].isActive" class="cursor-bob" :style="{ backgroundColor: users[1].color }"><span class="cursor-label" :style="{ backgroundColor: users[1].color }">{{ users[1].name }}</span></span>
\end{document}</pre>
                </div>
            </div>

            <!-- PDF Preview -->
            <div class="relative bg-white dark:bg-gray-800">
                <div class="h-full overflow-y-auto p-3">
                    <div class="prose prose-sm max-w-none">
                        <h1 class="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
Awesome Paper
</h1>
                        <p class="mb-6 text-gray-600 italic dark:text-gray-400">
Alice Chen and Bob Smith
</p>

                        <div>
                            <h2 class="mt-6 mb-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Introduction
                            </h2>
                            <p class="mb-4 text-gray-700 dark:text-gray-300">
                                {{ previewText1 }}
                            </p>
                            <p class="mb-4 text-gray-700 dark:text-gray-300">
                                {{ previewText2 }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cursor-alice,
.cursor-bob {
    position: relative;
    display: inline-block;
    width: 0;
    height: 0;
}

.cursor-alice::before,
.cursor-bob::before {
    content: "";
    position: absolute;
    left: 0;
    top: -1em;
    width: 2px;
    height: 1.2em;
    background-color: inherit;
}

.cursor-label {
    position: absolute;
    top: -2.4em;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    border-radius: 4px;
    padding: 0px 8px;
    font-size: 1em;
    color: white;
    z-index: 10;
    pointer-events: none;
    opacity: 0.8;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}
</style>
