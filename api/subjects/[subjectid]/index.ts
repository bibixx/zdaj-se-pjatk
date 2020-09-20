import { NowRequest, NowResponse } from '@vercel/node';
import subjectController from '../../../backend/subjects/subject.controller';

export default (req: NowRequest, res: NowResponse) => {
  if (req.method === 'POST') {
    subjectController(req, res);
  }
  res.status(404).json({ ok: false });
};
