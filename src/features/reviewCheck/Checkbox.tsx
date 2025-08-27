import NeutralButton from "@/src/shared/components/NeutralButton"
import { ReviewCheck } from "@/src/shared/interfaces/_reviewCheckInterfaces"

const Checkbox = ({ reviewCheck }: { reviewCheck: ReviewCheck }) => {
    return <NeutralButton className="w-[60px] h-[60px]" variant="NEUTRAL">{reviewCheck.questionLabel}</NeutralButton>
}

export default Checkbox
