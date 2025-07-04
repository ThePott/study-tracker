import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { CheckboxStatus, EditedIdStatusDict, HandleClickParams, PatchResponse, ReviewCheckData } from "@/interfaces/reviewCheckInterfaces"

/** SUB FUNCTION of useReviewCheckApi GET */
const getReviewCheckArray = async (
    setError: React.Dispatch<React.SetStateAction<null>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    studentId: string,
    setGroupedBookObject: React.Dispatch<any>,
    setBookTitleArray: React.Dispatch<React.SetStateAction<string[]>>

) => {
    try {
        const url = `http://localhost:3030/review-check/${studentId}`
        const response = await axios.get(url)

        const data = response.data
        setGroupedBookObject(data.groupedBookObject)
        setBookTitleArray(data.bookTitleArray)
    } catch (error) {
        console.error("---- ERROR", error)
        setError(error.message)
    } finally {
        setIsLoading(false)
    }
}

/** API GET */
const useReviewCheckApi = (studentId: string) => {
    // const [reviewCheckArray, setReviewCheckArray] = useState<ReviewCheckData[] | null>(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [groupedBookObject, setGroupedBookObject] = useState<any>(null)
    const [bookTitleArray, setBookTitleArray] = useState<string[]>([])

    /** GET */
    useEffect(
        () => {
            getReviewCheckArray(setError, setIsLoading, studentId, setGroupedBookObject, setBookTitleArray)
        },
        [studentId]
    )

    return { isLoading, error, bookTitleArray, groupedBookObject }
}

/** SUB FUNCTION of useReviewCheckApi PATCH 
 * 
 * ---- 삭제해야 ----*/
const patchReviewCheckArray = async (
    studentId: string,
    editedIdStatusDictArray: EditedIdStatusDict[],
    setErroPatch: React.Dispatch<any>,
    setIsLoadingPatch: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        if (editedIdStatusDictArray.length === 0) { return }
        const url = `http://localhost:3030/review-check/${studentId}`
        const response = await axios.patch(url, editedIdStatusDictArray)
        setErroPatch(null)
    } catch (error) {
        console.error("---- ERROR", error)
        setErroPatch(error.message)

    } finally {
        setIsLoadingPatch(false)
    }
}



/** ACUTAL PATCH  */
const patchReviewCheckArray2 = async (
    studentId: string,
    editedIdStatusDictArray: EditedIdStatusDict[],
    setPatchResponse: React.Dispatch<React.SetStateAction<PatchResponse>>
) => {
    try {
        if (editedIdStatusDictArray.length === 0) { return }

        setPatchResponse((prev) => ({ ...prev, status: "IS_LOADING" }))
        const url = `http://localhost:3030/review-check/${studentId}`
        const response = await axios.patch(url, editedIdStatusDictArray)
        
        setPatchResponse((prev) => ({ status: "IS_LOADING", message: null }))

        // 여기에서 할 것
        // 1111111111
    } catch (error) {
        console.error("---- ERROR", error)
        setPatchResponse((prev) => ({ status: "IS_LOADING", message: error }))
    }
}



/** API PATCH MANUALLY */
const useReviewCheckPatchManual = (
    studentId: string,
    editedIdStatusDictArray: EditedIdStatusDict[],
    setPatchResponse: React.Dispatch<React.SetStateAction<PatchResponse>>
) => {
    console.log("----redefining unmount effect")
    useEffect(
        () => {
            return () => {
                patchReviewCheckArray2(studentId, editedIdStatusDictArray, setPatchResponse)
                console.log("---- manual patch when unmount")
            }
        },
        []
    )
}



const useReviewCheckPatchAutoOld = (studentId: string, editedIdStatusDictArray: EditedIdStatusDict[]) => {
    const [errorPatch, setErroPatch] = useState(null)
    const [isLoadingPatch, setIsLoadingPatch] = useState<boolean>(true)
    /** PATCH  */
    useEffect(
        () => {
            if (editedIdStatusDictArray.length === 0) { return }

            const waitingPatch = () => {
                patchReviewCheckArray(studentId, editedIdStatusDictArray, setErroPatch, setIsLoadingPatch)
                console.log("---- saved automatically!")
            }
            const timeoutId = setTimeout(waitingPatch, 2000)

            return () => clearTimeout(timeoutId)
        },
        [studentId, editedIdStatusDictArray]
    )

    return { isLoadingPatch, errorPatch }
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

            // !!!!----TODO 한 번 만들고 재사용해도 됨. useRef? ----!!!!
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
    return useCallback<MouseEventHandler<HTMLButtonElement>>(
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

export {
    useReviewCheckApi,
    // useReviewCheckApiPatch,
    useCheckboxStatus,
    useCheckboxClickHandler,
    useEditedIndexTracker,
    useReviewCheckPatchAutoOld,
    useReviewCheckPatchManual,
    patchReviewCheckArray2
}
