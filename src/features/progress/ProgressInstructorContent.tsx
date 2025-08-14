import { ApiInfo } from "@/src/shared/interfaces"
import { requestThenResponse } from "@/src/shared/services/services"
import useBoundStore from "@/src/shared/store"
import { useEffect } from "react"

const ProgressInstructorContent = () => {
  const selectedUser = useBoundStore((state) => state.selectedUser)
  const setApiInfo = useBoundStore((state) => state.setApiInfo)

  useEffect(() => {
    if (!selectedUser) { return }

    const apiInfo: ApiInfo = {
      additionalUrl: `/progress/student/${selectedUser.id}`,
      method: "GET"
    }

    const logResponse = (what: any) => console.log({what})
    requestThenResponse(apiInfo, setApiInfo, logResponse)
  }, [selectedUser])
  return (
    <div>Progress __Instructor __Content</div>
  )
}

export default ProgressInstructorContent