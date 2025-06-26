import React, { useMemo, useCallback, MouseEventHandler } from "react"
import { ReviewCheckData } from "../../_interfaces/interfaces"

interface HandleClickParams {
    setRecentRawArray: React.Dispatch<React.SetStateAction<number[]>>,
}

/**
 * index는 이런 의미다
 * reviewCheckData는 이런 의미다
 */
interface CheckboxProps {
    index: number;
    reviewCheckData: ReviewCheckData;
    recentRawArray: number[];
    setRecentRawArray: React.Dispatch<React.SetStateAction<number[]>>;
    recentSortedArray: number[];
}

const useCheckInBetween = (index: number, recentSortedArray: number[]) => {
    return useMemo(
        () => {
            if (recentSortedArray.length < 2) { return false }

            return recentSortedArray[0] < index && index < recentSortedArray[recentSortedArray.length - 1]
        },
        [recentSortedArray]
    )
}

const updateRawRecentArray = (
    index: number,
    setRecentRawArray: React.Dispatch<React.SetStateAction<number[]>>
) => {
    setRecentRawArray(prev => {
        const newArray = [...prev]
        if (newArray.length === 2) {
            newArray.shift()
        }
        newArray.push(index)

        return newArray
    })
}

const useCheckIndexThenUpdateRecentArray = ({ setRecentRawArray }: HandleClickParams) => {
    return useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        const optionalIndex = event.currentTarget.dataset.index
        if (!optionalIndex) { return }

        const index = parseInt(optionalIndex)
        updateRawRecentArray(index, setRecentRawArray)
    }, [])
}

const Checkbox = React.memo(({
    index,
    reviewCheckData,
    recentRawArray,
    setRecentRawArray,
    recentSortedArray
}: CheckboxProps) => {
    const isSelected = recentRawArray.includes(index)
    const isBetween = useCheckInBetween(index, recentSortedArray)

    const color = isSelected ? "bg-red-500" :
        isBetween ? "bg-blue-500" : "bg-zinc-200"

    const handleClick = useCheckIndexThenUpdateRecentArray({ setRecentRawArray })

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

