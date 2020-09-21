import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { NowResponse } from '@vercel/node';
import { Database } from '../types/database';
import { Comment } from '../types/comment';

const adapter = new FileSync<Database>('public/data/skj.json');
const db = low(adapter);

const writeComment = (
  comment: Comment,
  questionIndex: number,
  res: NowResponse
): void => {
  db.get(['data', questionIndex, 'comments']).push(comment).write();
  res.json({
    ok: true,
  });
};
export default writeComment;
