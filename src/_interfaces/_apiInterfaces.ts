const responseStatusArray = ["SUCCESS", "IS_LOADING", "ERROR"] as const
export type ResponseStatus = typeof responseStatusArray[number]

export interface ApiResponse {
    status: ResponseStatus
    message: string | null
    doOpenSnackbar: boolean
}