import { Box, Paper } from '@mui/material'
import { Children } from 'react'
import { Outlet } from 'react-router'
import StudentHeader from './StudentHeader'

const StudentLayout = () => {
  return (
    <div className='w-full h-full bg-black flex justify-center items-center'>
      <Paper sx={{borderRadius: "24px"}} className='w-2xl overflow-hidden'>
        <StudentHeader />
        <Box component="main" sx={{scrollbarWidth: "none"}} className='h-[calc(100vh-60px)] overflow-x-hidden overflow-y-scroll sm:h-[800px]'>
          <Outlet context={Children} />
        </Box>
      </Paper>
    </div>
  )
}

export default StudentLayout