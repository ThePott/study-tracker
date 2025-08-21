import SummarySkeleton from "../features/skeletons/SummarySkeleton"
import SummaryContent from "../features/summaryAndProgress/summary/SummaryContent"
import { useGetProgressAfterMount } from "../features/summaryAndProgress/summaryProgressHooks"
import { useAutoSave } from "../shared/services/autosave"
import useBoundStore from "../shared/store"


const SummaryPage = () => {
  const editedStatusDict = useBoundStore((state) => state.editedStatusDict)
  const mergeStatusToInitial = useBoundStore((state) => state.mergeStatusToInitial)
  const isResponseEmpty = useBoundStore((state) => state.isResponseEmpty)
  const doShowSkeleton = useBoundStore((state) => state.doShowSkeleton)
  const progressArrayInDict = useBoundStore((state)=>state.progressArrayInDict)

  useGetProgressAfterMount()
  useAutoSave("in_progress_status", editedStatusDict, mergeStatusToInitial)

  const skeletonCondition = doShowSkeleton || (Object.entries(progressArrayInDict).length === 0 && !isResponseEmpty)
  if (skeletonCondition) { return <SummarySkeleton /> }
  return (
    <SummaryContent />
  )
}

export default SummaryPage