import { Comment } from './comment';
import { Answer } from './answer';

export interface Question {
  question: string,
  id: number | string,
  comments: Comment[],
  answers: Answer[]
}
