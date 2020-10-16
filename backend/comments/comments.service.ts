import { format } from 'date-fns';
import { Comment } from '../../shared/types/comment';
import { getQuestionIndex, writeComment } from './comments.model';

const addNewComment = async (
  subjectId: string,
  author: string,
  comment: string,
  questionId: string
): Promise<void> => {
  const newComment: Comment = {
    author,
    comment,
    date: format(new Date(Date.now()), 'DD-MM-YYYY HH:MM:SS'),
  };
  const questionIndex = await getQuestionIndex(subjectId, questionId);
  if (questionIndex === -1) {
    throw new Error('This question does not exist');
  }
  await writeComment(newComment, subjectId, questionIndex);
};
export default addNewComment;
