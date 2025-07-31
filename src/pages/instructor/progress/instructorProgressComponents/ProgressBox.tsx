import { ProgressData } from '@/src/_interfaces/progressInterfaces';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

const ProgressBox = ({ progress }: { progress: ProgressData }) => {
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


  // const prevStatus = useRef<InProgressStatus>(progress.inProgressStatus)
  // const updateOneEditedProgressArray = useProgressStore((state) => state.updateOneEditedProgressArray)
  // const editedProgressArray = useProgressStore((state) => state.editedProgressArray)

  useEffect(
    () => {
      // -----!!!!!----- 삭제 금지 !!!!! ----- if (progress.completed !== "IN_PROGRESS") { return } // <----- 나중에는 이것도 켜야 함!!!!
      // if (prevStatus.current === progress.inProgressStatus) { return }
      // console.log("---- status changed from:", prevStatus, "---- to:", progress.inProgressStatus)
      // updateOneEditedProgressArray(prevStatus.current, progress)

      // prevStatus.current = progress.inProgressStatus
      // console.log("---- edited array length:", editedProgressArray.length)


    },
    [progress.inProgressStatus]
  )


  if (isDragging) return (
    <div
      ref={setNodeRef} style={style}
      className="border-2 border-amber-400 rounded-3xl  h-[80px]">
      <Typography></Typography>
      <Typography></Typography>
    </div>
  )

  return (
    <Box className="p-3 bg-zinc-800"
      ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Typography>{progress.groupId}</Typography>
      <Typography>{progress.completed}</Typography>
    </Box>
  )
}


// export default React.memo(
//   ProgressBox,
//   (prevProps, nextProps) => { return prevProps.progress._id === nextProps.progress._id; }
// )

export default ProgressBox