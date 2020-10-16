import { Comment } from '../../shared/types/comment';
import getDb from '../util/getDb';

export const writeComment = async (
  comment: Comment,
  subjectId: string,
  questionIndex: number
): Promise<void> => {
  const dbName = subjectId;
  const db = getDb(dbName);
  if (db.get(['data', questionIndex, 'comments']).value() === null) {
    db.get(['data', questionIndex]).set('comments', []).write();
  }
  await db.get(['data', questionIndex, 'comments']).push(comment).write();
};
export const checkIfQuestionExists = async (
  subjectId: string,
  questionId: string
): Promise<number> => {
  const dbName = subjectId;
  const db = getDb(dbName);
  const questionIndex = db
    .get('data')
    .findIndex((q) => q.id.toString() === questionId)
    .value();
  return questionIndex;
};
