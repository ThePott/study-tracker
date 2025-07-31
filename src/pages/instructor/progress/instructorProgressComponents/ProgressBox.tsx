import { ProgressData } from '@/src/_interfaces/progressInterfaces';
import useProgressStore from '@/src/_store/progressStore';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const comletedStyle = {
  "NOT_STARTED": "border-zinc-400",
  "IN_PROGRESS": "border-blue-400",
  "COMPLETED": "border-black",
}

const ProgressBox = memo(({ progress }: { progress: ProgressData }) => {
  const changeCompleted = useProgressStore((state) => state.changeCompleted)

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
    <div
      ref={setNodeRef} style={style}
      className="border-2 border-amber-400 rounded-3xl  h-[80px]">
      <Typography></Typography>
      <Typography></Typography>
    </div>
  )

  const containerBaseStyle = "p-3 bg-zinc-800 border-1"
  const containerCompletedStye = comletedStyle[progress.completed]
  const containerStyle = `${containerBaseStyle} ${containerCompletedStye}`

  const handleClick = () => {
    changeCompleted(progress)
  }

  // console.log("---- re-rendered:", progress.groupId)
  return (
    <Box className={containerStyle}
      onClick={handleClick}
      ref={setNodeRef} style={style} {...attributes} {...listeners}
      >
      <Typography>{progress.groupId}</Typography>
      <Typography>{progress.completed}</Typography>
    </Box>
  )
})


export default ProgressBox