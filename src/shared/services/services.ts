import { ApiInfo } from "../interfaces"
import axiosNeon from "./neon"

export const requestThenResponse = async (
    apiInfo: ApiInfo,
    setApiInfo: (apiInfo: ApiInfo | null) => void
) => {
    try {
        if (!apiInfo) {
            throw new Error("---- CANNOT REQUEST WITHOUT INFO")
        }
        apiInfo.loadingSetter?.(true)
        apiInfo?.setIsResponseEmpty(false)

        let result: any = null
        switch (apiInfo.method) {
            case "GET":
                const responseGet = await axiosNeon.get(apiInfo.additionalUrl)
                result = responseGet.data
                break
            case "POST":
                const responsePost = await axiosNeon.post(
                    apiInfo.additionalUrl,
                    apiInfo.body
                )
                result = responsePost.data
                break
            case "PATCH":
                const responsePut = await axiosNeon.put(
                    apiInfo.additionalUrl,
                    apiInfo.body
                )
                result = responsePut.data
                break
            case "DELETE":
                const responseDelete = await axiosNeon.delete(
                    apiInfo.additionalUrl
                )
                result = responseDelete.data
                break
            default:
                throw new Error("---- UN-HANDLED METHOD!")
        }

        apiInfo.responseHandler?.(result)
        if (Object.entries(result).length === 0) {
            apiInfo?.setIsResponseEmpty(true)
        }
    } catch (error) {
        console.error({ error })
    } finally {
        setApiInfo(null)
        apiInfo.loadingSetter?.(false)
    }
}
