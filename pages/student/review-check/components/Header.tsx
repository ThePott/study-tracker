import { ApiResponse } from '@/interfaces/commonInterfaces';
// import { ReviewCheckHeader } from '@/interfaces/reviewCheckInterfaces';
import useReviewCheckStore from '@/store/reviewCheckStore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CircleIcon from '@mui/icons-material/Circle';
import GradingIcon from '@mui/icons-material/Grading';
import { AppBar, Box, FormControlLabel, IconButton, Switch, Toolbar } from '@mui/material';
import CustomToggleButtonGroup from './CustomToggleButtonGroup';
import { useEffect, useState } from 'react';
import React from 'react';


const COLORS = {
  success: "oklch(0.8378 0.2263 157.76)",
  loading: "oklch(0.7584 0.2067 58.23)",
  error: "oklch(0.6 0.2557 31.76)"
} as const;

const getStatusColor = (response: ApiResponse): string => {
  if (response === null) return COLORS.loading

  switch (response.status) {
    case 'SUCCESS':
      return COLORS.success
    case 'IS_LOADING':
      return COLORS.loading
    default:
      return COLORS.error
  }
}

/** 현재 문제---- store를 스위치에 바로 연결하면 너무 반응이 느려져서 useState을 중간에 끼워넣음. 그래서 업데이트가 두 번 일어남 */
const Header = React.memo(() => {
  const [isChecked, setIsChecked] = useState<boolean>(true)

  const setSelectedBookTitle = useReviewCheckStore((state) => state.setSelectedBookTitle)
  const response = useReviewCheckStore((state) => state.response)
  const color = getStatusColor(response)

  const setIsMultiSelecting = useReviewCheckStore((state) => state.setIsMultiSelecting)
  const clearRecentTwoIndexes = useReviewCheckStore((state) => state.clearRecentTwoIndexes)
  const handleChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setIsChecked(checked)
  }

  useEffect(
    () => {
      setIsMultiSelecting(isChecked)
      clearRecentTwoIndexes()
    },
    [isChecked]
  )


  return (
    // Fold Level 5
    <AppBar position='sticky' className='bg-amber-300 overflow-x-scroll'>
      <Toolbar disableGutters className='flex gap-6'>

        <Box className="grow">
          <IconButton size="large" edge="start" color="inherit" aria-label="back"
            onClick={() => setSelectedBookTitle(null)}>
            <ChevronLeftIcon fontSize='large' />
          </IconButton>
        </Box>


        <CustomToggleButtonGroup />

        <Box className="flex">
          <FormControlLabel control={<Switch checked={isChecked} onChange={handleChange} />} label={<GradingIcon />} className='w-[90px]' />
          <CircleIcon sx={{ backgroundColor: { color }, paddingRight: "12px" }} fontSize="small" />
        </Box>

      </Toolbar>
    </AppBar>
  )
})

export default Header