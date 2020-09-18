import { NowResponse } from '@vercel/node';
import { v4 as uuidv4 } from 'uuid';
import { Question } from '../types/question';
import { Answear } from '../types/answear';
import { Comment } from '../types/comment';
import writeQuestion from './question.model';

const addNewQuestion = (res: NowResponse, question: string, answears: Answear[]) => {
  const id = uuidv4();
  const comments: Comment[] = [];
  const newQuestion: Question = {
    question, id, comments, answears,
  };
  writeQuestion(newQuestion, res);
};
export default addNewQuestion;
