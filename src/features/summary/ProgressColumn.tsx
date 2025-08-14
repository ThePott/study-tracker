import { CompletedStatus, InProgressStatus } from '@/src/shared/interfaces/_progressInterfaces';
import useBoundStore from '@/src/shared/store';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { memo } from 'react';
import ProgressBox from './ProgressBox';
import { styleClassName } from '@/src/shared/constants/style';
// import { colorStyle, miniStyle } from '@/src/shared/ui/styleConstants';
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const makeColumnName = (inProgressStatus: InProgressStatus): string => {
  switch (inProgressStatus) {
    case 'PREV_HOMEWROK': return "전 숙제"
    case 'TODAY_WORK': return "할당"
    case 'NEXT_HOMEWORK': return "새 숙제"
    default:
      console.error("---- shouldn't fall back here")
      throw new Error("---- No match of in progress status")
  }
}

const ProgressColumn = memo(({ inProgressStatus }: { inProgressStatus: InProgressStatus }) => {
  const progressArray = useBoundStore((state) => state.progressArray)

  const filteredProgressArray = progressArray.filter((progress) => progress.inProgressStatus === inProgressStatus && progress.completed === "IN_PROGRESS")
  const idArray = filteredProgressArray.map((progress) => progress._id)

  const { setNodeRef, isOver } = useDroppable({
    id: inProgressStatus,
    data: {
      type: "COLUMN",
      columnType: inProgressStatus
    }
  })

  return (
    <Box className={`h-full flex flex-col gap-3 flex-1 items-center pt-3`} ref={setNodeRef}>
      <p className={`text-xl font-semibold ${styleClassName.bgYellow} ${styleClassName.fontVividInverted} w-full text-center p-3 ${styleClassName.rounded}`}>{makeColumnName(inProgressStatus)}</p>
      <SortableContext items={idArray} strategy={verticalListSortingStrategy}>
        {filteredProgressArray.map((progress, index) => <ProgressBox key={`${progress._id}`} progress={progress} />)}
      </SortableContext>
    </Box>
  )
})

export default ProgressColumn