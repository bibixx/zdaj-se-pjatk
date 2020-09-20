import { NowRequest, NowResponse } from '@vercel/node';
import { Answer } from '../types/answer';
import addNewQuestion from './question.service';

const questionController = (req: NowRequest, res: NowResponse): void => {
  if (req.body === undefined) {
    res.json({ ok: false, error: 'No request body' });
    return;
  }
  const isString = (s: unknown): s is string => typeof s === 'string';
  const isAnswerValid = (a: Answer) => a.answer === undefined
  || a.correct === undefined
  || !isString(a.answer);
  const { question, answers } = req.body;
  if (question === undefined || !isString(question)) {
    res.json({ ok: false, error: 'Question is not a string' });
    return;
  }
  if (answers === undefined || !Array.isArray(answers)) {
    res.json({ ok: false, error: 'Answers is not an array' });
    return;
  }
  if (answers.some((a) => isAnswerValid(a))) {
    res.json({ ok: false, error: 'Some of the answers are not valid' });
  }
  addNewQuestion(res, question, answers);
};
export default questionController;
