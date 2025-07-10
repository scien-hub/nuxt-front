// the API client for making requests to the backend
import type { NitroFetchOptions, NitroFetchRequest } from "nitropack"
import { FetchError } from "ofetch"

export type ResponseData<T> = {
    data: T
    message: string
    code: string
}
export type ApiResponse<T> = {
    status: number
    data: ResponseData<T>
}

export const $wrapped = async <
    // T is the type of the response data
    DefaultT = unknown,
    // R is the type of the request
    DefaultR extends NitroFetchRequest = NitroFetchRequest,
    T = DefaultT,
    R extends NitroFetchRequest = DefaultR,
    O extends NitroFetchOptions<R> = NitroFetchOptions<R>,
>(
    url: R,
    options?: O
) => $fetch.raw<T>(url, options)

export class ApiClient {
    private token: string | null
    private baseURL: string

    constructor(baseURL: string = "/api") {
        this.baseURL = baseURL
        this.token = null
    }

    setToken(token: string | null) {
        this.token = token
    }

    async fetch<T>(url: string, options?: NitroFetchOptions<NitroFetchRequest>): Promise<ApiResponse<T>> {
        const headers = {
            ...(this.token && {
                Authorization: `Bearer ${this.token}`,
            }),
            "Content-Type": "application/json",
            ...options?.headers,
        }
        try {
            const response = await $wrapped<ResponseData<T>>(`${this.baseURL}/${url}`, {
                ...options,
                ignoreResponseError: true,
                headers,
            })
            return {
                status: response.status,
                data: response._data as ResponseData<T>,
            }
        } catch (error) {
            if (error instanceof FetchError) {
                console.error("Fetch error:", error)
                throw new Error(`Failed to fetch: ${error.message}`)
            } else {
                console.error("Unexpected error:", error)
                throw new Error("An unexpected error occurred")
            }
        }
    }

    // 除了 get 以外的请求都需要传入 body
    async get<T>(url: string, data?: object) {
        return this.fetch<T>(url, {
            query: data,
            method: "GET",
        })
    }

    async post<T>(url: string, data?: object) {
        return this.fetch<T>(url, {
            body: data,
            method: "POST",
        })
    }

    async put<T>(url: string, data?: object) {
        return this.fetch<T>(url, {
            body: data,
            method: "PUT",
        })
    }

    async delete<T>(url: string, data?: object) {
        return this.fetch<T>(url, {
            body: data,
            method: "DELETE",
        })
    }

    async patch<T>(url: string, data?: object) {
        return this.fetch<T>(url, {
            body: data,
            method: "PATCH",
        })
    }
}
