import { CheckboxSectionProps } from '@/interfaces/reviewCheckInterfaces'
import Checkbox from './Checkbox'
import Header from './Header'
import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'

const CheckboxSection = ({
  studentId,
  editedIdStatusDictArray,
  patchReviewCheck,
  errorPatch,
  isMultiSelecting,
  setIsMultiSelecting,
  reviewCheckArray,
  statusArray,
  setRecentTwoIndexes,
  setEditedIdStatusDictArray,
  setSelectedBookTitle
}: CheckboxSectionProps) => {


  return (
    <Box>
      <Header
        studentId={studentId}
        editedIdStatusDictArray={editedIdStatusDictArray}
        patchReviewCheck={patchReviewCheck}
        errorPatch={errorPatch}
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