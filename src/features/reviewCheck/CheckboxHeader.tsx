import NeutralButton, { ButtonColor } from "@/src/shared/components/NeutralButton"
import { ReviewCheckStatus, reviewCheckStatusArray } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import useBoundStore from "@/src/shared/store"

const statusToLabel: Record<ReviewCheckStatus, string> = {
    DONE: "완료",
    PASS: "패스",
    WORONG: "복습",
    CORRECT: "정답",
    NOT_SOLVED: "아직",
}

const statusToColor: Partial<Record<ReviewCheckStatus, ButtonColor>> = {
    PASS: "YELLOW",
    WORONG: "RED",
    CORRECT: "BLUE",
}

const ButtonGroup = () => {
    const setChangeTo = useBoundStore((state) => state.setChangeTo)
    const changeTo = useBoundStore((state) => state.changeTo)
    const isOnArray: boolean[] = reviewCheckStatusArray.map((status) => status === changeTo)
    const handleGeneralClick = (status: ReviewCheckStatus) => {
        setChangeTo(status)
    }

    return (
        <div className="flex grow">
            {reviewCheckStatusArray.map((status, index) => (
                <NeutralButton key={status} variant="NEUTRAL" isOn={isOnArray[index]} className="max-w-[100px] w-full" color={statusToColor[status]} onClick={() => handleGeneralClick(status)}>
                    {statusToLabel[status]}
                </NeutralButton>
            ))}
        </div>
    )
}

const CheckboxHeader = () => {
    const isMultiSelecting = useBoundStore((state) => state.isMultiSelecting)
    const toggleIsMultiSelecting = useBoundStore((state) => state.toggleIsMultiSelecting)

    const initial = useBoundStore((state) => state.initialReviewCheckStatusDict)
    const edited = useBoundStore((state) => state.editedReviewCheckStatusDict)
    const multi = useBoundStore((state) => state.multiSelectedReviewCheckStatusDict)
    const handleDebugClick = () => {
        console.log({ initial, edited, multi })
        debugger
    }
    return (
        <div className="flex">
            <ButtonGroup />
            <NeutralButton variant="NEUTRAL" isOn={isMultiSelecting} onClick={toggleIsMultiSelecting} className="w-[100px]">
                다중 선택
            </NeutralButton>
            <NeutralButton variant="NEUTRAL" onClick={handleDebugClick}>
                DEBUG
            </NeutralButton>
        </div>
    )
}

export default CheckboxHeader
