const completedStatusArray = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
type CompletedStatus = typeof completedStatusArray[number]; // "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"

const whenToDoArray = ["IN_CLASS", "HOMEWORK"] as const
type WhenToDo = typeof whenToDoArray[number]

interface ProgressData {
  _id: string;
  groupId: string;
  bookId: string;
  completed: CompletedStatus; // adjust based on possible values
  doNeedToAsk: boolean;
  stepId: string;
  studentId: string;
  topicId: string;
  whenToDo: WhenToDo // adjust based on possible values
}

export { completedStatusArray, CompletedStatus, ProgressData }