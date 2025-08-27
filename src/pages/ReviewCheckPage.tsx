import ReviewCheckContent from "../features/reviewCheck/ReviewCheckContent"
import { useReviewCheck } from "../features/reviewCheck/useReviewCheck"

const ReviewCheckPage = () => {
   useReviewCheck()
    return (
        <ReviewCheckContent />
    )
}

export default ReviewCheckPage
