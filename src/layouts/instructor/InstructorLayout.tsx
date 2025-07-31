import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import InstructorHeader from './InstructorHeader'
import InstructorSidebar from './InstructorSidebar'
import { useAutoSaveInProgressStatus, useAutoSaveCompleted, useProgressGet } from '@/src/_hooks/progressHooks'

const InstructorLayout = () => {
  useAutoSaveInProgressStatus()
  useAutoSaveCompleted()
  useProgressGet()
  
  return (
    <Box className="w-screen h-screen overflow-hidden flex flex-col">
      <InstructorHeader />

      <Box className="flex-1 flex overflow-hidden">

        <InstructorSidebar />

        <Box sx={{scrollbarColor: "oklch(0.5 0 0) transparent"}} className="flex-1 p-3 overflow-y-scroll">
          <Outlet />
        </Box>
      </Box>

    </Box>
  )
}

export default InstructorLayout