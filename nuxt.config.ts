const devHost = "dev.scienhub.com"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    pages: true,
    ssr: true,
    debug: true,
    app: {
        head: {
            title: "ScienHub",
            meta: [
                {
                    name: "description",
                    content: "ScienHub: AI-Powered Scientific Collaboration",
                },
                {
                    name: "keywords",
                    content: "AI, LaTeX editor, Collaboration, Research",
                },
            ],
        },
    },
    runtimeConfig: {
        public: { devHost },
    },
    devtools: { enabled: true },
    plugins: ["~/plugins/auth"],
    nitro: {
        preset: "static",
        prerender: {
            crawlLinks: true,
            routes: [
                "/",
                "/pricing",
                "/legal",
                // other routes will be automatically crawled
                // as long as they are linked from the pages above
            ],
            ignore: ["/*/*/editor"],
        },
    },
    devServer: {
        port: 3030,
        host: "0.0.0.0",
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    },
    vite: {
        server: {
            proxy: {
                // WebSocket proxy must come BEFORE the general API proxy
                "/api/ws": {
                    target: `wss://${devHost}`, // use `wss://` if your backend uses HTTPS
                    changeOrigin: true,
                    ws: true,
                },
                // General API proxy comes after
                "^/api/(?!ws)": {
                    // Negative lookahead to exclude /ws
                    target: `https://${devHost}`,
                    changeOrigin: true,
                },
            },
        },
    },
    modules: [
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxt/test-utils",
        "@nuxt/ui-pro",
        "nuxt-gtag",
        "@nuxt/content",
    ],
    icon: {
        clientBundle: {
            scan: true,
            icons: [
                "lucide:chevrons-left",
                "lucide:chevron-left",
                "lucide:chevrons-right",
                "lucide:chevron-right",
                "lucide:folder",
                "lucide:folder-open",
                "lucide:refresh-cw",
                "lucide:loader-circle",
                "lucide:menu",
                "lucide:panel-left-open",
                "lucide:panel-left-close",
                "lucide:x",
                "lucide:sun",
                "lucide:moon",
                "vscode-icons:file-type-light-tex",
                "vscode-icons:file-type-tex",
                "vscode-icons:file-type-eps",
                "vscode-icons:file-type-image",
                "vscode-icons:file-type-powerpoint",
                "vscode-icons:file-type-word",
                "vscode-icons:file-type-excel",
                "vscode-icons:file-type-pdf2",
                "vscode-icons:file-type-markdown",
                "vscode-icons:file-type-text",
                "vscode-icons:default-file",
            ],
        },
        customCollections: [
            {
                prefix: "icons",
                dir: "./app/assets/icons",
            },
        ],
    },
    gtag: {
        id: "G-R9DBHZP0D2",
    },
    css: ["~/assets/css/main.css"],
    future: {
        compatibilityVersion: 4,
    },
})
