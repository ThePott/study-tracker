import { ApiResponse } from '@/interfaces/commonInterfaces'
import { EditedIdStatusDict, HandleClickParams, ReviewCheckData } from "@/interfaces/reviewCheckInterfaces"
import useReviewCheckStore from '@/store/reviewCheckStore'
import axios from 'axios'
import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'

/** SUB FUNCTION of useReviewCheckApi GET */
const getReviewCheckArray = async (
    setResponse: (response: ApiResponse | null) => void,
    studentId: string,
    setGroupedBookObject: (groupedBookObject: any) => void,
    setBookTitleArray: (bookTitleArray: string[] | null) => void,

) => {
    try {
        const response: ApiResponse = {
            status: "IS_LOADING",
            message: null,
            doOpenSnackbar: false
        }
        setResponse(response)

        const url = `http://localhost:3030/review-check/${studentId}`
        const json = await axios.get(url)

        const data = json.data
        setGroupedBookObject(data.groupedBookObject)
        setBookTitleArray(data.bookTitleArray)

        response.status = "SUCCESS"
        setResponse(response)
    } catch (error) {
        console.error("---- ERROR", error)
        const response: ApiResponse = {
            status: "ERROR",
            message: JSON.stringify(error),
            doOpenSnackbar: true
        }
        setResponse(response)
    }
}

/** API GET */
const useReviewCheckApi = (studentId: string) => {
    const setResponse = useReviewCheckStore((state)=> state.setResponse)
    const setGroupedBookObject = useReviewCheckStore((state)=> state.setGroupedBookObject)
    const setBookTitleArray = useReviewCheckStore((state)=> state.setBookTitleArray)

    /** GET */
    useEffect(
        () => {
            getReviewCheckArray(setResponse, studentId, setGroupedBookObject, setBookTitleArray)
        },
        [studentId]
    )
}


// ---------------------- 여기서 시연 -------------------------
/** ACUTAL PATCH  */
const patchReviewCheckArray2 = async (
    studentId: string,
    editedIdStatusDictArray: EditedIdStatusDict[],
    updateReviewCheckArray: (editedIdStatusDictArray: EditedIdStatusDict[]) => void,
    setEditedIdStatusDictArray: (editedIdStatusDictArray: EditedIdStatusDict[]) => void,
    setResponse: (response: ApiResponse) => void,
) => {
    try {
        if (editedIdStatusDictArray.length === 0) { return }

        const response: ApiResponse = {
            status: "IS_LOADING",
            message: null,
            doOpenSnackbar: false
        }
        setResponse(response)

        const url = `http://localhost:3030/review-check/${studentId}`
        // const url = `http://localhost:3030/review-checkxxxxxxxxxx/${studentId}` // <---- 오류 일으키는 용
        const _ = await axios.patch(url, editedIdStatusDictArray)

        updateReviewCheckArray(editedIdStatusDictArray)
        setEditedIdStatusDictArray([])

        response.status = "SUCCESS"
        setResponse(response)
    } catch (error) {
        const response: ApiResponse = {
            status: "ERROR",
            message: JSON.stringify(error),
            doOpenSnackbar: true
        }
        setResponse(response)
        console.error("---- ERROR", error)
    }
}

/** 
 * setRecentTwoIndexes 생성, 반환
 * 여기서 status array 업데이트 함
 */
const useCheckboxStatus = (reviewCheckArray: ReviewCheckData[] | null) => {
    const [recentTwoIndexes, setRecentTwoIndexes] = useState<number[]>([])
    const changeTo = useReviewCheckStore((state) => state.changeTo)
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

            copiedInitialStatusArray.splice(startIndex, spliceLength, ...Array(spliceLength).fill(changeTo))

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
 * 
 * ==== 개선 가능 ====
 * 그냥 () => 함수() 형태로 바꾸면 된다. 어렵게 하지 말자
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

const useReviewCheckUpdate = () => {
    const selectedBookTitle = useReviewCheckStore((state) => state.selectedBookTitle)
    const setSelectedBookTitle = useReviewCheckStore((state) => state.setSelectedBookTitle)
    const groupedBookObject = useReviewCheckStore((state) => state.groupedBookObject)
    const setReviewCheckArray = useReviewCheckStore((state) => state.setReviewCheckArray)

    useEffect(
        () => {
            // 1. 텅 비었으면 아무것도 안 함
            if (!groupedBookObject) { return }
            // 2. 타이틀만 텅 비었으면 리뷰도 비움
            if (!selectedBookTitle) {
                setReviewCheckArray(null)
                return
            }
            // 3. 둘다 차있으면 제목에 맞게 리뷰 채움
            const reviewCheckArrayInBook = groupedBookObject[selectedBookTitle]
            if (!reviewCheckArrayInBook) { return }

            setReviewCheckArray(reviewCheckArrayInBook)
        },
        [selectedBookTitle]
    )
}


export {
    patchReviewCheckArray2, useCheckboxClickHandler, useCheckboxStatus, useReviewCheckApi, useReviewCheckUpdate
}
