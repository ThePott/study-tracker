import { CheckboxSectionProps } from '@/interfaces/reviewCheckInterfaces'
import { Box, Snackbar } from '@mui/material'
import { patchReviewCheckArray2, } from '../hooks'
import Checkbox from './Checkbox'
import Header from './Header'
import { useCallback, useEffect } from 'react'
import useReviewCheckStore from '@/store/reviewCheckStore';

const CheckboxSection = ({
  studentId,
  editedIdStatusDictArray,
  isMultiSelecting,
  setIsMultiSelecting,
  reviewCheckArray,
  statusArray,
  setRecentTwoIndexes,
  setSelectedBookTitle,
  setPatchResponse
}: CheckboxSectionProps) => {

  const updateReviewCheckArray = useCallback(useReviewCheckStore((state) => state.updateReviewCheckArray), [])
  const setEditedIdStatusDictArray = useCallback(useReviewCheckStore((state) => state.setEditedIdStatusDictArray), [])

  useEffect(
    () => {
      const waitingPatch = () => {
        patchReviewCheckArray2(studentId, editedIdStatusDictArray, setPatchResponse, updateReviewCheckArray, setEditedIdStatusDictArray)
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
        patchReviewCheckArray2(studentId, editedIdStatusDictArray, setPatchResponse, updateReviewCheckArray, setEditedIdStatusDictArray)
        console.log("---- manual patch when unmount")
      }
    },
    []
  )

  console.log("---- re-render")
  return (
    <>
    <Snackbar
        open={open}
        autoHideDuration={6000}
        message="SAVE FAILED" />
      <Box>
        <Header
          studentId={studentId}
          editedIdStatusDictArray={editedIdStatusDictArray}
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

      </Box >
    </>
  )
}

export default CheckboxSection