import ReviewCheckContent from "../features/reviewCheck/ReviewCheckContent"
import { useReviewCheck } from "../features/reviewCheck/reviewCheckHooks"

const ReviewCheckPage = () => {
   useReviewCheck()
    return (
        <ReviewCheckContent />
    )
}

export default ReviewCheckPage
