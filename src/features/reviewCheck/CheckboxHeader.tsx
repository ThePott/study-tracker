import NeutralButton from "@/src/shared/components/NeutralButton"
import useBoundStore from "@/src/shared/store"
import React from "react"

const CheckboxHeader = () => {
    const isMultiSelecting = useBoundStore((state) => state.isMultiSelecting)
    const toggleIsMultiSelecting = useBoundStore((state) => state.toggleIsMultiSelecting)

    const initial = useBoundStore((state) => state.initialReviewCheckStatusDict)
    const edited = useBoundStore((state) => state.editedReviewCheckStatusDict)
    const multi = useBoundStore((state) => state.multiSelectedReviewCheckStatusDict)
    const handleDebugClick = () => {
        console.log({initial, edited, multi})
        debugger
    }
    return (
        <div className="flex">
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
