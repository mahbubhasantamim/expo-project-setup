export interface IResponse<T> {
    // code: number
    message: string
    data: T
}

export interface IErrorResponse {
    errorCode: string
    message: string
}
