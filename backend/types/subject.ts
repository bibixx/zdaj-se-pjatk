import { Question } from './question';

export interface Subject {
  title: string,
  id: string,
  data: Question[]
}
