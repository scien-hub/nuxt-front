<script setup>
import { motion } from "motion-v"
import LiveEditor from "./liveEditor.vue"
</script>
<template>
    <div class="mx-auto max-w-5xl px-4">
        <motion.section
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.1 }"
        >
            <h1 class="mt-16 text-center font-serif text-4xl font-semibold">
                <span class="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">AI</span>-Powered
                <br>
                <span class="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Scientific</span>&nbsp;
                <span class="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">Collaboration</span>
            </h1>

            <p class="mx-auto mt-8 text-center text-lg text-gray-600">
                Revolutionize your research workflow with AI-driven tools for seamless collaboration, data analysis, and
                knowledge discovery.
            </p>
        </motion.section>

        <motion.section
            class="mt-12 flex justify-center gap-4"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.3 }"
        >
            <LiveEditor class="w-[700px] max-w-full" />
        </motion.section>

        <motion.section
            class="mx-auto mt-16 grid grid-cols-1 gap-8 px-4 md:grid-cols-3"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.5 }"
        >
            <UCard>
                <template #header>
                    <h3 class="text-xl font-semibold">
Smart Collaboration
</h3>
                </template>
                <p class="text-gray-600">
Connect with researchers worldwide and collaborate on projects seamlessly.
</p>
            </UCard>
            <UCard>
                <template #header>
                    <h3 class="text-xl font-semibold">
AI Analysis
</h3>
                </template>
                <p class="text-gray-600">
Leverage advanced AI tools to analyze research data and extract insights.
</p>
            </UCard>
            <UCard>
                <template #header>
                    <h3 class="text-xl font-semibold">
Knowledge Hub
</h3>
                </template>
                <p class="text-gray-600">
Access a vast network of scientific resources and expert knowledge.
</p>
            </UCard>
        </motion.section>
    </div>
</template>
