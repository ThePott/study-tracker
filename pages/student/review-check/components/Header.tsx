import { ReviewCheckHeader } from '@/interfaces/reviewCheckInterfaces'
import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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

const Header = ({
  studentId,
  editedIdStatusDictArray,
  // patchReviewCheck,
  // errorPatch,
  isMultiSelecting,
  setIsMultiSelecting,
  setSelectedBookTitle
}: ReviewCheckHeader) => {

  const toggleButtonInfo: ToggleButtonInfo = {
    buttonVarient: (isMultiSelecting ? "contained" : "outlined"),
    textContent: (isMultiSelecting ? "다중 선택 종료" : "다중 선택 시작")
  }

  return (
    <Box className="w-full">
      <Box className="flex">
        <ButtonGroup>
          <Button sx={buttonStyle} onClick={() => setSelectedBookTitle(null)}>
            <ChevronLeftIcon fontSize='large'  />
          </Button>
          {/* <Button sx={buttonStyle} onClick={() => patchReviewCheck(studentId, editedIdStatusDictArray)} variant='outlined'>서버에 보내기</Button> */}
          <Button
            sx={buttonStyle}
            onClick={() => setIsMultiSelecting((prev) => !prev)}
            variant={toggleButtonInfo.buttonVarient}>{toggleButtonInfo.textContent}</Button>
        </ButtonGroup>
      </Box>
      {/* {errorPatch && <Typography variant='body1'>{JSON.stringify(errorPatch)}</Typography>} */}
    </Box>
  )
}

export default Header