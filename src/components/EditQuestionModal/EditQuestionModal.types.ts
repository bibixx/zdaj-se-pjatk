type Question = string;
type Id1 = string;
type NumberOfComments = number;
type Answer = string;
type Correct = boolean;
type Answers = Items1[];
type Comments = unknown[];
type CreatedAt = number;
type $Schema = '../../../schemas/subject-patch.json';
type IsMarkdown = boolean;

export interface OutputOverrideSubjectQuestion {
  question?: Question;
  id: Id1;
  numberOfComments?: NumberOfComments;
  answers?: Answers;
  comments?: Comments;
  isMarkdown: IsMarkdown;
  createdAt: CreatedAt;
  $schema: $Schema;
}

interface Items1 {
  answer: Answer;
  correct: Correct;
  isMarkdown: IsMarkdown;
}
