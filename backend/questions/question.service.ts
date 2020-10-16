import { v4 as uuidv4 } from 'uuid';
import { Question } from '../types/question';
import { Answer } from '../types/answer';
import { Comment } from '../types/comment';
import writeQuestion from './question.model';

const addNewQuestion = async (
  subject: string,
  question: string,
  answers: Answer[]
): Promise<string> => {
  const id = uuidv4();
  const comments: Comment[] = [];
  const newQuestion: Question = {
    question,
    id,
    comments,
    answers,
  };
  await writeQuestion(subject, newQuestion);
  return id;
};
export default addNewQuestion;
