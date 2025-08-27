import NeutralButton from "@/src/shared/components/NeutralButton"
import { ReviewCheck } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import useBoundStore from "@/src/shared/store"
import { memo } from "react"

const Checkbox = memo(({ reviewCheck }: { reviewCheck: ReviewCheck }) => {
    const addToRecentTwo = useBoundStore((state) => state.addToRecentTwo)
    const recentTwo = useBoundStore((state) => state.recentTwo)
    const handleClick = () => {
        addToRecentTwo(reviewCheck.id)
        console.log({recentTwo})
        debugger
    }

    return (
        <NeutralButton onClick={handleClick} className="w-[60px] h-[60px]" variant="NEUTRAL">
            {reviewCheck.questionLabel}
        </NeutralButton>
    )
})

export default Checkbox
