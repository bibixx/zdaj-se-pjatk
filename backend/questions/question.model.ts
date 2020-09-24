import { Question } from '../types/question';
import getDb from '../util/getDb';

const writeQuestion = async (
  subject: string,
  question: Question
): Promise<void> => {
  const dbName = subject;
  const db = getDb(dbName);
  await db.get(['data']).push(question).write();
};
export default writeQuestion;
