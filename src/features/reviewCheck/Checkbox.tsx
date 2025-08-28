import NeutralButton from "@/src/shared/components/NeutralButton"
import { ReviewCheck, ReviewCheckStatus } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import useBoundStore from "@/src/shared/store"
import { memo } from "react"

const Checkbox = memo(({ reviewCheck, status }: { reviewCheck: ReviewCheck, status: ReviewCheckStatus }) => {
    const addToRecentTwo = useBoundStore((state) => state.addToRecentTwo)
    const recentTwo = useBoundStore((state) => state.recentTwo)
    const editedReviewCheckStatus = useBoundStore((state) => state.editedReviewCheckStatusDict)
    const handleClick = () => {
        addToRecentTwo(reviewCheck.id)
        console.log({ recentTwo, editedReviewCheckStatus })
    }

    return (
        <NeutralButton onClick={handleClick} className="w-[60px] h-[60px]" variant="NEUTRAL">
            {reviewCheck.questionLabel}{status}
        </NeutralButton>
    )
})

export default Checkbox
