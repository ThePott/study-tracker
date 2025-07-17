import { ApiResponse } from '@/interfaces/commonInterfaces'
import { EditedIdStatusDict, ReviewCheckData } from "@/interfaces/reviewCheckInterfaces"
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
        console.log("---- loading for get")
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
    const setResponse = useReviewCheckStore((state) => state.setResponse)
    const setGroupedBookObject = useReviewCheckStore((state) => state.setGroupedBookObject)
    const setBookTitleArray = useReviewCheckStore((state) => state.setBookTitleArray)

    /** GET */
    useEffect(
        () => {
            getReviewCheckArray(setResponse, studentId, setGroupedBookObject, setBookTitleArray)
        },
        [studentId]
    )
}


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
        
        console.log("---- loading for patch")
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



/** update recent two index가 메인 기능 */
const useCheckboxClickHandler = () => {
    const isMultiSelecting = useReviewCheckStore((state) => state.isMultiSelecting)
    // const updateStatusArray = useReviewCheckStore((state) => state.updateReviewCheckArray)
    const appendToRecentTwoIndexes = useReviewCheckStore((state) => state.appendToRecentTwoIndexes)

    return useCallback<MouseEventHandler<HTMLButtonElement>>(
        (event) => {
            const optionalIndex = event.currentTarget.dataset.index
            if (!optionalIndex) { return }

            const index = Number(optionalIndex)
            appendToRecentTwoIndexes(index)
        },
        []
    )
}

/** 선택된 책에 맞춰 review check array 채움 */
const useReviewCheckUpdate = () => {
    const selectedBookTitle = useReviewCheckStore((state) => state.selectedBookTitle)
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

const useUpdateStatusArray = () => {
    const updateStatusArray = useReviewCheckStore((state) => state.updateStatusArray)
    const reviewCheckArray = useReviewCheckStore((state) => state.reviewCheckArray)
    const recentTwoIndexes = useReviewCheckStore((state) => state.recentTwoIndexes)
    useEffect(() => { updateStatusArray() }, [reviewCheckArray, recentTwoIndexes])
}

const useTimeoutToAutoSave = (studentId: string) => {
    // 스토어 세터 함수는 콜백으로 감쌀 필요가 없어보이는데

    const updateReviewCheckArray = useCallback(useReviewCheckStore((state) => state.updateReviewCheckArray), [])
    const setEditedIdStatusDictArray = useCallback(useReviewCheckStore((state) => state.setEditedIdStatusDictArray), [])
    const setResponse = useCallback(useReviewCheckStore((state) => state.setResponse), [])

    const editedIdStatusDictArray = useReviewCheckStore((state) => state.editedIdStatusDictArray)

    useEffect(
        () => {
            const waitingPatch = () => {
                patchReviewCheckArray2(studentId, editedIdStatusDictArray, updateReviewCheckArray, setEditedIdStatusDictArray, setResponse)
                console.log("---- saved automatically!", editedIdStatusDictArray.length, editedIdStatusDictArray)
            }
            const timeoutId = setTimeout(waitingPatch, 2000)

            return () => clearTimeout(timeoutId)
        },
        [editedIdStatusDictArray]
    )
}

const useManualPatchWhenUnmount = (studentId: string) => {
    const updateReviewCheckArray = useCallback(useReviewCheckStore((state) => state.updateReviewCheckArray), [])
    const setEditedIdStatusDictArray = useCallback(useReviewCheckStore((state) => state.setEditedIdStatusDictArray), [])
    const setResponse = useCallback(useReviewCheckStore((state) => state.setResponse), [])
    const editedIdStatusDictArray = useReviewCheckStore((state) => state.editedIdStatusDictArray)

    useEffect(
        () => {
            return () => {
                patchReviewCheckArray2(studentId, editedIdStatusDictArray, updateReviewCheckArray, setEditedIdStatusDictArray, setResponse)
                console.log("---- manual patch when unmount")
            }
        },
        []
    )
}

export {
    patchReviewCheckArray2, useCheckboxClickHandler, useReviewCheckApi, useReviewCheckUpdate,
    useUpdateStatusArray, useTimeoutToAutoSave, useManualPatchWhenUnmount
}
