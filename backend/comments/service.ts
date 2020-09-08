import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { NowResponse } from '@vercel/node';
import { Database } from '../types/database';
import { Comment } from '../types/comment';
import writeComment from './model';

const adapter = new FileSync<Database>('public/data/skj.json');
const db = low(adapter);
const addNewComment = (res: NowResponse, author: string, comment: string, id: number) => {
  const newComment: Comment = { author, comment, date: new Date(Date.now()).toString() };
  const questionIndex = db
    .get('data')
    .findIndex((question) => question.id === id)
    .value();
  if (questionIndex === -1) {
    res.json({
      ok: false,
      error: 'No such question in this subject',
    });
    return;
  }
  writeComment(newComment, questionIndex, res);
};
export default addNewComment;
