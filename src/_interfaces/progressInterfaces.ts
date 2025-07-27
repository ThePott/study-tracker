export const completedStatusArray = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
export type CompletedStatus = typeof completedStatusArray[number]; // "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"

export const inProgressStatusArray = ["PREV_HOMEWROK", "TODAY_WORK", "NEXT_HOMEWORK"]
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

export interface ProgressState {
  progressArray: ProgressData[]
  setProgressArray: (progressArray: ProgressData[]) => void

  activeProgress: ProgressData | null
  setActiveProgress: (activeProgress: ProgressData | null) => void
}