const responseStatusArray = ["SUCCESS", "IS_LOADING", "ERROR"] as const
type ResponseStatus = typeof responseStatusArray[number]

interface ApiResponse {
    status: ResponseStatus
    message: string | null
    doOpenSnackbar: boolean
}

export { ResponseStatus, ApiResponse }