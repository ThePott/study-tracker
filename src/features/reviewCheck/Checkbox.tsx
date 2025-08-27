import NeutralButton from "@/src/shared/components/NeutralButton"
import { ReviewCheck } from "@/src/shared/interfaces/_reviewCheckInterfaces"

const Checkbox = ({ reviewCheck }: { reviewCheck: ReviewCheck }) => {
    return <NeutralButton variant="NEUTRAL">{reviewCheck.questionLabel}</NeutralButton>
}

export default Checkbox
