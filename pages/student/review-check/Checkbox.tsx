import React from "react"
import { useRecentIndexClickHandler } from "./apiHooks"
import { CheckboxProps } from "./interface"


const Checkbox = React.memo(({
    index,
    reviewCheckData,
    status,
    setRecentTwoIndexes
}: CheckboxProps) => {
    
    const color = status === "CORRECT" ? "bg-blue-500" :
        status === "WRONG" ? "bg-blue-500" : "bg-zinc-200"

    const handleClick = useRecentIndexClickHandler({ setRecentTwoIndexes })

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

