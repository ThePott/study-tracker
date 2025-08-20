import { scrollbarStyle } from "@/src/shared/constants/style"
import SummaryColumn from "./SummaryColumn"
import { inProgressStatusArray } from "@/src/shared/interfaces"
import DndProvider from "./DndProvider"

const SummaryContent = () => {
  return (
    <DndProvider>
      <div style={scrollbarStyle} className={`flex gap-3 justify-center h-full overflow-x-hidden overflow-y-scroll`}>
        {inProgressStatusArray.map((inProgressStatus) => <SummaryColumn key={inProgressStatus} inProgressStatus={inProgressStatus} />)}
      </div>
    </DndProvider>
  )
}

export default SummaryContent