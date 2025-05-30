import type { UserSession } from "~/lib/schemas"
import { UserSessionSchema } from "~/lib/schemas"
import type { ApiResponse } from "~/lib/types/api"

export const useAuth = () => {
    const session = useState<UserSession | null>("session", () => null)
    const login = async (email: string, password: string) => {
        try {
            const { data, status, error } = await useFetch<ApiResponse<UserSession>>("/api/user/auth/login", {
                method: "POST",
                credentials: "include",
                ignoreResponseError: true,
                body: {
                    email,
                    password,
                },
                headers: {
                    "Content-Type": "application/json",
                },
                onResponse({ response }) {
                    if (response.status >= 500) {
                        console.log(`Login request failed with http status ${response.status}`, response)
                    }
                },
            })

            if (status.value === "success" && data.value) {
                if (data.value.code === "OK") {
                    const result = UserSessionSchema.safeParse(data.value.data)
                    if (result.success) {
                        session.value = result.data
                        console.log("Parsed session data:", result.data)
                        console.log(`Set localStorage["session"] to ${JSON.stringify(result.data)}.`)
                        if (import.meta.client) {
                            localStorage.setItem("session", JSON.stringify(result.data))
                        }
                    } else {
                        console.error(
                            "Login request success, but the response.data is corrupted",
                            result
                        )
                        throw new Error("Invalid session data")
                    }
                } else {
                    console.error("Login failed:", data.value.message)
                    throw new Error(data.value.message)
                }
                console.log("Session data:", data.value)
            } else {
                console.error("Login failed with error", error.value)
                throw new Error("Login failed because of a server error.")
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Login error:", error)
                throw new Error(error.message)
            } else {
                console.error("Login error:", error)
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
