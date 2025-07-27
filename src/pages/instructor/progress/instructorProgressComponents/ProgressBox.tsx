import { ProgressData } from '@/src/_interfaces/progressInterfaces'
import { Box, Typography } from '@mui/material'
import React from 'react'

const ProgressBox = ({progress}: {progress: ProgressData}) => {
  return (
    <Box className="p-3 bg-zinc-800">
      <Typography>{progress.groupId}</Typography>
      <Typography>{progress.completed}</Typography>
    </Box>
  )
}

export default ProgressBox