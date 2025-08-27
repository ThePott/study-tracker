import { ApiResponse } from "./_apiInterfaces"

const checkboxStatusArray = [
    "DONE",
    "PASS",
    "WRONG",
    "CORRECT",
    "NOT_SOLVED",
] as const
export type CheckboxStatus = (typeof checkboxStatusArray)[number]

export interface ReviewCheckData {
    _id: string
    studentId: string

    /** bookTitle: tag1 */
    bookTitle: string
    /** topicTitle: tag2 */
    topicTitle: string
    stepTitle: string // tag3
    questionPage: number // QPage
    questionNumber: number // QNum

    // Review session info
    reviewHandoutName: string // e.g., "2025-06-19" or "Review_2025_06_19"

    // Status tracking
    status: CheckboxStatus
    isReviewed: boolean // For tracking if wrong questions have been reviewed

    // Timestamps
    createdAt: Date // When review entry was created
    lastModified?: Date // When student last updated status
    reviewedAt?: Date // When teacher marked as reviewed (optional)
}

export interface CheckboxProps {
    index: number
    reviewCheckData: ReviewCheckData
    status: CheckboxStatus
}

export interface EditedIdStatusDict {
    reviewCheckId: string
    status: CheckboxStatus
}

export interface CheckboxSectionProps {
    studentId: string
}
// 서버에서 dto는 api와 같은 폴더에
// 서버에서 오는, 비동기 로직은 그 폴더만 참조하면 되게
// 화면에서 쓰이는 건 그 화면이랑 가깝게
// 여러 화면에서 사용하는 인터페이스는 관련된 훅 파일에
//
export interface ReviewCheckSlice {
    // // ---- fetch releated -----
    // groupedBookObject: any
    // bookTitleArray: string[] | null
    // selectedBookTitle: string | null
    // setGroupedBookObject: (groupedBookObject: any) => void
    // setBookTitleArray: (bookTitleArray: string[] | null) => void
    // setSelectedBookTitle: (selectedBookTitle: string) => void

    // reviewCheckArray: ReviewCheckData[]
    // setReviewCheckArray: (newArray: ReviewCheckData[]) => void
    // updateReviewCheckArray: (
    //     editedIdStatusDictArray: EditedIdStatusDict[]
    // ) => void

    // editedIdStatusDictArray: EditedIdStatusDict[]
    // /** 얘보단 아래 걸 더 많이 쓸 거 같은데 맞네 비울 때만 쓴다 */
    // setEditedIdStatusDictArray: (
    //     editedIdStatusDictArray: EditedIdStatusDict[]
    // ) => void
    // /** 내 status 바뀜 -> 에디티드에 있는지 확인 후 갱신  */
    // updateOneEditedIdStatusDictArray: (
    //     status: CheckboxStatus,
    //     reviewCheck: ReviewCheckData
    // ) => void

    // response: ApiResponse | null
    // setResponse: (response: ApiResponse | null) => void
    // hideResponseSnackbar: () => void
    // startResponseLoading: () => void

    // changeTo: CheckboxStatus
    // setChangeTo: (changeTo: CheckboxStatus) => void

    // isMultiSelecting: boolean
    // setIsMultiSelecting: (isMultiSelecting: boolean) => void

    // recentTwoIndexes: number[]
    // appendToRecentTwoIndexes: (index: number) => void
    // clearRecentTwoIndexes: () => void

    // statusArray: CheckboxStatus[]
    // updateStatusArray: () => void
    // updateOneOfStatusArray: (index: number) => void
    // clearStatusArray: () => void
}
