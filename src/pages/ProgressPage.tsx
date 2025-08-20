import ProgressSkeleton from '../features/layouts/ProgressSkeleton'
import { useGetProgressAfterMount } from '../features/summaryAndProgress/summaryProgressHooks'
import ProgressContent from '../features/summaryAndProgress/progress/ProgressContent'
import useBoundStore from '../shared/store'

const ProgressPage = () => {
  const doShowSkeleton = useBoundStore((state) => state.doShowSkeleton)
  const progressArrayInDict = useBoundStore((state) => state.progressArrayInDict)
  const isResponseEmpty = useBoundStore((state) => state.isResponseEmpty)

  useGetProgressAfterMount()

  const skeletonCondition = doShowSkeleton || (Object.entries(progressArrayInDict).length === 0 && !isResponseEmpty)
  if (skeletonCondition) { return <ProgressSkeleton /> }
  return <ProgressContent />
}

export default ProgressPage