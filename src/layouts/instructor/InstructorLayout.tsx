import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import InstructorHeader from './InstructorHeader'
import InstructorSidebar from './InstructorSidebar'
import { useAutoSaveInProgressStatus, useAutoSaveCompleted, useProgressGet } from '@/src/_hooks/progressHooks'
import { colorStyle, fontStyle } from '@/src/shared/ui/styleConstants'

const InstructorLayout = () => {
  useAutoSaveInProgressStatus()
  useAutoSaveCompleted()
  useProgressGet()
  
  return (
    <Box className={`w-screen h-screen overflow-hidden flex flex-col ${colorStyle.bgBack}`}>
      <InstructorHeader />

      <Box className="flex-1 flex overflow-hidden">

        <InstructorSidebar />

        <Box sx={{scrollbarColor: "oklch(0.5 0 0) transparent"}} className="flex-1 pt-3 px-3 overflow-y-scroll flex flex-col items-center">
          <Outlet />
        </Box>
      </Box>

    </Box>
  )
}

export default InstructorLayout