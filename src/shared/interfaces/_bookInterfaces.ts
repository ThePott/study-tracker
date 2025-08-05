export interface QuestionGroup {
  group: string;
  groupId: string;
}

export interface Step {
  title: string;
  questionGroupArray: QuestionGroup[];
  stepId: string;
}

export interface Topic {
  title: string;
  stepArray: Step[];
  topicId: string;
}

export interface BookData {
  _id: string;
  title: string;
  topicArray: Topic[];
}
