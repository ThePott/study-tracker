export const completedStatusArray = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
export type CompletedStatus = typeof completedStatusArray[number]; // "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"

export const inProgressStatusArray = ["PREV_HOMEWROK", "TODAY_WORK", "NEXT_HOMEWORK"] as const
export type InProgressStatus = typeof inProgressStatusArray[number]

// const whenToDoArray = ["IN_CLASS", "HOMEWORK"] as const
// type WhenToDo = typeof whenToDoArray[number]

export interface ProgressData {
  _id: string;
  studentId: string;
  bookId: string;
  topicId: string;
  stepId: string;
  groupId: string;

  completed: CompletedStatus; // adjust based on possible values
  inProgressStatus: InProgressStatus;
  doNeedToAsk: boolean;
  // whenToDo: WhenToDo // adjust based on possible values
}

// interface EditedIdStatusDict {
//   progressId: string
//   inProgressStatus: InProgressStatus
// }

/** id -> status 
 * 
 * KEY: progress Id, VALUE: in progress status */
export type StatusDict = Record<string, InProgressStatus>;

export interface ProgressState {
  progressArray: ProgressData[]
  setProgressArray: (progressArray: ProgressData[]) => void

  initialStatusDict: StatusDict
  setInitialStatusDict: (progressArray: ProgressData[]) => void

  editedStatusDict: StatusDict
  handleStatusChange: (progress: ProgressData) => void
  mergeStatusToInitial: () => void
  // addToEditedStatusDict: (progress: ProgressData) => void
  // deleteFromEditedStatusDict: (progress: ProgressData) => void

  /** 칸반 */
  activeProgress: ProgressData | null
  /** 칸반 */
  setActiveProgress: (activeProgress: ProgressData | null) => void
  /** 칸반 */
  updateProgress: (progress: ProgressData) => void

  // editedProgressArray: ProgressData[],
  // updateOneEditedProgressArray: (prevStatus: InProgressStatus, progress: ProgressData) => void
}