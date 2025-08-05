import useBoundStore from "@/src/_store"
import { Box } from "@mui/material"
import RealProgressColumn from "@/src/features/progress/RealProgressColumn"

const RealInstructorProgressPage = () => {
  const progressArray = useBoundStore((state) => state.progressArray)

  const groupedProgressArray = Object.groupBy(progressArray, (progress) => progress.bookId)

  const entryArray = Object.entries(groupedProgressArray)
  const bookIdArray = Object.keys(groupedProgressArray)

  return (
    <Box className="flex gap-6">
      {bookIdArray.map((bookId) => <RealProgressColumn key={bookId} bookId={bookId} />)}
    </Box>
  )
}

export default RealInstructorProgressPage