import { NowResponse } from '@vercel/node';
import { Comment } from '../types/comment';
import getDb from '../util/getDb';

export const writeComment = async (
  comment: Comment,
  subjectId: string,
  questionId: number | string
): Promise<void> => {
  const dbName = subjectId;
  const db = getDb(dbName);
  const questionIndex = await db
    .get('data')
    .findIndex((q) => q.id === questionId)
    .value();
  await db.get(['data', questionIndex, 'comments']).push(comment).write();
};
export const questionExists = async (
  subjectId: string,
  questionId: number | string
): Promise<boolean> => {
  const dbName = subjectId;
  const db = getDb(dbName);
  const questionIndex = await db
    .get('data')
    .findIndex((q) => q.id === questionId)
    .value();
  return questionIndex !== -1;
};
