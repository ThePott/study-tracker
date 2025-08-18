import { ApiInfo } from "../interfaces";
import axiosNeon from "./neon";

export const requestThenResponse = async (
    apiInfo: ApiInfo,
    setApiInfo: (apiInfo: ApiInfo | null) => void,
) => {
    try {
        if (!apiInfo) { throw new Error("---- CANNOT REQUEST WITHOUT INFO") }
        // if (apiInfo.loadingSetter) {apiInfo.loadingSetter(true)}
        apiInfo.loadingSetter?.(true)

        let result: any = null
        switch (apiInfo.method) {
            case "GET":
                const responseGet = await axiosNeon.get(apiInfo.additionalUrl)
                result = responseGet.data

                // storeFunction(result)
                break
            case "POST":
                const responsePost = await axiosNeon.post(apiInfo.additionalUrl, apiInfo.body)
                break
            case "PATCH":
                const responsePut = await axiosNeon.put(apiInfo.additionalUrl, apiInfo.body)
                break
            case "DELETE":
                const responseDelete = await axiosNeon.delete(apiInfo.additionalUrl)
                break
            default:
                throw new Error("---- UN-HANDLED METHOD!")
        }

        apiInfo.responseHandler?.(result)
    } catch (error) {
        console.error({ error })
    } finally {
        setApiInfo(null)
        // apiInfo.loadingSetter?.(false)
    }
}