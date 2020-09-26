import { Answer } from './answer';

export interface QuestionReqDTO {
  question: string;
  answers: Answer[];
}
