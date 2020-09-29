import { Question } from '../../shared/types/question';
import { Answer } from '../../shared/types/answer';
import { Comment } from '../../shared/types/comment';
import writeQuestion from './question.model';

const addNewQuestion = async (
  subject: string,
  question: string,
  answers: Answer[]
): Promise<string> => {
  const comments: Comment[] = [];
  const newQuestion: Omit<Question, 'id'> = {
    question,
    comments,
    answers,
  };
  const id = await writeQuestion(subject, newQuestion);
  return id;
};
export default addNewQuestion;
