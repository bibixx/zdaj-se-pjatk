import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { NowResponse } from '@vercel/node';
import { Database } from '../types/database';
import { Question } from '../types/question';

const adapter = new FileSync<Database>('public/data/skj.json');
const db = low(adapter);

const writeQuestion = (question: Question, res: NowResponse): void => {
  db.get(['data']).push(question).write();
  res.json({
    ok: true,
    id: question.id,
  });
};
export default writeQuestion;
