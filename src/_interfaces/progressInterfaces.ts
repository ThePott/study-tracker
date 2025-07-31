export const completedStatusArray = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
export type CompletedStatus = typeof completedStatusArray[number]

export const inProgressStatusArray = ["PREV_HOMEWROK", "TODAY_WORK", "NEXT_HOMEWORK"] as const
export type InProgressStatus = typeof inProgressStatusArray[number]


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


/** id -> status 
 * 
 * KEY: progress Id, VALUE: in progress status */
export type StatusDict = Record<string, InProgressStatus>
export type CompletedDict = Record<string, CompletedStatus>

export interface ProgressState {
  progressArray: ProgressData[]
  setProgressArray: (progressArray: ProgressData[]) => void

  initialCompletedDict: CompletedDict
  setInitialCompletedDict: (progressArray: ProgressData[]) => void

  editedCompletedDict: CompletedDict
  // handleCompletedChange: (progress: ProgressData) => void
  mergeCompletedToInitial: () => void

  changeCompleted: (progress: ProgressData) => void

  initialStatusDict: StatusDict
  setInitialStatusDict: (progressArray: ProgressData[]) => void

  editedStatusDict: StatusDict
  handleStatusChange: (progress: ProgressData) => void
  mergeStatusToInitial: () => void

  /** 칸반 */
  activeProgress: ProgressData | null
  /** 칸반 */
  setActiveProgress: (activeProgress: ProgressData | null) => void
  /** 칸반 */
  updateProgress: (progress: ProgressData) => void
}