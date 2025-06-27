// Used to send HTTP requests.
// If the backend returns an HTTP status between 200–499, return normally — the status code carries semantic meaning.
// If the backend returns a 5xx error, throw an exception.
import type { NitroFetchOptions, NitroFetchRequest } from "nitropack"

export type Response<T> = {
    code: string
    message: string
    data: T
}

export type Fetch<T> = {
    status: number
    response: Response<T>
}

export const is2xx = (status: number) => status >= 200 && status <= 299
export const is3xx = (status: number) => status >= 300 && status <= 399
export const is4xx = (status: number) => status >= 400 && status <= 499
export const is5xx = (status: number) => status >= 500

export async function fetch<T>(url: string, options: NitroFetchOptions<NitroFetchRequest> = {}): Promise<Fetch<T>> {
    const response = await $fetch.raw<Response<T>>(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
        },
        credentials: "include",
        ignoreResponseError: true,
    })
    if (response.status >= 200 && response.status < 500 && response._data) {
        return { status: response.status, response: response._data }
    } else if (is5xx(response.status)) {
        // HTTP 5xx
        throw new Error(response._data?.message || "Server error, please try again later.")
    }
    throw new Error("Unknown error occurred")
}

export async function POST<B extends Record<string, unknown> | BodyInit | null = Record<string, unknown>, T = unknown>(
    url: string,
    body?: B
) {
    return await fetch<T>(url, {
        method: "POST",
        body,
    })
}

export async function GET<Q extends Record<string, string> = Record<string, string>, T = unknown>(
    url: string,
    query?: Q
) {
    return await fetch<T>(url, {
        method: "GET",
        query,
    })
}

export async function DELETE<Q extends Record<string, string> = Record<string, string>, T = unknown>(
    url: string,
    query?: Q
) {
    return await fetch<T>(url, {
        method: "DELETE",
        query,
    })
}
export async function PUT<B extends Record<string, unknown> | BodyInit | null = Record<string, unknown>, T = unknown>(
    url: string,
    body?: B
) {
    return await fetch<T>(url, {
        method: "PUT",
        body,
    })
}

export async function PATCH<B extends Record<string, unknown> | BodyInit | null = Record<string, unknown>, T = unknown>(
    url: string,
    body?: B
) {
    return await fetch<T>(url, {
        method: "PATCH",
        body,
    })
}
