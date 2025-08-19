// import { Student } from '@/src/shared/interfaces/_instructorInterfaces';
// import useBoundStore from '@/src/shared/store';
// import { Box } from '@mui/material';
// import Tab from '@mui/material/Tab';
// import Tabs from '@mui/material/Tabs';
// import { useEffect } from 'react';
// import { useLoaderData } from 'react-router';

// const InstructorSidebar = () => {
//   const studentArray: Student[] = useLoaderData()

//   // const setStudentArray = useBoundStore((state) => state.setStudentArray)
//   // const selectedStudent = useBoundStore((state) => state.selectedStudent)
//   // const setSelectedStudent = useBoundStore((state) => state.setSelectedStudent)

//   // useEffect(() => {
//   //   if (studentArray && studentArray.length !== 0) {
//   //     setStudentArray(studentArray)
//   //     setSelectedStudent(studentArray[0])
//   //   }
//   // }, [studentArray])

//   // const handleStudentChange = (_event: React.SyntheticEvent, value: Student): void => {
//   //   setSelectedStudent(value)
//   // }

//   return (
//     <div></div>
//     // <Box sx={{ scrollbarColor: "oklch( 0.4 0 0 ) transparent" }} className="w-[132px] overflow-y-scroll overflow-x-hidden p-0">
//     //   <Tabs orientation='vertical' value={selectedStudent ?? studentArray[0]} onChange={handleStudentChange}>
//     //     {studentArray.map((student, index) => <Tab sx={{ fontWeight: 600 }} key={index} value={student} label={student.name} />)}
//     //   </Tabs>
//     // </Box>
//   )
// }



// export default InstructorSidebar