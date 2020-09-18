import { Comment } from './comment';
import { Answear } from './answear';

export interface Question {
  question: string,
  id: number | string,
  comments: Comment[],
  answears: Answear[]
}
