<script lang="ts" setup>
import * as pdfjsLib from "pdfjs-dist"
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs?worker"
import type { PDFDocumentProxy } from "pdfjs-dist"

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerPort = new PDFJSWorker()

const pdfUrl = ref<string>("https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf")
const canvasRef = ref<HTMLCanvasElement | null>(null)
let pdfDoc: PDFDocumentProxy | null = null
let pageNum = 1

async function renderPage(num: number) {
    if (!pdfDoc || !canvasRef.value) return
    const page = await pdfDoc.getPage(num)
    const viewport = page.getViewport({ scale: 1.5 })
    const canvas = canvasRef.value
    const context = canvas.getContext("2d")!
    canvas.height = viewport.height
    canvas.width = viewport.width
    await page.render({ canvasContext: context, viewport }).promise
}

async function loadPdf() {
    pdfDoc = await pdfjsLib.getDocument(pdfUrl.value).promise
    renderPage(pageNum)
}

function onWheel(e: WheelEvent) {
    if (!pdfDoc) return
    if (e.deltaY > 0 && pageNum < pdfDoc.numPages) {
        pageNum++
        renderPage(pageNum)
    } else if (e.deltaY < 0 && pageNum > 1) {
        pageNum--
        renderPage(pageNum)
    }
}

onMounted(() => {
    loadPdf()
})

watch(pdfUrl, () => {
    pageNum = 1
    loadPdf()
})
</script>

<template>
    <div
        style="
            height: 100%;
            overflow: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #222;
        "
    >
        <canvas ref="canvasRef" style="background: #fff; box-shadow: 0 0 8px #000" @wheel.passive="onWheel" />
    </div>
</template>
