import { useEffect } from 'react'
import ProgressSkeleton from '../features/layouts/ProgressSkeleton'
import ProgressContent from '../features/progress/ProgressContent'
import { ApiInfo } from '../shared/interfaces'
import { requestThenResponse } from '../shared/services/services'
import useBoundStore from '../shared/store'

const ProgressPage = () => {
  const doShowSkeleton = useBoundStore((state) => state.doShowSkeleton)
  console.log({ doShowSkeleton })

  const selectedUser = useBoundStore((state) => state.selectedUser)
  const setApiInfo = useBoundStore((state) => state.setApiInfo)
  const setProgressArrayInDict = useBoundStore((state) => state.setProgressArrayInDict)
  const progressArrayInDict = useBoundStore((state) => state.progressArrayInDict)
  const bookTitleArray = Object.keys(progressArrayInDict)
  const setDoShowSkeleton = useBoundStore((state) => state.setDoShowSkeleton)
  const isRespomseEmpty = useBoundStore((state) => state.isResponseEmpty)
  const setIsResponseEmpty = useBoundStore((state) => state.setIsResponseEmpty)
  bookTitleArray.sort()

  useEffect(() => {
    if (!selectedUser) { return }

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

  console.log("---- progress page re-render") 
  const skeletonCondition = doShowSkeleton || (Object.entries(progressArrayInDict).length === 0 && !isRespomseEmpty)
  if (skeletonCondition) { return <ProgressSkeleton /> }
  return <ProgressContent />
}

export default ProgressPage