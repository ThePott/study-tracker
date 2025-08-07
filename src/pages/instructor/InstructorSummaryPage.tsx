import DndProvider from "@/src/features/summary/DndProvider"
import ProgressColumn from "@/src/features/summary/ProgressColumn"
import { inProgressStatusArray } from "@/src/shared/interfaces/_progressInterfaces"
import { miniStyle } from "@/src/shared/ui/styleConstants"
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const InstructorProgressPage = () => {

  return (
    <DndProvider>
      <div className={`flex-1 grid ${miniStyle.memoGridCols} gap-3`}>
        {inProgressStatusArray.map((inProgressStatus) => <ProgressColumn key={inProgressStatus} inProgressStatus={inProgressStatus} />)}
      </div>
    </DndProvider>
  )
}

export default InstructorProgressPage