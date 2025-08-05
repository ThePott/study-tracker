import { ApiResponse } from '@/src/shared/interfaces/_apiInterfaces'
import { EditedIdStatusDict } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import useBoundStore from '../shared/store'
import axios from 'axios'
import { MouseEventHandler, useCallback, useEffect } from 'react'

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
    const setResponse = useBoundStore((state) => state.setResponse)
    const setGroupedBookObject = useBoundStore((state) => state.setGroupedBookObject)
    const setBookTitleArray = useBoundStore((state) => state.setBookTitleArray)

    /** GET */
    useEffect(
        () => {
            getReviewCheckArray(setResponse, studentId, setGroupedBookObject, setBookTitleArray)
        },
        [studentId]
    )
}
// api관련된 건 별도 폴더로 구분
// backend기준으로 세부 폴더 구분

/** ACUTAL PATCH  */
const patchReviewCheckArray2 = async (
    studentId: string,
    editedIdStatusDictArray: EditedIdStatusDict[],
    updateReviewCheckArray: (editedIdStatusDictArray: EditedIdStatusDict[]) => void,
    setEditedIdStatusDictArray: (editedIdStatusDictArray: EditedIdStatusDict[]) => void,
    setResponse: (response: ApiResponse) => void,
) => {
    try {
        console.log("...patch stage 1")
        if (editedIdStatusDictArray.length === 0) {
            const response: ApiResponse = {
                status: "SUCCESS",
                message: null,
                doOpenSnackbar: false
            }
            setResponse(response)
            return
        }
        console.log("...patch stage 2")
        const copiedEditedArray = [...editedIdStatusDictArray]
        updateReviewCheckArray(editedIdStatusDictArray)
        setEditedIdStatusDictArray([])

        console.log("---- LOADING for patch")
        const response: ApiResponse = {
            status: "IS_LOADING",
            message: null,
            doOpenSnackbar: false
        }
        setResponse(response)
        console.log("...patch stage 3")
        const url = `http://localhost:3030/review-check/${studentId}`
        // const url = `http://localhost:3030/review-checkxxxxxxxxxx/${studentId}` // <---- 오류 일으키는 용
        const _ = await axios.patch(url, copiedEditedArray)
        console.log("...patch stage 4")
        const copiedResponse = { ...response }
        copiedResponse.status = "SUCCESS"
        setResponse(copiedResponse)
        console.log("---- SUCCESS")
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

/** selected book -> review check array 채움 */
const useReviewCheckUpdate = () => {
    const selectedBookTitle = useBoundStore((state) => state.selectedBookTitle)
    const groupedBookObject = useBoundStore((state) => state.groupedBookObject)
    const setReviewCheckArray = useBoundStore((state) => state.setReviewCheckArray)

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

/** click event -> recent two indexes || single update on status array */
const useCheckboxClickHandler = () => {
    const appendToRecentTwoIndexes = useBoundStore((state) => state.appendToRecentTwoIndexes)
    const updateOneOfStatusArray = useBoundStore((state) => state.updateOneOfStatusArray)

    return useCallback<MouseEventHandler<HTMLButtonElement>>(
        (event) => {
            const optionalIndex = event.currentTarget.dataset.index
            if (!optionalIndex) { return }

            const index = Number(optionalIndex)

            const isMultiSelecting = useBoundStore.getState().isMultiSelecting

            if (isMultiSelecting) {
                appendToRecentTwoIndexes(index)
                return
            }

            updateOneOfStatusArray(index)
        },
        []
    )
}

/** review check array || recent two indexes -> update status array  */
const useUpdateStatusArray = () => {
    const updateStatusArray = useBoundStore((state) => state.updateStatusArray)
    const reviewCheckArray = useBoundStore((state) => state.reviewCheckArray)
    const recentTwoIndexes = useBoundStore((state) => state.recentTwoIndexes)
    useEffect(
        () => {
            const isMultiSelecting = useBoundStore.getState().isMultiSelecting
            if (!isMultiSelecting) { return }

            updateStatusArray()
        },
        [reviewCheckArray, recentTwoIndexes]
    )
}

/** edited array -> time out -> patch request */
const useAutoSave = (studentId: string) => {
    const updateReviewCheckArray = useBoundStore((state) => state.updateReviewCheckArray)
    const setEditedIdStatusDictArray = useBoundStore((state) => state.setEditedIdStatusDictArray)
    const setResponse = useBoundStore((state) => state.setResponse)

    const editedIdStatusDictArray = useBoundStore((state) => state.editedIdStatusDictArray)

    useEffect(
        () => {
            const waitingPatch = () => {
                patchReviewCheckArray2(studentId, editedIdStatusDictArray, updateReviewCheckArray, setEditedIdStatusDictArray, setResponse)
            }
            const timeoutId = setTimeout(waitingPatch, 2000)

            return () => clearTimeout(timeoutId)
        },
        [editedIdStatusDictArray]
    )
}

const useManualPatchWhenUnmount = (studentId: string) => {
    const updateReviewCheckArray = useBoundStore((state) => state.updateReviewCheckArray)
    const setEditedIdStatusDictArray = useBoundStore((state) => state.setEditedIdStatusDictArray)
    const setResponse = useBoundStore((state) => state.setResponse)


    useEffect(
        () => {
            return () => {
                const editedIdStatusDictArray = useBoundStore.getState().editedIdStatusDictArray
                patchReviewCheckArray2(studentId, editedIdStatusDictArray, updateReviewCheckArray, setEditedIdStatusDictArray, setResponse)
                console.log("---- manual patch when unmount")
            }
        },
        []
    )
}

export {
    patchReviewCheckArray2, useAutoSave, useCheckboxClickHandler, useManualPatchWhenUnmount, useReviewCheckApi, useReviewCheckUpdate,
    useUpdateStatusArray
}

