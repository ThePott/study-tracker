import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { ReviewCheckData } from '../../_interfaces/interfaces'
import { checkboxStatusArray, HandleClickParams } from './interface'

/** SUB FUNCTION of useReviewCheckApi */
const getReviewCheckArray = async (
    setReviewCheckArray: React.Dispatch<React.SetStateAction<ReviewCheckData[] | null>>,
    setError: React.Dispatch<React.SetStateAction<null>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const url = `http://localhost:3030/review-check/${studentId}`
        const response = await axios.get(url)
        setReviewCheckArray(response.data)
    } catch (err) {
        setError(err.message)
    } finally {
        setIsLoading(false)
    }
}
/** Call api */
const useReviewCheckApi = (studentId: string) => {
    const [reviewCheckArray, setReviewCheckArray] = useState<ReviewCheckData[] | null>(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(
        () => {
            getReviewCheckArray(setReviewCheckArray, setError, setIsLoading)
        },
        [studentId]
    )

    return { reviewCheckArray, isLoading, error }
}

/** 오리지널 스테이터스 가지고 온 다음 그걸 기준으로 스플라이스 한 걸 상태 변환 함수에 넣어야 함 */
const useCheckboxStatus = (reviewCheckArray: ReviewCheckData[] | null) => {
    const [recentTwoIndexes, setRecentTwoIndexes] = useState<number[]>([])

    const statusArray = useMemo(
        () => {
            if (!reviewCheckArray) { return [] }

            const initialStatusArray = Array(reviewCheckArray.length).fill("NOT_SOLVED") as (typeof checkboxStatusArray[number])[]

            if (recentTwoIndexes.length === 0) { return initialStatusArray }

            const copiedInitialStatusArray = [...initialStatusArray]
            const recentSortedArray = [...recentTwoIndexes].sort((a, b) => a - b)

            const startIndex = Math.min(...recentSortedArray)
            const spliceLength = Math.max(...recentTwoIndexes) - startIndex + 1

            copiedInitialStatusArray.splice(startIndex, spliceLength, ...Array(spliceLength).fill("CORRECT"))

            return copiedInitialStatusArray
        },
        [reviewCheckArray, recentTwoIndexes]
    )

    return {
        setRecentTwoIndexes,
        statusArray
    }
}

/** SUB FUNCTION of useRecentIndexClickHandler */
const updateRawRecentArray = (
    index: number,
    setRecentTwoIndexes: React.Dispatch<React.SetStateAction<number[]>>
) => {
    setRecentTwoIndexes(prev => {
        const newArray = [...prev]
        if (newArray.length === 2) {
            newArray.shift()
        }
        newArray.push(index)

        return newArray
    })
}

const useRecentIndexClickHandler = ({ setRecentTwoIndexes }: HandleClickParams) => {
    return useCallback<MouseEventHandler<HTMLDivElement>>(
        (event) => {
            const optionalIndex = event.currentTarget.dataset.index
            if (!optionalIndex) { return }

            const index = Number(optionalIndex)
            updateRawRecentArray(index, setRecentTwoIndexes)
        },
        []
    )
}

export { useReviewCheckApi, useCheckboxStatus, useRecentIndexClickHandler }
