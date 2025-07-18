import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import InstructorHeader from './InstructorHeader'
import InstructorSidebar from './InstructorSidebar'

const InstructorLayout = () => {
  return (
    <Box className="flex w-screen h-screen overflow-hidden">
      <InstructorSidebar />
      <Box className="grow">
        <InstructorHeader />
        <Box className="p-3">
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default InstructorLayout