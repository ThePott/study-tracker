import NeutralButton from "@/src/shared/components/NeutralButton"
import { ReviewCheck, ReviewCheckStatus } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import useBoundStore from "@/src/shared/store"
import { memo } from "react"

const Checkbox = memo(({ reviewCheck, status }: { reviewCheck: ReviewCheck, status: ReviewCheckStatus }) => {
    const handleCheckboxClick = useBoundStore((state) => state.handleCheckboxClick)
    
    const handleClick = () => {
        handleCheckboxClick(reviewCheck)
    }

    return (
        <NeutralButton onClick={handleClick} className="w-[60px] h-[60px]" variant="NEUTRAL">
            {reviewCheck.questionLabel}{status}
        </NeutralButton>
    )
})

export default Checkbox
