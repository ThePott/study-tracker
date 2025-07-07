import { CheckboxSectionProps } from '@/interfaces/reviewCheckInterfaces'
import useReviewCheckStore from '@/store/reviewCheckStore'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Snackbar } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { patchReviewCheckArray2, } from '../hooks'
import Checkbox from './Checkbox'
import Header from './Header'

const CheckboxSection = ({
  studentId,
  editedIdStatusDictArray,
  isMultiSelecting,
  setIsMultiSelecting,
  reviewCheckArray,
  statusArray,
  setRecentTwoIndexes,
  setSelectedBookTitle,
  // setPatchResponse
}: CheckboxSectionProps) => {

  const updateReviewCheckArray = useCallback(useReviewCheckStore((state) => state.updateReviewCheckArray), [])
  const setEditedIdStatusDictArray = useCallback(useReviewCheckStore((state) => state.setEditedIdStatusDictArray), [])
  const setResponse = useCallback(useReviewCheckStore((state) => state.setResponse), [])
  const hideResponseSnackbar = useCallback(useReviewCheckStore((state) => state.hideResponseSnackbar), [])

  const response = useReviewCheckStore((state) => state.response)

  useEffect(
    () => {
      const waitingPatch = () => {
        patchReviewCheckArray2(studentId, editedIdStatusDictArray, updateReviewCheckArray, setEditedIdStatusDictArray, setResponse)
        console.log("---- saved automatically!", editedIdStatusDictArray.length, editedIdStatusDictArray)
      }
      const timeoutId = setTimeout(waitingPatch, 2000)

      return () => clearTimeout(timeoutId)
    },
    [editedIdStatusDictArray]
  )

  useEffect(
    () => {
      return () => {
        patchReviewCheckArray2(studentId, editedIdStatusDictArray, updateReviewCheckArray, setEditedIdStatusDictArray, setResponse)
        console.log("---- manual patch when unmount")
      }
    },
    []
  )

  const actionFragment = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        // 수동으로 끌 때 작동하는 함수
        onClick={hideResponseSnackbar}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  console.log("---- re-render section")
  return (
    // Fold Level 5
    <>
      <Box>

        <Header
          isMultiSelecting={isMultiSelecting}
          setIsMultiSelecting={setIsMultiSelecting}
          setSelectedBookTitle={setSelectedBookTitle} />

        <Box className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-3">

          {reviewCheckArray.map((reviewCheckData, index) => (
            <Checkbox
              key={reviewCheckData._id}
              reviewCheckData={reviewCheckData}
              index={index}
              status={statusArray[index]}
              setRecentTwoIndexes={setRecentTwoIndexes}
            />
          ))}

        </Box>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={response && response.doOpenSnackbar}
          autoHideDuration={6000}
          onClose={hideResponseSnackbar} // 자동으로 꺼질 때 작동하는 함수
          message="Fail to save"
          action={actionFragment} />
      </Box >
    </>
  )
}

export default CheckboxSection