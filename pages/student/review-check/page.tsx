import useReviewCheckStore from '@/store/reviewCheckStore';
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
        reviewCheckArray={reviewCheckArray}
        setEditedIdStatusDictArray={setEditedIdStatusDictArray}
        setRecentTwoIndexes={setRecentTwoIndexes}
        statusArray={statusArray}
        studentId={studentId}
    />
}

export default StdReviewCheckPage
