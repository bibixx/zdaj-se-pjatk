import { v4 as uuidv4 } from 'uuid';
import { Question } from '../../shared/types/question';
import getDb from '../util/getDb';

const writeQuestion = async (
  subject: string,
  question: Omit<Question, 'id'>
): Promise<string> => {
  const id = uuidv4();
  const fullQuestion: Question = {
    question: question.question,
    id,
    comments: question.comments,
    answers: question.answers,
  };
  const dbName = subject;
  const db = getDb(dbName);
  await db.get(['data']).push(fullQuestion).write();
  return id;
};
export default writeQuestion;
