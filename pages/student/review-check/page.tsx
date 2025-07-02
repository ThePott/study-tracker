import { EditedIdStatusDict } from '@/interfaces/reviewCheckInterfaces';
import { useState } from 'react';
import BookSection from './components/BookSection';
import CheckboxSection from './components/CheckboxSection';
import { useCheckboxStatus, useReviewCheckApi, useReviewCheckApiPatch } from './hooks';


const studentId = "68494394d9f33f23de4513c5"

const StdReviewCheckPage = () => {
    const [editedIdStatusDictArray, setEditedIdStatusDictArray] = useState<EditedIdStatusDict[]>([])
    const [isMultiSelecting, setIsMultiSelecting] = useState<boolean>(false)
    const [selectedBookTitle, setSelectedBookTitle] = useState<string | null>(null)

    const { reviewCheckArray, isLoading, error } = useReviewCheckApi(studentId)
    const { setRecentTwoIndexes, statusArray } = useCheckboxStatus(reviewCheckArray)
    const { patchReviewCheck, errorPatch } = useReviewCheckApiPatch()



    if (!reviewCheckArray) { return null }
    if (isLoading) { return <div>Loading...</div> }
    if (error) { return <div>Error: {error}</div> }

    if (!selectedBookTitle) { return <BookSection setSelectedBookTitle={setSelectedBookTitle} /> }

    return <CheckboxSection
        editedIdStatusDictArray={editedIdStatusDictArray}
        errorPatch={errorPatch}
        isMultiSelecting={isMultiSelecting}
        patchReviewCheck={patchReviewCheck}
        reviewCheckArray={reviewCheckArray}
        setEditedIdStatusDictArray={setEditedIdStatusDictArray}
        setIsMultiSelecting={setIsMultiSelecting}
        setRecentTwoIndexes={setRecentTwoIndexes}
        statusArray={statusArray}
        studentId={studentId}
    />
}

export default StdReviewCheckPage
