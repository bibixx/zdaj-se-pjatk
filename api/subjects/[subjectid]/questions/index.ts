import { NowRequest, NowResponse } from '@vercel/node';
import questionController from '../../../../backend/questions/question.controller';

export default (req: NowRequest, res: NowResponse): void => {
  if (req.method === 'POST') {
    questionController(req, res);
    return;
  }
  res.status(404).json({ ok: false });
};
