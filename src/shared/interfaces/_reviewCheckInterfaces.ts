export type ReviewCheckStatus = "DONE" | "PASS" | "WORONG" | "CORRECT" | "NOT_SOLVED"

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

export type ReviewCheckStatusDict = Record<number, ReviewCheckStatus>

export interface ReviewCheckSlice {
    reviewCheckGroupedByBook: ReviewCheckGroupedByBook
    setReviewCheckGroupedByBook: (reviewCheckGroupedByBook: ReviewCheckGroupedByBook) => void

    selectedBookTitle: string | null
    setSelectedBookTitle: (selectedBookTitle: string | null) => void
    
    recentTwo: number[]
    addToRecentTwo: (reviewCheckId: number) => void
}
