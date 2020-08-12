import { Comment } from './comment';

export interface Question {
  question: string,
  id: number,
  comments: Comment[]
}
