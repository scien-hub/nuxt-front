import type { NitroFetchOptions, NitroFetchRequest } from "nitropack"
import { fetch, is2xx, is4xx } from "~/lib/api/index"

function _useApi<T>(url: string, options: NitroFetchOptions<NitroFetchRequest> = {}) {
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
                // 带上 cookie
                credentials: "include",
            })
            status.value = d.status

            // 根据 http 状态确定前端行为
            if (is2xx(d.status)) {
                data.value = d.response.data
            } else if (is4xx(d.status)) {
                if (d.status == 401) {
                    navigateTo("/login")
                } else if (d.status == 403) {
                    // throw forbidden error
                } else if (d.status == 404) {
                    // throw 404 error
                } else {
                    throw Error("Bad request.")
                }
            }
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

/**
 * Performs a GET request to the specified URL with optional query parameters.
 *
 * @template T - The expected response data type
 * @template Q - The query parameters object type (defaults to Record<string, unknown>)
 * @param url - The API endpoint URL
 * @param query - Optional query parameters to append to the request
 * @returns An object containing reactive data, status, error, pending state, and refresh function
 *
 * @example
 * ```typescript
 * const { data, pending, error } = useGet<User>('/api/users/123')
 * const { data } = useGet<User[]>('/api/users', { page: 1, limit: 10 })
 * ```
 */
export function useGet<T, Q extends Record<string, unknown> = Record<string, unknown>>(url: string, query?: Q) {
    return _useApi<T>(url, {
        method: "GET",
        query,
    })
}

/**
 * Performs a POST request to the specified URL with optional request body.
 *
 * @template T - The expected response data type
 * @template B - The request body object type (defaults to Record<string, unknown>)
 * @param url - The API endpoint URL
 * @param body - Optional request body data to send
 * @returns An object containing reactive data, status, error, pending state, and refresh function
 *
 * @example
 * ```typescript
 * const { data, pending, error } = usePost<User>('/api/users', { name: 'John', email: 'john@example.com' })
 * ```
 */
export function usePost<T, B extends Record<string, unknown> = Record<string, unknown>>(url: string, body?: B) {
    return _useApi<T>(url, {
        method: "POST",
        body,
    })
}

/**
 * Performs a DELETE request to the specified URL with optional query parameters.
 *
 * @template T - The expected response data type
 * @template Q - The query parameters object type (defaults to Record<string, unknown>)
 * @param url - The API endpoint URL
 * @param query - Optional query parameters to append to the request
 * @returns An object containing reactive data, status, error, pending state, and refresh function
 *
 * @example
 * ```typescript
 * const { data, pending, error } = useDelete<{ success: boolean }>('/api/users/123')
 * const { data } = useDelete('/api/cache', { type: 'all' })
 * ```
 */
export function useDelete<T, Q extends Record<string, unknown> = Record<string, unknown>>(url: string, query?: Q) {
    return _useApi<T>(url, {
        method: "DELETE",
        query,
    })
}

/**
 * Performs a PATCH request to the specified URL with optional request body.
 *
 * @template T - The expected response data type
 * @template B - The request body object type (defaults to Record<string, unknown>)
 * @param url - The API endpoint URL
 * @param body - Optional request body data to send (typically partial updates)
 * @returns An object containing reactive data, status, error, pending state, and refresh function
 *
 * @example
 * ```typescript
 * const { data, pending, error } = usePatch<User>('/api/users/123', { name: 'John Updated' })
 * ```
 */
export function usePatch<T, B extends Record<string, unknown> = Record<string, unknown>>(url: string, body?: B) {
    return _useApi<T>(url, {
        method: "PATCH",
        body,
    })
}
