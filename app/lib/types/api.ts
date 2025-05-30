export type ApiResponse<T> = {
    httpStatus: number
    code: string
    message: string
    data: T
}
