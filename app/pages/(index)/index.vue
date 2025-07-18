<script setup>
import { motion } from "motion-v"
import LiveEditor from "./liveEditor.vue"
import Columns from "./columns.vue"
import Grid from "./grid.vue"
</script>
<template>
    <div class="mx-auto max-w-5xl px-4">
        <motion.section
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.1 }"
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

            <USeparator class="my-12" />
        </motion.section>

        <motion.section
            class="my-12 flex flex-col justify-center gap-4"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.3 }"
        >
            <h2 class="text-center text-2xl">
Seamless Coordination, Realtime Collaboration
</h2>
            <LiveEditor class="w-[600px] max-w-full" />
        </motion.section>

        <motion.section
            color="my-12"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.5 }"
        >
            <Grid />
        </motion.section>

        <motion.section
            class="my-16"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.5 }"
        >
            <USeparator class="my-12" />
            <Columns />
        </motion.section>
    </div>
</template>
