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
interface ProgressData {
  _id: string;
  groupId: string;
  bookId: string;
  completed: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"; // adjust based on possible values
  doNeedToAsk: boolean;
  stepId: string;
  studentId: string;
  topicId: string;
  whenToDo: "IN_CLASS" | "HOMEWORK"; // adjust based on possible values
}


export { ProgressData, BookData, Topic, Step, QuestionGroup }
