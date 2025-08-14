import { ApiInfo } from "@/src/shared/interfaces"
import { requestThenResponse } from "@/src/shared/services/services"
import useBoundStore from "@/src/shared/store"
import { useEffect } from "react"
import ProgressColumn from "./ProgressColumn"


const ProgressInstructorContent = () => {
  const selectedUser = useBoundStore((state) => state.selectedUser)
  const setApiInfo = useBoundStore((state) => state.setApiInfo)
  const setProgressArrayInDict = useBoundStore((state) => state.setProgressArrayInDict)
  const progressArrayInDict = useBoundStore((state) => state.progressArrayInDict)
  const bookTitleArray = Object.keys(progressArrayInDict)
  bookTitleArray.sort()
  
  useEffect(() => {
    if (!selectedUser) { return }

    const apiInfo: ApiInfo = {
      additionalUrl: `/progress/student/${selectedUser.id}`,
      method: "GET"
    }

    // const logResponse = (what: any) => console.log({what})
    requestThenResponse(apiInfo, setApiInfo, setProgressArrayInDict)
  }, [selectedUser])

  return (
    <div>
      <div>Progress __Instructor __Content</div>
      {bookTitleArray.map((bookTitle) => <ProgressColumn key={bookTitle} progressArray={progressArrayInDict[bookTitle]} />)}
    </div>
  )
}

export default ProgressInstructorContent