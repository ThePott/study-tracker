import { useGetProgressAfterMount } from "../features/summaryAndProgress/summaryProgressHooks"
import SummaryContent from "../features/summaryAndProgress/summary/SummaryContent"
import useBoundStore from "../shared/store"
import { useAutoSave } from "../shared/services/autosave"


const SummaryPage = () => {
  const editedStatusDict = useBoundStore((state) => state.editedStatusDict)
  const mergeStatusToInitial = useBoundStore((state)=> state.mergeStatusToInitial)
  useGetProgressAfterMount()
  useAutoSave("in_progress_status", editedStatusDict, mergeStatusToInitial)
  
  return (
    <>
      <button onClick={() => console.log({ editedStatusDict }) }>눌러서 에디티트 스테이터스 확인</button>
      <SummaryContent />
    </>
  )
}

export default SummaryPage