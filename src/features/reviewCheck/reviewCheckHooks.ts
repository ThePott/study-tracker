import { ApiInfo } from "@/src/shared/interfaces"
import { requestThenResponse } from "@/src/shared/services/services"
import useBoundStore from "@/src/shared/store"
import { useEffect } from "react"

const useGetReviewCheckAfterMount = () => {
    const setApiInfo = useBoundStore((state) => state.setApiInfo)

    const user = useBoundStore((state) => state.user)
    const selectedUser = useBoundStore((state) => state.selectedUser)
    const setReviewCheckArray = useBoundStore((state) => state.setReviewCheckArray)
    const setDoShowSkeleton = useBoundStore((state) => state.setDoShowSkeleton)
    const setIsResponseEmpty = useBoundStore((state) => state.setIsResponseEmpty)

    useEffect(() => {
        if (!user) {
            return
        }

        const apiInfo = {
            method: "GET",
            responseHandler: setReviewCheckArray,
            loadingSetter: setDoShowSkeleton,
            setIsResponseEmpty,
        } as ApiInfo

        if (user.role === "STUDENT") {
            apiInfo.additionalUrl = `/progress/student/${user.id}`
            requestThenResponse(apiInfo, setApiInfo)
            return
        }

        if (!selectedUser) {
            return
        }
        apiInfo.additionalUrl = `/progress/student/${selectedUser.id}`
        requestThenResponse(apiInfo, setApiInfo)
        return
    }, [user])
}

const useOtheHooks = () => {}

export const useReviewCheck = () => {
    useGetReviewCheckAfterMount()
    useOtheHooks()
}
