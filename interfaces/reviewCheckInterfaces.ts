

const checkboxStatusArray = ["DONE", "PASS", "WRONG", "CORRECT", "NOT_SOLVED"] as const;
type CheckboxStatus = typeof checkboxStatusArray[number]

const responseStatusArray = ["SUCCESS", "IS_LOADING", "ERROR"] as const
type ResponseStatus = typeof responseStatusArray[number]

interface ReviewCheckData {
    _id: string;
    studentId: string;

    // Question identification (from your sheet format)
    bookTitle: string;    // tag1
    topicTitle: string;   // tag2  
    stepTitle: string;    // tag3
    questionPage: number; // QPage
    questionNumber: number; // QNum

    // Review session info
    reviewHandoutName: string; // e.g., "2025-06-19" or "Review_2025_06_19"

    // Status tracking
    status: CheckboxStatus;
    isReviewed: boolean; // For tracking if wrong questions have been reviewed

    // Timestamps
    createdAt: Date;      // When review entry was created
    lastModified?: Date;   // When student last updated status
    reviewedAt?: Date;    // When teacher marked as reviewed (optional)
}

interface HandleClickParams {
    setRecentTwoIndexes: React.Dispatch<React.SetStateAction<number[]>>,
}

/**
 * index는 이런 의미다
 * reviewCheckData는 이런 의미다
 */
interface CheckboxProps {
    index: number;
    reviewCheckData: ReviewCheckData;
    status: CheckboxStatus;
    setRecentTwoIndexes: React.Dispatch<React.SetStateAction<number[]>>;
    // setEditedIdStatusDictArray: React.Dispatch<React.SetStateAction<EditedIdStatusDict[]>>
}

interface EditedIdStatusDict {
    reviewCheckId: string;
    status: CheckboxStatus;
}

interface ReviewCheckHeader {
    studentId: string;
    editedIdStatusDictArray: EditedIdStatusDict[];
    // patchReviewCheck: (studentId: string, editedIdStatusDictArray: EditedIdStatusDict[]) => void
    // errorPatch: any
    isMultiSelecting: boolean
    setIsMultiSelecting: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedBookTitle: React.Dispatch<React.SetStateAction<string>>
}

interface CheckboxSectionProps {
    studentId: string
    editedIdStatusDictArray: EditedIdStatusDict[]
    // patchReviewCheck: (studentId: string, editedIdStatusDictArray: EditedIdStatusDict[]) => void
    // errorPatch: any
    isMultiSelecting: boolean
    setIsMultiSelecting: React.Dispatch<React.SetStateAction<boolean>>
    reviewCheckArray: ReviewCheckData[]
    statusArray: CheckboxStatus[]
    setRecentTwoIndexes: React.Dispatch<React.SetStateAction<number[]>>
    setEditedIdStatusDictArray: React.Dispatch<React.SetStateAction<EditedIdStatusDict[]>>
    setSelectedBookTitle: React.Dispatch<React.SetStateAction<string>>
    // setPatchResponse: React.Dispatch<React.SetStateAction<PatchResponse>>
}

/** ----DELETE THIS---- */
interface PatchResponse {
    status: ResponseStatus
    message: string | null
}


export {
    CheckboxStatus,
    ReviewCheckData,
    HandleClickParams,
    CheckboxProps,
    EditedIdStatusDict,
    ReviewCheckHeader,
    CheckboxSectionProps,
    PatchResponse
}