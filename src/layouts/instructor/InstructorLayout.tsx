import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import InstructorHeader from './InstructorHeader'
import InstructorSidebar from './InstructorSidebar'

const InstructorLayout = () => {
  return (
    <Box className="w-screen h-screen overflow-hidden flex flex-col">
      <InstructorHeader />

      <Box className="flex-1 flex overflow-hidden">

        <InstructorSidebar />

        <Box className="flex-1 p-3">
          <Outlet />
        </Box>
      </Box>

    </Box>
  )
}

export default InstructorLayout