import MemoCard from '@/src/shared/components/MemoCard';
import { styleClassName } from '@/src/shared/constants/style';
import { Progress } from '@/src/shared/interfaces/_progressInterfaces';
import useBoundStore from '@/src/shared/store';
import { useSortable } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { memo } from 'react';
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const comletedStyle = {
  "NOT_STARTED": styleClassName.bgGray,
  "IN_PROGRESS": `${styleClassName.bgYellow} ${styleClassName.fontVividInverted}`,
  "COMPLETED": "border-black text-zinc-600",
}

const ProgressBox = memo(({ progress }: { progress: Progress }) => {
  const changeCompleted = useBoundStore((state) => state.changeCompleted)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: progress._id,
    data: {
      type: "KANBAN",
      kanban: progress
    }
  })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 1000 : 1,
  }

  const containerBaseStyle = `p-3 ${styleClassName.fontAccent}`
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