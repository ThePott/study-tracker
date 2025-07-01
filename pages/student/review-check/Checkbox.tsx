import React from "react"
import { useCheckboxClickHandler, useEditedIndexTracker } from "./hooks"
import { CheckboxProps } from "./interface"


const Checkbox = React.memo(({
    index,
    reviewCheckData,
    status,
    setRecentTwoIndexes,
    setEditedCheckboxIndexArray
}: CheckboxProps) => {

    const color = status === "CORRECT" ? "bg-blue-500" :
        status === "WRONG" ? "bg-blue-500" : "bg-zinc-200"

    const handleClick = useCheckboxClickHandler({ setRecentTwoIndexes })

    useEditedIndexTracker(index, status, reviewCheckData, setEditedCheckboxIndexArray)

    return (
        <div
            className={`w-[60px] h-[60px] ${color}`}
            onClick={handleClick}
            data-index={index}
        >
            {reviewCheckData.questionNumber}
        </div>
    )
})

export default Checkbox

