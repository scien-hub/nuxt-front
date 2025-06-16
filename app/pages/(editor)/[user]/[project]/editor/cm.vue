<!-- Implementation of the CodeMirror editor -->
<script setup lang="ts">
import { EditorView } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { basicSetup } from "codemirror"

// Yjs
import * as Y from "yjs"
import { yCollab } from "y-codemirror.next"
import { WebsocketProvider } from "y-websocket"

// Div element for the editor
const editorDiv = ref<HTMLElement | null>(null)

const ydoc = new Y.Doc()
const ytext = ydoc.getText("codemirror")
const provider = new WebsocketProvider("/api/ws", "codemirror-demo", ydoc, { connect: false })
const undoManager = new Y.UndoManager(ytext)

// editor
const theme = EditorView.theme(
    {
        ".cm-scroller": { overflow: "auto" },
        "&": {
            height: "100%",
        },
    },
    { dark: false }
)

const state = EditorState.create({
    doc: ytext.toString(),
    extensions: [basicSetup, theme, yCollab(ytext, provider.awareness, { undoManager })],
})

let editorView: EditorView | null = null

onMounted(() => {
    if (editorDiv.value && !editorView) {
        editorView = new EditorView({
            state,
            parent: editorDiv.value as HTMLElement,
        })
    }
})
</script>

<template>
    <div id="cm-editor-parent" ref="editorDiv" />
</template>
