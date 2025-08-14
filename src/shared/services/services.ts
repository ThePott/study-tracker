import { ApiInfo } from "../interfaces";
import axiosNeon from "./neon";

export const requestThenResponse = async (
    apiInfo: ApiInfo,
    setApiInfo: (apiInfo: ApiInfo | null) => void,
    storeFunction?: any,
) => {
    try {
        if (!apiInfo) { throw new Error("---- CANNOT REQUEST WITHOUT INFO") }
        switch (apiInfo.method) {
            case "GET":
                const responseGet = await axiosNeon.get(apiInfo.additionalUrl)
                const result = responseGet.data
                storeFunction(result)
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
        setApiInfo(null)
    } catch (error) {
        console.error({ error })
    }
}