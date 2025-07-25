import { CheckboxSectionProps } from '@/interfaces/reviewCheckInterfaces'
import Checkbox from './Checkbox'
import Header from './Header'

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
    <div className='flex flex-wrap gap-3'>
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
    </div>
  )
}

export default CheckboxSection