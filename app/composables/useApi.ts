import type { NitroFetchOptions, NitroFetchRequest } from "nitropack"
import { fetch } from "~/lib/api/index"

export function _useApi<T>(url: string, options: NitroFetchOptions<NitroFetchRequest> = {}) {
    const data = ref<T | null>(null)

    const pending = ref(true)
    const error = ref<Error | null>(null)
    const status = ref<number | null>(null)

    const load = async () => {
        pending.value = true
        try {
            const d = await fetch<T>(url, {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    ...(options.body && !(options.body instanceof FormData)
                        ? { "Content-Type": "application/json" }
                        : {}),
                },
                credentials: "include",
            })
            data.value = d
        } catch (err: unknown) {
            if (err instanceof Error) {
                error.value = err
            } else {
                error.value = new Error("Unknown error occurred")
            }
            status.value = null
        } finally {
            pending.value = false
        }
    }

    load()

    return {
        data,
        status,
        error,
        pending,
        refresh: load,
    }
}

export function useGet<T, Q extends Record<string, unknown> = Record<string, unknown>>(url: string, query?: Q) {
    return _useApi<T>(url, {
        method: "GET",
        query,
    })
}

export function usePost<T, B extends Record<string, unknown> = Record<string, unknown>>(url: string, body?: B) {
    return _useApi<T>(url, {
        method: "POST",
        body,
    })
}

export function useDelete<T, Q extends Record<string, unknown> = Record<string, unknown>>(url: string, query?: Q) {
    return _useApi<T>(url, {
        method: "DELETE",
        query,
    })
}

export function usePatch<T, B extends Record<string, unknown> = Record<string, unknown>>(url: string, body?: B) {
    return _useApi<T>(url, {
        method: "PATCH",
        body,
    })
}
