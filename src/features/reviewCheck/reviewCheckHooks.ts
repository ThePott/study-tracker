import { ApiInfo } from "@/src/shared/interfaces"
import { requestThenResponse } from "@/src/shared/services/services"
import useBoundStore from "@/src/shared/store"
import { useEffect } from "react"

const useGetReviewCheckAfterMount = () => {
    const setApiInfo = useBoundStore((state) => state.setApiInfo)

    const user = useBoundStore((state) => state.user)
    const selectedUser = useBoundStore((state) => state.selectedUser)
    const setReviewCheckGroupedByBook = useBoundStore((state) => state.setReviewCheckGroupedByBook)
    const setDoShowSkeleton = useBoundStore((state) => state.setDoShowSkeleton)
    const setIsResponseEmpty = useBoundStore((state) => state.setIsResponseEmpty)

    useEffect(() => {
        if (!user) {
            return
        }

        const apiInfo = {
            method: "GET",
            responseHandler: setReviewCheckGroupedByBook,
            loadingSetter: setDoShowSkeleton,
            setIsResponseEmpty,
        } as ApiInfo

        if (user.role === "STUDENT") {
            apiInfo.additionalUrl = `/review-check/student/${user.id}`
            requestThenResponse(apiInfo, setApiInfo)
            return
        }

        if (!selectedUser) {
            return
        }
        apiInfo.additionalUrl = `/review-check/student/${selectedUser.id}`
        requestThenResponse(apiInfo, setApiInfo)
        return
    }, [user])
}

const useOtheHooks = () => {}

export const useReviewCheck = () => {
    useGetReviewCheckAfterMount()
    useOtheHooks()
}
