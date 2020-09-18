import { NowRequest, NowResponse } from '@vercel/node';
import { Answear } from '../types/answear';
import addNewQuestion from './question.service';

const questionController = (req: NowRequest, res: NowResponse): void => {
  if (req.body === undefined) {
    res.json({ ok: false, error: 'No request body' });
    return;
  }
  const isString = (s: unknown): s is string => typeof s === 'string';
  const isAnswearValid = (a: Answear) => a.answear === undefined
  || a.correct === undefined
  || !isString(a.answear);
  const { question, answears } = req.body;
  if (question === undefined || !isString(question)) {
    res.json({ ok: false, error: 'Question is not a string' });
    return;
  }
  if (answears === undefined || !Array.isArray(answears)) {
    res.json({ ok: false, error: 'Answers is not an array' });
    return;
  }
  if (answears.some((a) => isAnswearValid(a))) {
    res.json({ ok: false, error: 'Some of the answers are not valid' });
  }
  addNewQuestion(res, question, answears);
};
export default questionController;
