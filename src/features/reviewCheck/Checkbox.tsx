import NeutralButton, { ButtonColor } from "@/src/shared/components/NeutralButton"
import { ReviewCheck, ReviewCheckStatus } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import useBoundStore from "@/src/shared/store"
import { memo } from "react"

const statusToColor: Partial<Record<ReviewCheckStatus, ButtonColor>> = {
    DONE: "DIM",
    PASS: "YELLOW",
    WRONG: "RED",
    CORRECT: "BLUE",
}

const Checkbox = memo(({ reviewCheck, status }: { reviewCheck: ReviewCheck, status: ReviewCheckStatus }) => {
    const handleCheckboxClick = useBoundStore((state) => state.handleCheckboxClick)
    
    const handleClick = () => {
        handleCheckboxClick(reviewCheck)
    }

    const isOn = status !== "NOT_SOLVED"

    return (
        <NeutralButton onClick={handleClick} className="w-[60px] h-[60px]" variant="NEUTRAL" isOn={isOn}
        color={statusToColor[status]}>
            {reviewCheck.questionLabel}{status}
        </NeutralButton>
    )
})

export default Checkbox
