import { useProgressGet } from "@/src/_hooks/progressHooks"
import useInstructorStore from "@/src/_store/instructorStore"
import useProgressStore from "@/src/_store/progressStore"
import ProgressBox from "./instructorProgressComponents/ProgressBox"
import { inProgressStatusArray } from "@/src/_interfaces/progressInterfaces"
import ProgressColumn from "./instructorProgressComponents/ProgressColumn"
import { Box } from "@mui/material"

const InstructorProgressPage = () => {
  const student = useInstructorStore((state) => state.selectedStudent)
  // const progressArray = useProgressStore((state) => state.progressArray)

  useProgressGet(student?.studentId)

  return (
    <Box className="flex gap-3">
      {inProgressStatusArray.map((inProgressStatus) => <ProgressColumn inProgressStatus={inProgressStatus} />)}
    </Box>
  )
}

export default InstructorProgressPage