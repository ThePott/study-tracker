import { ProgressData } from '@/src/_interfaces/progressInterfaces';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography } from '@mui/material';

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


export default ProgressBox