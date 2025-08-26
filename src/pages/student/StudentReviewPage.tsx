import useBoundStore from "@/src/shared/store"
import BookSection from "@/src/features/reviewCheck/BookSection"
import CheckboxSection from "@/src/features/reviewCheck/CheckboxSection"
import {
    useReviewCheckApi,
    useReviewCheckUpdate,
} from "../../_hooks/reviewCheckHooks"

const studentId = "68494394d9f33f23de4513c5"

const StdReviewCheckPage = () => {
    const bookTitleArray = useBoundStore((state) => state.bookTitleArray)
    const selectedBookTitle = useBoundStore((state) => state.selectedBookTitle)
    const reviewCheckArray = useBoundStore((state) => state.reviewCheckArray)
    // ---- 허스키 : ESLint 통과 못하면 커밋 자체를 못 하게 함 <<< 팀 프로젝트 할 때는 필수 <<<<
    // ---- call effect custom hooks
    useReviewCheckApi(studentId)
    useReviewCheckUpdate()

    if (!selectedBookTitle) {
        return <BookSection bookTitleArray={bookTitleArray} />
    }

    if (!reviewCheckArray) {
        return null
    }

    return <CheckboxSection studentId={studentId} />
}

export default StdReviewCheckPage
