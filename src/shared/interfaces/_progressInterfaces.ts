export const completedStatusArray = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
export type CompletedStatus = typeof completedStatusArray[number]

export const inProgressStatusArray = ["PREV_HOMEWROK", "TODAY_WORK", "NEXT_HOMEWORK"] as const
export type InProgressStatus = typeof inProgressStatusArray[number]

/** DEPRECATED: use `Progress` instead */
export interface ProgressData {
  _id: string
  studentId: string
  bookId: string
  topicId: string
  stepId: string
  groupId: string

  completed: CompletedStatus
  inProgressStatus: InProgressStatus
  doNeedToAsk: boolean
}

export interface Progress {
  id: number
  bookTitle: string
  topicTitle: string
  stepTitle: string
  questionGroupDescription: string
  completed: CompletedStatus
  doNeedToAsk: boolean
  inProgressStatus: InProgressStatus
}


/** progress.id: InProgressStatus */
export type StatusDict = Record<number, InProgressStatus>
/** progress.id: CompletedStatus */
export type CompletedDict = Record<number, CompletedStatus>
/** progress.bookTitle: Progress[] */
export type ProgressArrayInDict = Record<string, Progress[]>

export interface ProgressSlice {
  progressArrayInDict: ProgressArrayInDict
  setProgressArrayInDict: (progressArrayInDict: ProgressArrayInDict) => void

  initialCompletedDict: CompletedDict
  setInitialCompletedDict: (progressArrayInDict: ProgressArrayInDict) => void

  editedCompletedDict: CompletedDict
  // handleCompletedChange: (progress: Progress) => void
  mergeCompletedToInitial: () => void

  changeCompleted: (progress: Progress) => void

  initialStatusDict: StatusDict
  setInitialStatusDict: (progressArrayInDict: ProgressArrayInDict) => void

  editedStatusDict: StatusDict
  updateInProgressStatus: (bookTitle: string, id: number, inProgressStatus: InProgressStatus) => void
  mergeStatusToInitial: () => void

  /** 칸반 */
  activeProgress: Progress | null
  /** 칸반 */
  setActiveProgress: (activeProgress: Progress | null) => void
  /** 칸반 */
  updateProgress: (progress: Progress) => void

  doShowSkeleton: boolean
  setDoShowSkeleton: (doShowSkeleton: boolean) => void
}