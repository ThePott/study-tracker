import useReviewCheckStore from '@/src/_store/reviewCheckStore';
import BookSection from './components/BookSection';
import CheckboxSection from './components/CheckboxSection';
import { useReviewCheckApi, useReviewCheckUpdate } from '../../../_hooks/reviewCheckHooks';

const studentId = "68494394d9f33f23de4513c5"

const StdReviewCheckPage = () => {
    const bookTitleArray = useReviewCheckStore((state) => state.bookTitleArray)
    const selectedBookTitle = useReviewCheckStore((state) => state.selectedBookTitle)
    const reviewCheckArray = useReviewCheckStore((state) => state.reviewCheckArray)

    // ---- call effect custom hooks
    useReviewCheckApi(studentId)
    useReviewCheckUpdate()


    if (!selectedBookTitle) {
        return <BookSection bookTitleArray={bookTitleArray} />
    }

    if (!reviewCheckArray) { return null }

    return (
        <CheckboxSection studentId={studentId} />
    )
}

export default StdReviewCheckPage
