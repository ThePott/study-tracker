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

export {
  BookData,
  Topic,
  Step,
  QuestionGroup,
}
