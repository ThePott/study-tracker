// ---- book collection
interface QuestionGroup {
  group: string;
  groupId: string;
}

interface Step {
  title: string;
  questionGroupArray: QuestionGroup[];
  stepId: string;
}

interface Topic {
  title: string;
  stepArray: Step[];
  topicId: string;
}

interface BookData {
  _id: string;
  title: string;
  topicArray: Topic[];
}

// ---- progress collection ----
const possibleCompletedArray = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
type CompletedStatus = typeof possibleCompletedArray[number]; // "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
interface ProgressData {
  _id: string;
  groupId: string;
  bookId: string;
  completed: CompletedStatus; // adjust based on possible values
  doNeedToAsk: boolean;
  stepId: string;
  studentId: string;
  topicId: string;
  whenToDo: "IN_CLASS" | "HOMEWORK"; // adjust based on possible values
}


export { ProgressData, BookData, Topic, Step, QuestionGroup, possibleCompletedArray, CompletedStatus }
