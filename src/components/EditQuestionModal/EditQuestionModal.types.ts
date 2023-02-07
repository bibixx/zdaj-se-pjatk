type Title = string;
type Id = string;
type Question = string;
type Id1 = number;
type NumberOfComments = number;
type Answer = string;
type Correct = boolean;
type Answers = Items1[];
type Comments = unknown[];
type Data = OutputOverrideSubjectQuestion[];
type UpdatedAt = number;
type IsMarkdown = boolean;
type Schema = string;

export interface OutputOverrideSubject {
  $schema: Schema;
  title?: Title;
  id?: Id;
  data: Data;
  updatedAt: UpdatedAt;
}
export interface OutputOverrideSubjectQuestion {
  question?: Question;
  id?: Id1;
  numberOfComments?: NumberOfComments;
  answers?: Answers;
  comments?: Comments;
  isMarkdown: IsMarkdown;
}
interface Items1 {
  answer: Answer;
  correct: Correct;
  isMarkdown: IsMarkdown;
}
