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

export type ReviewCheckStatusDict = Record<number, ReviewCheckStatus>
/** bookId: review check array */
export type ReviewCheckArrayInDict = Record<string, ReviewCheck[]>

export interface ReviewCheckSlice {
    reviewCheckArrayInDict: ReviewCheckArrayInDict
    setReviewCheckArrayInDict: (reviewCheckArrayInDict: ReviewCheckArrayInDict) => void
    
}
