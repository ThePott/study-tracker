import { InProgressStatus } from '@/src/_interfaces/progressInterfaces'
import useProgressStore from '@/src/_store/progressStore'
import { Box } from '@mui/material'
import ProgressBox from './ProgressBox'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const ProgressColumn = ({ inProgressStatus }: { inProgressStatus: InProgressStatus }) => {
  const progressArray = useProgressStore((state) => state.progressArray)
  const filteredProgressArray = progressArray.filter((progress) => progress.inProgressStatus === inProgressStatus)
  const idArray = filteredProgressArray.map((progress) => progress._id)

  return (
    <Box className="flex flex-col gap-3 flex-1">
      <p className="text-xl font-semibold">{inProgressStatus}</p>
      <SortableContext items={idArray} strategy={verticalListSortingStrategy}>
        {filteredProgressArray.map((progress, index) => <ProgressBox key={index} progress={progress} />)}
      </SortableContext>
    </Box>
  )
}

export default ProgressColumn