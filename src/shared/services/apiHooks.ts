import { useEffect } from "react"
import useBoundStore from "../store"

/** MUST CALL ONCE per branch */
export const useApi = () => {
    const apiInfo = useBoundStore((state) => state.apiInfo)
    const setApiInfo = useBoundStore((state) => state.setApiInfo)

    useEffect(() => {
        if (apiInfo === null) { 
            return 
        }

        const additionalUrl = apiInfo.additionalUrl

        // ---- 저장해야 하면 경로 나눠서 저장함수 넣기 ----
        // if (apiInfo.additionalUrl === "/") {
        //     /** get all films  */
        //     requestThenResponse(apiInfo, setRequestInfo, setFilmArray);

        // } else if (/^\/\d+\/film-post\/customer\/\d+$/.test(additionalUrl)) {
        //     /** get post related info  */
        //     requestThenResponse(apiInfo, setRequestInfo, storePostResponse)

        // // } else if (/^\/film-post\/\d+\/comment$/.test(additionalUrl)) {
        // //     /** post comment  */
        // //     requestThenResponse(apiInfo, setRequestInfo)

        // // } else if (/^\/film-post\/\d+\/like\/customer\/\d+$/.test(additionalUrl)) {
        // //     /** post like change */
        // } else {
        //     console.log({additionalUrl})
        //     requestThenResponse(apiInfo, setRequestInfo)
        //     // throw new Error("---- NOT HANDLED ADDITIONAL URL");
        // }

    }, [apiInfo])
}
