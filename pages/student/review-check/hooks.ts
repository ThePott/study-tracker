import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { CheckboxStatus, EditedIdStatusDict, HandleClickParams, ReviewCheckData } from "@/interfaces/reviewCheckInterfaces"

/** SUB FUNCTION of useReviewCheckApi GET */
const getReviewCheckArray = async (
    setReviewCheckArray: React.Dispatch<React.SetStateAction<ReviewCheckData[] | null>>,
    setError: React.Dispatch<React.SetStateAction<null>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    studentId: string
) => {
    try {
        const url = `http://localhost:3030/review-check/${studentId}`
        const response = await axios.get(url)
        setReviewCheckArray(response.data)
    } catch (error) {
        console.error("---- ERROR", error)
        setError(error.message)
    } finally {
        setIsLoading(false)
    }
}
/** API GET */
const useReviewCheckApi = (studentId: string) => {
    const [reviewCheckArray, setReviewCheckArray] = useState<ReviewCheckData[] | null>(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    /** GET */
    useEffect(
        () => {
            getReviewCheckArray(setReviewCheckArray, setError, setIsLoading, studentId)
        },
        [studentId]
    )

    return { reviewCheckArray, isLoading, error }
}

/** SUB FUNCTION of useReviewCheckApi PATCH */
const patchReviewCheckArray = async (
    studentId: string,
    editedIdStatusDictArray: EditedIdStatusDict[],
    setErroPatch: React.Dispatch<any>,
    setIsLoadingPatch: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        if (editedIdStatusDictArray.length === 0) { return }
        console.log("---- preparing to ")
        const url = `http://localhost:3030/review-check/${studentId}`
        const response = await axios.patch(url, editedIdStatusDictArray)
        console.log("---- response:", response, editedIdStatusDictArray)
        setErroPatch(null)
    } catch (error) {
        console.error("---- ERROR", error)
        setErroPatch(error.message)

    } finally {
        setIsLoadingPatch(false)
    }
}
/** API PATCH */
const useReviewCheckApiPatch = () => {
    const [errorPatch, setErroPatch] = useState(null)
    const [isLoadingPatch, setIsLoadingPatch] = useState<boolean>(true)
    /** PATCH  */
    const patchReviewCheck = useCallback(
        (
            studentId: string,
            editedIdStatusDictArray: EditedIdStatusDict[]
        ) => {
            console.log("---- this clicked")
            patchReviewCheckArray(studentId, editedIdStatusDictArray, setErroPatch, setIsLoadingPatch)
        },
        []
    )

    return { patchReviewCheck, isLoadingPatch, errorPatch }
}


/** 
 * setRecentTwoIndexes 생성, 반환
 * 여기서 status array 업데이트 함
 */
const useCheckboxStatus = (reviewCheckArray: ReviewCheckData[] | null) => {
    const [recentTwoIndexes, setRecentTwoIndexes] = useState<number[]>([])

    const statusArray = useMemo(
        () => {
            if (!reviewCheckArray) { return [] }

            const initialStatusArray = reviewCheckArray.map((reviewCheck) => reviewCheck.status)

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

/** SUB FUNCTION of useCheckboxClickHandler */
const updateRecentTwoIndexes = (
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

/**  
 * update recent two index가 메인 기능
 * 
 * 부모에게서 파라미터를 받아야 해서 콜백으로 감싸는 함수
*/
const useCheckboxClickHandler = ({ setRecentTwoIndexes }: HandleClickParams) => {
    return useCallback<MouseEventHandler<HTMLDivElement>>(
        (event) => {
            const optionalIndex = event.currentTarget.dataset.index
            if (!optionalIndex) { return }

            const index = Number(optionalIndex)
            updateRecentTwoIndexes(index, setRecentTwoIndexes)
        },
        []
    )
}

/** 
 * status update -> color change -> this runs
 * 
 * 내 status 바뀌면 그걸 부모한테 전달함
 */
const useEditedIndexTracker = (
    // index: number,
    reviewCheckId: string,
    status: CheckboxStatus,
    reviewCheckData: ReviewCheckData,
    setEditedIdStatusDictArray: React.Dispatch<React.SetStateAction<EditedIdStatusDict[]>>,
) => {
    useEffect(
        () => {
            setEditedIdStatusDictArray(prevDictArray => {
                const indexInPrevArray = prevDictArray.findIndex((dict) => dict.reviewCheckId === reviewCheckId)
                const copiedArray = [...prevDictArray]

                if (indexInPrevArray !== -1) {
                    copiedArray.splice(indexInPrevArray, 1)
                }

                if (status !== reviewCheckData.status) {
                    copiedArray.push({ reviewCheckId, status })
                }

                return copiedArray
            })
        },
        [status]
    )
}

// const patchReviewCheckArray = async () => {
//     try {

//     } catch (error) {

//     } finally
// }
// const useReviewCheckPatchApi = useCallback(
//     () => {

//     },
//     []
// )


export { useReviewCheckApi, useReviewCheckApiPatch, useCheckboxStatus, useCheckboxClickHandler, useEditedIndexTracker }
