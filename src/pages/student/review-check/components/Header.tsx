import { ApiResponse } from '@/src/_interfaces/commonInterfaces';
import useReviewCheckStore from '@/src/_store/reviewCheckStore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CircleIcon from '@mui/icons-material/Circle';
import GradingIcon from '@mui/icons-material/Grading';
import { Box, FormControlLabel, IconButton, Switch } from '@mui/material';
import React from 'react';
import CustomToggleButtonGroup from './CustomToggleButtonGroup';


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
  const setSelectedBookTitle = useReviewCheckStore((state) => state.setSelectedBookTitle)
  const response = useReviewCheckStore((state) => state.response)
  const color = getStatusColor(response)

  const isMultiSelelcting = useReviewCheckStore((state) => state.isMultiSelecting)
  const setIsMultiSelecting = useReviewCheckStore((state) => state.setIsMultiSelecting)
  const clearRecentTwoIndexes = useReviewCheckStore((state) => state.clearRecentTwoIndexes)
  const setReviewCheckArray = useReviewCheckStore((state) => state.setReviewCheckArray)
  const clearStatusArray = useReviewCheckStore((state) => state.clearStatusArray)


  const handleSwitchChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setIsMultiSelecting(checked)
    clearRecentTwoIndexes()
  }

  const handleBackClick = () => {
    setSelectedBookTitle(null)
    setReviewCheckArray([])
    clearStatusArray()
  }

  return (
    // Fold Level 5
    <Box className='flex gap-6 p-3 h-[70px] items-center'>

      <Box className="grow">
        <IconButton size="large" edge="start" color="inherit" aria-label="back"
          onClick={handleBackClick}>
          <ChevronLeftIcon fontSize='large' />
        </IconButton>
      </Box>


      <CustomToggleButtonGroup />

      <Box className="flex">
        <FormControlLabel control={<Switch checked={isMultiSelelcting} onChange={handleSwitchChange} />} label={<GradingIcon />} className='w-[90px]' />
        <CircleIcon sx={{ backgroundColor: { color }, paddingRight: "12px" }} fontSize="small" />
      </Box>

    </Box>
  )
})

export default Header