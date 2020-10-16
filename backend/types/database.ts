import { Question } from './question';

export interface Database {
  title: string;
  id: string;
  data: Question[];
}
