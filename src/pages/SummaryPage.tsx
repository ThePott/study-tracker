import { useGetProgressAfterMount } from "../features/summaryAndProgress/summaryProgressHooks"
import SummaryContent from "../features/summaryAndProgress/summary/SummaryContent"


const SummaryPage = () => {
  useGetProgressAfterMount()
  return (
    <SummaryContent />
  )
}

export default SummaryPage