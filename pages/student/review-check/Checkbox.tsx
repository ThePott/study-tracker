import React from "react"
import { useCheckboxClickHandler, useEditedIndexTracker } from "./hooks"
import { CheckboxProps } from "@/interfaces/reviewCheckInterfaces"


const Checkbox = React.memo(({
    index,
    reviewCheckData,
    status,
    setRecentTwoIndexes,
    setEditedIdStatusDictArray
}: CheckboxProps) => {

    const color = status === "CORRECT" ? "bg-blue-500" :
        status === "WRONG" ? "bg-blue-500" : "bg-zinc-200"

    const handleClick = useCheckboxClickHandler({ setRecentTwoIndexes })

    useEditedIndexTracker(reviewCheckData._id, status, reviewCheckData, setEditedIdStatusDictArray)

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

