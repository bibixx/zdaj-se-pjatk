import { Comment } from '../types/comment';
import getDb from '../util/getDb';

export const writeComment = async (
  comment: Comment,
  subjectId: string,
  questionIndex: number
): Promise<void> => {
  const dbName = subjectId;
  const db = getDb(dbName);
  await db.get(['data', questionIndex, 'comments']).push(comment).write();
};
export const checkIfQuestionExists = async (
  subjectId: string,
  questionId: number | string
): Promise<number> => {
  const dbName = subjectId;
  const db = getDb(dbName);
  const questionIndex = await db
    .get('data')
    .findIndex((q) => q.id.toString() === questionId.toString())
    .value();
  console.log(questionIndex);
  return questionIndex;
};
