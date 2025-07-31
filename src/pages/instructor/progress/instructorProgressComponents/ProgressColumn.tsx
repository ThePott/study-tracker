import { InProgressStatus } from '@/src/_interfaces/progressInterfaces';
import useProgressStore from '@/src/_store/progressStore';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import ProgressBox from './ProgressBox';
import React, { memo } from 'react';
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const ProgressColumn = memo(({ inProgressStatus }: { inProgressStatus: InProgressStatus }) => {
  const progressArray = useProgressStore((state) => state.progressArray)

  const filteredProgressArray = progressArray.filter((progress) => progress.inProgressStatus === inProgressStatus)
  const idArray = filteredProgressArray.map((progress) => progress._id)

  const { isOver, setNodeRef } = useDroppable({
    id: inProgressStatus,
    data: {
      type: "COLUMN",
      columnType: inProgressStatus
    }
  })

  return (
    <Box className="flex flex-col gap-3 flex-1" ref={setNodeRef}>
      <p className="text-xl font-semibold">{inProgressStatus}</p>
      <SortableContext items={idArray} strategy={verticalListSortingStrategy}>
        {filteredProgressArray.map((progress) => <ProgressBox key={progress._id} progress={progress} />)}
      </SortableContext>
    </Box>
  )
})

export default ProgressColumn