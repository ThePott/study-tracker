import { ProgressData } from '@/src/_interfaces/_progressInterfaces';
import useBoundStore from '@/src/_store';
import MemoCard from '@/src/shared/ui/MemoCard';
import { colorStyle, fontStyle } from '@/src/shared/ui/styleConstants';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const comletedStyle = {
  "NOT_STARTED": colorStyle.bgGray,
  "IN_PROGRESS": `${colorStyle.bgYellow} ${colorStyle.fontViVidInvert}`,
  "COMPLETED": "border-black text-zinc-600",
}

const ProgressBox = memo(({ progress }: { progress: ProgressData }) => {
  const changeCompleted = useBoundStore((state) => state.changeCompleted)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: progress._id,
    data: {
      type: "KANBAN",
      kanban: progress
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (isDragging) return (
    <MemoCard className='border-2 border-amber-400 rounded-3xl' children={undefined} />
  )

  const containerBaseStyle = `p-3 rounded-xl ${fontStyle.fontAccent}`
  const containerCompletedStye = comletedStyle[progress.completed]
  const containerClassName = `${containerBaseStyle} ${containerCompletedStye}`

  const handleClick = () => {
    changeCompleted(progress)
  }

  return (

    <Box
      onClick={handleClick}
      ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MemoCard className={containerClassName}>
        <>
          <p>{progress.groupId}</p>
          <p>{progress.completed}</p>
        </>
      </MemoCard>
    </Box>

  )
})


export default ProgressBox