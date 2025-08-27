import useBoundStore from "@/src/shared/store"

const ReviewCheckContent = () => {
    const setReviewCheckGroupedByBook = useBoundStore((state) => state.setReviewCheckGroupedByBook)
    const reviewCheckGroupedByBook = useBoundStore((state)  => state.reviewCheckGroupedByBook)
    return <div>{JSON.stringify(reviewCheckGroupedByBook)}</div>
}

export default ReviewCheckContent
