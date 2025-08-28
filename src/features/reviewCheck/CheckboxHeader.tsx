import NeutralButton from "@/src/shared/components/NeutralButton"
import { ReviewCheckStatus, reviewCheckStatusArray } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import useBoundStore from "@/src/shared/store"

const statusToLabel = {
    DONE: "완료",
    PASS: "패스",
    WORONG: "복습",
    CORRECT: "정답",
    NOT_SOLVED: "아직",
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
                <NeutralButton 
                    key={status} // Added key prop
                    variant="NEUTRAL" 
                    isOn={isOnArray[index]} 
                    className="w-[100px]"
                    onClick={() => handleGeneralClick(status)}>{statusToLabel[status]}</NeutralButton>
            ))}
        </div> // Added missing closing tag
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
            <NeutralButton variant="NEUTRAL" isOn={isMultiSelecting} onClick={toggleIsMultiSelecting}>
                다중 선택
            </NeutralButton>
            <NeutralButton variant="NEUTRAL" onClick={handleDebugClick}>
                DEBUG
            </NeutralButton>
        </div>
    )
}

export default CheckboxHeader
