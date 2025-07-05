import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { CheckboxStatus, EditedIdStatusDict, HandleClickParams, PatchResponse, ReviewCheckData } from "@/interfaces/reviewCheckInterfaces"
import useReviewCheckStore from '@/store/reviewCheckStore'

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
    // setPatchResponse: React.Dispatch<React.SetStateAction<PatchResponse>>,
    updateReviewCheckArray: (editedIdStatusDictArray: EditedIdStatusDict[]) => void,
    setEditedIdStatusDictArray: (editedIdStatusDictArray: EditedIdStatusDict[]) => void,
) => {
    try {
        if (editedIdStatusDictArray.length === 0) { return }
        // setPatchResponse((prev) => ({ ...prev, status: "IS_LOADING" }))
        const url = `http://localhost:3030/review-check/${studentId}`
        const response = await axios.patch(url, editedIdStatusDictArray)
        
        updateReviewCheckArray(editedIdStatusDictArray)
        setEditedIdStatusDictArray([])

        // setPatchResponse({ status: "SUCCESS", message: null })
    } catch (error) {
        console.error("---- ERROR", error)
        // setPatchResponse((prev) => ({ status: "ERROR", message: error }))
    }
}



// /** API PATCH MANUALLY */
// const useReviewCheckPatchManual = (
//     studentId: string,
//     editedIdStatusDictArray: EditedIdStatusDict[],
//     setPatchResponse: React.Dispatch<React.SetStateAction<PatchResponse>>
// ) => {
//     console.log("---- not gonna use it!")
//     console.log("----redefining unmount effect")

//     const updateReviewCheckArray = useReviewCheckStore((state) => state.updateReviewCheckArray)

//     useEffect(
//         () => {
//             return () => {
//                 patchReviewCheckArray2(studentId, editedIdStatusDictArray, setPatchResponse, updateReviewCheckArray)

                


//                 console.log("---- manual patch when unmount")
//             }
//         },
//         []
//     )
// }



// const useReviewCheckPatchAutoOld = (studentId: string, editedIdStatusDictArray: EditedIdStatusDict[]) => {
//     const [errorPatch, setErroPatch] = useState(null)
//     const [isLoadingPatch, setIsLoadingPatch] = useState<boolean>(true)
//     const updateReviewCheckArray  = useReviewCheckStore((state) => state.updateReviewCheckArray)

//     console.log("---- auto save function called")
//     /** PATCH  */
//     useEffect(
//         () => {
//             console.log("---- this should not be called")
//             if (editedIdStatusDictArray.length === 0) { return }

//             const waitingPatch = () => {
//                 patchReviewCheckArray2(studentId, editedIdStatusDictArray, setErroPatch, updateReviewCheckArray)
//                 console.log("---- saved automatically!", editedIdStatusDictArray.length, editedIdStatusDictArray)
//             }
//             const timeoutId = setTimeout(waitingPatch, 2000)

//             return () => clearTimeout(timeoutId)
//         },
//         [studentId, editedIdStatusDictArray]
//     )

//     return { isLoadingPatch, errorPatch }
// }

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


export {
    useReviewCheckApi,
    useCheckboxStatus,
    useCheckboxClickHandler,
    // useReviewCheckPatchAutoOld,
    // useReviewCheckPatchManual,
    patchReviewCheckArray2
}
