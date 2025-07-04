import { CheckboxSectionProps } from '@/interfaces/reviewCheckInterfaces'
import { Box } from '@mui/material'
import { patchReviewCheckArray2, useReviewCheckPatchAutoOld } from '../hooks'
import Checkbox from './Checkbox'
import Header from './Header'
import { useEffect } from 'react'

const CheckboxSection = ({
  studentId,
  editedIdStatusDictArray,
  // patchReviewCheck,
  // errorPatch,
  isMultiSelecting,
  setIsMultiSelecting,
  reviewCheckArray,
  statusArray,
  setRecentTwoIndexes,
  setEditedIdStatusDictArray,
  setSelectedBookTitle,
  setPatchResponse
}: CheckboxSectionProps) => {


  useReviewCheckPatchAutoOld(studentId, editedIdStatusDictArray)
  
  useEffect(
    () => {
      return () => {
        patchReviewCheckArray2(studentId, editedIdStatusDictArray, setPatchResponse)
        console.log("---- manual patch when unmount")
      }
    },
    []
  )

  console.log("---- re-render")
  return (
    <Box>
      <Header
        studentId={studentId}
        editedIdStatusDictArray={editedIdStatusDictArray}
        // patchReviewCheck={patchReviewCheck}
        // errorPatch={errorPatch}
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
            setEditedIdStatusDictArray={setEditedIdStatusDictArray}
          />
        ))}

      </Box>

    </Box >
  )
}

export default CheckboxSection