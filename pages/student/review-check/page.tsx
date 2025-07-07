import useReviewCheckStore from '@/store/reviewCheckStore';
import { useState } from 'react';
import BookSection from './components/BookSection';
import CheckboxSection from './components/CheckboxSection';
import { useCheckboxStatus, useReviewCheckApi, useReviewCheckUpdate } from './hooks';

const studentId = "68494394d9f33f23de4513c5"

const StdReviewCheckPage = () => {
    const bookTitleArray = useReviewCheckStore((state) => state.bookTitleArray)
    const selectedBookTitle = useReviewCheckStore((state) => state.selectedBookTitle)

    const reviewCheckArray = useReviewCheckStore((state) => state.reviewCheckArray)
    const editedIdStatusDictArray = useReviewCheckStore((state) => state.editedIdStatusDictArray)
    const setEditedIdStatusDictArray = useReviewCheckStore((state) => state.setEditedIdStatusDictArray)

    const [isMultiSelecting, setIsMultiSelecting] = useState<boolean>(true)
    
    const { setRecentTwoIndexes, statusArray } = useCheckboxStatus(reviewCheckArray)

    
    
    // ---- call custom hooks
    useReviewCheckApi(studentId)
    useReviewCheckUpdate()



    if (!selectedBookTitle) {
        return <BookSection bookTitleArray={bookTitleArray}/>
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
    />
}

export default StdReviewCheckPage
