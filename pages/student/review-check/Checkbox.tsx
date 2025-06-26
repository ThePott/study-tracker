import React, { useMemo, useCallback, MouseEventHandler } from "react"
import { ReviewCheckData } from "../../_interfaces/interfaces"

interface HandleClickParams {
    setRecentArray:  React.Dispatch<React.SetStateAction<number[]>>,
}

interface CheckboxProps {
    index: number;
    reviewCheckData: ReviewCheckData;
    recentArray: number[];
    setRecentArray: React.Dispatch<React.SetStateAction<number[]>>;
}


const useSortedRecent = (recentArray: number[]) => {
    return useMemo(
        () => { return [...recentArray].sort((a, b) => a - b) }, 
        [recentArray]
    )
}

const useCheckInBetween = (index: number, sortedRecent: number[]) => {
    return useMemo(
        () => {
            if (sortedRecent.length < 2) { return false }

            return sortedRecent[0] < index && index < sortedRecent[sortedRecent.length - 1]
        }, 
        [sortedRecent]
    )
}

const updateRecentArray = (
    index: number, 
    setRecentArray: React.Dispatch<React.SetStateAction<number[]>>
) => {
    setRecentArray(prev => {
        const newArray = [...prev]
        if (newArray.length === 2) {
            newArray.shift()
        }
        newArray.push(index)
        return newArray
    })
}

const useCheckIndexThenUpdateRecentArray = ({ setRecentArray }: HandleClickParams ) => {
    return useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        const optionalIndex = event.currentTarget.dataset.index
        if (!optionalIndex) return

        const index = parseInt(optionalIndex)
        updateRecentArray(index, setRecentArray)
    }, [])
}


const Checkbox = React.memo((
    { index, reviewCheckData, recentArray, setRecentArray }: CheckboxProps
) => {
        const isSelected = recentArray.includes(index)
        const sortedRecent = useSortedRecent(recentArray)
        const isBetween = useCheckInBetween(index, sortedRecent)

        const color = isSelected ? "bg-red-500" : 
            isBetween ? "bg-blue-500" : "bg-zinc-200"

        const handleClick = useCheckIndexThenUpdateRecentArray({setRecentArray})

        return (
            <div 
                className={`w-[60px] h-[60px] ${color}`} 
                onClick={handleClick}
                data-index={index}
            >
                {reviewCheckData.questionNumber}
            </div>
        )
    }
)

export default Checkbox

