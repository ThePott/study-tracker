import { ApiInfo } from "@/src/shared/interfaces"
import { requestThenResponse } from "@/src/shared/services/services"
import useBoundStore from "@/src/shared/store"
import { memo, useEffect } from "react"
import ProgressColumn from "./ProgressColumn"


const ProgressContent = memo(() => {
  const selectedUser = useBoundStore((state) => state.selectedUser)
  const setApiInfo = useBoundStore((state) => state.setApiInfo)
  const setProgressArrayInDict = useBoundStore((state) => state.setProgressArrayInDict)
  const progressArrayInDict = useBoundStore((state) => state.progressArrayInDict)
  const bookTitleArray = Object.keys(progressArrayInDict)
  const setDoShowSkeleton = useBoundStore((state) => state.setDoShowSkeleton)
  bookTitleArray.sort()
  
  useEffect(() => {
    if (!selectedUser) { return }

    const apiInfo: ApiInfo = {
      additionalUrl: `/progress/student/${selectedUser.id}`,
      method: "GET",
      responseHandler: setProgressArrayInDict,
      loadingSetter: setDoShowSkeleton,
    }
    console.log({selectedUser})
    requestThenResponse(apiInfo, setApiInfo)
  }, [selectedUser])

  return (
    <div>
      <div>Progress __Instructor __Content</div>
      {bookTitleArray.map((bookTitle) => <ProgressColumn key={bookTitle} bookTitle={bookTitle} progressArray={progressArrayInDict[bookTitle]} />)}
    </div>
  )
})

export default ProgressContent