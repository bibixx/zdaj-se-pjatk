import { Comment } from '../../shared/types/comment';
import { checkIfQuestionExists, writeComment } from './comments.model';

const addNewComment = async (
  subjectId: string,
  author: string,
  comment: string,
  questionId: string
): Promise<void> => {
  const newComment: Comment = {
    author,
    comment,
    date: new Date(Date.now()).toString(),
  };
  const questionIndex = await checkIfQuestionExists(subjectId, questionId);
  if (questionIndex !== -1) {
    await writeComment(newComment, subjectId, questionIndex);
    return;
  }
  throw new Error('This question does not exist');
};
export default addNewComment;
