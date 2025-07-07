import { ReviewCheckHeader } from '@/interfaces/reviewCheckInterfaces';
import useReviewCheckStore from '@/store/reviewCheckStore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { ApiResponse } from '@/interfaces/commonInterfaces';
type ToggleButtonInfo = {
  buttonVarient: "contained" | "outlined" | "text",
  textContent: string
}

const buttonStyle = {
  color: "hsl(0 0 95%)",
  borderColor: "hsl(0 0 30)",
  "&:hover": {
    borderColor: "hsl(0 0 60%)"
  }
}
const COLORS = {
  neutral: "hsl(0 0 60%)",
  success: "oklch(0.8378 0.2263 157.76)",
  loading: "oklch(0.8378 0.2045 103.76)",
  error: "oklch(0.6 0.2557 31.76)"
} as const;

const getStatusColor = (response: ApiResponse | null): string => {
  if (response === null) return COLORS.neutral;

  switch (response.status) {
    case 'SUCCESS':
      return COLORS.success;
    case 'IS_LOADING':
      return COLORS.loading;
    default:
      return COLORS.error;
  }
};

const Header = ({
  isMultiSelecting,
  setIsMultiSelecting,
  setSelectedBookTitle
}: ReviewCheckHeader) => {

  const response = useReviewCheckStore((state) => state.response)
  const color = getStatusColor(response)
  
  const toggleButtonInfo: ToggleButtonInfo = {
    buttonVarient: (isMultiSelecting ? "contained" : "outlined"),
    textContent: (isMultiSelecting ? "다중 선택 종료" : "다중 선택 시작")
  }

  return (
    // !!!!---- TODO 여기 테마에 맞춰 자동조저뢰게 해야 함 ----!!!!
    <AppBar position="static" sx={{ backgroundColor: "hsl(0 0 0)" }}>
      <Toolbar className='flex gap-6'>

        <Box className="grow">
          <IconButton size="large" edge="start" color="inherit" aria-label="back" className='grow'
            onClick={() => setSelectedBookTitle(null)}>
            <ChevronLeftIcon fontSize='large' />
          </IconButton>
        </Box>

        <Button
          sx={buttonStyle}
          onClick={() => setIsMultiSelecting((prev) => !prev)}
          variant={toggleButtonInfo.buttonVarient}>
          {toggleButtonInfo.textContent}
        </Button>

        <CircleIcon sx={{ backgroundColor: { color } }} />
      </Toolbar>
    </AppBar>
  )
}

export default Header