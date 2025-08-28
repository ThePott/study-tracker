export const reviewCheckStatusArray = [ "DONE", "PASS", "WRONG", "CORRECT", "NOT_SOLVED"] as const
export type ReviewCheckStatus = typeof reviewCheckStatusArray[number]

export interface ReviewCheck {
    id: number
    questionPage: number
    questionLabel: string
    status: ReviewCheckStatus
    bookTitle: string
    topicTitle: string
    stepTitle: string
}

/** question page: review check array */
export type ReviewCheckGroupedByPage = Record<number, ReviewCheck[]>

/** bookId: review check array */
export type ReviewCheckGroupedByBook = Record<string, ReviewCheckGroupedByPage>

export interface ReviewCheckStatusInfoDict {
    status: ReviewCheckStatus
    page: number
}

/** review check id: {review check status, page} */
export type ReviewCheckStatusDict = Record<number, ReviewCheckStatusInfoDict>

export interface ReviewCheckSlice {
    reviewCheckGroupedByBook: ReviewCheckGroupedByBook
    setReviewCheckGroupedByBook: (reviewCheckGroupedByBook: ReviewCheckGroupedByBook) => void

    selectedBookTitle: string | null
    setSelectedBookTitle: (selectedBookTitle: string | null) => void

    changeTo: ReviewCheckStatus
    setChangeTo: (changeTo: ReviewCheckStatus) => void

    initialReviewCheckStatusDict: ReviewCheckStatusDict
    editedReviewCheckStatusDict: ReviewCheckStatusDict
    multiSelectedReviewCheckStatusDict: ReviewCheckStatusDict
    mergeReviewCheckStatusToInitial: () => void

    isMultiSelecting: boolean
    toggleIsMultiSelecting: () => void

    recentTwo: number[]
    handleCheckboxClick: (reviewCheck: ReviewCheck) => void
}
