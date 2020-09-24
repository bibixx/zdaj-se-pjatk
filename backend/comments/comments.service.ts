import { Comment } from '../types/comment';
import { questionExists, writeComment } from './comments.model';

const addNewComment = async (
  subjectId: string,
  author: string,
  comment: string,
  questionId: number | string
): Promise<void> => {
  const newComment: Comment = {
    author,
    comment,
    date: new Date(Date.now()).toString(),
  };
  if (await questionExists(subjectId, questionId)) {
    await writeComment(newComment, subjectId, questionId);
    return;
  }
  throw new Error('This question does not exist');
};
export default addNewComment;
