import { NowRequest, NowResponse } from '@vercel/node';
import { Answer } from '../../shared/types/answer';
import addNewQuestion from './question.service';
import respond from '../util/respond';

const questionController = async (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  if (req.body === undefined) {
    respond(res, { error: 'No request body' }, 400);
    return;
  }
  const isString = (s: unknown): s is string => typeof s === 'string';
  const isAnswerValid = (a: Answer) =>
    a.answer === undefined || a.correct === undefined || !isString(a.answer);
  const { question, answers } = req.body;
  if (question === undefined || !isString(question)) {
    respond(res, { error: 'Question is not a string' }, 400);
    return;
  }
  if (answers === undefined || !Array.isArray(answers)) {
    respond(res, { error: 'Answers is not an array' }, 400);
    return;
  }
  if (answers.some((a) => isAnswerValid(a))) {
    respond(res, { error: 'Some of the answers are not valid' }, 400);
  }
  const subject = req.query?.subjectid;
  if (subject === undefined) {
    respond(res, { error: 'Subject id is not provided' }, 400);
    return;
  }
  if (Array.isArray(subject)) {
    respond(res, { error: 'Subject id is not a single value' }, 400);
    return;
  }
  const id = await addNewQuestion(subject, question, answers);
  respond(res, { id }, 200);
};
export default questionController;
