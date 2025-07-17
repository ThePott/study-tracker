import useReviewCheckStore from '@/store/reviewCheckStore';
import BookSection from './components/BookSection';
// import CheckboxSection from './components/CheckboxSection';
import { useReviewCheckApi, useReviewCheckUpdate } from './hooks';
import { lazy, Suspense, useEffect } from 'react';
const CheckboxSection = lazy(() => import("./components/CheckboxSection"))

const studentId = "68494394d9f33f23de4513c5"

const StdReviewCheckPage = () => {
    const bookTitleArray = useReviewCheckStore((state) => state.bookTitleArray)
    const selectedBookTitle = useReviewCheckStore((state) => state.selectedBookTitle)

    const reviewCheckArray = useReviewCheckStore((state) => state.reviewCheckArray)
    const editedIdStatusDictArray = useReviewCheckStore((state) => state.editedIdStatusDictArray)
    const setEditedIdStatusDictArray = useReviewCheckStore((state) => state.setEditedIdStatusDictArray)

    // const { statusArray } = useCheckboxStatus(reviewCheckArray)



    // ---- call effect custom hooks
    useReviewCheckApi(studentId)
    useReviewCheckUpdate()


    if (!selectedBookTitle) {
        return <BookSection bookTitleArray={bookTitleArray} />
    }

    if (!reviewCheckArray) { return null }

    return (
        <Suspense fallback={<h1>... is loading ...</h1>}>
            <CheckboxSection
                editedIdStatusDictArray={editedIdStatusDictArray}
                // reviewCheckArray={reviewCheckArray}
                setEditedIdStatusDictArray={setEditedIdStatusDictArray}
                // setRecentTwoIndexes={setRecentTwoIndexes}
                // statusArray={statusArray}
                studentId={studentId}
            />
        </Suspense>
    )
}

export default StdReviewCheckPage
