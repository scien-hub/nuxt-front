export default defineNuxtPlugin((_nuxtApp) => {
    // load session
    const { loadSession } = useAuth()
    loadSession()
})
