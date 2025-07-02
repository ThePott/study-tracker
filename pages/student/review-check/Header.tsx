import { ReviewCheckHeader } from '@/interfaces/reviewCheckInterfaces'
import { Box, Button, ButtonGroup, Typography } from '@mui/material'

type ToggleButtonInfo = {
  buttonVarient: "contained" | "outlined" | "text",
  textContent: string
}

const Header = ({
  studentId,
  editedIdStatusDictArray,
  patchReviewCheck,
  errorPatch,
  isMultiSelecting,
  setIsMultiSelecting
}: ReviewCheckHeader) => {

  const toggleButtonInfo: ToggleButtonInfo = {
    buttonVarient: (isMultiSelecting ? "contained" : "outlined"),
    textContent: (isMultiSelecting ? "다중 선택 종료" : "다중 선택 시작")
  }
  return (
    <Box className="w-full">
      <Box className="flex">
        <ButtonGroup>
          <Button onClick={() => patchReviewCheck(studentId, editedIdStatusDictArray)} variant='outlined'>서버에 보내기</Button>
          <Button
            onClick={() => setIsMultiSelecting((prev) => !prev)}
            variant={toggleButtonInfo.buttonVarient}>{toggleButtonInfo.textContent}</Button>
        </ButtonGroup>
      </Box>
      {errorPatch && <Typography variant='body1'>{JSON.stringify(errorPatch)}</Typography>}
    </Box>
  )
}

export default Header