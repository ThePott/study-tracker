import { Student } from '@/src/_interfaces/InstructorInterfaces';
import useInstructorStore from '@/src/_store/instructorStore';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';

const InstructorSidebar = () => {
  const navigate = useNavigate()

  const studentArray: Student[] = useLoaderData()

  const setStudentArray = useInstructorStore((state) => state.setStudentArray)
  const selectedStudent = useInstructorStore((state) => state.selectedStudent)
  const setSelectedStudent = useInstructorStore((state) => state.setSelectedStudent)

  useEffect(() => {
    if (studentArray && studentArray.length !== 0) {
      setStudentArray(studentArray)
      setSelectedStudent(studentArray[0])
    }
  }, [studentArray])

  const handleStudentChange = (_event: React.SyntheticEvent, value: Student): void => {
    setSelectedStudent(value)
  }

  return (
    <Box sx={{ scrollbarColor: "oklch( 0.4 0 0 ) transparent" }} className="w-[132px] overflow-y-scroll overflow-x-hidden p-0">
      <Tabs orientation='vertical' value={selectedStudent ?? studentArray[0]} onChange={handleStudentChange}>
        {studentArray.map((student, index) => <Tab sx={{ fontWeight: 600 }} key={index} value={student} label={student.name} />)}
      </Tabs>
    </Box>
  )
}



export default InstructorSidebar