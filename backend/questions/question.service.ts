import { NowResponse } from '@vercel/node';
import { v4 as uuidv4 } from 'uuid';
import { Question } from '../types/question';
import { Answer } from '../types/answer';
import { Comment } from '../types/comment';
import writeQuestion from './question.model';

const addNewQuestion = (res: NowResponse, question: string, answers: Answer[]) => {
  const id = uuidv4();
  const comments: Comment[] = [];
  const newQuestion: Question = {
    question, id, comments, answers,
  };
  writeQuestion(newQuestion, res);
};
export default addNewQuestion;
