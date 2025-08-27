export type ReviewCheckStatus = "DONE" | "PASS" | "WORONG" | "CORRECT" | "NOT_SOLVED"

export interface ReviewCheck {
    id: number
    questionId: number
    status: ReviewCheckStatus
}

export type ReviewCheckStatusDict = Record<number, ReviewCheckStatus>

export interface ReviewCheckSlice {
    reviewCheckArray: ReviewCheck[]
    setReviewCheckArray: (reviewCheckArray: ReviewCheck[]) => void

    getReviewCheckArray: (studentId: number) => void
    
}
