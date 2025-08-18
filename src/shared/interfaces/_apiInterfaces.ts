const responseStatusArray = ["SUCCESS", "IS_LOADING", "ERROR"] as const
export type ResponseStatus = typeof responseStatusArray[number]

export interface ApiResponse {
    status: ResponseStatus
    message: string | null
    doOpenSnackbar: boolean
}

type ApiMethod = "GET" | "POST" | "PATCH" | "DELETE"

export interface ApiInfo {
    additionalUrl: string
    method: ApiMethod
    body?: any
    responseHandler?: (...args: any[]) => any
    loadingSetter?: (...args: any[]) => any
}

export interface ApiSlice {
    apiInfo: ApiInfo | null
    setApiInfo: (apiInfo: ApiInfo | null) => void
}