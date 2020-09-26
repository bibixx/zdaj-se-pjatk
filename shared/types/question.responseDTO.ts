import { Comment } from './comment';
import { Answer } from './answer';

export interface QuestionResDTO {
  question: string;
  comments: Comment[];
  answers: Answer[];
}
