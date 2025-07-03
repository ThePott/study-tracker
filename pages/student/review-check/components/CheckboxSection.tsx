import { CheckboxSectionProps } from '@/interfaces/reviewCheckInterfaces'
import Checkbox from './Checkbox'
import Header from './Header'
import { Box } from '@mui/material'

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
    <Box className='flex flex-wrap gap-3'>
      <Header
        studentId={studentId}
        editedIdStatusDictArray={editedIdStatusDictArray}
        patchReviewCheck={patchReviewCheck}
        errorPatch={errorPatch}
        isMultiSelecting={isMultiSelecting}
        setIsMultiSelecting={setIsMultiSelecting}
        setSelectedBookTitle={setSelectedBookTitle}/>

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
  )
}

export default CheckboxSection