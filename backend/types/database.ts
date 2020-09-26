import { Question } from '../../shared/types/question';

export interface Database {
  title: string;
  id: string;
  data: Question[];
}
