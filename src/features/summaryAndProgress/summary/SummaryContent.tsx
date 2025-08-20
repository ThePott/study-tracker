import { scrollbarStyle } from "@/src/shared/constants/style"
import SummaryColumn from "./SummaryColumn"
import { inProgressStatusArray } from "@/src/shared/interfaces"
import DndProvider from "./DndProvider"

const SummaryContent = () => {
  return (
    <DndProvider>
      <div style={scrollbarStyle} className={`flex w-full h-full overflow-x-auto overflow-y-scroll`}>
        <div className="grow" />
        <div className="flex gap-3 h-full">
          {inProgressStatusArray.map((inProgressStatus) => <SummaryColumn key={inProgressStatus} inProgressStatus={inProgressStatus} />)}
        </div>
        <div className="grow" />
      </div>
    </DndProvider>
  )
}

export default SummaryContent