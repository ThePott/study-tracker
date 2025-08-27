import useBoundStore from "@/src/shared/store"

const ReviewCheckContent = () => {
    const reviewCheckArray = useBoundStore((state) => state.reviewCheckArray)
    return <div>{JSON.stringify(reviewCheckArray)}</div>
}

export default ReviewCheckContent
