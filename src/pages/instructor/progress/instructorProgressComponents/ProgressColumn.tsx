import { InProgressStatus } from '@/src/_interfaces/progressInterfaces'
import useProgressStore from '@/src/_store/progressStore'
import { Box } from '@mui/material'
import ProgressBox from './ProgressBox'

const ProgressColumn = ({inProgressStatus}: {inProgressStatus: InProgressStatus}) => {
  const progressArray = useProgressStore((state) => state.progressArray)
  const filteredProgressArray = progressArray.filter((progress) => progress.inProgressStatus === inProgressStatus)
  console.log("---- progress array:", progressArray)
  return (
    <Box className="flex flex-col gap-3 flex-1">
      <p className="text-xl font-semibold">{inProgressStatus}</p>
      {filteredProgressArray.map((progress, index) => <ProgressBox key={index} progress={progress} />)}
    </Box>
  )
}

export default ProgressColumn