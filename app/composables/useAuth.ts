import type { UserSession } from "~/lib/schemas"
import { UserSessionSchema } from "~/lib/schemas"
import { POST } from "~/lib/api/index"

export const useAuth = () => {
    const session = useState<UserSession | null>("session", () => null)
    const login = async (email: string, password: string) => {
        try {
            const { status, response } = await POST<{ email: string; password: string }, UserSession>(
                "/api/user/auth/login",
                { email, password }
            )
            if (status < 300 && response.data) {
                // success
                if (response.code === "OK") {
                    const result = UserSessionSchema.safeParse(response.data)
                    if (result.success) {
                        session.value = result.data
                        console.log("Parsed session data:", result.data)
                        console.log(`Set localStorage["session"] to ${JSON.stringify(result.data)}.`)
                        if (import.meta.client) {
                            localStorage.setItem("session", JSON.stringify(result.data))
                        }
                    } else {
                        console.error("Login request success, but the response.data is corrupted", result)
                        throw new Error("Invalid session data")
                    }
                } else {
                    console.error("Login failed:", status, response)
                    throw new Error(response.message || "Login failed. Please try again.")
                }
                console.log("Session data:", response)
            } else if (status >= 400 && status <= 500) {
                // http 4xx, bad request
                console.error("Login failed:", status, response)
                throw new Error(response.message || "Bad request.")
            }
        } catch (error: unknown) {
            console.error("Login error:", error)
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("An unknown error occurred")
            }
        }
    }

    const isLoggedIn = computed(() => !!session.value)

    const logout = () => {
        if (!import.meta.client) {
            console.error("logout: not in client context")
            return null
        }
        session.value = null
        // backend sends cookie with httpOnly=false,
        // less secure but easier to manage
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
        localStorage.removeItem("session")
        navigateTo("/")
    }

    // Load session from localStorage
    // and set the token in the apiClient
    // this function is called by ~/plugins/auth.ts
    // on every app load
    const loadSession = () => {
        if (!import.meta.client) return null
        try {
            const raw = localStorage.getItem("session")
            if (raw) {
                const parsed = JSON.parse(raw)
                const result = UserSessionSchema.safeParse(parsed)
                if (result.success) {
                    session.value = result.data
                    return session.value
                } else {
                    console.error("Failed to parse session from localStorage:", result.error)
                }
            }
        } catch (err) {
            console.error("Failed to parse session from localStorage:", err)
        }
        return null
    }

    return {
        session,
        isLoggedIn,
        login,
        logout,
        loadSession,
    }
}
