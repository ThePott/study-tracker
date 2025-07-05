import { PatchResponse } from '@/interfaces/reviewCheckInterfaces';
import useReviewCheckStore from '@/store/reviewCheckStore';
import { useEffect, useState } from 'react';
import BookSection from './components/BookSection';
import CheckboxSection from './components/CheckboxSection';
import { useCheckboxStatus, useReviewCheckApi } from './hooks';

const studentId = "68494394d9f33f23de4513c5"

const StdReviewCheckPage = () => {
    const reviewCheckArray = useReviewCheckStore((state) => state.reviewCheckArray)
    const setReviewCheckArray = useReviewCheckStore((state) => state.setReviewCheckArray)
    const editedIdStatusDictArray = useReviewCheckStore((state) => state.editedIdStatusDictArray)
    const setEditedIdStatusDictArray = useReviewCheckStore((state) => state.setEditedIdStatusDictArray)
    const [isMultiSelecting, setIsMultiSelecting] = useState<boolean>(true)
    const [selectedBookTitle, setSelectedBookTitle] = useState<string | null>(null)
    // const [patchResponse, setPatchResponse] = useState<PatchResponse | null>(null)

    const { isLoading, error, bookTitleArray, groupedBookObject } = useReviewCheckApi(studentId)
    const { setRecentTwoIndexes, statusArray } = useCheckboxStatus(reviewCheckArray)

    useEffect(
        () => {
            if (!selectedBookTitle || !groupedBookObject) { 
                setReviewCheckArray(null)
                return
             }
            const reviewCheckArrayInBook = groupedBookObject[selectedBookTitle]
            if (!reviewCheckArrayInBook) { return }

            setReviewCheckArray(reviewCheckArrayInBook)
        },
        [selectedBookTitle]
    )

    if (isLoading) { return <div>Loading...</div> }
    if (error) { return <div>Error: {error}</div> }
    
    if (!selectedBookTitle) { 
        return <BookSection bookTitleArray={bookTitleArray} setSelectedBookTitle={setSelectedBookTitle} /> 
    }
    
    if (!reviewCheckArray) { return null }

    return <CheckboxSection
        editedIdStatusDictArray={editedIdStatusDictArray}
        isMultiSelecting={isMultiSelecting}
        reviewCheckArray={reviewCheckArray}
        setEditedIdStatusDictArray={setEditedIdStatusDictArray}
        setIsMultiSelecting={setIsMultiSelecting}
        setRecentTwoIndexes={setRecentTwoIndexes}
        statusArray={statusArray}
        studentId={studentId}
        setSelectedBookTitle={setSelectedBookTitle}
        // setPatchResponse={setPatchResponse}
    />
}

export default StdReviewCheckPage
