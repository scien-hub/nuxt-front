import type { NitroFetchOptions, NitroFetchRequest } from "nitropack"
import type { ApiResponse } from "~/lib/types/api"

export async function fetch<T>(url: string, options: NitroFetchOptions<NitroFetchRequest> = {}) {
    const response = await $fetch.raw<ApiResponse<T>>(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
        },
        credentials: "include",
    })

    if (response.status >= 200 && response.status < 300) {
        // HTTP 2xx
        if (response._data && response._data.code === "OK") {
            return response._data.data
        } else {
            console.error("Unexpected response format:", response._data)
            throw new Error("Unexpected response format.")
        }
    } else if (response.status >= 400 && response.status < 500) {
        // HTTP 4xx
        if (response._data && response._data.message) {
            throw new Error(response._data.message)
        } else {
            console.error("Client error:", response._data)
            throw new Error("Server error, please try again later.")
        }
    } else if (response.status >= 500) {
        // HTTP 5xx
        throw new Error("Server error, please try again later.")
    }
    throw new Error("Unknown error occurred")
}


export async function POST<
    B extends Record<string, unknown> | BodyInit | null = Record<string, unknown>,
    T = unknown
>(url: string, body?: B): Promise<T> {
    return await $fetch<T>(url, {
        method: "POST",
        body,
    })
}

export async function GET<
    Q extends Record<string, string> = Record<string, string>,
    T = unknown,
>(url: string, query?: Q) {
    return await fetch<T>(url, {
        method: "GET",
        query,
    })
}

export async function DELETE<
    Q extends Record<string, string> = Record<string, string>,
    T = unknown,
>(url: string, query?: Q) {
    return await fetch<T>(url, {
        method: "DELETE",
        query,
    })
}
export async function PUT<
    B extends Record<string, unknown> | BodyInit | null = Record<string, unknown>,
    T = unknown
>(url: string, body?: B) {
    return await fetch<T>(url, {
        method: "PUT",
        body,
    })
}

export async function PATCH<
    B extends Record<string, unknown> | BodyInit | null = Record<string, unknown>,
    T = unknown
>(url: string, body?: B) {
    return await fetch<T>(url, {
        method: "PATCH",
        body,
    })
}