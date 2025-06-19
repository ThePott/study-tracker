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


// ======== review check ========
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
  status: "NOT_YET" | "CORRECT" | "WRONG";
  isReviewed: boolean; // For tracking if wrong questions have been reviewed

  // Timestamps
  createdAt: Date;      // When review entry was created
  lastModified?: Date;   // When student last updated status
  reviewedAt?: Date;    // When teacher marked as reviewed (optional)
}








export {
  ProgressData,
  BookData,
  Topic,
  Step,
  QuestionGroup,
  possibleCompletedArray,
  CompletedStatus,
  ReviewCheckData
}
