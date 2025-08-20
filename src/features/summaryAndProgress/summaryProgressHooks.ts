import { ApiInfo } from "@/src/shared/interfaces"
import { useAutoSave } from "@/src/shared/services/autosave"
import { requestThenResponse } from "@/src/shared/services/services"
import useBoundStore from "@/src/shared/store"
import { useEffect } from "react"

export const useGetProgressAfterMount = () => {
    const selectedUser = useBoundStore((state) => state.selectedUser)
    const setApiInfo = useBoundStore((state) => state.setApiInfo)
    const setProgressArrayInDict = useBoundStore((state) => state.setProgressArrayInDict)
    const progressArrayInDict = useBoundStore((state) => state.progressArrayInDict)
    const bookTitleArray = Object.keys(progressArrayInDict)
    const setDoShowSkeleton = useBoundStore((state) => state.setDoShowSkeleton)
    const setIsResponseEmpty = useBoundStore((state) => state.setIsResponseEmpty)
    const editedCompltedDict = useBoundStore((state) => state.editedCompletedDict)
    const mergeCompletedToInitial = useBoundStore((state) => state.mergeCompletedToInitial)
    bookTitleArray.sort()

    useEffect(() => {
        if (!selectedUser) { return }
        if (Object.values(progressArrayInDict).length !== 0) { return }

        const apiInfo: ApiInfo = {
            additionalUrl: `/progress/student/${selectedUser.id}`,
            method: "GET",
            responseHandler: setProgressArrayInDict,
            loadingSetter: setDoShowSkeleton,
            setIsResponseEmpty
        }
        console.log({ selectedUser })
        requestThenResponse(apiInfo, setApiInfo)
    }, [selectedUser])

    useAutoSave("completed", editedCompltedDict, mergeCompletedToInitial)
}