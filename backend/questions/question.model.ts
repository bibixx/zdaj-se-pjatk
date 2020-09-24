import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Database } from '../types/database';
import { Question } from '../types/question';

const adapter = new FileSync<Database>('public/data/skj.json');
const db = low(adapter);

const writeQuestion = async (question: Question): Promise<void> => {
  await db.get(['data']).push(question).write();
};
export default writeQuestion;
