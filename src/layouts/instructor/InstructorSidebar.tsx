import { Student } from '@/interfaces/InstructorInterfaces';
import useInstructorStore from '@/store/instructorStore';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const longArray = [...Array(30).keys()]

const dummyStudentArray = longArray.reduce(
  (acc, _cur, index) => {
    const student: Student = {
      studentId: index.toString(),
      name: `더미학생${index}`
    }
    return [...acc, student]
  },
  []
)

const InstructorSidebar = () => {
  const selectedStudent = useInstructorStore((state) => state.selectedStudent)
  const setSelectedStudent = useInstructorStore((state) => state.setSelectedStudent)

  const handleStudentChange = (_event: React.SyntheticEvent, value: Student): void => {
    setSelectedStudent(value)
  }

  return (
    <Box>
      {/* <Button className='w-full fixed'>학생 관리</Button> */}
      <Tabs variant="fullWidth" >
        <Tab value="manage" label="학생 관리" />
      </Tabs>

      <Box sx={{ scrollbarColor: "oklch( 0.4 0 0 ) transparent" }} className="h-full overflow-y-scroll w-[132px] relative">
        <Tabs orientation='vertical' value={selectedStudent} onChange={handleStudentChange}>
          {dummyStudentArray.map((student, index) => <Tab sx={{ fontWeight: 600 }} key={index} value={student} label={student.name} />)}
        </Tabs>
      </Box>

    </Box>
  )
}



export default InstructorSidebar